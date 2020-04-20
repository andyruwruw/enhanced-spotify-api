'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Albums Container Instance.
 * @param {Array | Album | Object | String} items (optional) Data to be preloaded. Single or multiple albums.
 */
function Albums(items) {
    try {
        this.name = 'Albums';
        this.type = 'Album';
        this.uri_type = 'album';
        Models.Container.call(this, items);
    } catch (error) {
        throw error;
    }
}

Albums.prototype = {
    ...Models.Container.prototype,

    /**
     * Plays Albums
     * Plays albums on user's active device.
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response from request.
     * options.album_index: {Number} Which album to start with (Default: 0).
     * options.offset: {Object} Where from the album to play.
     * options.offset.position: {Number} Index of item to start with in context.
     * options.offset.uri: {String} URI of item to start with in context.
     * options.position_ms: {Number} Millisecond to start with in track.
     */
    play: async function(options) {
        try {
            let _album_index = (options && typeof(options) == 'object' && options.hasOwnProperty('album_index')) ? options.album_index : 0;
            let tracks = new Models.Tracks();
            for (let i = 0; i < this.order.length; i++) {
                await tracks.concat(await this.items[this.order[(i + _album_index) % this.order.length]].getTracks());
            }
            return await tracks.play(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Liked
     * Returns array of booleans whether albums are saved to the user's library.
     * @returns {Array} Array of Booleans Whether album are saved to the user's library.
     */
    areLiked: async function() {
        try {
            let response = await Models.wrapperInstance.containsMySavedAlbums(this.order);
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
    * Like Albums
    * Adds albums to the user's library.
    * @returns {Object} Response from request.
    */
    likeAll: async function() {
        try {
            return await Models.wrapperInstance.addToMySavedAlbums(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Album
    * Removes albums from the user's library.
    * @returns {Object} Response from request.
    */
    unlikeAll: async function() {
        try {
            return await Models.wrapperInstance.removeFromMySavedAlbums(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full album data for all albums. Retrieves from Spotify API if nessisary.
     * @returns {Array} Array of Album Full Objects.
     */
    getFullObjects: async function() {
        try {
            await this.retrieveFullObjects('full');
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getFullObject())
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified album data for all albums. Retrieves from Spotify API if nessisary.
     * @returns {Array} Array of Album Simplified Objects.
     */
    getSimplifiedObjects: async function() {
        try {
            await this.retrieveFullObjects('simplified');
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getSimplifiedObject())
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Albums Current Data
     * Just returns whatever the album objects currently hold.
     * @returns {Array} Array of Current Album Data
     */
    getCurrentData: async function() {
        try {
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getCurrentData())
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Album's Artists
     * Returns Artists instance with all album's artists.
     * @returns {Artists} Artists object of all album's artists.
     */
    getArtists: async function() {
        try {
            await this.retrieveFullObjects('simplified');
            let artists = new Models.Artists();
            for (let album in this.items) {
                await artists.concat(await this.items[album].getArtists());
            }
            return artists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Album's Tracks
     * Returns Tracks instance with all album's tracks.
     * @returns {Tracks} Tracks object of all album's tracks.
     */
    getTracks: async function() {
        try {
            let tracks = new Models.Tracks();
            for (let i = 0; i < this.order.length; i++) {
                await tracks.concat(await this.items[this.order[i]].getTracks());
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full album data for all albums from Spotify API
     * @param {String} objectType Optional | 'simplified', 'link' or 'full', what to check if the album contains.
     */
    retrieveFullObjects: async function(objectType) {
        try {
            let ids = [];
            for (let album in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[album].containsSimplifiedObject())) {
                        ids.push(album);
                    }
                } else {
                    if (!(await this.items[album].containsFullObject())) {
                        ids.push(album);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await Models.wrapperInstance.getAlbums(ids.splice(0, 50));
                    for (let i = 0; i < response.body.albums.length; i++) {
                        if (response.body.albums[i] == null) continue;
                        this.items[response.body.albums[i].id].loadFullObject(response.body.albums[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Search for an Album
 * Returns search results for a query.
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {String} query String to search for.
 * @param {Object} options (Optional) Additional options.
 * @returns {Albums} Albums returned from Search.
 * options.limit: {Number} Max number of results to return.
 * options.offset: {Number} Index of first result to return.
 * options.market: {String} Country code.
 * options.include_external: {String} "audio" includes any relevant audio content that is hosted externally.
 */
Albums.search = async function(query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Albums.search: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.searchAlbums(query, options ? options : {});
        return new Models.Albums(response.body.albums.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Saved Albums
 * Returns saved albums.
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Object} options (Optional) Additional options.
 * @returns {Albums} Albums returned request.
 * options.limit: {Number} Max number of results to return.
 * options.offset: {Number} Index of first result to return.
 * options.market: {String} Country code.
 */
Albums.getMySavedAlbums = async function(options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Albums.getMySavedAlbums: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.getMySavedAlbums(options ? options : {});
        return new Models.Albums(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All Saved Albums
 * Returns all current user's saved albums.
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @returns {Albums} Albums returned request.
 */
Albums.getAllMySavedAlbums = async function() {
    try {
        let _options = { limit: 50, offset: 0 };
        let albums = new Models.Albums();
        let response;
        do {
            response = await Models.wrapperInstance.getMySavedAlbums(_options);
            await albums.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return albums;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Albums
 * Returns Albums object of IDs
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Array} albumIDs Ids of albums.
 * @returns {Albums} Albums from ids.
 */
Albums.getAlbums = async function(albumIDs) {
    try {
        let albums = new Models.Albums(albumIDs);
        await albums.retrieveFullObjects();
        return albums;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Artist's Albums
 * Returns Artist's Albums.
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {String} artistID ID for artist
 * @returns {Albums} Albums of all Artist's Albums.
 */
Albums.getArtistAlbums = async function(artistID) {
    try {
        let artist = new Models.Artist(artistID);
        return await artist.getAllAlbums();
    } catch (error) {
        throw error;
    }
};

/**
 * Get New Releases
 * Returns Albums object with user saved albums.
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Object} options (Optional) Additional options.
 * @returns {Albums} Albums of user saved albums.
 * options.limit: {Number} Max number of results to return.
 * options.offset: {Number} Index of first result to return.
 * options.market: {String} Country code.
 */
Albums.getNewReleases = async function(options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Albums.getNewReleases: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.getNewReleases(options ? options : {});
        return new Models.Albums(response.body.albums.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Albums.addMethods = function(methods) {
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
Albums.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Albums.override: \"name\" does not exist.");
    }
};

Albums.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Albums.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Albums.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Albums.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Albums.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Albums.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Albums.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Albums.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Albums.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Albums.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Albums.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Albums.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Albums.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Albums.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Albums.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Albums.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Albums.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Albums.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Albums;