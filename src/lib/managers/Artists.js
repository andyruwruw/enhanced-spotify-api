'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Artists Manager Instance.
 * @param {Array | Artist | object | string} data (optional) Data to be preloaded. Single or multiple artists.
 */
function Artists(items) {
    this.name = 'Artists';
    this.type = 'Artist';
    this.uri_type = 'artist';
    Models.Manager.call(this, items);
}

Artists.prototype = {
    ...Models.Manager.prototype,

    /**
     * Play Artists
     * Plays artist on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    play: async function(wrapper, options) {
        try {
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            let tracks = new Tracks();
            for (let i = 0; i < artists.length; i++) {
                await tracks.push(await (await artists[i].getTopTracks(wrapper)).get(0));
            }   
            return await tracks.play(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Followed
     * Returns whether artists are followed by the user.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of booleans of whether artist is followed by user.
     */
    areFollowed: async function(wrapper) {
        try {
            let response = await wrapper.isFollowingArtists(this.order);
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Artist
     * Follows artist.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    follow: async function(wrapper) {
        try {
            return await wrapper.followArtists(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Artist
     * Unfollows artist.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    unfollow: async function(wrapper) {
        try {
            return await wrapper.unfollowArtists(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full artist data for all artists. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of Artist Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            return await Promise.all(await artists.map(async (artist) => {
                return await artist.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified artist data for all artists. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Artist Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            return await Promise.all(await artists.map(async (artist) => {
                return await artist.getSimplifiedObject(wrapper);
            }));
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
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            return await Promise.all(await artists.map(async (artist) => {
                return await artist.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Top Tracks
     * Returns Tracks instance with all artist's top tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {string} countryCode (Optional) country code.
     * @returns {Tracks}  Tracks object of artist's tracks top tracks.
     */
    getTopTracks: async function(wrapper, countryCode) {
        try {
            let tracks = new Tracks();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await tracks.concat(await artists[i].getTopTracks(wrapper, countryCode));
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
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Tracks}  Tracks object of all artist's tracks.
     */
    getAllTracks: async function(wrapper) {
        try {
            let tracks = new Tracks();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await tracks.concat(await artists[i].getAllTracks(wrapper));
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
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {object} options (Optional) Options to be passed into each request.
     * @returns {Albums}  Albums object of artist's albums.
     */
    getAlbums: async function(wrapper, options) {
        try {
            let albums = new Albums();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await albums.concat(await artists[i].getAlbums(wrapper, options));
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artists's Albums
     * Returns Albums instance with all artists's albums.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Albums}  Albums object of all artist's albums.
     */
    getAllAlbums: async function(wrapper) {
        try {
            let albums = new Albums();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await albums.concat(await artists[i].getAllAlbums(wrapper));
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Related Artists
     * Returns Artists instance with Artist's Related Artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Artists} Artists instance of related Artists
     */
    getRelatedArtists: async function(wrapper) {
        try {
            let related = new Artists();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await related.concat(await artists[i].getRelatedArtists(wrapper));
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
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {object} options (Optional) Additional options.
     * @returns {Tracks} Tracks object with recommendations
     */
    getRecommendations: async function(wrapper, options) {
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
            let response = await wrapper.getRecommendations(_options);
            return new Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full artist data for all artists from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the artist contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
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
                    response = await wrapper.getArtists(ids.splice(0, 50));
                    for (let i = 0; i < response.data.artists.length; i++) {
                        if (response.data.artists[i] == null) continue;
                        this.items[response.data.artists[i].id].loadFullObject(response.data.artists[i]);
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
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Artists} Artists returned from Search.
 */
Artists.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.search: Invalid Parameter \"options\"");
        }
        let response = await wrapper.searchArtists(query, options ? options : {});
        return new Artists(response.body.artists.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Artists
 * Returns Artists object of IDs
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Array} artistIds Ids of artists.
 * @returns {Artists} Artists from ids.
 */
Artists.getArtists = async function(wrapper, artistIds) {
    try {
        let artists = new Artists(artistIds);
        await artists.retrieveFullObjects(wrapper);
        return artists;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Related Artists
 * Returns Artists object artists related to a given id
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} artistId Id of artists to find related to.
 * @returns {Artists} Artists related to artistID
 */
Artists.getRelatedArtists = async function(wrapper, artistId) {
    try {
        let artists = new Artists(artistId);
        return await artists.getRelatedArtists(wrapper);
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
}

module.exports = Artists;