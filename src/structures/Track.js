'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Track Constructor
 * Creates a new Track Instance for a given track.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the track ID or contain an `id` property.
 */
function Track(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Track.constructor: No ID Provided");
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
            throw new Error("Track.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Track.Tracks = require('./Tracks');
Track.Artists = require('./Artists');
Track.Album = require('./Album');

Track.prototype = {
    /**
     * Play Track
     * Plays track on user's active device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    play: async (wrapper, options) => {
        try {
            let _options = options ? options : {};
            _options.uris = [ 'spotify:track:' + this.id ];
            return await wrapper.play(_options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Liked
     * Returns whether a track is saved to the user's library.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether track is saved to the user's library.
     */
    isLiked: async (wrapper) => {
        try {
            let response = await wrapper.containsMySavedTracks([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Like Track
     * Adds track to the user's library.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    like: async (wrapper) => {
        try {
            return await wrapper.addToMySavedTracks([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Track
    * Removes track from the user's library.
    * 
    * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
    */
    unlike: async (wrapper) => {
        try {
            return await wrapper.removeFromMySavedTracks([this.id]);
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
        return ((this.name != null) && (this.album) && (this.artists != null) && (this.available_markets != null) && (this.disc_number != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_ids) && (this.external_urls) && (this.href != null) && (this.is_playable != null) && (this.linked_from) && (this.restrictions) && (this.popularity != null) && (this.preview_url != null) && (this.track_number != null) && (this.uri != null) && (this.is_local != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: () => {
        return ((this.name != null) && (this.artists != null) && (this.available_markets != null) && (this.disc_number != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_urls) && (this.href != null) && (this.is_playable != null) && (this.linked_from) && (this.restrictions) && (this.preview_url != null) && (this.track_number != null) && (this.uri != null) && (this.is_local != null));
    },

    /**
     * Contains Link Object
     * Returns boolean whether link object data is present.
     * 
     * @returns {boolean} Whether link object is loaded.
     */
    containsLinkObject: () => {
        return ((this.external_urls) && (this.href != null) && (this.uri != null));
    },

    /**
     * Contains Audio Features
     * Returns boolean whether audio feature data is present.
     * 
     * @returns {boolean} Whether audio features data is loaded.
     */
    containsAudioFeatures: () => {
        return ((this.duration_ms != null) && (this.key != null) && (this.mode != null) && (this.time_signature != null) && (this.acousticness != null) && (this.danceability != null) && (this.energy != null) && (this.instrumentalness != null) && (this.liveness != null) && (this.loudness != null) && (this.speechiness != null) && (this.valence != null) && (this.tempo != null) && (this.uri != null) && (this.track_href != null) && (this.analysis_url != null));
    },

    /**
     * Contains Audio Analysis
     * Returns boolean whether audio analysis data is present.
     * 
     * @returns {boolean} Whether audio analysis data is loaded.
     */
    containsAudioAnalysis: () => {
        return ((this.bars != null) && (this.beats != null) && (this.sections != null) && (this.segments != null) && (this.tatums != null) && (this.track));
    },

    /**
     * Get Full Object
     * Returns full track data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Track Full Object Data.
     */
    getFullObject: async (wrapper) => {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
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
                uri: this.uri,
                is_local: this.is_local,
                type: 'track',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified track data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Track Simplified Object Data.
     */
    getSimplifiedObject: async (wrapper) => {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
            }
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
                uri: this.uri,
                is_local: this.is_local,
                type: 'track',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Link
     * Returns track link data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Track Link Data
     */
    getLinkObject: async (wrapper) => {
        try {
            if (!(await this.containsLinkObject())) {
                await this.retrieveFullObject(wrapper);
            } 
            return {
                id: this.id,
                external_urls: this.external_urls,
                href: this.href,
                uri: this.uri,
                type: 'track',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Audio Feature Data
     * Returns audio feature data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Track Audio Feature Data
     */
    getAudioFeatures: async (wrapper) => {
        try {
            if (!(await this.containsAudioFeatures())) {
                await this.retrieveAudioFeatures(wrapper);
            }
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Track Audio Analysis Data
     */
    getAudioAnalysis: async (wrapper) => {
        try {
            if (!(await this.containsAudioAnalysis())) {
                await this.retrieveAudioAnalysis(wrapper);
            }
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
     * Get All Data
     * Returns all data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} All Track's Data
     */
    getAllData: async (wrapper) => {
        try {
            if (!(await this.containsAudioAnalysis())) {
                await this.retrieveAudioAnalysis(wrapper);
            }
            if (!(await this.containsAudioFeatures())) {
                await this.retrieveAudioFeatures(wrapper);
            }
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                album: this.album,
                artists: this.artists,
                available_markets: this.available_markets,
                disc_number: this.disc_number,
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
                track_href: this.track_href,
                analysis_url: this.analysis_url,
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
     * Get Current Data
     * Just returns whatever the track object currently holds
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any Track Data.
     */
    getCurrentData: () => {
        try {
            let data = { id: this.id, type: 'track' };
            let properties = ['name', 'album', 'artists', 'available_markets', 'disc_number', 'explicit', 'external_ids', 'external_urls', 'href', 'is_playable', 'linked_from', 'restrictions', 'popularity', 'preview_url', 'track_number', 'uri', 'is_local', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'valence', 'tempo', 'track_href', 'analysis_url', 'bars', 'beats', 'sections', 'segments', 'tatums', 'track'];
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
     * Get Track Artists
     * Returns Artists Object with artists.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    getArtists: async (wrapper) => {
        try {
            if (!(this.artists != null)) {
                await this.retrieveFullObject(wrapper);
            }
            return new Track.Artists(this.artists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Album
     * Returns Album Object for track album.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    getAlbum: async (wrapper) => {
        try {
            if (!this.album) {
                await this.retrieveFullObject(wrapper);
            }
            return new Track.Album(this.album);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations
     * Returns recommendations for track.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options Optional additional options.
     * @returns {Tracks} Track Instance with recommended tracks.
     */
    getRecommendations: async (wrapper, limit, options) => {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Track.getRecommendations: Invalid Parameter \"options\"");
            }
            let _options = options ? options : {};
            if ('seed_artists' in _options) {
                delete _options.seed_artists;
            }
            if ('seed_genres' in _options) {
                delete _options.seed_artists;
            }
            _options.seed_tracks = this.id;
            let response = await wrapper.getRecommendations(_options);
            return new Track.Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations with Audio Features
     * Returns recommendations for track with added target on audio feature values.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options Optional additional options.
     * @returns {Tracks} Track Instance with recommended tracks.
     */
    getRecommendationWithAudioFeatures: async (wrapper, options) => {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Track.getRecommendations: Invalid Parameter \"options\"");
            }
            if (!(await this.containsAudioFeatures())) {
                await this.retrieveAudioFeatures(wrapper);
            }
            let _options = options ? options : {};
            if ('seed_artists' in _options) {
                delete _options.seed_artists;
            }
            if ('seed_genres' in _options) {
                delete _options.seed_artists;
            }
            _options.seed_tracks = this.id;
            _options.target_acousticness = this.acousticness;
            _options.target_danceability = this.danceability;
            _options.target_energy = this.energy;
            _options.target_instrumentalness = this.instrumentalness;
            _options.target_liveness = this.liveness;
            _options.target_mode = this.mode;
            _options.target_speechiness = this.speechiness;
            _options.target_tempo = this.tempo;
            _options.target_valence = this.valence;
            let response = await wrapper.getRecommendations(_options);
            return new Track.Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * 
     * @param {object} data Object with track full object data.
     */
    loadFullObject: (data) => {
        try {
            this.name = data.name;
            this.album = data.album;
            this.artists = data.artists;
            this.available_markets = data.available_markets;
            this.disc_number = data.disc_number;
            this.duration_ms = data.duration_ms;
            this.explicit = data.explicit;
            this.external_ids = data.external_ids;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.is_playable = data.is_playable;
            this.linked_from = data.linked_from;
            this.restrictions = data.restrictions;
            this.popularity = data.popularity;
            this.preview_url = data.preview_url;
            this.track_number = data.track_number;
            this.uri = data.uri;
            this.is_local = data.is_local;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Simplified Object
     * Sets simplified data (outside constructor).
     * 
     * @param {object} data Object with track simplified object data.
     */
    loadSimplifiedObject: (data) => {
        try {
            this.name = data.name;
            this.artists = data.artists;
            this.available_markets = data.available_markets;
            this.disc_number = data.disc_number;
            this.duration_ms = data.duration_ms;
            this.explicit = data.explicit;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.is_playable = data.is_playable;
            this.linked_from = data.linked_from;
            this.restrictions = data.restrictions;
            this.preview_url = data.preview_url;
            this.track_number = data.track_number;
            this.uri = data.uri;
            this.is_local = data.is_local;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Audio Features
     * Sets audio feature data (outside constructor).
     * 
     * @param {object} data Object with track audio feature data.
     */
    loadAudioFeatures: (data) => {
        try {
            this.duration_ms = data.duration_ms;
            this.key = data.key;
            this.mode = data.mode;
            this.time_signature = data.time_signature;
            this.acousticness = data.acousticness;
            this.danceability = data.danceability;
            this.energy = data.energy;
            this.instrumentalness = data.instrumentalness;
            this.liveness = data.liveness;
            this.loudness = data.loudness;
            this.speechiness = data.speechiness;
            this.valence = data.valence;
            this.tempo = data.tempo;
            this.uri = data.url;
            this.track_href = data.track_href;
            this.analysis_url = data.analysis_url;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Audio Analysis
     * Sets audio analysis data (outside constructor).
     * 
     * @param {object} data Object with track audio analysis data.
     */
    loadAudioAnalysis: (data) => {
        try {
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
     * Retrieve Full Object
     * Retrieves full track data from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async (wrapper) => {
        try {
            if ('is_local' in this && this.is_local) {
                return;
            }
            let response = await wrapper.getTrack(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Retrieve Audio Features
     * Retrieves audio feature data from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveAudioFeatures: async (wrapper) => {
        try {
            if ('is_local' in this && this.is_local) {
                return;
            }
            let response = await wrapper.getAudioFeaturesForTrack(this.id);
            await this.loadAudioFeatures(response.body);
        } catch (error) {
            throw error;
        }
    },

     /**
     * Retrieve Audio Analysis
     * Retrieves audio analysis data from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveAudioAnalysis: async (wrapper) => {
        try {
            if ('is_local' in this && this.is_local) {
                return;
            }
            let response = await wrapper.getAudioAnalysisForTrack(this.id);
            await this.loadAudioAnalysis(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Track
 * Returns Track object of ID
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} trackId Id of track.
 * @returns {Track} Track from id.
 */
Track.getTrack = async (wrapper, trackId) => {
    try {
        let track = new Track(trackId);
        await track.retrieveFullObjects(wrapper);
        return track;
    } catch (error) {
        throw error;
    }
};

Track.addMethods = addMethods;

Track.override = override;

module.exports = Track;