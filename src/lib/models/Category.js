'use strict';

var Models = require('../../index');

 /**
 * Category Constructor
 * Creates a new Category Instance for a given category.
 * @param {Object | String} data Data to be preloaded. Must either be a string of the category ID or contain an `id` property.
 */
function Category(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Category.constructor: No ID Provided");
            }
            this.loadConditionally(data);
        } else {
            throw new Error("Category.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Category.prototype = {
    /**
     * Play Category
     * Plays category on user's active device.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Object} Response from request.
     */
    play: async function(wrapper) {
        try {
            return await (await (await this.getCategoryPlaylists(wrapper, { limit: 1 })).get(0)).play(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * @returns {boolean} Whether full object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null && this.href != null && this.icons != null));
    },

    /**
     * Get Full Object
     * Returns full category data. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Object} Category Full Object Data.
     */
    getFullObject: async function(wrapper) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                href: this.href,
                icons: this.icons,
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the category object currently holds
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Object} Any Category Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'album' };
            let properties = ['id', 'name', 'href', 'icons'];
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
     * Get Category Playlists
     * Returns Playlists instance with category playlists.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options.
     * @returns {Playlists} Playlists instance with category playlists.
     * options.country: {String} Country Code.
     * options.limit: {Number} Maximum number of items to return (Default: 20, Max: 50).
     * options.offset: {Number} Index of first item to return (Default: 0).
     */
    getPlaylists: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Category.getPlaylists: Invalid Parameter \"options\"");
            }
            let _options = options ? options : {};
            let response = await wrapper.getCategoryPlaylists(this.id, _options);
            return new Models.Playlists(response.body.playlists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * @param {Object} data Object with category full object data.
     */
    loadFullObject: function(data) {
        try {
            this.name = data.name;
            this.href = data.href;
            this.icons = data.icons;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Conditionally
     * Sets all data conditionally.
     * @param {Object} data Object with category data.
     */
    loadConditionally: function(data) {
        try {
            let properties = ['name', 'href', 'icons'];
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
     * Retrieves full category data from Spotify API
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    retrieveFullObject: async function(wrapper) {
        try {
            let response = await wrapper.getCategory(this.id, {});
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Category
 * Returns Category instance for a given category
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {String} categoryId ID for category desired.
 * @param {Object} options (Optional) Additional options
 * @returns {Category} Category instance for given category.
 * options.country: {String} Country Code.
 * options.locale: {String} Desired Language.
 */
Category.getCategory = async function(wrapper, categoryId, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Category.getCategory: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getCategory(categoryId, options ? options : {});
        return new Models.Category(response.body);
    } catch (error) {
        throw error;
    }
}

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Category.addMethods = function(methods) {
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
Category.override = function(name, method) {
    if (this.prototype.hasOwnProperty('property')) {
        this.prototype[property] = method;
    } else {
        throw new Error("Category.override: \"property\" does not exist.");
    }
}

module.exports = Category;