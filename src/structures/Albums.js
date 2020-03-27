'use strict';

var Album = require('./Album');
var Tracks = require('./Tracks');
var Artists = require('./Artists');
var { addMethods, override } = require('./shared');

function Albums(albums) {
    try {
        this.albums = {};
        if (albums) {
            if (albums instanceof Array)  {
                for (let i = 0; i < albums.length; i++) {
                    this.add(albums[i]);
                }
            } else if (typeof(albums) == 'string' || typeof(albums) == 'object') {
                this.add(albums);
            } else {
                throw new Error("Albums.constructor: Invalid Parameter \"albums\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Albums.prototype = {
    /**
     * Add
     * Adds new album to Albums Object.
     * 
     * @param {Album | object | string } album Album Instance, album object or album id to add. 
     */
    add: function(album) {
        try {
            let index = Object.keys(this.albums).length;
            if (album instanceof Album) {
                if (album.id in this.albums) {
                    return;
                }
                this.albums[album.id] = album;
                this.albums[album.id].index = index;
            } else if (typeof(album) == 'object') {
                if (album.id in this.albums) {
                    return;
                }
                this.albums[album.id] = new Album(album);
                this.albums[album.id].index = index;
            } else if (typeof(album) == 'string') {
                if (album in this.albums) {
                    return;
                }
                this.albums[album] = new Album(album);
                this.albums[album].index = index;
            } else {
                throw new Error("Albums.add: Invalid Parameter \"album\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new albums to Albums Object.
     * 
     * @param {Albums | array } albums Another Albums instance or array of Album instances, album objects, or album ids to concat.
     */
    concat: function(albums) {
        try {
            if (albums instanceof Albums) {
                for (let track in albums.albums) {
                    if (track in this.albums) {
                        return;
                    }
                    let index = Object.keys(this.albums).length;
                    this.albums[track] = albums.albums[track];
                    this.albums[track.id].index = index;
                }
            } else if (albums instanceof Array) {
                for (let i = 0; i < albums.length; i++) {
                    this.add(albums[i]);
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
     * Removes an Album object from the Albums instance.
     * 
     * @param {Album | array } album Album instance, album data, or album id to remove.
     */
    remove: function(album) {
        try {
            if (album instanceof Album || typeof(album) == 'object') {
                if (!(album.id in this.albums)) {
                    throw new Error("Albums.remove: No ID Provided");
                }
                delete this.albums[album.id];
            } else if (typeof(album) == 'string') {
                if (album in this.albums) {
                    delete this.albums[album];
                }
            } else {
                throw new Error("Albums.remove: Invalid Parameter \"album\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full album data for all albums. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Album Full Objects.
     */
    getFullObjects: async function(enhancedSpotifyAPI) {
        try {
            await this.retrieveFullObjects(enhancedSpotifyAPI, 'full');
            let albums = await Object.values(this.albums).sort((a, b) => {
                return a.index - b.index;
            });
            return await Promise.all(await albums.map(async (album) => {
                return await album.getFullObject(enhancedSpotifyAPI);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified album data for all albums. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Album Simplified Objects.
     */
    getSimplifiedObjects: async function(enhancedSpotifyAPI) {
        try {
            await this.retrieveFullObjects(enhancedSpotifyAPI, 'simplified');
            let albums = await Object.values(this.albums).sort((a, b) => {
                return a.index - b.index;
            });
            return await Promise.all(await albums.map(async (album) => {
                return await album.getSimplifiedObject(enhancedSpotifyAPI);
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
    getCurrentData: async function() {
        try {
            let albums = await Object.values(this.albums).sort((a, b) => {
                return a.index - b.index;
            });
            return await Promise.all(await albums.map(async (album) => {
                return await album.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full album data for all albums from Spotify API
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the album contains.
     */
    retrieveFullObjects: async function(enhancedSpotifyAPI, objectType) {
        try {
            let ids = [];
            for (let album in this.albums) {
                if (objectType == 'simplified') {
                    if (!(await this.albums[album].containsSimplifiedObject())) {
                        ids.push(album);
                    }
                } else {
                    if (!(await this.albums[album].containsFullObject())) {
                        ids.push(album);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await enhancedSpotifyAPI.getAlbums(ids.splice(0, 50));
                    for (let i = 0; i < response.data.albums.length; i++) {
                        if (response.data.albums[i] == null) continue;
                        this.albums[response.data.albums[i].id].loadFullObject(response.data.albums[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Liked
     * Returns array of booleans whether albums are saved to the user's library.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {boolean} Array of Booleans Whether albums are saved to the user's library.
     */
    areLiked: async function(enhancedSpotifyAPI) {
        try {
            let response = await enhancedSpotifyAPI.containsMySavedAlbums(Object.keys(this.albums));
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Like Album
     * Adds albums to the user's library.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    like: async function(enhancedSpotifyAPI) {
        try {
            await enhancedSpotifyAPI.addToMySavedAlbums(Object.keys(this.albums));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Album
    * Removes albums from the user's library.
    * 
    * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
    */
    unlike: async function(enhancedSpotifyAPI) {
        try {
            await enhancedSpotifyAPI.removeFromMySavedAlbums(Object.keys(this.albums));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Album's Artists
     * Returns Artists instance with all album's artists.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {Artists}  Artists object of all album artists.
     */
    getArtists: async function(enhancedSpotifyAPI) {
        try {
            await this.retrieveFullObjects(enhancedSpotifyAPI);
            let artists = new Artists();
            for (let album in this.albums) {
                await artists.concat(await this.albums[album].getArtists(enhancedSpotifyAPI));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Album's Tracks
     * Returns Tracks instance with all album's tracks.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {Tracks}  Tracks object of all album tracks.
     */
    getTracks: async function(enhancedSpotifyAPI) {
        try {
            await this.retrieveFullObjects(enhancedSpotifyAPI);
            let tracks = new Tracks();
            for (let album in this.albums) {
                await tracks.concat(await this.albums[album].getTracks(enhancedSpotifyAPI));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play Album
     * Plays artist on user's active device.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @param {number} albumOffset Album to start on.
     * @param {number} offset Track to start on.
     * @param {number} position_ms Offset where to start track in milliseconds.
     */
    play: async function(enhancedSpotifyAPI, albumOffset, offset, position_ms) {
        try {
            let albums = await Object.values(this.albums).sort((a, b) => {
                return a.index - b.index;
            });
            let id = albums[(typeof(albumOffset) == 'number') ? albumOffset : 0].id;
            enhancedSpotifyAPI.play({ context_uri: 'spotify:album:' + id, position_ms: position_ms ? position_ms : 0 , offset: offset ? offset : 0 });
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
    setProperty: function(id, field, value) {
        try {
            if (id in this.albums) {
                this.albums[id][field] = value;
            } else {
                throw new Error("Albums.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },
};

Albums.addMethods = function(methods) {
    for (var method in methods) {
      if (methods.hasOwnProperty(method)) {
        this.prototype[method] = methods[method];
      }
    }
};

Albums.override = function(oldMethod, newMethod) {
    if (this.prototype.hasOwnProperty(oldMethod)) {
        this.prototype[oldMethod] = newMethod;
    }
};

Albums.search = async function(enhancedSpotifyAPI, query, limit, offset) {
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

module.exports = Albums;