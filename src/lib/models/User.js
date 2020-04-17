'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * User Constructor
 * Creates a new User Instance for a given user.
 * @param {Object | String} data Data to be preloaded. Must either be a string of the user ID or contain an `id` property.
 */
function User(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if (data.hasOwnProperty('id')) {
                this.id = data.id; 
            } else {
                throw new Error("User.constructor: No ID Provided");
            }
            this.loadConditionally(data);
        } else {
            throw new Error("User.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

User.prototype = {
    /**
     * Is Me
     * Returns whether this user is the current logged in user.
     * @returns {Boolean} Whether user is current logged in user.
     */
    isMe: async function() {
        try {
            if (this.meStatus == null) {
                let response = await Models.wrapperInstance.getMe();
                this.meStatus = (response.body.id == this.id);
            } 
            return this.meStatus;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Followed
     * Returns whether this user is followed by the current user.
     * @returns {boolean} Whether this user is followed by the current user.
     */
    isFollowed: async function() {
        try {
            let response = await Models.wrapperInstance.isFollowingUsers([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow User
     * Follows this user.
     * @returns {Object} Response from request.
     */
    follow: async function() {
        try {
            return await Models.wrapperInstance.followUsers([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow User
     * Unfollows this user.
     * @returns {Object} Response from request.
     */
    unfollow: async function() {
        try {
            return await Models.wrapperInstance.unfollowUsers([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Contains Private Object
     * Returns boolean whether private object data is present.
     * @returns {Boolean} Whether private object is loaded.
     */
    containsPrivateObject: function() {
        return ((this.country != null) && (this.email != null) && (this.product != null) && (this.display_name != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.uri != null));
    },

    /**
     * Contains Public Object
     * Returns boolean whether public object data is present.
     * @returns {Boolean} Whether public object is loaded.
     */
    containsPublicObject: function() {
        return ((this.display_name != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.uri != null));
    },

    /**
     * Get Private Object
     * Returns private user data. Retrieves from Spotify API if nessisary.
     * @returns {Object} User Private Object Data.
     */
    getPrivateObject: async function() {
        try {
            if (!(await this.containsPrivateObject())) {
                await this.retrievePrivateObject();
            }
            return {
                display_name: data.display_name,
                external_urls: data.external_urls,
                followers: data.followers,
                href: data.href,
                images: data.images,
                uri: data.uri,
                country: data.country,
                email: data.email,
                product: data.product,
                type: 'user',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Public Object
     * Returns public user data. Retrieves from Spotify API if nessisary.
     * 
     * @returns {object} User Public Object Data.
     */
    getPublicObject: async function() {
        try {
            if (!(await this.containsPublicObject())) {
                await this.retrievePublicObject();
            }
            return {
                display_name: data.display_name,
                external_urls: data.external_urls,
                followers: data.followers,
                href: data.href,
                images: data.images,
                uri: data.uri,
                type: 'user',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the user object currently holds
     * @returns {Object} Any User Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'user' };
            let properties = ['display_name', 'external_urls', 'followers', 'href', 'images', 'uri', 'country', 'email', 'product'];
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
     * Get User's Playlists
     * Returns Playlists object of user's playlists
     * @param {Object} options (Optional) Additional options
     * @returns {Playlist} Playlist Object with User Playlists
     */
    getPlaylists: async function(options) {
        try {
            return await Models.Playlists.getUserPlaylists(this.id, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All User's Playlists
     * Returns Playlists object of all user's playlists
     * 
     * @returns {Playlist} Playlist Object with All User Playlists
     */
    getAllPlaylists: async function() {
        try {
            return await Models.Playlists.getAllUserPlaylists(this.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Private Object
     * Sets private data (outside constructor).
     * @param {Object} data Object with user private object data.
     */
    loadPrivateObject: function(data) {
        try {
            this.id = data.id;
            this.display_name = data.display_name;
            this.external_urls = data.external_urls;
            this.followers = data.followers;
            this.href = data.href;
            this.images = data.images;
            this.uri = data.uri;
            this.country = data.country;
            this.email = data.email;
            this.product = data.product;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Public Object
     * Sets public data (outside constructor).
     * @param {Object} data Object with user public object data.
     */
    loadPublicObject: function(data) {
        try {
            this.display_name = data.display_name;
            this.external_urls = data.external_urls;
            this.followers = data.followers;
            this.href = data.href;
            this.images = data.images;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Conditionally
     * Sets all data conditionally.
     * @param {Object} data Object with user data.
     */
    loadConditionally: function(data) {
        try {
            let properties = ['display_name', 'external_urls', 'followers', 'href', 'images', 'uri', 'country', 'email', 'product'];
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
     * Retrieve Private Object
     * Retrieves private user data from Spotify API
     */
    retrievePrivateObject: async function() {
        try {
            let response = await Models.wrapperInstance.getMe();
            if (response.body.id != this.id) {
                throw new Error("User.retrievePrivateObject: Cannot Retrieve Private Data for Non-Current User")
            }
            await this.loadPrivateObject(response.body);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Public Object
     * Retrieves public user data from Spotify API
     */
    retrievePublicObject: async function() {
        try {
            let response = await Models.wrapperInstance.getUser(this.id);
            await this.loadPublicObject(response.body);
        } catch (error) {
            throw error;
        }
    },
}

/**
 * Get Me
 * Returns User object of current user.
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @returns {User} Current User
 */
User.getMe = async function() {
    try {
        let response = await Models.wrapperInstance.getMe();
        return new Models.User(response.body);
    } catch (error) {
        throw error;
    }
};

/**
 * Get User
 * Returns User object of ID
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {String} userID Id of user.
 * @returns {User} User from id.
 */
User.getUser = async function(userID) {
    try {
        let response = await Models.wrapperInstance.getUser(userID);
        return new Models.User(response.body);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
User.addMethods = function(methods) {
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
User.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("User.override: \"name\" does not exist.");
    }
};

User.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

User.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

User.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

User.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

User.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

User.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

User.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

User.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

User.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

User.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

User.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

User.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

User.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

User.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

User.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

User.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

User.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

User.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = User;