'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Shows Manager Instance.
 * @param {Array | Show | object | string} data (optional) Data to be preloaded. Single or multiple shows.
 */
function Shows(items) {
    try {
        this.name = 'Shows';
        this.type = 'Show';
        this.uri_type = 'show';
        Models.Manager.call(this, items);
    } catch (error) {
        throw error;
    }
}

Shows.prototype = {
    ...Models.Manager.prototype,

    /**
     * Plays Shows
     * Plays shows on user's active device.
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response from request.
     * options.show_index: {Number} Which album to start with (Default: 0).
     * options.offset: {Object} Where from the album to play.
     * options.offset.position: {Number} Index of item to start with in context.
     * options.offset.uri: {String} URI of item to start with in context.
     * options.position_ms: {Number} Millisecond to start with in track.
     */
    play: async function(options) {
        try {
            let _show_index = (options && typeof(options) == 'object' && options.hasOwnProperty('show_index')) ? options.show_index : 0;
            let episodes = new Models.Episodes();
            for (let i = 0; i < this.order.length; i++) {
                await episodes.concat(await this.items[this.order[(i + _show_index) % this.order.length]].getEpisodes());
            }
            return await episodes.play(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Liked
     * Returns array of booleans whether shows are saved to the user's library.
     * @returns {array} Array of Booleans Whether show are saved to the user's library.
     */
    areLiked: async function() {
        try {
            let shows = await this.order.map((show) => {
                return this.items[show]; 
            });
            let response = await Models.wrapperInstance.containsMySavedShows(await shows.map((show) => show.id));
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
    * Like Shows
    * Adds shows to the user's library.
    */
    likeAll: async function() {
        try {
            await Models.wrapperInstance.addToMySavedShows(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Shows
    * Removes shows from the user's library.
    */
    unlikeAll: async function() {
        try {
            await Models.wrapperInstance.removeFromMySavedShows(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full show data for all shows. Retrieves from Spotify API if nessisary.
     * @returns {array} Array of Show Full Objects.
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
     * Returns simplified show data for all shows. Retrieves from Spotify API if nessisary.
     * @returns {array} Array of Show Simplified Objects.
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
     * Get Shows Current Data
     * Just returns whatever the show objects currently hold.
     * @returns {array} Array of Current Show Data
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
     * Get All Show's Episodes
     * Returns Episodes instance with all show's episodes.
     * @returns {Episodes} Episodes object of all show's episodes.
     */
    getEpisodes: async function() {
        try {
            await this.retrieveFullObjects();
            let episodes = new Shows.Episodes();
            for (let show in this.items) {
                await episodes.concat(await this.items[show].getEpisodes());
            }
            return episodes;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full show data for all shows from Spotify API
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the show contains.
     */
    retrieveFullObjects: async function(objectType) {
        try {
            let ids = [];
            for (let show in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[show].containsSimplifiedObject())) {
                        ids.push(show);
                    } 
                } else {
                    if (!(await this.items[show].containsFullObject())) {
                        ids.push(show);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await Models.wrapperInstance.getShows(ids.splice(0, 50));
                    for (let i = 0; i < response.body.shows.length; i++) {
                        if (response.body.shows[i] == null) continue;
                        this.items[response.body.shows[i].id].loadFullObject(response.body.shows[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Search for a Shows
 * Returns search results for a query.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Shows} Shows returned from Search.
 */
Shows.search = async function(query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Shows.search: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await Models.wrapperInstance.searchShows(query, _options);
        return new Shows(response.body.shows.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Shows
 * Returns Shows object of IDs
 * @param {Array} showIds Ids of shows.
 * @returns {Shows} Shows from ids.
 */
Shows.getShows = async function(showIds) {
    try {
        let shows = new Shows(showIds);
        await shows.retrieveFullObjects();
        return shows;
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Shows.addMethods = function(methods) {
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
Shows.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Shows.override: \"name\" does not exist.");
    }
};

Shows.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Shows.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Shows.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Shows.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Shows.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Shows.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Shows.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Shows.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Shows.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Shows.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Shows.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Shows.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Shows.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Shows.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Shows.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Shows.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Shows.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Shows.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Shows;