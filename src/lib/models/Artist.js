'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Artist Constructor
 * Creates a new Artist Instance for a given artist.
 * @param {Object | String} data Data to be preloaded. Must either be a string of the artist ID or contain an `id` property.
 */
function Artist(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Artist.constructor: No ID Provided");
            }
            this.loadConditionally(data);
        } else {
            throw new Error("Artist.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Artist.prototype = {
    /**
     * Play Artist
     * Plays artist on user's active device.
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response from request.
     * ooptions.position_ms: {Number} Position to start playback (Milliseconds)
     */
    play: async function(options) {
        try {
            let _options = options ? options : {};
            _options.context_uri = 'spotify:artist:' + this.id;
            return await Models.wrapperInstance.play(_options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Followed
     * Returns whether an artist is followed by the user.
     * @returns {Boolean} Whether artist is followed by user.
     */
    isFollowed: async function() {
        try {
            let response = await Models.wrapperInstance.isFollowingArtists([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Artist
     * Follows artist.
     * @returns {Object} Response from request.
     */
    follow: async function() {
        try {
            return await Models.wrapperInstance.followArtists([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Artist
     * Unfollows artist.
     * @returns {Object} Response from request.
     */
    unfollow: async function() {
        try {
            return await Models.wrapperInstance.unfollowArtists([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * @returns {Boolean} Whether full object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null) && (this.external_urls) && (this.followers) && (this.genres != null) && (this.href != null) && (this.images != null) && (this.popularity != null) && (this.uri != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * @returns {Boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.external_urls) && (this.href != null) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full artist data. Retrieves from Spotify API if nessisary.
     * @returns {Object} Artist Full Object Data.
     */
    getFullObject: async function() {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject();
            }
            return {
                id: this.id,
                name: this.name,
                external_urls: this.external_urls,
                followers: this.followers,
                genres: this.genres,
                href: this.href,
                images: this.images,
                popularity: this.popularity,
                uri: this.uri,
                type: 'artist',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified artist data. Retrieves from Spotify API if nessisary.
     * @returns {Object} Artist Simplified Object Data.
     */
    getSimplifiedObject: async function() {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject();
            }
            return {
                id: this.id,
                name: this.name,
                external_urls: this.external_urls,
                href: this.href,
                uri: this.uri,
                type: 'artist',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the artist object currently holds
     * @returns {Object} Any Artist Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'artist' };
            let properties = ['name', 'external_urls', 'followers', 'genres', 'href', 'images', 'popularity', 'uri'];
            for (let i = 0; i < properties.length; i++) {
                if (this[properties[i]] != null) {
                    data[properties[i]] = this[properties[i]];
                }
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artist's Top Tracks
     * Returns Tracks instance with Artist's top Tracks.
     * @param {String} countryCode Country Code.
     * @returns {Tracks} Tracks instance of artist's top Tracks
     */
    getTopTracks: async function(countryCode) {
        try {
            let response =  await Models.wrapperInstance.getArtistTopTracks(this.id, countryCode ? countryCode : "US");
            return new Models.Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Tracks
     * Returns Tracks instance with All Artist's Tracks.
     * @returns {Tracks} Tracks instance with All Artist's Tracks
     */
    getAllTracks: async function() {
        try {
            let tracks = new Models.Tracks();
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await Models.wrapperInstance.getArtistAlbums(this.id, options);
                let albums = new Models.Albums(response.body.items);
                await tracks.concat(await albums.getTracks());
                options.offset += 50;
            } while (!(response.body.items.length < 50));
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artist's Albums
     * Returns Albums instance with Artist's Albums.
     * @param {Object} options (Optional) Additional options.
     * @returns {Albums} Albums instance with Artist's Albums.
     * options.include_groups: {String} Comma-separated list of keywords used to filter. (album, single, appears_on, comilation) (Default: all).
     * options.country: {String} Country Code.
     * options.limit: {Number} Number of items to return.
     * options.offset: {Number} Index of first item to return.
     */
    getAlbums: async function(options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Artist.getAlbums: Invalid Parameter \"options\"");
            }
            let response = await Models.wrapperInstance.getArtistAlbums(this.id, options ? options : {});
            return new Models.Albums(response.body.items);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Albums
     * Returns Albums instance with All Artist's Albums.
     * @returns {Albums} Albums instance with All Artist's Albums
     */
    getAllAlbums: async function() {
        try {
            let albums = new Models.Albums();
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await Models.wrapperInstance.getArtistAlbums(this.id, options);
                await albums.concat(response.body.items);
                options.offset += 50;
            } while (!(response.body.items.length < 50));
            return albums;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Related Artists
     * Returns Artists instance with Artist's Related Artists.
     * @returns {Artists} Artists instance of related Artists
     */
    getRelatedArtists: async function() {
        try {
            let response = await Models.wrapperInstance.getArtistRelatedArtists(this.id);
            return new Models.Artists(response.body.artists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * @param {Object} data Object with artist full object data.
     */
    loadFullObject: function(data) {
        try {
            this.name = data.name;
            this.external_urls = data.external_urls;
            this.followers = data.followers;
            this.genres = data.genres;
            this.href = data.href;
            this.images = data.images;
            this.popularity = data.popularity;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Simplified Object
     * Sets simplified data (outside constructor).
     * @param {Object} data Object with artist simplified object data.
     */
    loadSimplifiedObject: function(data) {
        try {
            this.name = data.name;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Conditionally
     * Sets all data conditionally.
     * @param {Object} data Object with artist data.
     */
    loadConditionally: function(data) {
        try {
            let properties = ['name', 'external_urls', 'followers', 'genres', 'href', 'images', 'popularity', 'uri'];
            for (let i = 0; i < properties.length; i++) {
                if (data.hasOwnProperty(properties[i])) {
                    this[properties[i]] = data[properties[i]];
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full artist data from Spotify API
     */
    retrieveFullObject: async function() {
        try {
            let response = await Models.wrapperInstance.getArtist(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    }
};

/**
 * Get Artist
 * Returns Artist object of ID
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {String} artistID Id of artist.
 * @returns {Artist} Artist from id.
 */
Artist.getArtist = async function(artistID) {
    try {
        let response = await Models.wrapperInstance.getArtist(artistID);
        return new Models.Artist(response.body);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Artist.addMethods = function(methods) {
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
Artist.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Artist.override: \"name\" does not exist.");
    }
};

Artist.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Artist.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Artist.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Artist.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Artist.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Artist.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Artist.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Artist.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Artist.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Artist.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Artist.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Artist.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Artist.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Artist.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Artist.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Artist.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Artist.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Artist.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Artist;