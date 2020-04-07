'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Album Constructor
 * Creates a new Album Instance for a given album.
 * @param {Object | String} data Data to be preloaded. Must either be a string of the album ID or contain an `id` property.
 */
function Album(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
            this._tracks = new Models.Tracks();
        } else if (typeof(data) == 'object') {
            if (data.hasOwnProperty('id')) {
                this.id = data.id; 
            } else {
                throw new Error("Album.constructor: No ID Provided");
            }
            this._tracks = '_tracks' in data ? data._tracks : new Models.Tracks();
            this.loadConditionally(data);
        } else {
            throw new Error("Album.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Album.prototype = {
    /**
     * Play Album
     * Plays album on user's active device.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response from request.
     * options.offset: {Object} Where from the context to play (Only valid with albums and playlists).
     * options.offset.position: {Number} Index of item to start with in context.
     * options.offset.uri: {String} URI of item to start with in context.
     * options.position_ms: {Number} Millisecond to start with in track.
     */
    play: async function(wrapper, options) {
        try {
            let _options = options ? options : {};
            _options.context_uri = 'spotify:album:' + this.id;
            return await wrapper.play(_options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Liked
     * Returns whether an album is saved to the user's library.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Boolean} Whether album is saved to the user's library.
     */
    isLiked: async function(wrapper) {
        try {
            let response = await wrapper.containsMySavedAlbums([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Like Album
     * Adds album to the user's library.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Object} Response from request.
     */
    like: async function(wrapper) {
        try {
            return await wrapper.addToMySavedAlbums([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Album
    * Removes album from the user's library.
    * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
    * @returns {Object} Response from request.
    */
    unlike: async function(wrapper) {
        try {
            return await wrapper.removeFromMySavedAlbums([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * @returns {Boolean} Whether full object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null) && (this.album_type != null) && (this.artists != null) && (this.available_markets != null) && (this.copyrights != null) && (this.external_ids) && (this.external_urls) && (this.genres != null) && (this.href != null) && (this.images != null) && (this.label != null) && (this.popularity != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.restrictions) && (this.tracks != null) && (this.uri != null) );
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * @returns {Boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.album_type != null) && (this.artists != null) && (this.available_markets != null) && (this.external_urls) && (this.href != null) && (this.images != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.restrictions) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full album data. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Object} Album Full Object Data.
     */
    getFullObject: async function(wrapper) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                album_type: this.album_type,
                artists: this.artists,
                available_markets: this.available_markets,
                copyrights: this.copyrights,
                external_ids: this.external_ids,
                external_urls: this.external_urls,
                genres: this.genres,
                href: this.href,
                images: this.images,
                label: this.label,
                popularity: this.popularity,
                release_date: this.release_date,
                release_date_precision: this.release_date_precision,
                restrictions: this.restrictions,
                tracks: this.tracks,
                uri: this.uri,
                type: 'album',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified album data. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Object} Album Simplified Object Data.
     */
    getSimplifiedObject: async function(wrapper) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
            }
            let data = {
                id: this.id,
                name: this.name,
                album_type: this.album_type,
                artists: this.artists,
                available_markets: this.available_markets,
                external_urls: this.external_urls,
                href: this.href,
                images: this.images,
                release_date: this.release_date,
                release_date_precision: this.release_date_precision,
                restrictions: this.restrictions,
                uri: this.uri,
                type: 'album',
            };
            if (this.album_group != null) {
                data.album_group = this.album_group;
            }
            return data; 
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the album object currently holds
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Object} Any Album Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'album' };
            let properties = ['name', 'album_type', 'artists', 'available_markets', 'copyrights', 'external_ids', 'external_urls', 'genres', 'href', 'images', 'label', 'popularity', 'release_date', 'release_date_precision', 'restrictions', 'tracks', 'uri', '_tracks'];
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
     * Get Album Tracks
     * Returns Tracks object of album tracks.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Tracks} Tracks instance with all album tracks.
     */
    getTracks: async function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            return this._tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Album Artists
     * Returns Artists object of album artists.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Artists} Artists instance with all album artists.
     */
    getArtists: async function(wrapper) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return new Models.Artists(this.artists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full album data from Spotify API
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    retrieveFullObject: async function(wrapper) {
        try {
            let response = await wrapper.getAlbum(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Album Tracks
     * Retrieves all tracks in album from Spotify API
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    retrieveTracks: async function(wrapper) {
        try {
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await wrapper.getAlbumTracks(this.id, options);
                await this.loadTracks(response.body.items);
                options.offset += 50;
            } while (!(response.body.items.length < 50))
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * @param {Object} data Object with album full object data.
     */
    loadFullObject: async function(data) {
        try {
            this.name = data.name;
            this.album_type = data.album_type;
            this.artists = data.artists;
            this.available_markets = data.available_markets;
            this.copyrights = data.copyrights;
            this.external_ids = data.external_ids;
            this.external_urls = data.external_urls;
            this.genres = data.genres;
            this.href = data.href;
            this.images = data.images;
            this.label = data.label;
            this.popularity = data.popularity;
            this.release_date = data.release_date;
            this.release_date_precision = data.release_date_precision;
            this.restrictions = data.restrictions;
            this.uri = data.uri;
            this.tracks = data.tracks;
            if ('items' in data.tracks) {
                await this.loadTracks(data.tracks.items);
            } else {
                await this.loadTracks(data.tracks);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Simplified Object
     * Sets simplified data (outside constructor).
     * @param {Object} data Object with album simplified object data.
     */
    loadSimplifiedObject: async function(data) {
        try {
            this.id = data.id;
            this.name = data.name;
            this.album_type = data.album_type;
            this.artists = data.artists;
            this.available_markets = data.available_markets;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.images = data.images;
            this.release_date = data.release_date;
            this.release_date_precision = data.release_date_precision;
            this.restrictions = data.restrictions;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Conditionally
     * Sets all data conditionally.
     * @param {Object} data Object with album data.
     */
    loadConditionally: function(data) {
        try {
            let properties = ['name', 'album_type', 'artists', 'available_markets', 'copyrights', 'external_ids', 'external_urls', 'genres', 'href', 'images', 'label', 'popularity', 'release_date', 'release_date_precision', 'restrictions', 'tracks', 'uri', 'album_group'];
            for (let i = 0; i < properties.length; i++) {
                if (data.hasOwnProperty(properties[i])) {
                    this[properties[i]] = data[properties[i]];
                }
            }
            if ('tracks' in data) {
                if ('items' in data.tracks) {
                    this.loadTracks(data.tracks.items);
                } else if (data.tracks instanceof Array) {
                    this.loadTracks(data.tracks);
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Track
     * Helper method to add tracks to album's internal Tracks item.
     * @param {Tracks | Array | Track | object | string} tracks 
     */
    loadTracks: async function(tracks) {
        try {
            if (tracks instanceof Models.Tracks || tracks instanceof Array) {
                this._tracks.concat(tracks);
            } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                this._tracks.add(tracks);
            } else {
                throw new Error("Album.loadTracks: Invalid Parameter \"tracks\"");
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Album
 * Returns Album object of ID
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {String} albumId Id of album.
 * @param {Object} options (Optional) Additional options.
 * @returns {Album} Album from id.
 * options.market: {String} Country code.
 */
Album.getAlbum = async function(wrapper, albumId, options) {
    try {
        let response = await wrapper.getAlbum(albumId, options ? options : {});
        return new Album(response.body);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Album.addMethods = function(methods) {
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
Album.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Album.override: \"name\" does not exist.");
    }
}

module.exports = Album;