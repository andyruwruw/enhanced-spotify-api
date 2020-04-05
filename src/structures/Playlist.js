'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Playlist Constructor
 * Creates a new Playlist Instance for a given playlist.
 * 
 * @param {Object | String} data Data to be preloaded. Must either be a string of the playlist ID or contain an `id` property.
 */
function Playlist(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
            this._tracks = new Playlist.Tracks();
        } else if (typeof(data) == 'object') {
            if (data.hasOwnProperty('id')) {
                this.id = data.id;
            } else {
                throw new Error("Playlist.constructor: No ID Provided");
            }
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
        } else {
            throw new Error("Playlist.constructor: Invalid Parameter \"data\"");
        }
        this.changes = [];
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Result from Request.
     * options.offset.position: {Number} (Optional) Index of track to begin with.
     * options.offset.uri: {String} (Optional) Track URI to begin with.
     * options.position_ms: {Number} Position to start playback (Milliseconds)
     */
    play: async function(wrapper, options)  {
        try {
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Boolean} Whether playlist is followed by user.
     */
    isFollowed: async function(wrapper) {
        try {
            let userID = await (await wrapper.getMe()).body.id;
            let response = await wrapper.areFollowingPlaylist([this.id], [userID]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Following
     * Returns whether an playlist is followed by a set of users.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array} userIds User IDs to check if they're following
     * @returns {Boolean} Whether playlist is followed by a set of users.
     */
    areFollowing: async function(wrapper, userIds) {
        try {
            let response = await wrapper.areFollowingPlaylist([this.id], userIds);
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Playlist
     * Follows playlist.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Object} Result from Request.
     */
    follow: async function(wrapper) {
        try {
            return await wrapper.followPlaylist([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Playlist
     * Unfollows playlist.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Object} Result from Request.
     */
    unfollow: async function(wrapper) {
        try {
            return await wrapper.unfollowPlaylist([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Contains Full Object
     * Returns boolean whether full playlist object is present.
     * @returns {Boolean} Whether full playlist object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null) && (this.collaborative != null) && (this.description != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.owner) && (this.public != null) && (this.snapshot_id != null) && (this.tracks != null) && (this.uri != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified playlist object is present.
     * @returns {Boolean} Whether simplified playlist object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.collaborative != null) && (this.description != null) && (this.external_urls) && (this.href != null) && (this.images != null) && (this.owner) && (this.public != null) && (this.snapshot_id != null) && (this.tracks != null) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full playlist data. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Object} Playlist Full Object Data.
     */
    getFullObject: async function(wrapper) {
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Object} Playlist Simplified Object Data.
     */
    getSimplifiedObject: async function(wrapper) {
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Object} Any Playlist Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'playlist' };
            let properties = ['collaborative', 'description', 'external_urls', 'followers', 'href', 'images', 'name', 'owner', 'public', 'snapshot_id', 'tracks', 'uri', '_tracks'];
            for (let i = 0; i < properties.length; i++) {
                if (this[properties[i]] != null) {
                    data[properties[i]] = this[properties[i]];
                }
            }
            data._tracks = this._tracks;
            return data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Playlist Tracks
     * Returns Tracks object with all playlist tracks. Retrieves if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks} Tracks instance with all playlist tracks.
     */
    getTracks: async function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            return await this._tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Playlist Artists
     * Returns Artists object with all playlist artists. Retrieves if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists instance with all playlist artists.
     */
    getArtists: async function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            return await this._tracks.getArtists(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Playlist Albums
     * Returns Albums object with all playlist albums. Retrieves if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums} Albums instance with all playlist albums.
     */
    getAlbums: async function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            return await this._tracks.getAlbums(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Change Playlist Details
     * Saves any detail changes to Playlist on Spotify
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Object} options (Optional) Details to be changed.
     * @returns {Object} Response to Request
     * options.name: {String} (Optional) Name of Playlist
     * options.description: {String} (Optional) Description of Playlist
     * options.public: {Boolean} (Optional) Public status of Playlist
     * options.collaborative: {Boolean} (Optional) Collaborative status of Playlist
     */
    changeDetails: async function(wrapper, options) {
        try {
            return await wrapper.changePlaylistDetails(this.id, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Push
     * Appends tracks to playlist.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Track | Object | String } track Track Instance, track object or track id to add. 
     */
    push: async function(wrapper, track) {
        try {
            return await this.addTracks(wrapper, track);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds tracks to Playlist.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Tracks | Array } tracks Another Tracks instance or array of Track instances, track objects, or track ids to concat.
     */
    concat: async function(wrapper, tracks) {
        try {
            return await this.addTracks(wrapper, tracks);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove
     * Removes an item from the Manager Object.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Track | object | string } track Track instance, track data, or track id to remove.
     */
    remove: async function(wrapper, track) {
        try {
            return await this.removeTracks(wrapper, track);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Size
     * Returns number of tracks in Playlist
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Number} Number of items in manager.
     */
    size: async function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            return await this._tracks.size();
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an track
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {String | Object | Track} track Track ID, Track instance or object with `id` properity.
     * @param {Number} startAt Where to start in the list.
     * @returns {Number} Index of item.
     */
    indexOf: async function(wrapper, track, startAt) {
        try {
            await this.retrieveTracks(wrapper);
            return await this._tracks.indexOf(track);
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string | Object | Track} track Track ID, Track instance or object with `id` properity.
     * @returns {Boolean} Whether item is contained.
     */
    includes: async function(wrapper, track) {
        try {
            await this.retrieveTracks(wrapper);
            return this._tracks.includes(track);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns track object at a given index
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} index Index of the item desired.
     * @returns {Track} Track at a given index
     */
    get: async function(wrapper, index) {
        try {
            await this.retrieveTracks(wrapper);
            return this._tracks.get(index);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of IDs
     */
    getIDs: function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            return this._tracks.getIDs();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            return this._tracks.getIDsNoRepeats();
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Get URIs
     * Returns array of URIs in order.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of URIs
     */
    getURIs: async function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            return this._tracks.getURIs();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get URIs No Repeats
     * Returns array of URIs with no repeats.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of URIs
     */
    getURIsNoRepeats: async function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            return this._tracks.getURIsNoRepeats();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            await this._tracks.reverse();
            return await this.replaceTracks(wrapper, this._tracks.getIDs());
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pop
     * Removes last item.
     * 
     * @returns {Track} Removed item
     */
    pop: function() {
        try {
            await this.retrieveTracks(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Shift
     * Removes first item.
     * 
     * @returns {Track} Removed item
     */
    shift: function() {
        try {
            await this.retrieveTracks(wrapper);
            let track = this._tracks.pop();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Add tracks
     * Adds new tracks to a playlist.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array | String | Track | Object} tracks Tracks to be added
     * @param {object} options (Optional) Additional options.
     * @returns {Object} Response to Request
     * options.position: {Number} Position to insert the tracks (0 based index) (Default: Append)
     */
    addTracks: async function(wrapper, tracks, options) {
        try {
            let uris;
            if (tracks instanceof Tracks) {
                uris = await tracks.getURIs();
            } else if (tracks instanceof Array) {
                for (let i = 0; i < tracks.length; i++) {
                    if (((tracks[i] instanceof Track || typeof(tracks[i]) == 'object')) && tracks[i].hasOwnProperty('id')) {
                        uris.push('spotify:track:' + tracks[i].id);
                    } else if (typeof(tracks[i]) == 'string') {
                        uris.push('spotify:track:' + tracks[i]);
                    }
                }
            } else if (tracks instanceof Track || typeof(tracks) == 'object') {
                if (tracks.hasOwnProperty('id')) {
                    uris = ['spotify:track:' + tracks.id];
                } else {
                    throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
                }
            } else if (typeof(tracks) == 'string') {
                uris = ['spotify:track:' + tracks];
            } else {
                throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
            }
            let response = await wrapper.addTracksToPlaylist(this.id, uris, options ? options : {});
            this.snapshot_id = response.body.snapshot_id;
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Replace Tracks
     * Replaces all tracks of playlist with new tracks.
     * @param {Wrapper} wrapper 
     * @param {Array | String | Track | Object} tracks 
     * @returns {Object} Response to Request
     */
    replaceTracks: async function(wrapper, tracks) {
        try {
            let uris;
            if (tracks instanceof Tracks) {
                uris = await tracks.getURIs();
            } else if (tracks instanceof Array) {
                for (let i = 0; i < tracks.length; i++) {
                    if (((tracks[i] instanceof Track || typeof(tracks[i]) == 'object')) && tracks[i].hasOwnProperty('id')) {
                        uris.push('spotify:track:' + tracks[i].id);
                    } else if (typeof(tracks[i]) == 'string') {
                        uris.push('spotify:track:' + tracks[i]);
                    }
                }
            } else if (tracks instanceof Track || typeof(tracks) == 'object') {
                if (tracks.hasOwnProperty('id')) {
                    uris = ['spotify:track:' + tracks.id];
                } else {
                    throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
                }
            } else if (typeof(tracks) == 'string') {
                uris = ['spotify:track:' + tracks];
            } else {
                throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
            }
            let response = await wrapper.replaceTracksInPlaylist(this.id, uris);
            this.snapshot_id = response.body.snapshot_id;
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reorder tracks
     * Reorders tracks in a playlist.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} range_start Where to select
     * @param {number} insert_before Where to place
     * @param {object} options (Optional) Additional options.
     * @returns {Object} Response to Request
     * options.range_length: {Number} The amount of tracks to be reordered (Default 1)
     */
    reorderTracks: async function(wrapper, range_start, insert_before, options) {
        try {
            let response = await wrapper.reorderTracksInPlaylist(this.id, range_start, insert_before, options ? options : {}, this.snapshot_id);
            this.snapshot_id = response.body.snapshot_id;
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove tracks
     * Removes tracks from a playlist.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array | String | Track | Object} tracks Tracks to be added
     * @returns {Object} Response to Request
     */
    removeTracks: async function(wrapper, tracks) {
        try {
            let uris = [];
            if (tracks instanceof Tracks) {
                uris = await tracks.getURIs();
            } else if (tracks instanceof Array) {
                for (let i = 0; i < tracks.length; i++) {
                    if (typeof(tracks[i]) == 'object' && tracks[i].hasOwnProperty('uri')) {
                        uris.push(tracks[i]);
                    } else if (((tracks[i] instanceof Track || typeof(tracks[i]) == 'object')) && tracks[i].hasOwnProperty('id')) {
                        uris.push('spotify:track:' + tracks[i].id);
                    } else if (typeof(tracks[i]) == 'string') {
                        uris.push('spotify:track:' + tracks[i]);
                    }
                }
            } else if (typeof(tracks) == 'object' && tracks[i].hasOwnProperty('uri')) {
                uris.push(tracks)
            } else if ((tracks instanceof Track || typeof(tracks) == 'object') && tracks.hasOwnProperty('id')) {
                uris.push('spotify:track:' + tracks.id);
            } else if (typeof(tracks) == 'string') {
                uris = ['spotify:track:' + tracks];
            } else {
                throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
            }
            let response = await wrapper.removeTracksFromPlaylistWithSnapshotId(this.id, uris, this.snapshot_id);
            this.snapshot_id = response.body.snapshot_id;
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove tracks by index
     * Removes tracks by index from a playlist.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array} positions Indexes to be removed
     * @returns {Object} Response to Request
     */
    removeTrackIndexes: async function(wrapper, positions) {
        try {
            let response = await wrapper.removeTracksFromPlaylistInPositions(this.id, positions instanceof Array ? positions : [positions], this.snapshot_id);
            this.snapshot_id = response.body.snapshot_id;
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Upload Custom Image
     * Updates playlist custom cover image.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {String} imageData New image. Base64 encoded JPEG image data, maximum payload size is 256 KB.
     */
    uploadCoverImage: async function(wrapper, imageData) {
        try {
            return await wrapper.uploadCustomPlaylistCoverImage(this.id, imageData);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full playlist data from Spotify API
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(wrapper) {
        try {
            let response = await wrapper.getPlaylist(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Playlist Tracks
     * Retrieves all tracks in playlist from Spotify API
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveTracks: async function(wrapper) {
        try {
            this._tracks = new Playlist.Tracks();
            let options = { offset: 0 };
            let response;
            do {
                response = await wrapper.getPlaylistTracks(this.id, options);
                await this.loadTracks(response.body.items);
                options.offset += 100;
            } while (!(response.body.items.length < 100))
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * @param {Object} data Object with playlist full object data.
     */
    loadFullObject: async function(data) {
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
     * @param {Object} data Object with playlist simplified object data.
     */
    loadSimplifiedObject: async function(data) {
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
     * @param {Array | Track | Object | String} tracks 
     */
    loadTracks: async function(tracks) {
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
}

/**
 * Get Playlist
 * Returns Playlist object of ID
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} playlistId Id of playlist.
 * @returns {Playlist} Playlist from id.
 */
Playlist.getPlaylist = async function(wrapper, playlistId) {
    try {
        let playlist = new Playlist(playlistId);
        return await playlist.retrieveFullObjects(wrapper);
    } catch (error) {
        throw error;
    }
};

/**
 * Create Playlist
 * Creates new playlist.
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {String} name Name of new Playlist.
 * @param {Object} options (Optional) Additional options.
 * options.description: {String} Description of Playlist.
 * options.public: {Boolean} Public status of Playlist.  (Default true)
 * options.collaborative: {Boolean} Collaborative status of Playlist. (Default false)
 */
Playlist.create = async function(wrapper, name, options) {
    try {
        if (name == null || typeof(name) != 'string') {
            throw new Error("Playlist.create: Invalid Parameter \"name\"");
        }
        let userID = await (await wrapper.getMe()).body.id;
        let response = await wrapper.createPlaylist(userID, { name: name, ...(options ? options : {})});
        return new Playlist(response.body);
    } catch (error) {
        throw error;
    }
},

Playlist.addMethods = addMethods;

Playlist.override = override;

module.exports = Playlist;