

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
            if (playlist instanceof Playlist) {
                if (playlist.id in this.playlists) {
                    return;
                }
                this.playlists[playlist.id] = playlist;
                this.playlists[playlist.id].index = index;
            } else if (typeof(playlist) == 'object') {
                if (playlist.id in this.playlists) {
                    return;
                }
                this.playlists[playlist.id] = new Playlist(playlist);
                this.playlists[playlist.id].index = index;
            } else if (typeof(playlist) == 'string') {
                if (playlist in this.playlists) {
                    return;
                }
                this.playlists[playlist] = new Playlist(playlist);
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

};

/**
 * Search for a Playlist
 * Returns search results for a query.
 * 
 * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {number} limit Number of tracks to return.
 * @param {number} offset Place in the list to start at.
 * @returns {Tracks} Tracks returned from Search.
 */
Playlists.search = async function(enhancedSpotifyAPI, query, limit, offset) {
    try {
        let options = { 
            limit: limit ? limit : 20,
            offset: offset ? offset : 0,
        };
        let response = await enhancedSpotifyAPI.searchPlaylists(query, options);
        return new Playlists(response.body.artists.items);
    } catch (error) {
        throw error;
    }
};

module.exports = Playlists;

