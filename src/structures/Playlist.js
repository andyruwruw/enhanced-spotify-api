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
        } else if (typeof(data) == 'object') {
            if ('tracks' in data) {
                if ('items' in data.tracks) {
                    this.loadTracks(data.tracks.items);
                } else if (data.tracks instanceof Array) {
                    this.loadTracks(data.tracks);
                }
            }
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
        } else if (data instanceof Playlist.Tracks) {
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
            let userID = await (await wrapper.getMe()).body.id;
            let response = await wrapper.areFollowingPlaylist([this.id], [userID]);
            return response.body[0];
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
            let properties = ["collaborative", "description", "external_urls", "followers", "href", "images", "name", "owner", "public", "snapshot_id", "tracks", "uri"];
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks} Tracks instance with all playlist tracks.
     */
    getTracks: async (wrapper) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists instance with all playlist artists.
     */
    getArtists: async (wrapper) => {
        try {
            await this.retrieveTracks(wrapper);
            return await this._tracks.getArtists(wrapper);
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
            let response = await wrapper.getArtist(this.id);
            this.collaborative = response.body.collaborative;
            this.description = response.body.description;
            this.external_urls = response.body.external_urls;
            this.followers = response.body.followers;
            this.href = response.body.href;
            this.images = response.body.images;
            this.name = response.body.name;
            this.owner = response.body.owner;
            this.public = response.body.public;
            this.snapshot_id = response.body.snapshot_id;
            this.uri = response.body.uri;
            this.tracks = response.body.tracks;
            await this.loadTracks(response.body.tracks.items);
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
            if (tracks instanceof Array) {
                for (let i = 0; i < tracks.length; i++) {
                    if (tracks[i] instanceof Playlist.Track) {
                        this._tracks.add(tracks);
                    } else if ('added_at' in tracks[i]) {
                        this._tracks.add(tracks[i].track);
                    } else {
                        this._tracks.add(tracks[i]);
                    }
                }
            } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                if (tracks instanceof Playlist.Track) {
                    this._tracks.add(tracks);
                } else if ('added_at' in tracks) {
                    this._tracks.add(tracks.track);
                } else {
                    this._tracks.add(tracks);
                }
            } else {
                throw new Error("Playlist.loadTracks: Invalid Parameter \"tracks\"");
            }
        } catch (error) {
            throw error;
        }
    },

    // /**
    //  * Add Tracks
    //  * Adds tracks to Spotify Playlist
    //  * 
    //  * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
    //  * @param {Tracks | Array | Track | object | string} tracks 
    //  */
    // addTracks: async function(wrapper, tracks, position) {
    //     try {
    //         if (tracks instanceof Tracks) {
    //             let uris = tracks.getURIs();
    //             do {
    //                 await wrapper.addTracksToPlaylist(this.id, uris.splice(0, 100), { position: position != null ? position : 0 });
    //             } while (uris.length >= 100);
    //         } else if (tracks instanceof Array) {
                
    //         } else if (tracks instanceof Track || typeof(tracks) == 'object') {
                
    //         } else if (typeof(tracks) == 'string') {

    //         } else {
    //             throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // },
};

Playlist.addMethods = addMethods;

Playlist.override = override;

Playlist.getPlaylist = () => {
    return 0;
}

// Export
module.exports = Playlist;