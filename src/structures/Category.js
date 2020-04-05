'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Category Constructor
 * Creates a new Category Instance for a given category.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the category ID or contain an `id` property.
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
            this.name = 'name' in data ? data.name : null;
            this.href = 'href' in data ? data.href : null;
            this.icons = 'icons' in data ? data.icons : null;
        } else {
            throw new Error("Category.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Category.Playlists = require('./Playlists');

Category.prototype = {
    /**
     * Play Category
     * Plays category on user's active device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
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
     * 
     * @returns {boolean} Whether full object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null && this.href != null && this.icons != null));
    },

    /**
     * Get Full Object
     * Returns full category data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Category Full Object Data.
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any Category Data.
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options to be passed into request.
     * @returns {Playlists} Playlists instance with category playlists.
     */
    getPlaylists: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Category.getPlaylists: Invalid Parameter \"options\"");
            }
            let _options = options ? options : {};
            let response = await wrapper.getCategoryPlaylists(this.id, _options);
            return new Category.Playlists(response.body.playlists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * 
     * @param {object} data Object with category full object data.
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
     * Retrieve Full Object
     * Retrieves full category data from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(wrapper) {
        try {
            let response = await wrapper.getCategory(this.id, {});
            this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Category
 * Returns Category instance for a given category
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} categoryId ID for category desired.
 * @param {object} options (Optional) Options for request.
 * @returns {Category} Category instance for given category
 */
Category.getCategory = async function(wrapper, categoryId, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Category.getCategory: Invalid Parameter \"options\"");
        }
        let _options = options ? options : {};
        let response = await wrapper.getCategory(categoryId, _options);
        return new Category(response.body);
    } catch (error) {
        throw error;
    }
}

Category.addMethods = addMethods;

Category.override = override;

module.exports = Category;
