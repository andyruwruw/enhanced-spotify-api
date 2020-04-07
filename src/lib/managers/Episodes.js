'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Episodes Manager Instance.
 * @param {Array | Episode | object | string} data (optional) Data to be preloaded. Single or multiple episodes.
 */
function Episodes(items) {
    this.name = 'Episodes';
    this.type = 'Episode';
    this.uri_type = 'episode';
    Models.Manager.call(this, items);
}

Episodes.prototype = {
    ...Models.Manager.prototype,

    /**
     * Get Full Objects
     * Returns full episode data for all episodes. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Episode Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let episodes = await this.order.map((episode) => {
                return this.items[episode]; 
            });
            return await Promise.all(await episodes.map(async (episode) => {
                return await episode.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified episode data for all episodes. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Episode Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let episodes = await this.order.map((episode) => {
                return this.items[episode]; 
            });
            return await Promise.all(await episodes.map(async (episode) => {
                return await episode.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Episodes Current Data
     * Just returns whatever the episode objects currently hold.
     * 
     * @returns {array} Array of Current Episode Data
     */
    getCurrentData: async function() {
        try {
            let episodes = await this.order.map((episode) => {
                return this.items[episode]; 
            });
            return await Promise.all(await episodes.map(async (episode) => {
                return await episode.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Episode's Shows
     * Returns Shows instance with all episode's shows.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Shows} Shows object of all episode's episshowsodes.
     */
    getShows: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper);
            let shows = new Episodes.Shows();
            for (let episode in this.items) {
                await shows.add(await this.items[show].getShow(wrapper));
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
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the episode contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
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
                    response = await wrapper.getEpisodes(ids.splice(0, 50));
                    for (let i = 0; i < response.data.episodes.length; i++) {
                        if (response.data.episodes[i] == null) continue;
                        this.items[response.data.episodes[i].id].loadFullObject(response.data.episodes[i]);
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
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Episodes} Episodes returned from Search.
 */
Episodes.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Episodes.search: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await wrapper.searchEpisodes(query, _options);
        return new Episodes(response.body.episodes.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Episodes
 * Returns Episodes object of IDs
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Array} episodeIds Ids of episodes.
 * @returns {Episodes} Episodes from ids.
 */
Episodes.getEpisodes = async function(wrapper, showIds) {
    try {
        let episodes = new Episodes(episodeIds);
        await episodes.retrieveFullObjects(wrapper);
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
}

module.exports = Episodes;