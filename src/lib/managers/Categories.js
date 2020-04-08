'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Categories Manager Instance.
 * @param {Array | Category | object | string} data (optional) Data to be preloaded. Single or multiple categories.
 */
function Categories(items) {
    try {
        this.name = 'Categories';
        this.type = 'Category';
        Models.Manager.call(this, items);
    } catch (error) {
        throw error;
    }
}

Categories.prototype = {
    ...Models.Manager.prototype,

    getURIs: null,

    getURIsNoRepeats: null,

    /**
     * Play Categories
     * Plays category on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {number} index (Optional) Index of category
     */
    play: async function(wrapper, index) {
        try {
            let _index = index != null ? index : 0;
            return await this.item[this.order[_index]].play(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full category data for all categories. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of Category Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper);
            let categories = await this.order.map((category) => {
                return this.items[category]; 
            });
            return await Promise.all(await categories.map(async (category) => {
                return await category.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Categories Current Data
     * Just returns whatever the category objects currently hold.
     * 
     * @returns {Array} Array of Current Category Data
     */
    getCurrentData: async function() {
        try {
            let categories = await this.order.map((category) => {
                return this.items[category]; 
            });
            return await Promise.all(await categories.map(async (category) => {
                return await category.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Categories Playlists
     * Returns Playlists instance with Categories playlists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {object} options (Optional) Options to be passed into request.
     * @returns {Playlists} Playlists instance with category playlists.
     */
    getPlaylists: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Category.getPlaylists: Invalid Parameter \"options\"");
            }
            let _options = options ? options : {};
            let playlists = new Categories.Playlists();
            for (let category in this.items) {
                await playlists.concat(await this.items[category].getPlaylists(wrapper, _options));
            }
            return playlists;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full category data for all Categories from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    retrieveFullObjects: async function(wrapper) {
        try {
            for (let category in this.items) {
                if (!(await this.items[category].containsFullObject())) {
                    await this.items[category].retrieveFullObject(wrapper);
                }
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get a List of Categories
 * Returns Categories instance.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {object} options (Optional) Options for request.
 * @returns {Categories} Categories instance
 */
Categories.getCategories = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Categories.getCategories: Invalid Parameter \"options\"");
        }
        let _options = options ? options : {};
        let response = await wrapper.getCategories(_options);
        return new Categories(response.body.categories);
    } catch (error) {
        throw error;
    }
}

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Categories.addMethods = function(methods) {
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
Categories.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Categories.override: \"name\" does not exist.");
    }
}

module.exports = Categories;