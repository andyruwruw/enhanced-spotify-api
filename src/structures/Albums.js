'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Constructor
 * Creates a new Albums Instance.
 * 
 * @param {Array | Album | object | string} data (optional) Data to be preloaded. Single or multiple albums.
 */
function Albums(data) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Albums.Album || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Tracks.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Albums.Album = require('./Album');
Albums.Tracks = require('./Tracks');
Albums.Artists = require('./Artists');
Albums.Artist = require('./Artist');

Albums.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param {Album | object | string } album Album Instance, album object or album id to add. 
     */
    push: (album) => {
        try {
            if (album instanceof Albums.Album) {
                if (!(album.id in this.items)) {
                    this.items[album.id] = album;
                }
                this.order.push(album.id);
            } else if (typeof(album) == 'object') {
                if ('album' in album) {
                    if (!(album.album.id in this.items)) {
                        this.items[album.album.id] = new Albums.Album(album.album);
                        if ('is_local' in album) {
                            this.items[album.album.id].is_local = album.is_local;
                        }
                        if ('added_at' in album) {
                            this.items[album.album.id].added_at = album.added_at;
                        }
                        if ('added_by' in album) {
                            this.items[album.album.id].added_by = album.added_by;
                        }
                    }
                    this.order.push(album.album.id);
                } else {
                    if (!(album.id in this.items)) {
                        this.items[album.id] = new Albums.Album(album);
                    }
                    this.order.push(album.id);
                }

            } else if (typeof(album) == 'string') {
                if (!(album in this.items)) {
                    this.items[album] = new Albums.Album(album);
                }
                this.order.push(album);
            } else {
                throw new Error("Albums.push: Invalid Parameter \"album\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param {Albums | array } albums Another Albums instance or array of Album instances, album objects, or album ids to concat.
     */
    concat: (albums) => {
        try {
            if (albums instanceof Albums) {
                for (let album in albums.items) {
                    if (!(album in this.items)) {
                        this.items[album] = albums.items[album];
                    }
                    this.order.push(albums.items[album].id);
                }
            } else if (albums instanceof Array) {
                for (let i = 0; i < albums.length; i++) {
                    this.push(albums[i]);
                }
            } else {
                throw new Error("Albums.concat: Invalid Parameter \"albums\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove
     * Removes an item from the Manager Object.
     * 
     * @param {Album | object | string } album Album instance, album data, or album id to remove.
     */
    remove: (album) => {
        try {
            let id = null;
            if (album instanceof Albums.Album || typeof(album) == 'object') {
                id = album.id;
            } else if (typeof(album) == 'string') {
                id = album;
            } else {
                throw new Error("Albums.remove: Invalid Parameter \"album\"");
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
     * @param {string | object | Album} album Album ID, Album instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: (album, startAt) => {
        try {
            let id = null;
            if (typeof(album) == 'string') {
                id = album;
            } else if (album instanceof Albums.Album || typeof(album) == 'object') {
                id = album.id;  
            } 
            if (album == null) {
                throw new Error("Albums.findIndex: Invalid Parameter \"album\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Albums.findIndex: Invalid Parameter \"startAt\"");
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
     * @param {string | object | Album} album Album ID, Album instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: (album) => {
        try {
            let id = null;
            if (typeof(album) == 'string') {
                id = album;
            } else if (album instanceof Albums.Album || typeof(album) == 'object') {
                id = album.id;  
            } 
            if (album == null) {
                throw new Error("Albums.includes: Invalid Parameter \"album\"");
            }
            for (let album in this.items) {
                if (album == id) {
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
     * Returns Album object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Albums} Filtered Albums object.
     */
    filter: async (method) => {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Albums.filter: \"method\" is not a function"); 
            }
            let newAlbums = new Albums();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newAlbums.push(this.items[this.order[i]]);
                }
            }
            return newAlbums;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns album object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Album} Album at a given index
     */
    get: (index) => {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Albums.get: Index out of range");
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
            return await this.order.map((id) => 'spotify:album' + id);
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
            return await uris.map((id) => 'spotify:album' + id);
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
                throw new Error("Albums.forEach: \"method\" is not a function"); 
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
     * @returns {Album} Removed item
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
     * @returns {Album} Removed item
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
     * @returns {Albums} Removed Albums.
     */
    slice: async (start, end) => {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Albums(await ids.map((id) => this.items[id]));
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
     * Sort Albums
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
            let fullObject = ['id', 'name', 'album_type', 'artists', 'available_markets', 'copyrights', 'external_ids', 'external_urls', 'genres', 'href', 'images', 'label', 'popularity', 'release_date', 'release_date_precision', 'restrictions', 'tracks', 'uri', '_tracks'];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else {
                for (let album in this.items) {
                    if (!(property in this.items[album])) {
                        throw new Error("Albums.sortSafe: Invalid Parameter \"property\", you have albums that don't contain that property.");
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
            return new Albums(ordered);
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
                throw new Error("Albums.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Plays Albums
     * Plays albums on user's active device.
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
     * Are Liked
     * Returns array of booleans whether albums are saved to the user's library.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Booleans Whether album are saved to the user's library.
     */
    areLiked: async (wrapper) => {
        try {
            let response = await wrapper.containsMySavedAlbums(this.order);
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
    * Like Albums
    * Adds albums to the user's library.
    * 
    * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
    */
    likeAll: async (wrapper) => {
        try {
            await wrapper.Constr.addToMySavedAlbums(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Album
    * Removes albums from the user's library.
    * 
    * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
    */
    unlikeAll: async (wrapper) => {
        try {
            await wrapper.removeFromMySavedAlbums(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full album data for all albums. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Album Full Objects.
     */
    getFullObjects: async (wrapper) => {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let albums = await this.order.map((album) => {
                return this.items[album]; 
            });
            return await Promise.all(await albums.map(async (album) => {
                return await album.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified album data for all albums. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Album Simplified Objects.
     */
    getSimplifiedObjects: async (wrapper) => {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let albums = await this.order.map((album) => {
                return this.items[album]; 
            });
            return await Promise.all(await albums.map(async (album) => {
                return await album.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Albums Current Data
     * Just returns whatever the album objects currently hold.
     * 
     * @returns {array} Array of Current Album Data
     */
    getCurrentData: async () => {
        try {
            let albums = await this.order.map((album) => {
                return this.items[album]; 
            });
            return await Promise.all(await albums.map(async (album) => {
                return await album.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Album's Artists
     * Returns Artists instance with all album's artists.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists object of all album's artists.
     */
    getArtists: async (wrapper) => {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let artists = new Albums.Artists();
            for (let album in this.items) {
                await artists.concat(await this.items[album].getArtists(wrapper));
            }
            return artists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Album's Tracks
     * Returns Tracks instance with all album's tracks.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks} Tracks object of all album's tracks.
     */
    getTracks: async (wrapper) => {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let tracks = new Albums.Tracks();
            for (let album in this.items) {
                await tracks.concat(await this.items[album].getTracks(wrapper));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full album data for all albums from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the album contains.
     */
    retrieveFullObjects: async (wrapper, objectType) => {
        try {
            let ids = [];
            for (let album in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[album].containsSimplifiedObject())) {
                        ids.push(album);
                    }
                } else {
                    if (!(await this.items[album].containsFullObject())) {
                        ids.push(album);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getAlbums(ids.splice(0, 50));
                    for (let i = 0; i < response.data.albums.length; i++) {
                        if (response.data.albums[i] == null) continue;
                        this.items[response.data.albums[i].id].loadFullObject(response.data.albums[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Search for an Album
 * Returns search results for a query.
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums returned from Search.
 */
Albums.search = async (wrapper, query, options) => {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Albums.search: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await wrapper.searchAlbums(query, _options);
        return new Albums(response.body.albums.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Saved Albums
 * Returns saved albums.
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums returned request.
 */
Albums.getMySavedAlbums = async (wrapper, options) => {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Albums.getMySavedAlbums: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await wrapper.getMySavedAlbums(_options);
        return new Albums(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All Saved Albums
 * Returns all saved albums.
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums returned request.
 */
Albums.getAllMySavedAlbums = async (wrapper) => {
    try {
        let _options = { limit: 50, offset: 0 };
        let albums = new Albums();
        let response;
        do {
            response = await wrapper.getMySavedAlbums(_options);
            await albums.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return albums;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Albums
 * Returns Albums object of IDs
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} albumIds Ids of albums.
 * @returns {Albums} Albums from ids.
 */
Albums.getAlbums = async (wrapper, albumIds) => {
    try {
        let albums = new Albums(albumIds);
        await albums.retrieveFullObjects(wrapper);
        return albums;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Artist's Albums
 * Returns Artist's Albums.
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} id ID for artist
 * @returns {Albums} Albums of all Artist's Albums.
 */
Albums.getArtistAlbums = async (wrapper, id) => {
    try {
        let artist = new Albums.Artist(id);
        return await artist.getAlbums(wrapper);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Albums
 * Returns Albums object with user saved albums.
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums of user saved albums.
 */
Albums.getNewReleases = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Albums.getNewReleases: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await wrapper.getNewReleases(_options);
        return new Albums(response.body.albums);
    } catch (error) {
        throw error;
    }
};

Albums.addMethods = addMethods;

Albums.override = override;

module.exports = Albums;