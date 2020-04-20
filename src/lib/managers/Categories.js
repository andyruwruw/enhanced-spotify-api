'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Categories Container Instance.
 * @param {Array | Category | object | string} data (optional) Data to be preloaded. Single or multiple categories.
 */
function Categories(items) {
    try {
        this.name = 'Categories';
        this.type = 'Category';
        Models.Container.call(this, items);
    } catch (error) {
        throw error;
    }
}

Categories.prototype = {
    ...Models.Container.prototype,

    getURIs: null,

    getURIsNoRepeats: null,

    /**
     * Play Categories
     * Plays category on user's active device.
     * @param {number} index (Optional) Index of category
     */
    play: async function(index) {
        try {
            let _index = index != null ? index : 0;
            return await this.item[this.order[_index]].play();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full category data for all categories. Retrieves from Spotify API if nessisary.
     * @returns {Array} Array of Category Full Objects.
     */
    getFullObjects: async function() {
        try {
            await this.retrieveFullObjects();
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order].getFullObject());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Categories Current Data
     * Just returns whatever the category objects currently hold.
     * @returns {Array} Array of Current Category Data
     */
    getCurrentData: async function() {
        try {
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order].getCurrentData());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Categories Playlists
     * Returns Playlists instance with Categories playlists.
     * @param {object} options (Optional) Options to be passed into request.
     * @returns {Playlists} Playlists instance with category playlists.
     */
    getPlaylists: async function(options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Category.getPlaylists: Invalid Parameter \"options\"");
            }
            let _options = options ? options : {};
            let playlists = new Categories.Playlists();
            for (let category in this.items) {
                await playlists.concat(await this.items[category].getPlaylists(_options));
            }
            return playlists;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full category data for all Categories from Spotify API
     */
    retrieveFullObjects: async function() {
        try {
            for (let category in this.items) {
                if (!(await this.items[category].containsFullObject())) {
                    await this.items[category].retrieveFullObject();
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
 * @param {object} options (Optional) Options for request.
 * @returns {Categories} Categories instance
 */
Categories.getCategories = async function(options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Categories.getCategories: Invalid Parameter \"options\"");
        }
        let _options = options ? options : {};
        let response = await Models.wrapperInstance.getCategories(_options);
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
};

Categories.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Categories.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Categories.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Categories.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Categories.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Categories.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Categories.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Categories.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Categories.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Categories.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Categories.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Categories.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Categories.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Categories.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Categories.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Categories.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Categories.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Categories.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Categories;