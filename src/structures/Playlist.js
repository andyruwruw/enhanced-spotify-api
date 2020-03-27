'use strict';

var Tracks = require('./Tracks');
var Artists = require('./Artists');
var Albums = require('./Albums');
var Playlists = require('./Playlists');
var { addMethods, override } = require('./shared');

function Playlist(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
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
            this._tracks = '_tracks' in data ? data._tracks : new Tracks();
        } else if (data instanceof Tracks) {
            this._tracks = data;
        } else {
            this._tracks = new Tracks();
        }
    } catch (error) {
        throw error;
    }
}

Playlist.prototype = {
    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * 
     * @returns {boolean} Whether full object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null) && (this.collaborative != null) && (this.description != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.owner) && (this.public != null) && (this.snapshot_id != null) && (this.tracks != null) && (this.uri != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.collaborative != null) && (this.description != null) && (this.external_urls) && (this.href != null) && (this.images != null) && (this.owner) && (this.public != null) && (this.snapshot_id != null) && (this.tracks != null) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full playlist data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Playlist Full Object Data.
     */
    getFullObject: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(enhancedSpotifyAPI);
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
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Playlist Simplified Object Data.
     */
    getSimplifiedObject: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(enhancedSpotifyAPI);
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
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Any Playlist Data.
     */
    getCurrentData: function() {
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
     * Load Full Object
     * Sets full data (outside constructor).
     * 
     * @param {object} data Object with album full object data.
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
     * Retrieves full playlist data from Spotify API
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(enhancedSpotifyAPI) {
        try {
            let response = await enhancedSpotifyAPI.getArtist(this.id);
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
            await this.addTracks(response.body.tracks.items);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Playlist Tracks
     * Retrieves all tracks in playlist from Spotify API
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    retrieveTracks: async function(enhancedSpotifyAPI) {
        try {
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await enhancedSpotifyAPI.getPlaylistTracks(this.id, options);
                await this.addTracks(response.body.items);
                options.offset += 50;
            } while (!(response.body.items.length < 50))
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play Playlist
     * Plays playlist on user's active device.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @param {number} offset Track to start on.
     * @param {number} position_ms Offset where to start track in milliseconds.
     */
    play: function(enhancedSpotifyAPI, offset, position_ms) {
        try {
            enhancedSpotifyAPI.play({ context_uri: 'spotify:playlist:' + this.id, position_ms: position_ms ? position_ms : 0 , offset: offset ? offset : 0 });
        } catch (error) {
            throw error;
        }
    },

    getArtists: async function(enhancedSpotifyAPI) {
        try {
            await this.retrieveTracks(enhancedSpotifyAPI);
            return await this._tracks.getArtists(enhancedSpotifyAPI);
        } catch (error) {
            throw error;
        }
    },

    getTracks: async function(enhancedSpotifyAPI) {
        try {
            await this.retrieveTracks(enhancedSpotifyAPI);
            return await this._tracks;
        } catch (error) {
            throw error;
        }
    },

    addTracks: async function(tracks) {
        try {
            if (tracks instanceof Array) {
                for (let i = 0; i < tracks.length; i++) {
                    if ('added_at' in tracks[i]) {
                        this._tracks.add(tracks[i].track);
                    } else {
                        this._tracks.add(tracks[i]);
                    }
                }
            } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                if ('added_at' in tracks) {
                    this._tracks.add(tracks.track);
                } else {
                    this._tracks.add(tracks);
                }
            } else {
                throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
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
Playlist.search = async function(enhancedSpotifyAPI, query, limit, offset) {
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

Playlist.addMethods = addMethods;

Playlist.override = override;

// Export
module.exports = Playlist;