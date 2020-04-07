'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Albums Manager Instance.
 * @param {Array | Album | object | string} data (optional) Data to be preloaded. Single or multiple albums.
 */
function Albums() {
    this.name = 'Albums';
    this.type = 'Album';
    this.uri_type = 'album';
    Models.Manager.call(this, items);
}

Albums.prototype = {
    ...Models.Manager.prototype,

    /**
     * Plays Albums
     * Plays albums on user's active device.
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
     * Are Liked
     * Returns array of booleans whether albums are saved to the user's library.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Booleans Whether album are saved to the user's library.
     */
    areLiked: async function(wrapper) {
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
    * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
    */
    likeAll: async function(wrapper) {
        try {
            await wrapper.Constr.addToMySavedAlbums(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Album
    * Removes albums from the user's library.
    * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
    */
    unlikeAll: async function(wrapper) {
        try {
            await wrapper.removeFromMySavedAlbums(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full album data for all albums. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Album Full Objects.
     */
    getFullObjects: async function(wrapper) {
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
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {array} Array of Album Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
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
     * @returns {array} Array of Current Album Data
     */
    getCurrentData: async function() {
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
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Artists} Artists object of all album's artists.
     */
    getArtists: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let artists = new Artists();
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
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Tracks} Tracks object of all album's tracks.
     */
    getTracks: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let tracks = new Tracks();
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
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the album contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
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
    }
}

/**
 * Search for an Album
 * Returns search results for a query.
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums returned from Search.
 */
Albums.search = async function(wrapper, query, options) {
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
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums returned request.
 */
Albums.getMySavedAlbums = async function(wrapper, options) {
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
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums returned request.
 */
Albums.getAllMySavedAlbums = async function(wrapper) {
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
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Array} albumIds Ids of albums.
 * @returns {Albums} Albums from ids.
 */
Albums.getAlbums = async function(wrapper, albumIds) {
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
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} id ID for artist
 * @returns {Albums} Albums of all Artist's Albums.
 */
Albums.getArtistAlbums = async function(wrapper, id) {
    try {
        let artist = new Artist(id);
        return await artist.getAlbums(wrapper);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Albums
 * Returns Albums object with user saved albums.
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
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

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Albums.addMethods = function(methods) {
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
Albums.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Albums.override: \"name\" does not exist.");
    }
}

module.exports = Albums;