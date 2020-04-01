'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Playlist Constructor
 * Creates a new Playlist Instance for a given playlist or new playlist.
 * 
 * @param {object | string} data Data to be preloaded. Should either be a string of the track ID or contain an `id` property if playlist exists.
 */
function Playlist(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
            this._tracks = new Album.Tracks();
        } else if (typeof(data) == 'object') {
            this.id = 'id' in data ? data.id : null;
            this.name = 'name' in data ? data.name : null;
            this.collaborative = 'collaborative' in data ? data.collaborative : null;
            this.description = 'name' in description ? data.description : null;
            this.external_urls = 'external_urls' in data ? data.external_urls : null;
            this.followers = 'followers' in data ? data.followers : null;
            this.href = 'href' in data ? data.href : null;
            this.images = 'images' in data ? data.images : null;
            this.owner = 'owner' in data ? data.owner : null;
            this.public = 'public' in data ? data.public : null;
            this.snapshot_id = 'snapshot_id' in data ? data.snapshot_id : null;
            this.tracks = 'tracks' in data ? data.tracks : null;
            this.uri = 'uri' in data ? data.uri : null;
            this._tracks = '_tracks' in data ? data._tracks : new Playlist.Tracks();
            if ('tracks' in data) {
                if ('items' in data.tracks) {
                    this.loadTracks(data.tracks.items);
                } else if (data.tracks instanceof Array) {
                    this.loadTracks(data.tracks);
                }
            }
        } else if (data instanceof Playlist.Tracks()) {
            this._tracks = data;
        } else {
            this._tracks = new Playlist.Tracks();
        }
    } catch (error) {
        throw error;
    }
}

Playlist.Tracks = require('./Tracks');
Playlist.Artists = require('./Artists');
Playlist.Albums = require('./Albums');
Playlist.Playlists = require('./Playlists');

Playlist.prototype = {
    /**
     * Play Playlist
     * Plays playlist on user's active device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    play: async (wrapper, options) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.play: Playlist ID not set. Either not created or not provided");
            }
            let _options = options ? options : {};
            _options.context_uri = 'spotify:playlist:' + this.id;
            return await wrapper.play(_options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Followed
     * Returns whether an playlist is followed by the user.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether playlist is followed by user.
     */
    isFollowed: async (wrapper) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.isFollowed: Playlist ID not set. Either not created or not provided");
            }
            let userID = await (await wrapper.getMe()).body.id;
            let response = await wrapper.areFollowingPlaylist([this.id], [userID]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Followed
     * Returns whether an playlist is followed by a set of users.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {array} userIds User IDs to check if they're following
     * @returns {boolean} Whether playlist is followed by a set of users.
     */
    areFollowing: async (wrapper, userIds) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.areFollowing: Playlist ID not set. Either not created or not provided");
            }
            let response = await wrapper.areFollowingPlaylist([this.id], userIds);
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Playlist
     * Follows playlist.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    follow: async (wrapper) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.follow: Playlist ID not set. Either not created or not provided");
            }
            return await wrapper.followPlaylist([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Playlist
     * Unfollows playlist.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    unfollow: async (wrapper) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.unfollow: Playlist ID not set. Either not created or not provided");
            }
            return await wrapper.unfollowPlaylist([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * 
     * @returns {boolean} Whether full object is loaded.
     */
    containsFullObject: () => {
        return ((this.name != null) && (this.collaborative != null) && (this.description != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.owner) && (this.public != null) && (this.snapshot_id != null) && (this.tracks != null) && (this.uri != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: () => {
        return ((this.name != null) && (this.collaborative != null) && (this.description != null) && (this.external_urls) && (this.href != null) && (this.images != null) && (this.owner) && (this.public != null) && (this.snapshot_id != null) && (this.tracks != null) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full playlist data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Playlist Full Object Data.
     */
    getFullObject: async (wrapper) => {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                collaborative: this.collaborative,
                description: this.description,
                external_urls: this.external_urls,
                followers: this.followers,
                href: this.href,
                images: this.images,
                name: this.name,
                owner: this.owner,
                public: this.public,
                snapshot_id: this.snapshot_id,
                tracks: this.tracks,
                uri: this.uri,
                type: 'playlist',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified playlist data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Playlist Simplified Object Data.
     */
    getSimplifiedObject: async (wrapper) => {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
            }
            let data = {
                id: this.id,
                collaborative: this.collaborative,
                description: this.description,
                external_urls: this.external_urls,
                href: this.href,
                images: this.images,
                name: this.name,
                owner: this.owner,
                public: this.public,
                snapshot_id: this.snapshot_id,
                tracks: this.tracks,
                uri: this.uri,
                type: 'playlist',
            };
            return data; 
        } catch (error) {
            throw error;
        }
    },

     /**
     * Get Current Data
     * Just returns whatever the playlist object currently holds
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any Playlist Data.
     */
    getCurrentData: () => {
        try {
            let data = { id: this.id, type: 'playlist' };
            let properties = ['collaborative', 'description', 'external_urls', 'followers', 'href', 'images', 'name', 'owner', 'public', 'snapshot_id', 'tracks', 'uri', '_tracks'];
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
     * Get Playlist Tracks
     * Returns Tracks object with all playlist tracks. Retrieves if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks} Tracks instance with all playlist tracks.
     */
    getTracks: async (wrapper) => {
        try {
            if (this.id != null) {
                await this.retrieveTracks(wrapper);
            }
            return await this._tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Playlist Artists
     * Returns Artists object with all playlist artists. Retrieves if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists instance with all playlist artists.
     */
    getArtists: async (wrapper) => {
        try {
            if (this.id != null) {
                await this.retrieveTracks(wrapper);
            }
            return await this._tracks.getArtists(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Playlist Albums
     * Returns Albums object with all playlist albums. Retrieves if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums} Albums instance with all playlist albums.
     */
    getAlbums: async (wrapper) => {
        try {
            if (this.id != null) {
                await this.retrieveTracks(wrapper);
            }
            return await this._tracks.getAlbums(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Change Playlist Details
     * Changes an existing playlists base details.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    changeDetails: async (wrapper, options) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.changeDetails: Playlist ID not set. Either not created or not provided");
            }
            let _options = {
                name: 'name' in options ? options.name : this.name,
                public: 'public' in options ? options.public : this.public,
                collaborative: 'collaborative' in options ? options.collaborative : this.collaborative,
                description: 'description' in options ? options.description : this.description,
            }
            await wrapper.changePlaylistDetails(this.id, _options);
            this.name = 'name' in options ? options.name : this.name;
            this.public = 'public' in options ? options.public : this.public;
            this.collaborative = 'collaborative' in options ? options.collaborative : this.collaborative;
            this.description = 'description' in options ? options.description : this.description;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Add tracks
     * Adds new tracks to a playlist.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array | string | Track | object} tracks Tracks to be added
     * @param {object} options (Optional) Additional options.
     */
    addTracks: async (wrapper, tracks, options) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.addTracks: Playlist ID not set. Either not created or not provided");
            }
            let tracksClass = new Playlist.Tracks(tracks);
            let response = await wrapper.addTracksToPlaylist(this.id, await tracksClass.getURIs(), options ? options : {});
            this.snapshot_id = response.body.snapshot_id;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove tracks
     * Removes tracks from a playlist.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array | string | Track | object} tracks Tracks to be added
     */
    removeTracks: async (wrapper, tracks) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.removeTracks: Playlist ID not set. Either not created or not provided");
            }
            let tracksClass = new Playlist.Tracks(tracks);
            let response = await wrapper.removeTracksFromPlaylistWithSnapshotId(this.id, await tracksClass.getURIs(), this.snapshot_id);
            this.snapshot_id = response.body.snapshot_id;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove tracks by index
     * Removes tracks by index from a playlist.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array} positions Indexes to be removed
     */
    removeTrackIndexes: async (wrapper, positions) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.removeTrackIndexes: Playlist ID not set. Either not created or not provided");
            }
            let response = await wrapper.removeTracksFromPlaylistInPositions(this.id, positions, this.snapshot_id);
            this.snapshot_id = response.body.snapshot_id;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Upload Custom Image
     * Updates playlist custom cover image.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} imageData New image. Base64 encoded JPEG image data, maximum payload size is 256 KB.
     */
    uploadCustomPlaylistCoverImage: async (wrapper, imageData) => {
        try {
            await wrapper.uploadCustomPlaylistCoverImage(this.id, imageData);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Replace tracks
     * Repleaces tracks in a playlist.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array | string | Track | object} tracks Tracks to be added
     */
    replaceTracks: async (wrapper, tracks) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.replaceTracks: Playlist ID not set. Either not created or not provided");
            }
            let tracksClass = new Playlist.Tracks(tracks);
            let response = await wrapper.replaceTracksInPlaylist(this.id, await tracksClass.getURIs());
            this.snapshot_id = response.body.snapshot_id;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Replace tracks
     * Replaces tracks in a playlist.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} range_start Where to select
     * @param {number} insert_before Where to place
     * @param {object} options (Optional) Additional options.
     */
    reorderTracks: async (wrapper, range_start, insert_before, options) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.reorderTracks: Playlist ID not set. Either not created or not provided");
            }
            let response = await wrapper.reorderTracksInPlaylist(this.id, range_start, insert_before, options ? options : {});
            this.snapshot_id = response.body.snapshot_id;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full playlist data from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async (wrapper) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.retrieveFullObject: Playlist ID not set. Either not created or not provided");
            }
            let response = await wrapper.getPlaylist(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Playlist Tracks
     * Retrieves all tracks in playlist from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveTracks: async (wrapper) => {
        try {
            if (this.id == null) {
                throw new Error("Playlist.retrieveTracks: Playlist ID not set. Either not created or not provided");
            }
            this._tracks = new Playlist.Tracks();
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await wrapper.getPlaylistTracks(this.id, options);
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
     * 
     * @param {object} data Object with playlist full object data.
     */
    loadFullObject: async (data) => {
        try {
            this.collaborative = data.collaborative;
            this.description = data.description;
            this.external_urls = data.external_urls;
            this.followers = data.followers;
            this.href = data.href;
            this.images = data.images;
            this.name = data.name;
            this.owner = data.owner;
            this.public = data.public;
            this.snapshot_id = data.snapshot_id;
            this.uri = data.uri;
            if ('tracks' in data) {
                this.tracks = data.tracks;
                if ('items' in data.tracks) {
                    await this.loadTracks(data.tracks.items);
                } else {
                    await this.loadTracks(data.tracks);
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Simplified Object
     * Sets simplified data (outside constructor).
     * 
     * @param {object} data Object with playlist simplified object data.
     */
    loadSimplifiedObject: async (data) => {
        try {
            this.collaborative = data.collaborative;
            this.description = data.description;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.images = data.images;
            this.name = data.name;
            this.owner = data.owner;
            this.public = data.public;
            this.snapshot_id = data.snapshot_id;
            this.tracks = data.tracks;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Track
     * Helper method to add tracks to playlist's internal Tracks item.
     * 
     * @param {Array | Track | object | string} tracks 
     */
    loadTracks: async (tracks) => {
        try {
            if (tracks instanceof PLaylist.Tracks || tracks instanceof Array) {
                this._tracks.concat(tracks);
            } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                this._tracks.add(tracks);
            } else {
                throw new Error("Playlist.loadTracks: Invalid Parameter \"tracks\"");
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Playlist
 * Returns Playlist object of ID
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} playlistId Id of playlist.
 * @returns {Playlist} Playlist from id.
 */
Playlist.getPlaylist = async (wrapper, playlistId) => {
    try {
        let playlist = new Playlist(playlistId);
        return await playlist.retrieveFullObjects(wrapper);
    } catch (error) {
        throw error;
    }
};

/**
 * Create Playlist
 * Creates new playlist connected to DAO.
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 */
Playlist.createPlaylist = async (wrapper, options) => {
    try {
        let userID = await (await wrapper.getMe()).body.id;
        let now = new Date();
        let _options = {
            name: 'name' in options ? options.name : "New Playlist: " + (now.getMonth() + 1) + "/" + now.getDate(),
            public: 'public' in options ? options.public : true,
            collaborative: 'collaborative' in options ? options.collaborative : false,
            description: 'description' in options ? options.description : "",
        }
        let response = await wrapper.createPlaylist(userID, _options);
        return new Playlist(response.body);
    } catch (error) {
        throw error;
    }
},

Playlist.addMethods = addMethods;

Playlist.override = override;

// Export
module.exports = Playlist;