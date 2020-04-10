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
     * Are Liked
     * Returns array of booleans whether shows are saved to the user's library.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Booleans Whether show are saved to the user's library.
     */
    areLiked: async function(wrapper) {
        try {
            let shows = await this.order.map((show) => {
                return this.items[show]; 
            });
            let response = await wrapper.containsMySavedShows(await shows.map((show) => show.id));
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
    * Like Shows
    * Adds shows to the user's library.
    * 
    * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
    */
    likeAll: async function(wrapper) {
        try {
            await wrapper.addToMySavedShows(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Shows
    * Removes shows from the user's library.
    * 
    * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
    */
    unlikeAll: async function(wrapper) {
        try {
            await wrapper.removeFromMySavedShows(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full show data for all shows. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Show Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getFullObject(wrapper));
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified show data for all shows. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Show Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getSimplifiedObject(wrapper));
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Shows Current Data
     * Just returns whatever the show objects currently hold.
     * 
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
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Episodes} Episodes object of all show's episodes.
     */
    getEpisodes: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper);
            let episodes = new Shows.Episodes();
            for (let show in this.items) {
                await episodes.concat(await this.items[show].getEpisodes(wrapper));
            }
            return episodes;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full show data for all shows from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the show contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
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
                    response = await wrapper.getShows(ids.splice(0, 50));
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
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Shows} Shows returned from Search.
 */
Shows.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Shows.search: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await wrapper.searchShows(query, _options);
        return new Shows(response.body.shows.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Shows
 * Returns Shows object of IDs
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Array} showIds Ids of shows.
 * @returns {Shows} Shows from ids.
 */
Shows.getShows = async function(wrapper, showIds) {
    try {
        let shows = new Shows(showIds);
        await shows.retrieveFullObjects(wrapper);
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
}

module.exports = Shows;