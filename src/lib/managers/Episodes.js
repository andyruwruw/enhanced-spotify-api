'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Episodes Container Instance.
 * @param {Array | Episode | object | string} data (optional) Data to be preloaded. Single or multiple episodes.
 */
function Episodes(items) {
    try {
        this.name = 'Episodes';
        this.type = 'Episode';
        this.uri_type = 'episode';
        Models.Container.call(this, items);
    } catch (error) {
        throw error;
    }
}

Episodes.prototype = {
    ...Models.Container.prototype,

    /**
     * Plays Episodes
     * Plays episodes on user's active deviceI
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response from request.
     * options.offset.position: {Number} (Optional) Index of track to begin with.
     * options.offset.uri: {String} (Optional) Track URI to begin with.
     * options.position_ms: {Number} Position to start playback (Milliseconds)
     */
    play: async function(options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Episodes.search: Invalid Parameter \"options\"");
            }
            let _options = options ? options : {};
            _options.uris = [];
            let offset = 0;
            if (offset.hasOwnProperty('offset')) {
                if (offset.hasOwnProperty('position')) {
                    offset = options.offset.position;
                } else if (offset.hasOwnProperty('uri') && typeof(offset.uri) == 'string') {
                    let index = this.order.indexOf(options.offset.uri);
                    if (index != -1) {
                        offset = this.order.indexOf(options.offset.uri);
                    }
                }
            }
            for (let i = 0; i < this.order.length && i < 25; i++) {
                _options.uris.push('spotify:episode:' + this.order[(i + offset) % this.order.length]);
            }
            return await Models.wrapperInstance.play(_options);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full episode data for all episodes. Retrieves from Spotify API if nessisary.
     * @returns {array} Array of Episode Full Objects.
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
     * Returns simplified episode data for all episodes. Retrieves from Spotify API if nessisary.
     * @returns {array} Array of Episode Simplified Objects.
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
     * Get Episodes Current Data
     * Just returns whatever the episode objects currently hold.
     * @returns {array} Array of Current Episode Data
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
     * Get All Episode's Shows
     * Returns Shows instance with all episode's shows.
     * 
     * @returns {Shows} Shows object of all episode's episshowsodes.
     */
    getShows: async function() {
        try {
            await this.retrieveFullObjects();
            let shows = new Episodes.Shows();
            for (let episode in this.items) {
                await shows.add(await this.items[episode].getShow());
            }
            return shows;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full episode data for all episodes from Spotify API
     * 
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the episode contains.
     */
    retrieveFullObjects: async function(objectType) {
        try {
            let ids = [];
            for (let episode in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[episode].containsSimplifiedObject())) {
                        ids.push(episode);
                    } 
                } else {
                    if (!(await this.items[episode].containsFullObject())) {
                        ids.push(episode);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await Models.wrapperInstance.getEpisodes(ids.splice(0, 50));
                    for (let i = 0; i < response.body.episodes.length; i++) {
                        if (response.body.episodes[i] == null) continue;
                        this.items[response.body.episodes[i].id].loadFullObject(response.body.episodes[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Search for a Episodes
 * Returns search results for a query.
 * 
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Episodes} Episodes returned from Search.
 */
Episodes.search = async function(query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Episodes.search: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await Models.wrapperInstance.searchEpisodes(query, _options);
        return new Episodes(response.body.episodes.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Episodes
 * Returns Episodes object of IDs
 * 
 * @param {Array} episodeIds Ids of episodes.
 * @returns {Episodes} Episodes from ids.
 */
Episodes.getEpisodes = async function(showIds) {
    try {
        let episodes = new Episodes(episodeIds);
        await episodes.retrieveFullObjects();
        return episodes;
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Episodes.addMethods = function(methods) {
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
Episodes.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Episodes.override: \"name\" does not exist.");
    }
};

Episodes.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Episodes.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Episodes.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Episodes.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Episodes.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Episodes.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Episodes.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Episodes.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Episodes.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Episodes.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Episodes.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Episodes.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Episodes.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Episodes.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Episodes.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Episodes.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Episodes.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Episodes.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Episodes;