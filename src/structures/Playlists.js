'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Constructor
 * Creates a new Playlists Instance.
 * 
 * @param {Array | Playlist | object | string} data (optional) Data to be preloaded. Single or multiple playlists.
 */
function Playlists(playlists) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Playlists.Playlist || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Playlists.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Playlists.Playlist = require('./Playlist');
Playlists.playlists = require('./playlists');
Playlists.Artists = require('./Artists');
Playlists.Albums = require('./Albums');

Playlists.prototype = {
/**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param {Playlist | object | string } playlist Playlist Instance, playlist object or playlist id to add. 
     */
    push: (playlist) => {
        try {
            if (playlist instanceof Playlists.Playlist) {
                if (!(playlist.id in this.items)) {
                    this.items[playlist.id] = playlist;
                }
                this.order.push(playlist.id);
            } else if (typeof(playlist) == 'object') {
                if ('playlist' in playlist) {
                    if (!(playlist.playlist.id in this.items)) {
                        this.items[playlist.playlist.id] = new Playlists.Playlist(playlist.playlist);
                        if ('is_local' in playlist) {
                            this.items[playlist.playlist.id].is_local = playlist.is_local;
                        }
                        if ('added_at' in playlist) {
                            this.items[playlist.playlist.id].added_at = playlist.added_at;
                        }
                        if ('added_by' in playlist) {
                            this.items[playlist.playlist.id].added_by = playlist.added_by;
                        }
                    }
                    this.order.push(playlist.playlist.id);
                } else {
                    if (!(playlist.id in this.items)) {
                        this.items[playlist.id] = new Playlists.Playlist(playlist);
                    }
                    this.order.push(playlist.id);
                }

            } else if (typeof(playlist) == 'string') {
                if (!(playlist in this.items)) {
                    this.items[playlist] = new Playlists.Playlist(playlist);
                }
                this.order.push(playlist);
            } else {
                throw new Error("Playlists.push: Invalid Parameter \"playlist\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param {Playlists | array } playlists Another Playlists instance or array of Playlist instances, playlist objects, or playlist ids to concat.
     */
    concat: (playlists) => {
        try {
            if (playlists instanceof Playlists) {
                for (let playlist in playlists.items) {
                    if (!(playlist in this.items)) {
                        this.items[playlist] = playlists.items[playlist];
                    }
                    this.order.push(playlists.items[playlist].id);
                }
            } else if (playlists instanceof Array) {
                for (let i = 0; i < playlists.length; i++) {
                    this.push(playlists[i]);
                }
            } else {
                throw new Error("Playlists.concat: Invalid Parameter \"playlists\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove
     * Removes an item from the Manager Object.
     * 
     * @param {Playlist | object | string } playlist Playlist instance, playlist data, or playlist id to remove.
     */
    remove: (playlist) => {
        try {
            let id = null;
            if (playlist instanceof Playlists.Playlist || typeof(playlist) == 'object') {
                id = playlist.id;
            } else if (typeof(playlist) == 'string') {
                id = playlist;
            } else {
                throw new Error("Playlists.remove: Invalid Parameter \"playlist\"");
            }
            this.order = this.order.filter((item) => {
                return item != id;
            });
            delete this.items[id];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Size
     * Returns number of items in manager.
     * 
     * @returns {number} Number of items in manager.
     */
    size: () => {
        try {
            return this.order.length;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an item
     * 
     * @param {string | object | Playlist} playlist Playlist ID, Playlist instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: (playlist, startAt) => {
        try {
            let id = null;
            if (typeof(playlist) == 'string') {
                id = playlist;
            } else if (playlist instanceof Playlists.Playlist || typeof(playlist) == 'object') {
                id = playlist.id;  
            } 
            if (playlist == null) {
                throw new Error("Playlists.findIndex: Invalid Parameter \"playlist\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Playlists.findIndex: Invalid Parameter \"startAt\"");
            }
            for (let i = startAt; i < this.order.length; i++) {
                if (this.order[i] == id) {
                    return i;
                }
            }
            return -1;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * 
     * @param {string | object | Playlist} playlist Playlist ID, Playlist instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: (playlist) => {
        try {
            let id = null;
            if (typeof(playlist) == 'string') {
                id = playlist;
            } else if (playlist instanceof Playlists.Playlist || typeof(playlist) == 'object') {
                id = playlist.id;  
            } 
            if (playlist == null) {
                throw new Error("Playlists.includes: Invalid Parameter \"playlist\"");
            }
            for (let playlist in this.items) {
                if (playlist == id) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter
     * Returns Playlist object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Playlists} Filtered Playlists object.
     */
    filter: async (method) => {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Playlists.filter: \"method\" is not a function"); 
            }
            let newPlaylists = new Playlists();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newPlaylists.push(this.items[this.order[i]]);
                }
            }
            return newPlaylists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns playlist object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Playlist} Playlist at a given index
     */
    get: (index) => {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Playlists.get: Index out of range");
            }
            return this.items[this.order[index]];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * 
     * @returns {Array} Array of IDs
     */
    getIDs: () => {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: () => {
        try {
            let ids = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(ids.includes(this.order[i]))) {
                    ids.push(this.order[i]);
                }
            }
            return ids;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Get URIs
     * Returns array of URIs in order.
     * 
     * @returns {Array} Array of URIs
     */
    getURIs: async () => {
        try {
            return await this.order.map((id) => 'spotify:playlist' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get URIs No Repeats
     * Returns array of URIs with no repeats.
     * 
     * @returns {Array} Array of URIs
     */
    getURIsNoRepeats: async () => {
        try {
            let uris = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(uris.includes(this.order[i]))) {
                    uris.push(this.order[i]);
                }
            }
            return await uris.map((id) => 'spotify:playlist' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * For Each
     * Runs a function on each item.
     * 
     * @param {function} method Function to be run on each item.
     */
    forEach: async (method) => {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Playlists.forEach: \"method\" is not a function"); 
            }
            for (let i = 0; i < this.order; i++) {
                await method(this.items[this.order[i]]);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: () => {
        try {
            this.order.reverse();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pop
     * Removes last item.
     * 
     * @returns {Playlist} Removed item
     */
    pop: () => {
        try {
            let id = this.order.pop();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Shift
     * Removes first item.
     * 
     * @returns {Playlist} Removed item
     */
    shift: () => {
        try {
            let id = this.order.shift();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Slice
     * Removes elements.
     * 
     * @param {number} start Start of removal
     * @param {number} end End of removal (Exclusive)
     * @returns {Playlists} Removed Playlists.
     */
    slice: async (start, end) => {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Playlists(await ids.map((id) => this.items[id]));
            for (let i = 0; i < ids.length; i++) {
                if (!(this.order.includes(ids[i]))) {
                    delete this.items[ids[i]];
                }
            }
            return items;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort
     * Sort Playlists
     * 
     * @param {function} compareFunction Sorting method.
     */
    sort: async (compareFunction) => {
        try {
            let sorted = await (await Object.values(this.items)).sort(compareFunction);
            this.order = await sorted.map((item) => item.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort Safe
     * Sorts but ensures properties are present prior to sort.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async (wrapper, order, property) => {
        try {
            let fullObject = ['collaborative', 'description', 'external_urls', 'followers', 'href', 'images', 'name', 'owner', 'public', 'snapshot_id', 'playlists', 'uri', '_tracks'];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else {
                for (let playlist in this.items) {
                    if (!(property in this.items[playlist])) {
                        throw new Error("Playlists.sortSafe: Invalid Parameter \"property\", you have playlists that don't contain that property.");
                    }
                }
            }
            let ordered = await Object.values(this.items).sort((a, b) => {
                if (typeof(a[property]) == 'string') {
                    let aPrior = a[property].localeCompare(b[property]);
                    return order > 0 ? aPrior : (aPrior * -1) 
                }
                return order > 0 ? a[property] - b[property] : b[property]- a[property];
            });
            return new Playlists(ordered);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Property
     * Adds property with value to a given item
     * 
     * @param {string} id ID of item to alter.
     * @param {string} field Field to set value to.
     * @param {*} value Value to set.
     */
    setProperty: (id, field, value) => {
        try {
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error("Playlists.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Plays Playlists
     * Plays playlists on user's active device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    play: async (wrapper, options) => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of booleans of whether playlist is followed by user.
     */
    areFollowing: async (wrapper) => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    follow: async (wrapper, options) => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    unfollow: async (wrapper) => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Playlist Full Objects.
     */
    getFullObjects: async (wrapper) => {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let playlists = await this.order.map((playlist) => {
                return this.items[playlist]; 
            });
            return await Promise.all(await playlists.map(async (playlist) => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Playlist Simplified Objects.
     */
    getSimplifiedObjects: async (wrapper) => {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let playlists = await this.order.map((playlist) => {
                return this.items[playlist]; 
            });
            return await Promise.all(await playlists.map(async (playlist) => {
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
    getCurrentData: async () => {
        try {
            let playlists = await this.order.map((playlist) => {
                return this.items[playlist]; 
            });
            return await Promise.all(await playlists.map(async (playlist) => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks} Tracks object of all playlist's tracks.
     */
    getTracks: async (wrapper) => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists object of all playlist's artists.
     */
    getArtists: async (wrapper) => {
        try {
            let artists = new Playlists.Artists();
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums} Albums object of all playlist's albums.
     */
    getAlbums: async (wrapper) => {
        try {
            let albums = new Playlists.Albums();
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the playlist contains.
     */
    retrieveFullObjects: async (wrapper, objectType) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getUserPlaylists = async (wrapper, userId, options) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getAllUserPlaylists = async (wrapper, userId) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getMyPlaylists = async (wrapper, options) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getAllMyPlaylists = async (wrapper) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getFeaturedPlaylists = async (wrapper) => {
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

module.exports = Playlists;

