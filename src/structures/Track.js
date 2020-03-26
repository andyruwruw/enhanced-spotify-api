'use strict';

var Artists = require('./Artists');
var Album = require('./Album');

 /**
 * Constructor
 * Creates a new Track Instance for a given track.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the track ID or contain an `id` property.
 */
function Track(data) {
    if (typeof(data) == 'string') {
        this.id = data;
    } else if (typeof(data) == 'object') {
        if ('id' in data) {
            this.id = data.id; 
        }
        else {
            throw new Error("Track: No ID Provided");
        }
        this.name = 'name' in data ? data.name : null;
        this.album = 'album' in data ? data.album : null;
        this.artists = 'artists' in data ? data.artists : null;
        this.available_markets = 'available_markets' in data ? data.available_markets : null;
        this.disc_number = 'disc_number' in data ? data.disc_number : null;
        this.duration_ms = 'duration_ms' in data ? data.duration_ms : null;
        this.explicit = 'explicit' in data ? data.explicit : null;
        this.external_ids = 'external_ids' in data ? data.external_ids : null;
        this.external_urls = 'external_urls' in data ? data.external_urls : null;
        this.href = 'href' in data ? data.href : null;
        this.is_playable = 'is_playable' in data ? data.is_playable : null;
        this.linked_from = 'linked_from' in data ? data.linked_from : null;
        this.restrictions = 'restrictions' in data ? data.restrictions : null;
        this.popularity = 'popularity' in data ? data.popularity : null;
        this.preview_url = 'preview_url' in data ? data.preview_url : null;
        this.track_number = 'track_number' in data ? data.track_number : null;
        this.uri = 'uri' in data ? data.uri : null;
        this.is_local = 'is_local' in data ? data.is_local : null;
        this.key = 'key' in data ? data.key : null;
        this.mode = 'mode' in data ? data.mode : null;
        this.time_signature = 'time_signature' in data ? data.time_signature : null;
        this.acousticness = 'acousticness' in data ? data.acousticness : null;
        this.danceability = 'danceability' in data ? data.danceability : null;
        this.energy = 'energy' in data ? data.energy : null;
        this.instrumentalness = 'instrumentalness' in data ? data.instrumentalness : null;
        this.liveness = 'liveness' in data ? data.liveness : null;
        this.loudness = 'loudness' in data ? data.loudness : null;
        this.speechiness = 'speechiness' in data ? data.speechiness : null;
        this.valence = 'valence' in data ? data.valence : null;
        this.tempo = 'tempo' in data ? data.tempo : null;
        this.track_href = 'track_href' in data ? data.track_href : null;
        this.analysis_url = 'analysis_url' in data ? data.analysis_url : null;
        this.bars = 'bars' in data ? data.bars : null;
        this.beats = 'beats' in data ? data.beats : null;
        this.sections = 'sections' in data ? data.sections : null;
        this.segments = 'segments' in data ? data.segments : null;
        this.tatums = 'tatums' in data ? data.tatums : null;
        this.track = 'track' in data ? data.track : null;
    } else {
        throw new Error("Track: Invalid Data");
    }
}

/**
 * Track Data Access Object
 * Various methods to work with retrieving and storing tracks.
 */
Track.prototype = {
    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * 
     * @returns {boolean} Whether full object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null) && (this.album) && (this.artists != null) && (this.available_markets != null) && (this.disc_number != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_ids) && (this.external_urls) && (this.href != null) && (this.is_playable != null) && (this.linked_from) && (this.restrictions) && (this.popularity != null) && (this.preview_url != null) && (this.track_number != null) && (this.uri != null) && (this.is_local != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.artists != null) && (this.available_markets != null) && (this.disc_number != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_urls) && (this.href != null) && (this.is_playable != null) && (this.linked_from) && (this.restrictions) && (this.preview_url != null) && (this.track_number != null) && (this.uri != null) && (this.is_local != null));
    },

    /**
     * Contains Link Object
     * Returns boolean whether link object data is present.
     * 
     * @returns {boolean} Whether link object is loaded.
     */
    containsLinkObject: function() {
        return ((this.external_urls) && (this.href != null) && (this.uri != null));
    },

    /**
     * Contains Audio Features
     * Returns boolean whether audio feature data is present.
     * 
     * @returns {boolean} Whether audio features data is loaded.
     */
    containsAudioFeatures: function() {
        return ((this.duration_ms != null) && (this.key != null) && (this.mode != null) && (this.time_signature != null) && (this.acousticness != null) && (this.danceability != null) && (this.energy != null) && (this.instrumentalness != null) && (this.liveness != null) && (this.loudness != null) && (this.speechiness != null) && (this.valence != null) && (this.tempo != null) && (this.uri != null) && (this.track_href != null) && (this.analysis_url != null));
    },

    /**
     * Contains Audio Analysis
     * Returns boolean whether audio analysis data is present.
     * 
     * @returns {boolean} Whether audio analysis data is loaded.
     */
    containsAudioAnalysis: function() {
        return ((this.bars != null) && (this.beats != null) && (this.sections != null) && (this.segments != null) && (this.tatums != null) && (this.track));
    },

    /**
     * Get Full Object
     * Returns full track data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Track Full Object Data.
     */
    getFullObject: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsFullObject()))
                await this.retrieveFullObject(enhancedSpotifyAPI);
            return {
                id: this.id,
                name: this.name,
                album: this.album,
                artists: this.artists,
                available_markets: this.available_markets,
                disc_number: this.disc_number,
                duration_ms: this.duration_ms,
                explicit: this.explicit,
                external_ids: this.external_ids,
                external_urls: this.external_urls,
                href: this.href,
                is_playable: this.is_playable,
                linked_from: this.linked_from,
                restrictions: this.restrictions,
                popularity: this.popularity,
                preview_url: this.preview_url,
                track_number: this.track_number,
                type: "track",
                uri: this.uri,
                is_local: this.is_local,
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified track data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Track Simplified Object Data.
     */
    getSimplifiedObject: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsSimplifiedObject()))
                await this.retrieveFullObject(enhancedSpotifyAPI);
            return {
                id: this.id,
                name: this.name,
                artists: this.artists,
                available_markets: this.available_markets,
                disc_number: this.disc_number,
                duration_ms: this.duration_ms,
                explicit: this.explicit,
                external_urls: this.external_urls,
                href: this.href,
                is_playable: this.is_playable,
                linked_from: this.linked_from,
                restrictions: this.restrictions,
                preview_url: this.preview_url,
                track_number: this.track_number,
                type: "track",
                uri: this.uri,
                is_local: this.is_local,
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Link
     * Returns track link data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Track Link Data
     */
    getLinkObject: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsLinkObject()))
                await this.retrieveFullObject(enhancedSpotifyAPI);
            return {
                id: this.id,
                external_urls: this.external_urls,
                href: this.href,
                type: "track",
                uri: this.uri,
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Audio Feature Data
     * Returns audio feature data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Track Audio Feature Data
     */
    getAudioFeatures: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsAudioFeatures()))
                await this.retrieveAudioFeatures(enhancedSpotifyAPI);
            return {
                id: this.id,
                duration_ms: this.duration_ms,
                key: this.key,
                mode: this.mode,
                time_signature: this.time_signature,
                acousticness: this.acousticness,
                danceability: this.danceability,
                energy: this.energy,
                instrumentalness: this.instrumentalness,
                liveness: this.liveness,
                loudness: this.loudness,
                speechiness: this.speechiness,
                valence: this.valence,
                tempo: this.tempo,
                uri: this.url,
                track_href: this.track_href,
                analysis_url: this.analysis_url,
                type: 'audio_features',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Audio Analysis Data
     * Returns audio analysis data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Track Audio Analysis Data
     */
    getAudioAnalysis: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsAudioAnalysis()))
                await this.retrieveAudioAnalysis(enhancedSpotifyAPI);
            return {
                id: this.id,
                bars: this.bars,
                beats: this.beats,
                sections: this.sections,
                segments: this.segments,
                tatums: this.tatums,
                track: this.track,
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full track data from Spotify API
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(enhancedSpotifyAPI) {
        try {
            let response = await enhancedSpotifyAPI.getTrack(this.id);
            this.name = response.body.name;
            this.album = response.body.album;
            this.artists = response.body.artists;
            this.available_markets = response.body.available_markets;
            this.disc_number = response.body.disc_number;
            this.duration_ms = response.body.duration_ms;
            this.explicit = response.body.explicit;
            this.external_ids = response.body.external_ids;
            this.external_urls = response.body.external_urls;
            this.href = response.body.href;
            this.is_playable = response.body.is_playable;
            this.linked_from = response.body.linked_from;
            this.restrictions = response.body.restrictions;
            this.popularity = response.body.popularity;
            this.preview_url = response.body.preview_url;
            this.track_number = response.body.track_number;
            this.uri = response.body.uri;
            this.is_local = response.body.is_local;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Retrieve Audio Features
     * Retrieves audio feature data from Spotify API
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    retrieveAudioFeatures: async function(enhancedSpotifyAPI) {
        try {
            let response = await enhancedSpotifyAPI.getAudioFeaturesForTrack(this.id);
            this.duration_ms = response.body.duration_ms;
            this.key = response.body.key;
            this.mode = response.body.mode;
            this.time_signature = response.body.time_signature;
            this.acousticness = response.body.acousticness;
            this.danceability = response.body.danceability;
            this.energy = response.body.energy;
            this.instrumentalness = response.body.instrumentalness;
            this.liveness = response.body.liveness;
            this.loudness = response.body.loudness;
            this.speechiness = response.body.speechiness;
            this.valence = response.body.valence;
            this.tempo = response.body.tempo;
            this.uri = response.body.url;
            this.track_href = response.body.track_href;
            this.analysis_url = response.body.analysis_url;
        } catch (error) {
            throw error;
        }
    },

     /**
     * Retrieve Audio Analysis
     * Retrieves audio analysis data from Spotify API
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    retrieveAudioAnalysis: async function(enhancedSpotifyAPI) {
        try {
            let response = await enhancedSpotifyAPI.getAudioAnalysisForTrack(this.id);
            this.bars = response.body.bars;
            this.beats = response.body.beats;
            this.sections = response.body.sections;
            this.segments = response.body.segments;
            this.tatums = response.body.tatums;
            this.track = response.body.track;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play Track
     * Plays track on user's active device.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @param {number} position_ms Offset where to start track in milliseconds.
     */
    play: function(enhancedSpotifyAPI, position_ms) {
        try {
            enhancedSpotifyAPI.play({ uris: [ 'spotify:track:' + this.id ], position_ms: position_ms ? position_ms : 0 });
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Artists
     * Returns Artists Object with artists.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    getArtists: async function(enhancedSpotifyAPI) {
        try {
            if (!(this.artists != null)) await this.retrieveFullObject(enhancedSpotifyAPI);

        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Album
     * Returns Album Object for track album.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    getAlbum: async function(enhancedSpotifyAPI) {
        try {
            if (!this.album) await this.retrieveFullObject(enhancedSpotifyAPI);

        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Liked
     * Returns whether a track is saved to the user's library.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether track is saved to the user's library.
     */
    isLiked: async function(enhancedSpotifyAPI) {
        try {
            let response = await enhancedSpotifyAPI.containsMySavedTracks([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Like Track
     * Adds track to the user's library.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    like: async function(enhancedSpotifyAPI) {
        try {
            await enhancedSpotifyAPI.addToMySavedTracks([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Track
    * Removes track to the user's library.
    * 
    * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
    */
    unlike: async function(enhancedSpotifyAPI) {
        try {
            await enhancedSpotifyAPI.removeFromMySavedTracks([this.id]);
        } catch (error) {
            throw error;
        }
    }
}

Track.addMethods = function(methods) {
    for (var method in methods) {
      if (methods.hasOwnProperty(method)) {
        this.prototype[i] = methods[method];
      }
    }
};

module.exports = Track;