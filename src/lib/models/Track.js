'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Track Constructor
 * Creates a new Track Instance for a given track.
 * @param {Object | String} data Data to be preloaded. Must either be a string of the track ID or contain an `id` property.
 */
function Track(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if (data.hasOwnProperty('id')) {
                this.id = data.id; 
            } else {
                throw new Error("Track.constructor: No ID Provided");
            }
            this.loadConditionally(data);
        } else {
            throw new Error("Track.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Track.prototype = {
    /**
     * Play Track
     * Plays track on user's active device.
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response from request.
     * options.position_ms: {Number} Position to start playback (Milliseconds) (Depreciated? spotify-web-api-node?)
     */
    play: async function(options) {
        try {
            let _options = options ? options : {};
            _options.uris = [ 'spotify:track:' + this.id ];
            return await Models.wrapperInstance.play(_options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Liked
     * Returns whether this track is saved to the user's library.
     * @returns {Boolean} Whether this track is saved to the user's library.
     */
    isLiked: async function() {
        try {
            let response = await Models.wrapperInstance.containsMySavedTracks([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Like Track
     * Adds this track to the user's library.
     * @returns {Object} Response from request.
     */
    like: async function() {
        try {
            return await Models.wrapperInstance.addToMySavedTracks([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Track
    * Removes this track from the user's library.
    * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
    * @returns {Object} Response from request.
    */
    unlike: async function() {
        try {
            return await Models.wrapperInstance.removeFromMySavedTracks([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * @returns {Boolean} Whether full object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null) && (this.album) && (this.artists != null) && (this.available_markets != null) && (this.disc_number != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_ids) && (this.external_urls) && (this.href != null) && (this.popularity != null) && (this.preview_url != null) && (this.track_number != null) && (this.uri != null) && (this.is_local != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * @returns {Boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.artists != null) && (this.available_markets != null) && (this.disc_number != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_urls) && (this.href != null) && (this.preview_url != null) && (this.track_number != null) && (this.uri != null) && (this.is_local != null));
    },

    /**
     * Contains Link Object
     * Returns boolean whether link object data is present.
     * @returns {Boolean} Whether link object is loaded.
     */
    containsLinkObject: function() {
        return ((this.external_urls != null) && (this.href != null) && (this.uri != null));
    },

    /**
     * Contains Audio Features
     * Returns boolean whether audio feature data is present.
     * @returns {Boolean} Whether audio features data is loaded.
     */
    containsAudioFeatures: function() {
        return ((this.duration_ms != null) && (this.key != null) && (this.mode != null) && (this.time_signature != null) && (this.acousticness != null) && (this.danceability != null) && (this.energy != null) && (this.instrumentalness != null) && (this.liveness != null) && (this.loudness != null) && (this.speechiness != null) && (this.valence != null) && (this.tempo != null) && (this.uri != null) && (this.track_href != null) && (this.analysis_url != null));
    },

    /**
     * Contains Audio Analysis
     * Returns boolean whether audio analysis data is present.
     * @returns {Boolean} Whether audio analysis data is loaded.
     */
    containsAudioAnalysis: function() {
        return ((this.bars != null) && (this.beats != null) && (this.sections != null) && (this.segments != null) && (this.tatums != null) && (this.track != null));
    },

    /**
     * Get Full Object
     * Returns full track data. Retrieves from Spotify API if necessary.
     * @returns {Object} Track Full Object Data.
     */
    getFullObject: async function() {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject();
            }
            let result = {
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
                popularity: this.popularity,
                preview_url: this.preview_url,
                track_number: this.track_number,
                uri: this.uri,
                is_local: this.is_local,
                type: 'track',
            };
            if (this.is_playable != null) {
                result.is_playable = this.is_playable;
            }
            if (this.linked_from != null) {
                result.linked_from = this.linked_from;
            }
            if (this.restrictions != null) {
                result.restrictions = this.restrictions;
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified track data. Retrieves from Spotify API if necessary.
     * @returns {Object} Track Simplified Object Data.
     */
    getSimplifiedObject: async function() {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject();
            }
            let result = {
                id: this.id,
                name: this.name,
                artists: this.artists,
                available_markets: this.available_markets,
                disc_number: this.disc_number,
                duration_ms: this.duration_ms,
                explicit: this.explicit,
                external_urls: this.external_urls,
                href: this.href,
                preview_url: this.preview_url,
                track_number: this.track_number,
                uri: this.uri,
                is_local: this.is_local,
                type: 'track',
            };
            if (this.is_playable != null) {
                result.is_playable = this.is_playable;
            }
            if (this.linked_from != null) {
                result.linked_from = this.linked_from;
            }
            if (this.restrictions != null) {
                result.restrictions = this.restrictions;
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Link
     * Returns track link data. Retrieves from Spotify API if necessary.
     * @returns {Object} Track Link Data
     */
    getLinkObject: async function() {
        try {
            if (!(await this.containsLinkObject())) {
                await this.retrieveFullObject();
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
     * Returns audio feature data. Retrieves from Spotify API if necessary.
     * @returns {Object} Track Audio Feature Data
     */
    getAudioFeatures: async function() {
        try {
            if (!(await this.containsAudioFeatures())) {
                await this.retrieveAudioFeatures();
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
                uri: this.uri,
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
     * Returns audio analysis data. Retrieves from Spotify API if necessary.
     * @returns {object} Track Audio Analysis Data
     */
    getAudioAnalysis: async function() {
        try {
            if (!(await this.containsAudioAnalysis())) {
                await this.retrieveAudioAnalysis();
            }
            let results = {
                bars: this.bars,
                beats: this.beats,
                sections: this.sections,
                segments: this.segments,
                tatums: this.tatums,
                track: this.track,
            };
            if (this.meta != null) {
                results.meta = this.meta;
            }
            return results;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Data
     * Returns all data. Retrieves from Spotify API if necessary.
     * @returns {Object} All Track's Data
     */
    getAllData: async function() {
        try {
            if (!(await this.containsAudioAnalysis())) {
                await this.retrieveAudioAnalysis();
            }
            if (!(await this.containsAudioFeatures())) {
                await this.retrieveAudioFeatures();
            }
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject();
            }
            let results = {
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
            if (this.meta != null) {
                results.meta = this.meta;
            }
            if (this.is_playable != null) {
                result.is_playable = this.is_playable;
            }
            if (this.linked_from != null) {
                result.linked_from = this.linked_from;
            }
            if (this.restrictions != null) {
                result.restrictions = this.restrictions;
            }
            return results;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the track object currently hold.
     * @returns {Object} Any Track Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'track' };
            let properties = ['name', 'album', 'artists', 'available_markets', 'disc_number', 'explicit', 'external_ids', 'external_urls', 'href', 'is_playable', 'linked_from', 'restrictions', 'popularity', 'preview_url', 'track_number', 'uri', 'is_local', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'valence', 'tempo', 'track_href', 'analysis_url', 'bars', 'beats', 'sections', 'segments', 'tatums', 'track', 'meta'];
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
     * Returns Artists Object with track's artists.
     */
    getArtists: async function() {
        try {
            if (!(this.artists != null)) {
                await this.retrieveFullObject();
            }
            return new Models.Artists(this.artists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Album
     * Returns Album Object for track's album.
     */
    getAlbum: async function() {
        try {
            if (!this.album) {
                await this.retrieveFullObject();
            }
            return new Models.Album(this.album);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations
     * Returns recommendations for track.
     * @param {Object} options (Optional) Additional options.
     * @returns {Tracks} Track Instance with recommended tracks.
     * options.limit: {Number} Number of tracks to Retrieve (Default 20).
     * options.target_[audio_feature]: {Number} Value to target for specific audio feature.
     * options.min_[audio_feature]: {Number} Minimum value for specific audio feature.
     * options.max_[audio_feature]: {Number} Maximum value for specific audio feature.
     */
    getRecommendations: async function(options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Track.getRecommendations: Invalid Parameter \"options\"");
            }
            let _options = options ? options : {};
            if (_options.hasOwnProperty('seed_artists')) {
                delete _options.seed_artists;
            }
            if (_options.hasOwnProperty('seed_genres')) {
                delete _options.seed_artists;
            }
            _options.seed_tracks = this.id;
            let response = await Models.wrapperInstance.getRecommendations(_options);
            return new Models.Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations with Audio Features
     * Returns recommendations for track with added target on audio feature values.
     * @param {Object} options (Optional) Additional options.
     * @returns {Tracks} Track Instance with recommended tracks.
     * options.limit: {Number} Number of tracks to Retrieve (Default 20).
     */
    getRecommendationWithAudioFeatures: async function(options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Track.getRecommendationWithAudioFeatures: Invalid Parameter \"options\"");
            }
            if (!(await this.containsAudioFeatures())) {
                await this.retrieveAudioFeatures();
            }
            let _options = options ? options : {};
            if (_options.hasOwnProperty('seed_artists')) {
                delete _options.seed_artists;
            }
            if (_options.hasOwnProperty('seed_genres')) {
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
            let response = await Models.wrapperInstance.getRecommendations(_options);
            return new Models.Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * @param {Object} data Object with track full object data.
     */
    loadFullObject: function(data) {
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
     * @param {Object} data Object with track simplified object data.
     */
    loadSimplifiedObject: function(data) {
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
     * Load Link Object
     * Sets link data (outside constructor).
     * @param {Object} data Object with track link object data.
     */
    loadLinkObject: function(data) {
        try {
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Audio Features
     * Sets audio feature data (outside constructor).
     * @param {Object} data Object with track audio feature data.
     */
    loadAudioFeatures: function(data) {
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
            this.uri = data.uri;
            this.track_href = data.track_href;
            this.analysis_url = data.analysis_url;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Audio Analysis
     * Sets audio analysis data (outside constructor).
     * @param {Object} data Object with track audio analysis data.
     */
    loadAudioAnalysis: function(data) {
        try {
            this.bars = data.bars;
            this.beats = data.beats;
            this.sections = data.sections;
            this.segments = data.segments;
            this.tatums = data.tatums;
            this.track = data.track;
            if (data.hasOwnProperty('meta')) {
                this.meta = data.meta;
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Conditionally
     * Sets all data conditionally.
     * @param {Object} data Object with track data.
     */
    loadConditionally: function(data) {
        try {
            let properties = ['name', 'album', 'artists', 'available_markets', 'disc_number', 'duration_ms', 'explicit', 'external_ids', 'external_urls', 'href', 'is_playable', 'linked_from', 'restrictions', 'popularity', 'preview_url', 'track_number', 'uri', 'is_local', 'key', 'mode', 'time_signature', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'valence', 'tempo', 'track_href', 'analysis_url', 'bars', 'beats', 'sections', 'segments', 'tatums', 'track', 'meta'];
            for (let i = 0; i < properties.length; i++) {
                if (data.hasOwnProperty(properties[i])) {
                    this[properties[i]] = data[properties[i]];
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full track data from Spotify API
     */
    retrieveFullObject: async function() {
        try {
            if (this.hasOwnProperty('is_local') && this.is_local) {
                return;
            }
            let response = await Models.wrapperInstance.getTrack(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Retrieve Audio Features
     * Retrieves audio feature data from Spotify API
     */
    retrieveAudioFeatures: async function() {
        try {
            if (this.hasOwnProperty('is_local') && this.is_local) {
                return;
            }
            let response = await Models.wrapperInstance.getAudioFeaturesForTrack(this.id);
            await this.loadAudioFeatures(response.body);
        } catch (error) {
            throw error;
        }
    },

     /**
     * Retrieve Audio Analysis
     * Retrieves audio analysis data from Spotify API
     */
    retrieveAudioAnalysis: async function() {
        try {
            if (this.hasOwnProperty('is_local') && this.is_local) {
                return;
            }
            let response = await Models.wrapperInstance.getAudioAnalysisForTrack(this.id);
            await this.loadAudioAnalysis(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Track
 * Returns Track object of ID
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} trackID Id of track.
 * @returns {Track} Track from id.
 */
Track.getTrack = async function(trackID) {
    try {
        let response = Models.wrapperInstance.getTrack(trackID);
        return new Models.Track(response.body);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Track.addMethods = function(methods) {
    for (let method in methods) {
        this.prototype[method] = methods[method];
    }
};

/**
 * Override
 * Replaces a method within the Class.
 * @param {String} name Name of the method to replace.
 * @param {Function} method Function to replace with.
 */
Track.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Track.override: \"name\" does not exist.");
    }
};

Track.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Track.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Track.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Track.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Track.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Track.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Track.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Track.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Track.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Track.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Track.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Track.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Track.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Track.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Track.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Track.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Track.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Track.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Track;