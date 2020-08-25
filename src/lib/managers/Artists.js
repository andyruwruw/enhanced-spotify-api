'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Artists Container Instance.
 * @param {Array | Artist | object | string} data (optional) Data to be preloaded. Single or multiple artists.
 */
function Artists(items) {
    try {
        this.name = 'Artists';
        this.type = 'Artist';
        this.uri_type = 'artist';
        Models.Container.call(this, items);
    } catch (error) {
        throw error;
    }
}

Artists.prototype = {
    ...Models.Container.prototype,

    /**
     * Play Artists
     * Plays artist on user's active device.
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response from request.
     */
    play: async function(options) {
        try {
            let tracks = new Models.Tracks();
            for (let i = 0; i < this.order.length; i++) {
                await tracks.push(await (await this.items[this.order[i]].getTopTracks()).get(0));
            }   
            return await tracks.play(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Followed
     * Returns whether artists are followed by the user.
     * @returns {Array} Array of booleans of whether artist is followed by user.
     */
    areFollowed: async function() {
        try {
            let response = await Models.wrapperInstance.isFollowingArtists(this.order);
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Artist
     * Follows artist.
     */
    followAll: async function() {
        try {
            return await Models.wrapperInstance.followArtists(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Artist
     * Unfollows artist.
     */
    unfollowAll: async function() {
        try {
            return await Models.wrapperInstance.unfollowArtists(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full artist data for all artists. Retrieves from Spotify API if nessisary.
     * 

     * @returns {Array} Array of Artist Full Objects.
     */
    getFullObjects: async function() {
        try {
            await this.retrieveFullObjects('full');
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getFullObject());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified artist data for all artists. Retrieves from Spotify API if nessisary.
     * 

     * @returns {array} Array of Artist Simplified Objects.
     */
    getSimplifiedObjects: async function() {
        try {
            await this.retrieveFullObjects('simplified');
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getSimplifiedObject());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artists Current Data
     * Just returns whatever the artist objects currently hold.
     * 
     * @returns {array} Array of Current Artist Data
     */
    getCurrentData: async function() {
        try {
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getCurrentData());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Top Tracks
     * Returns Tracks instance with all artist's top tracks.
     * 

     * @param {string} countryCode (Optional) country code.
     * @returns {Tracks}  Tracks object of artist's tracks top tracks.
     */
    getTopTracks: async function(countryCode) {
        try {
            let tracks = new Models.Tracks();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await tracks.concat(await artists[i].getTopTracks(countryCode));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Tracks
     * Returns Tracks instance with all artist's tracks.
     * 

     * @returns {Tracks}  Tracks object of all artist's tracks.
     */
    getAllTracks: async function() {
        try {
            let tracks = new Models.Tracks();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await tracks.concat(await artists[i].getAllTracks());
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artists's Albums
     * Returns Albums instance with artists's albums.
     * 

     * @param {Object} options (Optional) Options to be passed into each request.
     * @returns {Albums}  Albums object of artist's albums.
     */
    getAlbums: async function(options) {
        try {
            let albums = new Models.Albums();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await albums.concat(await artists[i].getAlbums(options));
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artists's Albums
     * Returns Albums instance with all artists's albums.
     * 

     * @returns {Albums}  Albums object of all artist's albums.
     */
    getAllAlbums: async function() {
        try {
            let albums = new Models.Albums();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await albums.concat(await artists[i].getAllAlbums());
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Related Artists
     * Returns Artists instance with Artist's Related Artists.
     * 

     * @returns {Artists} Artists instance of related Artists
     */
    getRelatedArtists: async function() {
        try {
            let related = new Models.Artists();
            for (let i = 0; i < this.order.length; i++) {
                await related.concat(await this.items[this.order[i]].getRelatedArtists());
            }
            return related;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations
     * Retrieves suggests for a random 5 of these artists.
     * 

     * @param {Object} options (Optional) Additional options.
     * @returns {Tracks} Tracks object with recommendations
     */
    getRecommendations: async function(options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Artists.search: Invalid Parameter \"options\"");
            }
            let ids = Object.keys(this.items);
            let seeds = [];
            for (let i = 0; i < 5; i++) {
                if (!ids.length) {
                    break;
                }
                let random = Math.round(Math.random() * (ids.length - 1));
                seeds.push(ids.slice(random, random + 1));
            }
            let _options = options ? options : {};
            if ('seed_tracks' in _options) {
                delete _options.seed_tracks;
            }
            if ('seed_genres' in _options) {
                delete _options.seed_artists;
            }
            _options.seed_artists = seeds.join(",");
            let response = await Models.wrapperInstance.getRecommendations(_options);
            return new Models.Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full artist data for all artists from Spotify API
     * 

     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the artist contains.
     */
    retrieveFullObjects: async function(objectType) {
        try {
            let ids = [];
            for (let artist in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[artist].containsSimplifiedObject())) {
                        ids.push(artist);
                    }
                } else {
                    if (!(await this.items[artist].containsFullObject())) {
                        ids.push(artist);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await Models.wrapperInstance.getArtists(ids.splice(0, 50));
                    for (let i = 0; i < response.body.artists.length; i++) {
                        if (response.body.artists[i] == null) continue;
                        this.items[response.body.artists[i].id].loadFullObject(response.body.artists[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },
}

/**
 * Search for an Artist
 * Returns search results for a query.
 * @param {string} query String to search for.
 * @param {Object} options (Optional) Additional options.
 * @returns {Artists} Artists returned from Search.
 * options.limit: {Number} Max number of results to return.
 * options.offset: {Number} Index of first result to return.
 * options.market: {String} Country code.
 */
Artists.search = async function(query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Artists.search: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.searchArtists(query, options ? options : {});
        return new Models.Artists(response.body.artists.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Artists
 * Returns Artists object of IDs
 * @param {Array} artistIds Ids of artists.
 * @returns {Artists} Artists from ids.
 */
Artists.getArtists = async function(artistIds) {
    try {
        let artists = new Models.Artists(artistIds);
        await artists.retrieveFullObjects();
        return artists;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Related Artists
 * Returns Artists object artists related to a given id
 * @param {string} artistId Id of artists to find related to.
 * @returns {Artists} Artists related to artistID
 */
Artists.getRelatedArtists = async function(artistId) {
    try {
        let artists = new Models.Artists(artistId);
        return await artists.getRelatedArtists();
    } catch (error) {
        throw error;
    }
};

/**
 * Get User Top Artists
 * Returns Artists object of user's top artists
 * @param {Object} options (Optional) Additional Options.
 * @returns {Artists} User's top artists.
 */
Artists.getMyTopArtists = async function(options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Artists.getMyTopArtists: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.getMyTopArtists(options ? options : {});
        return new Models.Artists(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Artists.addMethods = function(methods) {
    for (let method in methods) {
        this.prototype[method] = methods[method];
    }
};

/**
 * Override
 * Replaces a method within the Class.
 * @param {String} name Name of the method to replace.
 * @param {Function} method Function to replace with.
 */
Artists.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Artists.override: \"name\" does not exist.");
    }
};

Artists.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Artists.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Artists.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Artists.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Artists.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Artists.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Artists.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Artists.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Artists.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Artists.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Artists.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Artists.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Artists.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Artists.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Artists.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Artists.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Artists.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Artists.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Artists;