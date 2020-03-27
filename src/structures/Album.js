'use strict';

let Tracks = require('./Tracks');
let Artists = require('./Artists');
let Albums = require('./Albums');
var { addMethods, override } = require('./shared');

function Album(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Album.constructor: No ID Provided");
            }
            if ('tracks' in data) {
                if ('items' in data.tracks) {
                    this.addTracks(data.tracks.items);
                } else if (data.tracks instanceof Array) {
                    this.addTracks(data.tracks);
                }
            }
            this.name = 'name' in data ? data.name : null;
            this.album_type = 'album_type' in data ? data.album_type : null;
            this.artists = 'artists' in data ? data.artists : null;
            this.available_markets = 'available_markets' in data ? data.available_markets : null;
            this.copyrights = 'copyrights' in data ? data.copyrights : null;
            this.external_ids = 'external_ids' in data ? data.external_ids : null;
            this.external_urls = 'external_urls' in data ? data.external_urls : null;
            this.genres = 'genres' in data ? data.genres : null;
            this.href = 'href' in data ? data.href : null;
            this.images = 'images' in data ? data.images : null;
            this.label = 'label' in data ? data.label : null;
            this.popularity = 'popularity' in data ? data.popularity : null;
            this.release_date = 'release_date' in data ? data.release_date : null;
            this.release_date_precision = 'release_date_precision' in data ? data.release_date_precision : null;
            this.restrictions = 'restrictions' in data ? data.restrictions : null;
            this.tracks = 'tracks' in data ? data.tracks : null;
            this.uri = 'uri' in data ? data.uri : null;
            this.album_group = 'album_group' in data ? data.album_group : null;
            this._tracks = '_tracks' in data ? data._tracks : new Tracks();
        } else {
            throw new Error("Album.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Album.prototype = {
    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * 
     * @returns {boolean} Whether full object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null) && (this.album_type != null) && (this.artists != null) && (this.available_markets != null) && (this.copyrights != null) && (this.external_ids) && (this.external_urls) && (this.genres != null) && (this.href != null) && (this.images != null) && (this.label != null) && (this.popularity != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.restrictions) && (this.tracks != null) && (this.uri != null) );
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.album_type != null) && (this.artists != null) && (this.available_markets != null) && (this.external_urls) && (this.href != null) && (this.images != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.restrictions) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full album data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Album Full Object Data.
     */
    getFullObject: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(enhancedSpotifyAPI);
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
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Album Simplified Object Data.
     */
    getSimplifiedObject: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(enhancedSpotifyAPI);
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
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Any Album Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'album' };
            let properties = ["name", "album_type", "artists", "available_markets", "copyrights", "external_ids", "external_urls", "genres", "href", "images", "label", "popularity", "release_date", "release_date_precision", "restrictions", "tracks", "uri"];
            for (let i = 0; i < properties.length; i++) {
                if (this[properties[i]] != null) {
                    data[properties[i]] = this[properties[i]];
                }
            }
            if (this.tracksRetrieved) {
                data._tracks = this._tracks;
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * 
     * @param {object} data Object with album full object data.
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
                await this.addTracks(data.tracks.items);
            } else {
                await this.addTracks(data.tracks);
            }
            
        } catch (error) {
            throw error;
        }
    },


    /**
     * Retrieve Full Object
     * Retrieves full album data from Spotify API
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(enhancedSpotifyAPI) {
        try {
            let response = await enhancedSpotifyAPI.getArtist(this.id);
            this.name = response.body.name;
            this.album_type = response.body.album_type;
            this.artists = response.body.artists;
            this.available_markets = response.body.available_markets;
            this.copyrights = response.body.copyrights;
            this.external_ids = response.body.external_ids;
            this.external_urls = response.body.external_urls;
            this.genres = response.body.genres;
            this.href = response.body.href;
            this.images = response.body.images;
            this.label = response.body.label;
            this.popularity = response.body.popularity;
            this.release_date = response.body.release_date;
            this.release_date_precision = response.body.release_date_precision;
            this.restrictions = response.body.restrictions;
            this.tracks = response.body.tracks;
            await this.addTracks(response.body.tracks.items);
            this.uri = response.body.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Album Tracks
     * Retrieves all tracks in album from Spotify API
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    retrieveTracks: async function(enhancedSpotifyAPI) {
        try {
            this.tracksRetrieved = true;
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await enhancedSpotifyAPI.getAlbumTracks(this.id, options);
                await this.addTracks(response.body.items);
                options.offset += 50;
            } while (!(response.body.items.length < 50))
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play Album
     * Plays album on user's active device.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @param {number} offset Track to start on.
     * @param {number} position_ms Offset where to start track in milliseconds.
     */
    play: function(enhancedSpotifyAPI, offset, position_ms) {
        try {
            enhancedSpotifyAPI.play({ context_uri: 'spotify:album:' + this.id, position_ms: position_ms ? position_ms : 0 , offset: offset ? offset : 0 });
        } catch (error) {
            throw error;
        }
    },

    getArtists: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(enhancedSpotifyAPI);
            }
            return new Artists(this.artists);
        } catch (error) {
            throw error;
        }
    },

    getTracks: async function(enhancedSpotifyAPI) {
        try {
            if (this.tracksRetrieved == null) {
                await this.retrieveTracks(enhancedSpotifyAPI);
            }
            return this._tracks;
        } catch (error) {
            throw error;
        }
    },

    addTracks: async function(tracks) {
        try {
            if (tracks instanceof Array) {
                for (let i = 0; i < tracks.length; i++) {
                    this._tracks.add(tracks[i]);
                }
            } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                this._tracks.add(tracks);
            } else {
                throw new Error("Album.addTracks: Invalid Parameter \"tracks\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Liked
     * Returns whether an album is saved to the user's library.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether album is saved to the user's library.
     */
    isLiked: async function(enhancedSpotifyAPI) {
        try {
            let response = await enhancedSpotifyAPI.containsMySavedAlbums([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Like Album
     * Adds album to the user's library.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    like: async function(enhancedSpotifyAPI) {
        try {
            await enhancedSpotifyAPI.addToMySavedAlbums([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Album
    * Removes album from the user's library.
    * 
    * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
    */
    unlike: async function(enhancedSpotifyAPI) {
        try {
            await enhancedSpotifyAPI.removeFromMySavedAlbums([this.id]);
        } catch (error) {
            throw error;
        }
    },
}

Album.addMethods = function(methods) {
    for (var method in methods) {
      if (methods.hasOwnProperty(method)) {
        this.prototype[method] = methods[method];
      }
    }
};

Album.override = function(oldMethod, newMethod) {
    if (this.prototype.hasOwnProperty(oldMethod)) {
        this.prototype[oldMethod] = newMethod;
    }
};

Album.search = async function(enhancedSpotifyAPI, query, limit, offset) {
    try {
        let options = { 
            limit: limit ? limit : 20,
            offset: offset ? offset : 0,
        };
        let response = await enhancedSpotifyAPI.searchAlbums(query, options);
        return new Albums(response.body.albums.items);
    } catch (error) {
        throw error;
    }
};

module.exports = Album;