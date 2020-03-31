

function Playlists(playlists) {
    try {
        this.playlists = {};
        if (playlists) {
            if (playlists instanceof Array)  {
                for (let i = 0; i < playlists.length; i++) {
                    this.add(playlists[i]);
                }
            } else if (typeof(playlists) == 'string' || typeof(playlists) == 'object') {
                this.add(playlists);
            } else {
                throw new Error("Playlists.constructor: Invalid Parameter \"playlists\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Playlists.Playlist = require('./Playlist');

Playlists.prototype = {
    /**
     * Add
     * Adds new playlist to Playlists Object.
     * 
     * @param {Playlist | object | string } playlist Playlist Instance, playlist object or playlist id to add. 
     */
    add: function(playlist) {
        try {
            let index = Object.keys(this.playlists).length;
            if (playlist instanceof Playlists.Playlist) {
                if (playlist.id in this.playlists) {
                    return;
                }
                this.playlists[playlist.id] = playlist;
                this.playlists[playlist.id].index = index;
            } else if (typeof(playlist) == 'object') {
                if (playlist.id in this.playlists) {
                    return;
                }
                this.playlists[playlist.id] = new Playlists.Playlist(playlist);
                this.playlists[playlist.id].index = index;
            } else if (typeof(playlist) == 'string') {
                if (playlist in this.playlists) {
                    return;
                }
                this.playlists[playlist] = new Playlists.Playlist(playlist);
                this.playlists[playlist].index = index;
            } else {
                throw new Error("Playlists.add: Invalid Parameter \"playlist\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new playlists to Playlists Object.
     * 
     * @param {Playlists | array } playlists Another Playlists instance or array of Playlist instances, playlist objects, or playlist ids to concat.
     */
    concat: function(playlists) {
        try {
            if (playlists instanceof Playlists) {
                for (let track in playlists.playlists) {
                    if (track in this.playlists) {
                        return;
                    }
                    let index = Object.keys(this.playlists).length;
                    this.playlists[track] = playlists.playlists[track];
                    this.playlists[track.id].index = index;
                }
            } else if (playlists instanceof Array) {
                for (let i = 0; i < playlists.length; i++) {
                    this.add(playlists[i]);
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
     * Removes an Playlist object from the Playlists instance.
     * 
     * @param {Playlist | array } album Playlist instance, playlist data, or playlist id to remove.
     */
    remove: function(playlist) {
        try {
            if (playlist instanceof Playlists.Playlist || typeof(playlist) == 'object') {
                if (!(playlist.id in this.playlists)) {
                    throw new Error("Playlists.remove: No ID Provided");
                }
                delete this.playlists[playlist.id];
            } else if (typeof(playlist) == 'string') {
                if (playlist in this.playlists) {
                    delete this.playlists[playlist];
                }
            } else {
                throw new Error("Playlists.remove: Invalid Parameter \"playlist\"");
            }
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
    size: function() {
        try {
            return Object.keys(this.albums).length;
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
 * @param {number} limit Number of tracks to return.
 * @param {number} offset Place in the list to start at.
 * @returns {Tracks} Tracks returned from Search.
 */
Playlists.search = async function(wrapper, query, limit, offset) {
    try {
        let options = { 
            limit: limit ? limit : 20,
            offset: offset ? offset : 0,
        };
        let response = await wrapper.searchPlaylists(query, options);
        return new Playlists(response.body.artists.items);
    } catch (error) {
        throw error;
    }
};

module.exports = Playlists;

