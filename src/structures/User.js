'use strict';

var { addMethods, override } = require('./shared');

 /**
 * User Constructor
 * Creates a new User Instance for a given user.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the user ID or contain an `id` property.
 */
function User(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("User.constructor: No ID Provided");
            }
            this.display_name = 'display_name' in data ? data.display_name : null;
            this.external_urls = 'external_urls' in data ? data.external_urls : null;
            this.followers = 'followers' in data ? data.followers : null;
            this.href = 'href' in data ? data.href : null;
            this.images = 'images' in data ? data.images : null;
            this.uri = 'uri' in data ? data.uri : null;
            // Current User
            this.country = 'country' in data ? data.country : null;
            this.email = 'email' in data ? data.email : null;
            this.product = 'product' in data ? data.product : null;
        } else {
            throw new Error("User.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

User.Playlists = require('./Playlists');
User.Playlist = require('./Playlist');

User.prototype = {
    /**
     * Is Me
     * Returns whether user object is current logged in user.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether user is current logged in user.
     */
    isMe: async (wrapper) => {
        try {
            let response = await wrapper.getMe();
            return (response.body.id == this.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Followed
     * Returns whether a user is followed by the user.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether user is followed by user.
     */
    isFollowed: async (wrapper) => {
        try {
            let response = await wrapper.isFollowingUsers([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow User
     * Follows user.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    follow: async (wrapper) => {
        try {
            return await wrapper.followUsers([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow User
     * Unfollows user.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    unfollow: async (wrapper) => {
        try {
            return await wrapper.unfollowUsers([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Contains Private Object
     * Returns boolean whether private object data is present.
     * 
     * @returns {boolean} Whether private object is loaded.
     */
    containsPrivateObject: () => {
        return ((this.country != null) && (this.email != null) && (this.product != null) && (this.display_name != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.uri != null));
    },

    /**
     * Contains Public Object
     * Returns boolean whether public object data is present.
     * 
     * @returns {boolean} Whether public object is loaded.
     */
    containsPublicObject: () => {
        return ((this.display_name != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.uri != null));
    },

    /**
     * Are Following Playlist
     * Returns boolean whether user is following a playlist.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} playlistId ID of Playlist
     * @returns {boolean} Whether user is following a playlist
     */
    areFollowingPlaylist: async (wrapper, playlistId) => {
        try {
            let playlist = new User.Playlist(playlistId);
            let response = await playlist.areFollowing(wrapper, [this.id]);
            return response[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Private Object
     * Returns private user data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} User Private Object Data.
     */
    getPrivateObject: async (wrapper) => {
        try {
            if (!await this.isMe(wrapper)) {
                throw new Error("User.getPrivateObject: Cannot Retrieve Private Data for Non-Current User");
            }
            if (!(await this.containsPrivateObject())) {
                await this.retrievePrivateObject(wrapper);
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} User Public Object Data.
     */
    getPublicObject: async (wrapper) => {
        try {
            if (!(await this.containsPublicObject())) {
                await this.retrievePublicObject(wrapper);
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any User Data.
     */
    getCurrentData: () => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options Additional Options to request.
     * @returns {Playlist} Playlist Object with User Playlists
     */
    getPlaylists: async (wrapper, options) => {
        try {
            return await User.Playlists.getUserPlaylists(wrapper, this.id, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All User's Playlists
     * Returns Playlists object of all user's playlists
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options Additional Options to request.
     * @returns {Playlist} Playlist Object with All User Playlists
     */
    getAllPlaylists: async (wrapper, options) => {
        try {
            return await User.Playlists.getAllUserPlaylists(wrapper, this.id, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Private Object
     * Sets private data (outside constructor).
     * 
     * @param {object} data Object with user private object data.
     */
    loadPrivateObject: (data) => {
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
     * 
     * @param {object} data Object with user public object data.
     */
    loadPublicObject: (data) => {
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
     * Retrieve Private Object
     * Retrieves private user data from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrievePrivateObject: async (wrapper) => {
        try {
            let response = await wrapper.getMe();
            await this.loadPrivateObject(response.body);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Public Object
     * Retrieves public user data from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrievePublicObject: async (wrapper) => {
        try {
            let response = await wrapper.getUser(this.id);
            await this.loadPublicObject(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get User
 * Returns User object of ID
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} userId Id of user.
 * @returns {User} User from id.
 */
User.getUser = async (wrapper, userId) => {
    try {
        let user = new User(userId);
        await user.retrievePublicObject(wrapper);
        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Me
 * Returns User object of Current User
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @returns {User} User of current user.
 */
User.getMe = async (wrapper) => {
    try {
        let response = await wrapper.getMe();
        let user = new User(response.body);
        return user;
    } catch (error) {
        throw error;
    }
};

User.addMethods = addMethods;

User.override = override;

module.exports = User;