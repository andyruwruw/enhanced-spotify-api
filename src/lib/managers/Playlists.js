'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Playlists Manager Instance.
 * @param {Array | Playlist | object | string} data (optional) Data to be preloaded. Single or multiple playlists.
 */
function Playlists(items) {
    try {
        this.name = 'Playlists';
        this.type = 'Playlist';
        this.uri_type = 'playlist';
        Models.Manager.call(this, items);
    } catch (error) {
        throw error;
    }
}

Playlists.prototype = {
    ...Models.Manager.prototype,

    /**
     * Plays Playlists
     * Plays playlists on user's active device.
     * @param {object} options (Optional) Additional options.
     */
    play: async function(options) {
        try {
            let tracks = await this.getTracks();
            return await tracks.play(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Followed
     * Returns whether playlists are followed by the user.
     * @returns {Array} Array of booleans of whether playlist is followed by user.
     */
    areFollowing: async function() {
        try {
            let following = [];
            let userID = await (await Models.wrapperInstance.getMe()).body.id;
            for (let playlist in this.items) {
                if ('id' in this.items[playlist]) {
                    let status = await this.items[playlist].areFollowing([userID]);
                    following.push(status[0]);
                } else {
                    following.push(null);
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Playlists
     * Follows all playlists.
     * @param {object} options (Optional) Additional options.
     */
    follow: async function(options) {
        try {
            for (let playlist in this.items) {
                if ('id' in this.items[playlist]) {
                    await Models.wrapperInstance.followPlaylist(this.items[playlist].id, options ? options : {});
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Playlists
     * Unfollows all playlists.
     */
    unfollow: async function() {
        try {
            for (let playlist in this.items) {
                if ('id' in this.items[playlist]) {
                    await Models.wrapperInstance.unfollowPlaylist(this.items[playlist].id);
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full playlist data for all playlists. Retrieves from Spotify API if nessisary.
     * @returns {array} Array of Playlist Full Objects.
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
     * Returns simplified playlist data for all playlists. Retrieves from Spotify API if nessisary.
     * @returns {array} Array of Playlist Simplified Objects.
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
     * Get Playlists Current Data
     * Just returns whatever the playlist objects currently hold.
     * 
     * @returns {array} Array of Current Playlist Data
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
     * Get All Playlist's Tracks
     * Returns Tracks instance with all playlist's tracks.
     * @returns {Tracks} Tracks object of all playlist's tracks.
     */
    getTracks: async function() {
        try {
            let tracks = new Models.Tracks();
            for (let playlist in this.items) {
                await tracks.concat(await this.items[playlist].getTracks());
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Playlist's Artists
     * Returns Artists instance with all playlist's artists.
     * @returns {Artists} Artists object of all playlist's artists.
     */
    getArtists: async function() {
        try {
            let artists = new Models.Artists();
            for (let playlist in this.items) {
                await artists.concat(await this.items[playlist].getArtists());
            }
            return artists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Playlist's Albums
     * Returns Albums instance with all playlist's albums.
     * @returns {Albums} Albums object of all playlist's albums.
     */
    getAlbums: async function() {
        try {
            let albums = new Models.Albums();
            for (let playlist in this.items) {
                await albums.concat(await this.items[playlist].getAlbums());
            }
            return albums;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full playlist data for all playlists from Spotify API
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the playlist contains.
     */
    retrieveFullObjects: async function(objectType) {
        try {
            for (let playlist in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[playlist].containsSimplifiedObject())) {
                        await this.items[playlist].retrieveFullObject();
                    }
                } else {
                    if (!(await this.items[playlist].containsFullObject())) {
                        await this.items[playlist].retrieveFullObject();
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Search for a Playlist
 * Returns search results for a query.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned from Search.
 */
Playlists.search = async function(query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.search: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.searchPlaylists(query, options ? options : {});
        return new Models.Playlists(response.body.playlists.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get User's Playlists
 * Returns followed and created playlists.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getUserPlaylists = async function(userId, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.getUserPlaylists: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.getUserPlaylists(userId, options ? options : {});
        return new Models.Playlists(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All User Playlists
 * Returns all followed and created playlists.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getAllUserPlaylists = async function(userId) {
    try {
        let _options = { limit: 50, offset: 0 };
        let playlists = new Models.Playlists();
        let response;
        do {
            response = await Models.wrapperInstance.getUserPlaylists(userId, _options);
            await playlists.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return playlists;
    } catch (error) {
        throw error;
    }
};

/**
 * Get My Playlists
 * Returns followed and created playlists.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getMyPlaylists = async function(options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.getUserPlaylists: Invalid Parameter \"options\"");
        }
        let userId = await (await Models.wrapperInstance.getMe()).body.id;
        let response = await Models.wrapperInstance.getUserPlaylists(userId , options ? options : {});
        return new Models.Playlists(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All User Playlists
 * Returns all followed and created playlists.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getAllMyPlaylists = async function() {
    try {
        let _options = { limit: 50, offset: 0 };
        let userId = await (await Models.wrapperInstance.getMe()).body.id;
        let playlists = new Models.Playlists();
        let response;
        do {
            response = await Models.wrapperInstance.getUserPlaylists(userId, _options);
            await playlists.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return playlists;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Featured Playlists
 * Returns list of featured playlists.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getFeaturedPlaylists = async function() {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.getUserPlaylists: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.getFeaturedPlaylists(userId, options ? options : {});
        return new Models.Playlists(response.body.playlists.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Playlists.addMethods = function(methods) {
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
Playlists.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Playlists.override: \"name\" does not exist.");
    }
};

Playlists.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Playlists.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Playlists.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Playlists.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Playlists.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Playlists.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Playlists.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Playlists.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Playlists.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Playlists.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Playlists.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Playlists.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Playlists.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Playlists.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Playlists.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Playlists.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Playlists.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Playlists.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Playlists;