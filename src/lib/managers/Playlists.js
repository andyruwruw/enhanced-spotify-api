'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Playlists Manager Instance.
 * @param {Array | Playlist | object | string} data (optional) Data to be preloaded. Single or multiple playlists.
 */
function Playlists(items) {
    try {
        this.name = 'Playlists';
        this.type = 'Playlist';
        this.uri_type = 'playlist';
        Models.Manager.call(this, items);
    } catch (error) {
        throw error;
    }
}

Playlists.prototype = {
    ...Models.Manager.prototype,

    /**
     * Plays Playlists
     * Plays playlists on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    play: async function(wrapper, options) {
        try {
            let tracks = await this.getTracks(wrapper);
            return await tracks.play(wrapper, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Followed
     * Returns whether playlists are followed by the user.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of booleans of whether playlist is followed by user.
     */
    areFollowing: async function(wrapper) {
        try {
            let following = [];
            let userID = await (await wrapper.getMe()).body.id;
            for (let playlist in this.items) {
                if ('id' in this.items[playlist]) {
                    let status = await this.items[playlist].areFollowing(wrapper, [userID]);
                    following.push(status[0]);
                } else {
                    following.push(null);
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Playlists
     * Follows all playlists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    follow: async function(wrapper, options) {
        try {
            for (let playlist in this.items) {
                if ('id' in this.items[playlist]) {
                    await wrapper.followPlaylist(this.items[playlist].id, options ? options : {});
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Playlists
     * Unfollows all playlists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    unfollow: async function(wrapper) {
        try {
            for (let playlist in this.items) {
                if ('id' in this.items[playlist]) {
                    await wrapper.unfollowPlaylist(this.items[playlist].id);
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full playlist data for all playlists. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Playlist Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let playlists = await this.order.map(function(playlist) {
                return this.items[playlist]; 
            });
            return await Promise.all(await playlists.map(async function(playlist) {
                return await playlist.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified playlist data for all playlists. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Playlist Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let playlists = await this.order.map(function(playlist) {
                return this.items[playlist]; 
            });
            return await Promise.all(await playlists.map(async function(playlist) {
                return await playlist.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Playlists Current Data
     * Just returns whatever the playlist objects currently hold.
     * 
     * @returns {array} Array of Current Playlist Data
     */
    getCurrentData: async function() {
        try {
            let playlists = await this.order.map(function(playlist) {
                return this.items[playlist]; 
            });
            return await Promise.all(await playlists.map(async function(playlist) {
                return await playlist.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Playlist's Tracks
     * Returns Tracks instance with all playlist's tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Tracks} Tracks object of all playlist's tracks.
     */
    getTracks: async function(wrapper) {
        try {
            let tracks = new Playlists.Tracks();
            for (let playlist in this.items) {
                await tracks.concat(await this.items[playlist].getTracks(wrapper));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Playlist's Artists
     * Returns Artists instance with all playlist's artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Artists} Artists object of all playlist's artists.
     */
    getArtists: async function(wrapper) {
        try {
            let artists = new Artists();
            for (let playlist in this.items) {
                await artists.concat(await this.items[playlist].getArtists(wrapper));
            }
            return artists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Playlist's Albums
     * Returns Albums instance with all playlist's albums.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Albums} Albums object of all playlist's albums.
     */
    getAlbums: async function(wrapper) {
        try {
            let albums = new Albums();
            for (let playlist in this.items) {
                await albums.concat(await this.items[playlist].getAlbums(wrapper));
            }
            return albums;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full playlist data for all playlists from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the playlist contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            for (let playlist in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[playlist].containsSimplifiedObject())) {
                        await this.items[playlist].retrieveFullObject(wrapper);
                    }
                } else {
                    if (!(await this.items[playlist].containsFullObject())) {
                        await this.items[playlist].retrieveFullObject(wrapper);
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Search for a Playlist
 * Returns search results for a query.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned from Search.
 */
Playlists.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.search: Invalid Parameter \"options\"");
        }
        let response = await wrapper.searchPlaylists(query, options ? options : {});
        return new Playlists(response.body.playlists.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get User's Playlists
 * Returns followed and created playlists.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getUserPlaylists = async function(wrapper, userId, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.getUserPlaylists: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getUserPlaylists(userId, options ? options : {});
        return new Playlists(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All User Playlists
 * Returns all followed and created playlists.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getAllUserPlaylists = async function(wrapper, userId) {
    try {
        let _options = { limit: 50, offset: 0 };
        let playlists = new Playlists();
        let response;
        do {
            response = await wrapper.getUserPlaylists(userId, _options);
            await playlists.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return playlists;
    } catch (error) {
        throw error;
    }
};

/**
 * Get My Playlists
 * Returns followed and created playlists.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getMyPlaylists = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.getUserPlaylists: Invalid Parameter \"options\"");
        }
        let userId = await (await wrapper.getMe()).body.id;
        let response = await wrapper.getUserPlaylists(userId , options ? options : {});
        return new Playlists(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All User Playlists
 * Returns all followed and created playlists.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getAllMyPlaylists = async function(wrapper) {
    try {
        let _options = { limit: 50, offset: 0 };
        let userId = await (await wrapper.getMe()).body.id;
        let playlists = new Playlists();
        let response;
        do {
            response = await wrapper.getUserPlaylists(userId, _options);
            await playlists.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return playlists;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Featured Playlists
 * Returns list of featured playlists.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getFeaturedPlaylists = async function(wrapper) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.getUserPlaylists: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getFeaturedPlaylists(userId, options ? options : {});
        return new Playlists(response.body.playlists.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Playlists.addMethods = function(methods) {
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
Playlists.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Playlists.override: \"name\" does not exist.");
    }
}

module.exports = Playlists;