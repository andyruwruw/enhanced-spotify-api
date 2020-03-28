'use strict';

var Artist = require('./Artist');
var { addMethods, override } = require('./shared');

function Artists(artists) {
    try {
        this.artists = {};
        if (artists) {
            if (artists instanceof Array)  {
                for (let i = 0; i < artists.length; i++) {
                    this.add(artists[i]);
                }
            } else if (typeof(artists) == 'string' || typeof(artists) == 'object') {
                this.add(artists);
            } else {
                throw new Error("Artists.constructor: Invalid Parameter \"artists\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Artists.prototype = {
    /**
     * Add
     * Adds new artist to Artists Object.
     * 
     * @param {Artists | object | string } artist Artist Instance, artist object or artist id to add. 
     */
    add: function(artist) {
        try {
            let index = Object.keys(this.tracks).length;
            if (artist instanceof Artist) {
                if (artist.id in this.artists) {
                    return;
                }
                this.artists[artist.id] = artist
                this.artists[artist.id].index = index;
            } else if (typeof(artist) == 'object') {
                if (artist.id in this.artists) {
                    return;
                }
                this.artists[artist.id] = new Artist(artist);
                this.artists[artist.id].index = index;
            } else if (typeof(artist) == 'string') {
                if (artist in this.artists) {
                    return;
                }
                this.artists[artist] = new Artist(artist);
                this.artists[artist].index = index;
            } else {
                throw new Error("Artists.add: Invalid Parameter \"artist\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new artists to Artists Object.
     * 
     * @param {Artists | array } artists Another Artists instance or array of Artist instances, artist objects, or artist ids to concat.
     */
    concat: function(artists) {
        if (artists instanceof Artists) {
            for (let artist in artists.artists) {
                if (artist in this.artists) {
                    return;
                }
                let index = Object.keys(this.artists).length;
                this.artists[artist] = artists.artists[artist];
                this.artists[artist].index = index;
            }
        } else if (artists instanceof Array) {
            for (let i = 0; i < artists.length; i++) {
                this.add(artists[i]);
            }
        } else {
            throw new Error("Artists.concat: Invalid Parameter \"artists\"");
        }
    },

    /**
     * Remove
     * Removes an Artist object from the Artists instance.
     * 
     * @param {Artists | array } artist Artist instance, artist data, or artist id to remove.
     */
    remove: function(artist) {
        try {
            if (artist instanceof Artist || typeof(artist) == 'object') {
                if (!(id in this.artists)) {
                    throw new Error("Artists: No ID Provided");
                }
                delete this.artists[artist.id];
            } else if (typeof(artist) == 'string') {
                if (artist in this.artists) {
                    delete this.artists[artist];
                }
            } else {
                throw new Error("Artists.remove: Invalid Parameter \"artist\"");
            }

        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full artist data for all artists. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Artist Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let artists = await Object.values(this.artists).sort((a, b) => {
                return a.index - b.index;
            });
            return await Promise.all(await artists.map(async (artist) => {
                return await artist.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified artist data for all artists. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Artist Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let artists = await Object.values(this.artists).sort((a, b) => {
                return a.index - b.index;
            });
            return await Promise.all(await artists.map(async (artist) => {
                return await artist.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artists Current Data
     * Just returns whatever the artist objects currently hold.
     * 
     * @returns {array} Array of Current Artist Data
     */
    getCurrentData: async function() {
        try {
            let artists = await Object.values(this.artists).sort((a, b) => {
                return a.index - b.index;
            });
            return await Promise.all(await artists.map(async (artist) => {
                return await artist.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full artist data for all artists from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the artist contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            let ids = [];
            for (let artist in this.artists) {
                if (objectType == 'simplified') {
                    if (!(await this.artists[artist].containsSimplifiedObject())) {
                        ids.push(artist);
                    }
                } else {
                    if (!(await this.artists[artist].containsFullObject())) {
                        ids.push(artist);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getArtists(ids.splice(0, 50));
                    for (let i = 0; i < response.data.artists.length; i++) {
                        if (response.data.artists[i] == null) continue;
                        this.artists[response.data.artists[i].id].loadFullObject(response.data.artists[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Followed
     * Returns array of booleans whether artists are followed by the user.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Booleans Whether artists are followed by the user.
     */
    areFollowed: async function(wrapper) {
        try {
            let response = await wrapper.isFollowingArtists(Object.keys(this.artists));
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Artists
     * Follows artists.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    follow: async function(wrapper) {
        try {
            await wrapper.followArtists(Object.keys(this.artists));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Artists
     * Unfollows artists.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    unfollow: async function(wrapper) {
        try {
            await wrapper.unfollowArtists(Object.keys(this.artists));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Top Tracks
     * Returns Tracks instance with all artist's tracks.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks}  Tracks object of all artist's tracks.
     */
    getTopTracks: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper);
            let tracks = new Tracks();
            for (let artist in this.artists) {
                await tracks.concat(await this.artists[artist].getTracks(getTopTracks));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artists's Albums
     * Returns Albums instance with all artists's albums.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums}  Albums object of all artist's albums.
     */
    getAlbums: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper);
            let albums = new Albums();
            for (let artist in this.artists) {
                await albums.concat(await this.artists[artist].getAlbums(wrapper));
            }
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
            if (id in this.artists) {
                this.artists[id][field] = value;
            } else {
                throw new Error("Artists.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },
}

/**
 * Search for an Artist
 * Returns search results for a query.
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {number} limit Number of artists to return.
 * @param {number} offset Place in the list to start at.
 * @returns {Artists} Artists returned from Search.
 */
Artists.search = async function(wrapper, query, limit, offset) {
    try {
        let options = { 
            limit: limit ? limit : 20,
            offset: offset ? offset : 0,
        };
        let response = await wrapper.searchArtists(query, options);
        return new Artists(response.body.artists.items);
    } catch (error) {
        throw error;
    }
};

Artists.addMethods = addMethods;

Artists.override = override;

module.exports = Artists;