'use strict'

var SpotifyWebAPI = require('spotify-web-api-node');

/**
 * Add Methods
 * Adds functionality to Class
 * 
 * @param {object} methods Object containing new methods to be added as properties.
 */
let addMethods = (methods) => {
    try {
        for (var method in methods) {
            if (!this.prototype.hasOwnProperty(method)) {
                this.prototype[method] = methods[method];
            }
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Override
 * Replaces a method within the class.
 * 
 * @param {string} name Name of the method to replace.
 * @param {function} method Function to replace old method with.
 */
let override = (name, method) => {
    try {
        if (this.prototype.hasOwnProperty(name)) {
            this.prototype[name] = method;
        }
    } catch (error) {
        throw error;
    }
};

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
            if (data.hasOwnProperty('id')) {
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
};

Track.prototype = {
    /**
     * Play Track
     * Plays track on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    play: async function(wrapper, options) {
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether track is saved to the user's library.
     */
    isLiked: async function(wrapper) {
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    like: async function(wrapper) {
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
    * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
    */
    unlike: async function(wrapper) {
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
        return ((this.bars != null) && (this.beats != null) && (this.sections != null) && (this.segments != null) && (this.tatums != null) && (this.track != null));
    },

    /**
     * Get Full Object
     * Returns full track data. Retrieves from Spotify API if necessary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Track Full Object Data.
     */
    getFullObject: async function(wrapper) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
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
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Track Simplified Object Data.
     */
    getSimplifiedObject: async function(wrapper) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
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
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Track Link Data
     */
    getLinkObject: async function(wrapper) {
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
     * Returns audio feature data. Retrieves from Spotify API if necessary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Track Audio Feature Data
     */
    getAudioFeatures: async function(wrapper) {
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
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Track Audio Analysis Data
     */
    getAudioAnalysis: async function(wrapper) {
        try {
            if (!(await this.containsAudioAnalysis())) {
                await this.retrieveAudioAnalysis(wrapper);
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
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} All Track's Data
     */
    getAllData: async function(wrapper) {
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
     * Just returns whatever the track object currently holds
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any Track Data.
     */
    getCurrentData: function() {
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    getArtists: async function(wrapper) {
        try {
            if (!(this.artists != null)) {
                await this.retrieveFullObject(wrapper);
            }
            return new Artists(this.artists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Album
     * Returns Album Object for track album.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    getAlbum: async function(wrapper) {
        try {
            if (!this.album) {
                await this.retrieveFullObject(wrapper);
            }
            return new Album(this.album);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations
     * Returns recommendations for track.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options Optional additional options.
     * @returns {Tracks} Track Instance with recommended tracks.
     */
    getRecommendations: async function(wrapper, limit, options) {
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
            return new Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations with Audio Features
     * Returns recommendations for track with added target on audio feature values.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options Optional additional options.
     * @returns {Tracks} Track Instance with recommended tracks.
     */
    getRecommendationWithAudioFeatures: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Track.getRecommendationWithAudioFeatures: Invalid Parameter \"options\"");
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
            return new Tracks(response.body.tracks);
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
    loadFullObject: function(data) {
        try {
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
     * 
     * @param {object} data Object with track link object data.
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
     * 
     * @param {object} data Object with track audio feature data.
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
     * 
     * @param {object} data Object with track audio analysis data.
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
     * Retrieve Full Object
     * Retrieves full track data from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(wrapper) {
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveAudioFeatures: async function(wrapper) {
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveAudioAnalysis: async function(wrapper) {
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
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} trackId Id of track.
 * @returns {Track} Track from id.
 */
Track.getTrack = async function(wrapper, trackId) {
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

 /**
 * Constructor
 * Creates a new Tracks Instance.
 * 
 * @param {Array | Track | object | string} data (optional) Data to be preloaded. Single or multiple tracks.
 */
function Tracks(data) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Track || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Tracks.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Tracks.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param {Track | object | string } track Track Instance, track object or track id to add. 
     */
    push: function(track) {
        try {
            if (track instanceof Track) {
                if (!(track.id in this.items)) {
                    this.items[track.id] = track;
                }
                this.order.push(track.id);
            } else if (typeof(track) == 'object') {
                if ('track' in track) {
                    if (!(track.track.id in this.items)) {
                        this.items[track.track.id] = new Track(track.track);
                        if ('is_local' in track) {
                            this.items[track.track.id].is_local = track.is_local;
                        }
                        if ('added_at' in track) {
                            this.items[track.track.id].added_at = track.added_at;
                        }
                        if ('added_by' in track) {
                            this.items[track.track.id].added_by = track.added_by;
                        }
                    }
                    this.order.push(track.track.id);
                } else {
                    if (!(track.id in this.items)) {
                        this.items[track.id] = new Track(track);
                    }
                    this.order.push(track.id);
                }

            } else if (typeof(track) == 'string') {
                if (!(track in this.items)) {
                    this.items[track] = new Track(track);
                }
                this.order.push(track);
            } else {
                throw new Error("Tracks.push: Invalid Parameter \"track\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param {Tracks | array } tracks Another Tracks instance or array of Track instances, track objects, or track ids to concat.
     */
    concat: function(tracks) {
        try {
            if (tracks instanceof Tracks) {
                for (let track in tracks.items) {
                    if (!(track in this.items)) {
                        this.items[track] = tracks.items[track];
                    }
                    this.order.push(tracks.items[track].id);
                }
            } else if (tracks instanceof Array) {
                for (let i = 0; i < tracks.length; i++) {
                    this.push(tracks[i]);
                }
            } else {
                throw new Error("Tracks.concat: Invalid Parameter \"tracks\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove
     * Removes an item from the Manager Object.
     * @param {Track | Object | String } track Track instance, track data, or track id to remove.
     */
    remove: function(track) {
        try {
            let id = null;
            if (track instanceof Track || typeof(track) == 'object') {
                id = track.id;
            } else if (typeof(track) == 'string') {
                id = track;
            } else {
                throw new Error("Tracks.remove: Invalid Parameter \"track\"");
            }
            this.order = this.order.filter((item) => {
                return item != id;
            });
            delete this.items[id];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove Indexes
     * Removes multiple items by index from the manager Object.
     * @param {Array} indexes Indexes to be removed.
     */
    removeIndexes: function(indexes) {
        try {
            let sorted = indexes.sort((a, b) => b - a);
            for (let i = 0; i < sorted.length; i++) {
                let id = this.order[sorted[i]];
                this.order.splice(sorted[i], 1);
                if (!this.order.includes(id)) {
                    delete this.items[id];
                }
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
            return this.order.length;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an item
     * 
     * @param {string | object | Track} track Track ID, Track instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: function(track, startAt) {
        try {
            let id = null;
            if (typeof(track) == 'string') {
                id = track;
            } else if (track instanceof Track || typeof(track) == 'object') {
                id = track.id;  
            } 
            if (track == null) {
                throw new Error("Tracks.findIndex: Invalid Parameter \"track\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Tracks.findIndex: Invalid Parameter \"startAt\"");
            }
            for (let i = startAt; i < this.order.length; i++) {
                if (this.order[i] == id) {
                    return i;
                }
            }
            return -1;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * 
     * @param {string | object | Track} track Track ID, Track instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: function(track) {
        try {
            let id = null;
            if (typeof(track) == 'string') {
                id = track;
            } else if (track instanceof Track || typeof(track) == 'object') {
                id = track.id;  
            } 
            if (track == null) {
                throw new Error("Tracks.includes: Invalid Parameter \"track\"");
            }
            for (let track in this.items) {
                if (track == id) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter
     * Returns Track object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Tracks} Filtered Tracks object.
     */
    filter: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Tracks.filter: \"method\" is not a function"); 
            }
            let newTracks = new Tracks();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newTracks.push(this.items[this.order[i]]);
                }
            }
            return newTracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns track object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Track} Track at a given index
     */
    get: function(index) {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Tracks.get: Index out of range");
            }
            return this.items[this.order[index]];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * 
     * @returns {Array} Array of IDs
     */
    getIDs: function() {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: function() {
        try {
            let ids = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(ids.includes(this.order[i]))) {
                    ids.push(this.order[i]);
                }
            }
            return ids;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Get URIs
     * Returns array of URIs in order.
     * 
     * @returns {Array} Array of URIs
     */
    getURIs: async function() {
        try {
            return await this.order.map((id) => 'spotify:track' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get URIs No Repeats
     * Returns array of URIs with no repeats.
     * 
     * @returns {Array} Array of URIs
     */
    getURIsNoRepeats: async function() {
        try {
            let uris = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(uris.includes(this.order[i]))) {
                    uris.push(this.order[i]);
                }
            }
            return await uris.map((id) => 'spotify:track' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * For Each
     * Runs a function on each item.
     * 
     * @param {function} method Function to be run on each item.
     */
    forEach: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Tracks.forEach: \"method\" is not a function"); 
            }
            for (let i = 0; i < this.order; i++) {
                await method(this.items[this.order[i]]);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: function() {
        try {
            this.order.reverse();
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
            let id = this.order.pop();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
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
            let id = this.order.shift();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Slice
     * Removes elements.
     * 
     * @param {number} start Start of removal
     * @param {number} end End of removal (Exclusive)
     * @returns {Tracks} Removed Tracks.
     */
    slice: async function(start, end) {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Tracks(await ids.map((id) => this.items[id]));
            for (let i = 0; i < ids.length; i++) {
                if (!(this.order.includes(ids[i]))) {
                    delete this.items[ids[i]];
                }
            }
            return items;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort
     * Sort Tracks
     * 
     * @param {function} compareFunction Sorting method.
     */
    sort: async function(compareFunction) {
        try {
            let sorted = await (await Object.values(this.items)).sort(compareFunction);
            this.order = await sorted.map((item) => item.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort Safe
     * Sorts but ensures properties are present prior to sort.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async function(wrapper, order, property) {
        try {
            let fullObject = ["name", "album", "artists", "available_markets", "disc_number", "duration_ms", "explicit", "external_ids", "external_urls", "href", "is_playable", "linked_from", "restrictions", "popularity", "preview_url", "track_number", "uri", "is_local"];
            let audioFeatures = ["duration_ms","key","mod","time_signature","acousticness","danceability","energy","instrumentalness","liveness","loudness","speechiness","valence","tempo","uri","track_href","analysis_url"];
            let audioAnalysis = [ "bars", "beats", "sections", "segments", "tatums", "track"];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else if (audioFeatures.includes(propertyPrior)) {
                await this.retrieveAudioFeatures(wrapper);
            } else if (audioAnalysis.includes(propertyPrior)) {
                for (let track in this.items) {
                    await this.items[track].retrieveAudioAnalysis(wrapper);
                }
            } else {
                for (let track in this.items) {
                    if (!(property in this.items[track])) {
                        throw new Error("Tracks.sortSafe: Invalid Parameter \"property\", you have tracks that don't contain that property.");
                    }
                }
            }
            let ordered = await Object.values(this.items).sort((a, b) => {
                if (typeof(a[property]) == 'string') {
                    let aPrior = a[property].localeCompare(b[property]);
                    return order > 0 ? aPrior : (aPrior * -1) 
                }
                return order > 0 ? a[property] - b[property] : b[property]- a[property];
            });
            return new Tracks(ordered);
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
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error("Tracks.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Plays Tracks
     * Plays tracks on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     * options.offset.position: {Number} (Optional) Index of track to begin with.
     * options.offset.uri: {String} (Optional) Track URI to begin with.
     * options.position_ms: {Number} Position to start playback (Milliseconds)
     */
    play: async function(wrapper, options) {
        try {
            let _options = options ? options : {};
            _options.uris = await this.order.map((track) => 'spotify:track:' + this.items[track].id);
            await wrapper.play(_options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Liked
     * Returns array of booleans whether tracks are saved to the user's library.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Booleans Whether track are saved to the user's library.
     */
    areLiked: async function(wrapper) {
        try {
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            let response = await wrapper.containsMySavedTracks(await tracks.map((track) => track.id));
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
    * Like Track
    * Adds tracks to the user's library.
    * 
    * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
    */
    likeAll: async function(wrapper) {
        try {
            await wrapper.addToMySavedTracks(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Track
    * Removes tracks from the user's library.
    * 
    * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
    */
    unlikeAll: async function(wrapper) {
        try {
            await wrapper.removeFromMySavedTracks(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full track data for all tracks. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified track data for all tracks. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Link Objects
     * Returns track link data for all tracks. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Link Objects.
     */
    getLinkObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'link');
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getLinkObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Tracks Audio Features
     * Returns audio feature data for all tracks. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Audio Features.
     */
    getAudioFeatures: async function(wrapper) {
        try {
            await this.retrieveAudioFeatures(wrapper);
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getAudioFeatures(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Tracks Audio Analysis
     * Returns audio analysis data for all tracks. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Audio Analysis Data.
     */
    getAudioAnalysis: async function(wrapper) {
        try {
            await this.retrieveAudioAnalysis(wrapper);
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getAudioAnalysis(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Data
     * Returns all data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of All Track's Data
     */
    getAllData: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            await this.retrieveAudioFeatures(wrapper);
            await this.retrieveAudioAnalysis(wrapper);
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getAllData(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Tracks Current Data
     * Just returns whatever the track objects currently hold.
     * 
     * @returns {array} Array of Current Track Data
     */
    getCurrentData: async function() {
        try {
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Track's Artists
     * Returns Artists instance with all track's artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists object of all track's artists.
     */
    getArtists: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let artists = new Artists();
            for (let track in this.items) {
                await artists.concat(await this.items[track].getArtists(wrapper));
            }
            return artists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Track's Albums
     * Returns Albums instance with all track's albums.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums} Albums object of all track's albums.
     */
    getAlbums: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let albums = new Albums();
            for (let track in this.items) {
                await albums.push(await this.items[track].getAlbum(wrapper));
            }
            return albums;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Audio Feature Averages
     * Returns averages for each audio feature.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} With audio feature properties.
     */
    getAudioFeatureAverages: async function(wrapper) {
        try {
            await this.retrieveAudioFeatures(wrapper);
            let addAudioFeatures = async (total, curr) => {
                let data = await curr.getAudioFeatures(wrapper);
                return {
                    duration_ms: total.duration_ms + data.duration_ms,
                    key: total.key + data.key,
                    mode: total.mode + data.mode,
                    time_signature: total.time_signature + data.time_signature,
                    acousticness: total.acousticness + data.acousticness,
                    danceability: total.danceability + data.danceability,
                    energy: total.energy + data.energy,
                    instrumentalness: total.instrumentalness + data.instrumentalness,
                    liveness: total.liveness + data.liveness,
                    loudness: total.loudness + data.loudness,
                    speechiness: total.speechiness + data.speechiness,
                    valence: total.valence + data.valence,
                    tempo: total.tempo + data.tempo,
                }
            };
            let averages = await Object.values(this.items).reduce(addAudioFeatures, {
                duration_ms: 0,
                key: 0,
                mode: 0,
                time_signature: 0,
                acousticness: 0,
                danceability: 0,
                energy: 0,
                instrumentalness: 0,
                liveness: 0,
                loudness: 0,
                speechiness: 0,
                valence: 0,
                tempo: 0,
            });
            let size = Object.keys(this.items).length;
            for (let property in averages) {
                averages[property] /= size;
            }
            return averages;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Audio Feature Distributions
     * Returns distributions for each audio feature.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} size Size of distributions
     * @returns {object} With audio feature properties.
     */
    getAudioFeatureDistributions: async function(wrapper, size) {
        try {
            await this.retrieveAudioFeatures(wrapper);
            let properties = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "loudness", "speechiness", "valence", "tempo"];
            let distributeAudioFeatures = async (total, curr) => {
                let data = await curr.getAudioFeatures(wrapper);
                for (let i = 0; i < properties.length; i++) {
                    let divisor = (properties[i] == 'tempo') ? 1 : 250;
                    total[properties[i]][ Math.round((data[properties[i]] / divisor) * size - 1) ] += 1;
                }
                return total;
            };
            let emptyDistribution = [];
            for (let i = 0; i < size.length; i++) {
                emptyDistribution.push(0);
            }
            let distributions = await Object.values(this.items).reduce(distributeAudioFeatures, {
                acousticness: emptyDistribution,
                danceability: emptyDistribution,
                energy: emptyDistribution,
                instrumentalness: emptyDistribution,
                liveness: emptyDistribution,
                loudness: emptyDistribution,
                speechiness: emptyDistribution,
                valence: emptyDistribution,
                tempo: emptyDistribution,
            });
            return distributions;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations
     * Retrieves suggests for a random 5 of these tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     * @returns {Tracks} Tracks object with recommendations
     */
    getRecommendations: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Tracks.search: Invalid Parameter \"options\"");
            }
            let ids = Object.keys(this.items);
            let seeds = [];
            for (let i = 0; i < 5; i++) {
                if (!ids.length) {
                    break;
                }
                let random = Math.round(Math.random() * (ids.length - 1));
                seeds.push(ids.slice(random, random + 1));
            }
            let _options = options ? options : {};
            if ('seed_artists' in _options) {
                delete _options.seed_artists;
            }
            if ('seed_genres' in _options) {
                delete _options.seed_artists;
            }
            _options.seed_tracks = seeds.join(",");
            let response = await wrapper.getRecommendations(_options);
            return new Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full track data for all tracks from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the track contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            let ids = [];
            for (let track in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[track].containsSimplifiedObject())) {
                        ids.push(track);
                    }
                } else if (objectType == 'link') {
                    if (!(await this.items[track].containsLinkObject())) {
                        ids.push(track);
                    }
                } else {
                    if (!(await this.items[track].containsFullObject())) {
                        ids.push(track);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getTracks(ids.splice(0, 50));
                    for (let i = 0; i < response.body.tracks.length; i++) {
                        if (response.body.tracks[i] == null) continue;
                        this.items[response.body.tracks[i].id].loadFullObject(response.body.tracks[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Audio Features
     * Retrieves audio feature data for all tracks from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveAudioFeatures: async function(wrapper) {
        try {
            let ids = [];
            for (let track in this.items) {
                if (!(await this.items[track].containsAudioFeatures())) {
                    ids.push(track);
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getAudioFeaturesForTracks(ids.splice(0, 50));
                    for (let i = 0; i < response.body.tracks.length; i++) {
                        if (response.body.tracks[i] == null) continue;
                        this.items[response.body.tracks[i].id].loadAudioFeatures(response.body.tracks[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Audio Analysis
     * Retrieves audio analysis data for all tracks from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveAudioAnalysis: async function(wrapper) {
        try {
            for (let track in this.items) {
                if (!(await this.items[track].containsAudioAnalysis())) {
                    response = await wrapper.getAudioAnalysisForTrack(track);
                    this.items[track].loadAudioAnalysis(response.body);
                }
            }
        } catch (error) {
            throw error;
        }
    }
};

/**
 * Search for a Track
 * Returns search results for a query.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned from Search.
 */
Tracks.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.search: Invalid Parameter \"options\"");
        }
        let response = await wrapper.searchTracks(query, options ? options : {});
        return new Tracks(response.body.tracks.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Recommendations
 * Returns search results for a query based on seeds
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned from Search.
 */
Tracks.getRecommendations = async function(wrapper, options) {
    try {
        if (options == null || typeof(options) != 'object') {
            throw new Error("Tracks.getRecommendations: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getRecommendations(options ? options : {});
        return new Tracks(response.body.tracks);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Top Tracks
 * Returns users top played tracks.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMyTopTracks = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.getMyTopTracks: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getMyTopTracks(options ? options : {});
        return new Tracks(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get My Recently PLayed
 * Returns users recently played tracks.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMyRecentlyPlayedTracks = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.getMyRecentlyPlayedTracks: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getMyRecentlyPlayedTracks(options ? options : {});
        return new Tracks(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Saved Tracks
 * Returns saved tracks.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMySavedTracks = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.getMySavedTracks: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getMySavedTracks(options ? options : {});
        return new Tracks(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All Saved Tracks
 * Returns all saved tracks.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getAllMySavedTracks = async function(wrapper) {
    try {
        let _options = { limit: 50, offset: 0 };
        let tracks = new Tracks();
        let response;
        do {
            response = await wrapper.getMySavedTracks(_options);
            await tracks.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return tracks;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Playlist Tracks
 * Returns tracks from playlist.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} id ID for playlist
 * @returns {Tracks} Tracks from playlist.
 */
Tracks.getPlaylistTracks = async function(wrapper, id) {
    try {
        let playlist = new Tracks.Playlist(id);
        return await playlist.getTracks(wrapper);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Album's Tracks
 * Returns tracks from album.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} id ID for album
 * @returns {Tracks} Tracks from album.
 */
Tracks.getAlbumTracks = async function(wrapper, id) {
    try {
        let album = new Tracks.Album(id);
        return await album.getTracks(wrapper);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Tracks
 * Returns Tracks object of IDs
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} trackIds Ids of tracks.
 * @returns {Tracks} Tracks from ids.
 */
Tracks.getTracks = async function(wrapper, trackIds) {
    try {
        let tracks = new Tracks(trackIds);
        await tracks.retrieveFullObjects(wrapper);
        return tracks;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Artist's Top Tracks
 * Returns Artist's top tracks.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} id ID for artist
 * @returns {Tracks} Tracks from Artist top tracks..
 */
Tracks.getArtistTopTracks = async function(wrapper, id) {
    try {
        let artist = new Tracks.Artist(id);
        return await artist.getTopTracks(wrapper);
    } catch (error) {
        throw error;
    }
};

Tracks.addMethods = addMethods;

Tracks.override = override;

 /**
 * Album Constructor
 * Creates a new Album Instance for a given album.
 * 
 * @param {Object | String} data Data to be preloaded. Must either be a string of the album ID or contain an `id` property.
 */
function Album(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
            this._tracks = new Tracks();
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Album.constructor: No ID Provided");
            }
            this.name = 'name' in data ? data.name : null;
            this.album_type = 'album_type' in data ? data.album_type : null;
            this.artists = 'artists' in data ? data.artists : null;
            this.available_markets = 'available_markets' in data ? data.available_markets : null;
            this.copyrights = 'copyrights' in data ? data.copyrights : null;
            this.external_ids = 'external_ids' in data ? data.external_ids : null;
            this.external_urls = 'external_urls' in data ? data.external_urls : null;
            this.genres = 'genres' in data ? data.genres : null;
            this.href = 'href' in data ? data.href : null;
            this.images = 'images' in data ? data.images : null;
            this.label = 'label' in data ? data.label : null;
            this.popularity = 'popularity' in data ? data.popularity : null;
            this.release_date = 'release_date' in data ? data.release_date : null;
            this.release_date_precision = 'release_date_precision' in data ? data.release_date_precision : null;
            this.restrictions = 'restrictions' in data ? data.restrictions : null;
            this.tracks = 'tracks' in data ? data.tracks : null;
            this.uri = 'uri' in data ? data.uri : null;
            this.album_group = 'album_group' in data ? data.album_group : null;
            this._tracks = '_tracks' in data ? data._tracks : new Tracks();
            if ('tracks' in data) {
                if ('items' in data.tracks) {
                    this.loadTracks(data.tracks.items);
                } else if (data.tracks instanceof Array) {
                    this.loadTracks(data.tracks);
                }
            }
        } else {
            throw new Error("Album.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Album.prototype = {
    /**
     * Play Album
     * Plays album on user's active device.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    play: async function(wrapper, options) {
        try {
            let _options = options ? options : {};
            _options.context_uri = 'spotify:album:' + this.id;
            return await wrapper.play(_options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Liked
     * Returns whether an album is saved to the user's library.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether album is saved to the user's library.
     */
    isLiked: async function(wrapper) {
        try {
            let response = await wrapper.containsMySavedAlbums([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Like Album
     * Adds album to the user's library.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    like: async function(wrapper) {
        try {
            return await wrapper.addToMySavedAlbums([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Album
    * Removes album from the user's library.
    * 
    * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
    */
    unlike: async function(wrapper) {
        try {
            return await wrapper.removeFromMySavedAlbums([this.id]);
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
    containsFullObject: function() {
        return ((this.name != null) && (this.album_type != null) && (this.artists != null) && (this.available_markets != null) && (this.copyrights != null) && (this.external_ids) && (this.external_urls) && (this.genres != null) && (this.href != null) && (this.images != null) && (this.label != null) && (this.popularity != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.restrictions) && (this.tracks != null) && (this.uri != null) );
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.album_type != null) && (this.artists != null) && (this.available_markets != null) && (this.external_urls) && (this.href != null) && (this.images != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.restrictions) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full album data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Album Full Object Data.
     */
    getFullObject: async function(wrapper) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                album_type: this.album_type,
                artists: this.artists,
                available_markets: this.available_markets,
                copyrights: this.copyrights,
                external_ids: this.external_ids,
                external_urls: this.external_urls,
                genres: this.genres,
                href: this.href,
                images: this.images,
                label: this.label,
                popularity: this.popularity,
                release_date: this.release_date,
                release_date_precision: this.release_date_precision,
                restrictions: this.restrictions,
                tracks: this.tracks,
                uri: this.uri,
                type: 'album',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified album data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Album Simplified Object Data.
     */
    getSimplifiedObject: async function(wrapper) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
            }
            let data = {
                id: this.id,
                name: this.name,
                album_type: this.album_type,
                artists: this.artists,
                available_markets: this.available_markets,
                external_urls: this.external_urls,
                href: this.href,
                images: this.images,
                release_date: this.release_date,
                release_date_precision: this.release_date_precision,
                restrictions: this.restrictions,
                uri: this.uri,
                type: 'album',
            };
            if (this.album_group != null) {
                data.album_group = this.album_group;
            }
            return data; 
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the album object currently holds
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any Album Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'album' };
            let properties = ['name', 'album_type', 'artists', 'available_markets', 'copyrights', 'external_ids', 'external_urls', 'genres', 'href', 'images', 'label', 'popularity', 'release_date', 'release_date_precision', 'restrictions', 'tracks', 'uri', '_tracks'];
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
     * Get Album Tracks
     * Returns Tracks object of album tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks} Tracks instance with all album tracks.
     */
    getTracks: async function(wrapper) {
        try {
            await this.retrieveTracks(wrapper);
            return this._tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Album Artists
     * Returns Artists object of album artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists instance with all album artists.
     */
    getArtists: async function(wrapper) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return new Artists(this.artists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full album data from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(wrapper) {
        try {
            let response = await wrapper.getAlbum(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Album Tracks
     * Retrieves all tracks in album from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveTracks: async function(wrapper) {
        try {
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await wrapper.getAlbumTracks(this.id, options);
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
     * @param {object} data Object with album full object data.
     */
    loadFullObject: async function(data) {
        try {
            this.name = data.name;
            this.album_type = data.album_type;
            this.artists = data.artists;
            this.available_markets = data.available_markets;
            this.copyrights = data.copyrights;
            this.external_ids = data.external_ids;
            this.external_urls = data.external_urls;
            this.genres = data.genres;
            this.href = data.href;
            this.images = data.images;
            this.label = data.label;
            this.popularity = data.popularity;
            this.release_date = data.release_date;
            this.release_date_precision = data.release_date_precision;
            this.restrictions = data.restrictions;
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
     * @param {object} data Object with album simplified object data.
     */
    loadSimplifiedObject: async function(data) {
        try {
            this.id = data.id;
            this.name = data.name;
            this.album_type = data.album_type;
            this.artists = data.artists;
            this.available_markets = data.available_markets;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.images = data.images;
            this.release_date = data.release_date;
            this.release_date_precision = data.release_date_precision;
            this.restrictions = data.restrictions;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Track
     * Helper method to add tracks to album's internal Tracks item.
     * 
     * @param {Tracks | Array | Track | object | string} tracks 
     */
    loadTracks: async function(tracks) {
        try {
            if (tracks instanceof Tracks || tracks instanceof Array) {
                this._tracks.concat(tracks);
            } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                this._tracks.push(tracks);
            } else {
                throw new Error("Album.loadTracks: Invalid Parameter \"tracks\"");
            }
        } catch (error) {
            throw error;
        }
    },
}

/**
 * Get Album
 * Returns Album object of ID
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {String} albumId Id of album.
 * @returns {Album} Album from id.
 */
Album.getAlbum = async function(wrapper, albumId) {
    try {
        let album = new Album(albumID);
        return await album.retrieveFullObjects(wrapper);
    } catch (error) {
        throw error;
    }
};

Album.addMethods = addMethods;

Album.override = override;

 /**
 * Constructor
 * Creates a new Albums Instance.
 * 
 * @param {Array | Album | object | string} data (optional) Data to be preloaded. Single or multiple albums.
 */
function Albums(data) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Album || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Tracks.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Albums.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param {Album | object | string } album Album Instance, album object or album id to add. 
     */
    push: function(album) {
        try {
            if (album instanceof Album) {
                if (!(album.id in this.items)) {
                    this.items[album.id] = album;
                }
                this.order.push(album.id);
            } else if (typeof(album) == 'object') {
                if ('album' in album) {
                    if (!(album.album.id in this.items)) {
                        this.items[album.album.id] = new Album(album.album);
                        if ('is_local' in album) {
                            this.items[album.album.id].is_local = album.is_local;
                        }
                        if ('added_at' in album) {
                            this.items[album.album.id].added_at = album.added_at;
                        }
                        if ('added_by' in album) {
                            this.items[album.album.id].added_by = album.added_by;
                        }
                    }
                    this.order.push(album.album.id);
                } else {
                    if (!(album.id in this.items)) {
                        this.items[album.id] = new Album(album);
                    }
                    this.order.push(album.id);
                }

            } else if (typeof(album) == 'string') {
                if (!(album in this.items)) {
                    this.items[album] = new Album(album);
                }
                this.order.push(album);
            } else {
                throw new Error("Albums.push: Invalid Parameter \"album\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param {Albums | array } albums Another Albums instance or array of Album instances, album objects, or album ids to concat.
     */
    concat: function(albums) {
        try {
            if (albums instanceof Albums) {
                for (let album in albums.items) {
                    if (!(album in this.items)) {
                        this.items[album] = albums.items[album];
                    }
                    this.order.push(albums.items[album].id);
                }
            } else if (albums instanceof Array) {
                for (let i = 0; i < albums.length; i++) {
                    this.push(albums[i]);
                }
            } else {
                throw new Error("Albums.concat: Invalid Parameter \"albums\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove
     * Removes an item from the Manager Object.
     * 
     * @param {Album | object | string } album Album instance, album data, or album id to remove.
     */
    remove: function(album) {
        try {
            let id = null;
            if (album instanceof Album || typeof(album) == 'object') {
                id = album.id;
            } else if (typeof(album) == 'string') {
                id = album;
            } else {
                throw new Error("Albums.remove: Invalid Parameter \"album\"");
            }
            this.order = this.order.filter((item) => {
                return item != id;
            });
            delete this.items[id];
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
            return this.order.length;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an item
     * 
     * @param {string | object | Album} album Album ID, Album instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: function(album, startAt) {
        try {
            let id = null;
            if (typeof(album) == 'string') {
                id = album;
            } else if (album instanceof Album || typeof(album) == 'object') {
                id = album.id;  
            } 
            if (album == null) {
                throw new Error("Albums.findIndex: Invalid Parameter \"album\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Albums.findIndex: Invalid Parameter \"startAt\"");
            }
            for (let i = startAt; i < this.order.length; i++) {
                if (this.order[i] == id) {
                    return i;
                }
            }
            return -1;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * 
     * @param {string | object | Album} album Album ID, Album instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: function(album) {
        try {
            let id = null;
            if (typeof(album) == 'string') {
                id = album;
            } else if (album instanceof Album || typeof(album) == 'object') {
                id = album.id;  
            } 
            if (album == null) {
                throw new Error("Albums.includes: Invalid Parameter \"album\"");
            }
            for (let album in this.items) {
                if (album == id) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter
     * Returns Album object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Albums} Filtered Albums object.
     */
    filter: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Albums.filter: \"method\" is not a function"); 
            }
            let newAlbums = new Albums();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newAlbums.push(this.items[this.order[i]]);
                }
            }
            return newAlbums;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns album object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Album} Album at a given index
     */
    get: function(index) {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Albums.get: Index out of range");
            }
            return this.items[this.order[index]];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * 
     * @returns {Array} Array of IDs
     */
    getIDs: function() {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: function() {
        try {
            let ids = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(ids.includes(this.order[i]))) {
                    ids.push(this.order[i]);
                }
            }
            return ids;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Get URIs
     * Returns array of URIs in order.
     * 
     * @returns {Array} Array of URIs
     */
    getURIs: async function() {
        try {
            return await this.order.map((id) => 'spotify:album' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get URIs No Repeats
     * Returns array of URIs with no repeats.
     * 
     * @returns {Array} Array of URIs
     */
    getURIsNoRepeats: async function() {
        try {
            let uris = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(uris.includes(this.order[i]))) {
                    uris.push(this.order[i]);
                }
            }
            return await uris.map((id) => 'spotify:album' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * For Each
     * Runs a function on each item.
     * 
     * @param {function} method Function to be run on each item.
     */
    forEach: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Albums.forEach: \"method\" is not a function"); 
            }
            for (let i = 0; i < this.order; i++) {
                await method(this.items[this.order[i]]);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: function() {
        try {
            this.order.reverse();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pop
     * Removes last item.
     * 
     * @returns {Album} Removed item
     */
    pop: function() {
        try {
            let id = this.order.pop();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Shift
     * Removes first item.
     * 
     * @returns {Album} Removed item
     */
    shift: function() {
        try {
            let id = this.order.shift();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Slice
     * Removes elements.
     * 
     * @param {number} start Start of removal
     * @param {number} end End of removal (Exclusive)
     * @returns {Albums} Removed Albums.
     */
    slice: async function(start, end) {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Albums(await ids.map((id) => this.items[id]));
            for (let i = 0; i < ids.length; i++) {
                if (!(this.order.includes(ids[i]))) {
                    delete this.items[ids[i]];
                }
            }
            return items;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort
     * Sort Albums
     * 
     * @param {function} compareFunction Sorting method.
     */
    sort: async function(compareFunction) {
        try {
            let sorted = await (await Object.values(this.items)).sort(compareFunction);
            this.order = await sorted.map((item) => item.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort Safe
     * Sorts but ensures properties are present prior to sort.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async function(wrapper, order, property) {
        try {
            let fullObject = ['id', 'name', 'album_type', 'artists', 'available_markets', 'copyrights', 'external_ids', 'external_urls', 'genres', 'href', 'images', 'label', 'popularity', 'release_date', 'release_date_precision', 'restrictions', 'tracks', 'uri', '_tracks'];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else {
                for (let album in this.items) {
                    if (!(property in this.items[album])) {
                        throw new Error("Albums.sortSafe: Invalid Parameter \"property\", you have albums that don't contain that property.");
                    }
                }
            }
            let ordered = await Object.values(this.items).sort((a, b) => {
                if (typeof(a[property]) == 'string') {
                    let aPrior = a[property].localeCompare(b[property]);
                    return order > 0 ? aPrior : (aPrior * -1) 
                }
                return order > 0 ? a[property] - b[property] : b[property]- a[property];
            });
            return new Albums(ordered);
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
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error("Albums.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Plays Albums
     * Plays albums on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    play: async function(wrapper, options) {
        try {
            let tracks = await this.getTracks(wrapper);
            return await tracks.play(wrapper, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Liked
     * Returns array of booleans whether albums are saved to the user's library.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Booleans Whether album are saved to the user's library.
     */
    areLiked: async function(wrapper) {
        try {
            let response = await wrapper.containsMySavedAlbums(this.order);
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
    * Like Albums
    * Adds albums to the user's library.
    * 
    * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
    */
    likeAll: async function(wrapper) {
        try {
            await wrapper.Constr.addToMySavedAlbums(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Album
    * Removes albums from the user's library.
    * 
    * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
    */
    unlikeAll: async function(wrapper) {
        try {
            await wrapper.removeFromMySavedAlbums(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full album data for all albums. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Album Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let albums = await this.order.map((album) => {
                return this.items[album]; 
            });
            return await Promise.all(await albums.map(async (album) => {
                return await album.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified album data for all albums. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Album Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let albums = await this.order.map((album) => {
                return this.items[album]; 
            });
            return await Promise.all(await albums.map(async (album) => {
                return await album.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Albums Current Data
     * Just returns whatever the album objects currently hold.
     * 
     * @returns {array} Array of Current Album Data
     */
    getCurrentData: async function() {
        try {
            let albums = await this.order.map((album) => {
                return this.items[album]; 
            });
            return await Promise.all(await albums.map(async (album) => {
                return await album.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Album's Artists
     * Returns Artists instance with all album's artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists object of all album's artists.
     */
    getArtists: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let artists = new Artists();
            for (let album in this.items) {
                await artists.concat(await this.items[album].getArtists(wrapper));
            }
            return artists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Album's Tracks
     * Returns Tracks instance with all album's tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks} Tracks object of all album's tracks.
     */
    getTracks: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let tracks = new Tracks();
            for (let album in this.items) {
                await tracks.concat(await this.items[album].getTracks(wrapper));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full album data for all albums from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the album contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            let ids = [];
            for (let album in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[album].containsSimplifiedObject())) {
                        ids.push(album);
                    }
                } else {
                    if (!(await this.items[album].containsFullObject())) {
                        ids.push(album);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getAlbums(ids.splice(0, 50));
                    for (let i = 0; i < response.body.albums.length; i++) {
                        if (response.body.albums[i] == null) continue;
                        this.items[response.body.albums[i].id].loadFullObject(response.body.albums[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Search for an Album
 * Returns search results for a query.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums returned from Search.
 */
Albums.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Albums.search: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await wrapper.searchAlbums(query, _options);
        return new Albums(response.body.albums.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Saved Albums
 * Returns saved albums.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums returned request.
 */
Albums.getMySavedAlbums = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Albums.getMySavedAlbums: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await wrapper.getMySavedAlbums(_options);
        return new Albums(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All Saved Albums
 * Returns all saved albums.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums returned request.
 */
Albums.getAllMySavedAlbums = async function(wrapper) {
    try {
        let _options = { limit: 50, offset: 0 };
        let albums = new Albums();
        let response;
        do {
            response = await wrapper.getMySavedAlbums(_options);
            await albums.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return albums;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Albums
 * Returns Albums object of IDs
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} albumIds Ids of albums.
 * @returns {Albums} Albums from ids.
 */
Albums.getAlbums = async function(wrapper, albumIds) {
    try {
        let albums = new Albums(albumIds);
        await albums.retrieveFullObjects(wrapper);
        return albums;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Artist's Albums
 * Returns Artist's Albums.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} id ID for artist
 * @returns {Albums} Albums of all Artist's Albums.
 */
Albums.getArtistAlbums = async function(wrapper, id) {
    try {
        let artist = new Artist(id);
        return await artist.getAlbums(wrapper);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Albums
 * Returns Albums object with user saved albums.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Albums} Albums of user saved albums.
 */
Albums.getNewReleases = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Albums.getNewReleases: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await wrapper.getNewReleases(_options);
        return new Albums(response.body.albums);
    } catch (error) {
        throw error;
    }
};

Albums.addMethods = addMethods;

Albums.override = override;

 /**
 * Artist Constructor
 * Creates a new Artist Instance for a given artist.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the artist ID or contain an `id` property.
 */
function Artist(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Artist.constructor: No ID Provided");
            }
            this.name = 'name' in data ? data.name : null;
            this.external_urls = 'external_urls' in data ? data.external_urls : null;
            this.followers = 'followers' in data ? data.followers : null;
            this.genres = 'genres' in data ? data.genres : null;
            this.href = 'href' in data ? data.href : null;
            this.images = 'images' in data ? data.images : null;
            this.popularity = 'popularity' in data ? data.popularity : null;
            this.uri = 'uri' in data ? data.uri : null;
        } else {
            throw new Error("Artist.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Artist.prototype = {
    /**
     * Play Artist
     * Plays artist on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    play: async function(wrapper, options) {
        try {
            let _options = options ? options : {};
            _options.context_uri = 'spotify:artist:' + this.id;
            return await wrapper.play(_options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Followed
     * Returns whether an artist is followed by the user.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether artist is followed by user.
     */
    isFollowed: async function(wrapper) {
        try {
            let response = await wrapper.isFollowingArtists([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Artist
     * Follows artist.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    follow: async function(wrapper) {
        try {
            return await wrapper.followArtists([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Artist
     * Unfollows artist.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    unfollow: async function(wrapper) {
        try {
            return await wrapper.unfollowArtists([this.id]);
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
    containsFullObject: function() {
        return ((this.name != null) && (this.external_urls) && (this.followers) && (this.genres != null) && (this.href != null) && (this.images != null) && (this.popularity != null) && (this.uri != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.external_urls) && (this.href != null) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full artist data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Artist Full Object Data.
     */
    getFullObject: async function(wrapper) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                external_urls: this.external_urls,
                followers: this.followers,
                genres: this.genres,
                href: this.href,
                images: this.images,
                popularity: this.popularity,
                uri: this.uri,
                type: 'artist',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified artist data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Artist Simplified Object Data.
     */
    getSimplifiedObject: async function(wrapper) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                external_urls: this.external_urls,
                href: this.href,
                uri: this.uri,
                type: 'artist',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the artist object currently holds
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any Artist Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'artist' };
            let properties = ['name', 'external_urls', 'followers', 'genres', 'href', 'images', 'popularity', 'uri'];
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
     * Get Artist's Top Tracks
     * Returns Tracks instance with Artist's top Tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} countryCode (Optional) country code.
     * @returns {Tracks} Tracks instance of artist's top Tracks
     */
    getTopTracks: async (wrapper, countryCode) => {
        try {
            let response =  await wrapper.getArtistTopTracks(this.id, countryCode ? countryCode : "US");
            return new Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Tracks
     * Returns Tracks instance with All Artist's Tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks} Tracks instance with All Artist's Tracks
     */
    getAllTracks: async function(wrapper) {
        try {
            let tracks = new Tracks();
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await wrapper.getArtistAlbums(this.id, options);
                let albums = new Albums(response.body.items);
                await tracks.concat(await albums.getAllTracks(wrapper));
                options.offset += 50;
            } while (!(response.body.items.length < 50));
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artist's Albums
     * Returns Albums instance with Artist's Albums.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums} Albums instance with Artist's Albums
     */
    getAlbums: async (wrapper, options) => {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Artist.getAlbums: Invalid Parameter \"options\"");
            }
            let response = await wrapper.getArtistAlbums(this.id, options ? options : {});
            return new Albums(response.body.items);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Albums
     * Returns Albums instance with All Artist's Albums.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums} Albums instance with All Artist's Albums
     */
    getAllAlbums: async function(wrapper) {
        try {
            let albums = new Albums();
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await wrapper.getArtistAlbums(this.id, options);
                await albums.concat(response.body.items);
                options.offset += 50;
            } while (!(response.body.items.length < 50));
            return albums;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Related Artists
     * Returns Artists instance with Artist's Related Artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists instance of related Artists
     */
    getRelatedArtists: async function(wrapper) {
        try {
            let response = await wrapper.getArtistRelatedArtists(this.id);
            return new Artists(response.body.artists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * 
     * @param {object} data Object with artist full object data.
     */
    loadFullObject: (data) => {
        try {
            this.name = data.name;
            this.external_urls = data.external_urls;
            this.followers = data.followers;
            this.genres = data.genres;
            this.href = data.href;
            this.images = data.images;
            this.popularity = data.popularity;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Simplified Object
     * Sets simplified data (outside constructor).
     * 
     * @param {object} data Object with artist simplified object data.
     */
    loadSimplifiedObject: (data) => {
        try {
            this.name = data.name;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full artist data from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(wrapper) {
        try {
            let response = await wrapper.getArtist(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Artist
 * Returns Artist object of ID
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} artistID Id of artist.
 * @returns {Artist} Artist from id.
 */
Artist.getArtist = async (wrapper, artistID) => {
    try {
        let artist = new Artist(artistID);
        await artist.retrieveFullObject(wrapper);
        return artist;
    } catch (error) {
        throw error;
    }
};

Artist.addMethods = addMethods;

Artist.override = override;

function Artists(data) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Artist || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Artists.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Artists.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param {Artist | object | string } artist Artist Instance, artist object or artist id to add. 
     */
    push: function(artist) {
        try {
            if (artist instanceof Artist) {
                if (!(artist.id in this.items)) {
                    this.items[artist.id] = artist;
                }
                this.order.push(artist.id);
            } else if (typeof(artist) == 'object') {
                if ('artist' in artist) {
                    if (!(artist.artist.id in this.items)) {
                        this.items[artist.artist.id] = new Artist(artist.artist);
                        if ('is_local' in artist) {
                            this.items[artist.artist.id].is_local = artist.is_local;
                        }
                        if ('added_at' in artist) {
                            this.items[artist.artist.id].added_at = artist.added_at;
                        }
                        if ('added_by' in artist) {
                            this.items[artist.artist.id].added_by = artist.added_by;
                        }
                    }
                    this.order.push(artist.artist.id);
                } else {
                    if (!(artist.id in this.items)) {
                        this.items[artist.id] = new Artist(artist);
                    }
                    this.order.push(artist.id);
                }

            } else if (typeof(artist) == 'string') {
                if (!(artist in this.items)) {
                    this.items[artist] = new Artist(artist);
                }
                this.order.push(artist);
            } else {
                throw new Error("Artists.push: Invalid Parameter \"artist\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param {Artists | array } artists Another Artists instance or array of Artist instances, artist objects, or artist ids to concat.
     */
    concat: function(artists) {
        try {
            if (artists instanceof Artists) {
                for (let artist in artists.items) {
                    if (!(artist in this.items)) {
                        this.items[artist] = artists.items[artist];
                    }
                    this.order.push(artists.items[artist].id);
                }
            } else if (artists instanceof Array) {
                for (let i = 0; i < artists.length; i++) {
                    this.push(artists[i]);
                }
            } else {
                throw new Error("Artists.concat: Invalid Parameter \"artists\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove
     * Removes an item from the Manager Object.
     * 
     * @param {Artist | object | string } artist Artist instance, artist data, or artist id to remove.
     */
    remove: function(artist) {
        try {
            let id = null;
            if (artist instanceof Artist || typeof(artist) == 'object') {
                id = artist.id;
            } else if (typeof(artist) == 'string') {
                id = artist;
            } else {
                throw new Error("Artists.remove: Invalid Parameter \"artist\"");
            }
            this.order = this.order.filter((item) => {
                return item != id;
            });
            delete this.items[id];
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
            return this.order.length;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an item
     * 
     * @param {string | object | Artist} artist Artist ID, Artist instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: function(artist, startAt) {
        try {
            let id = null;
            if (typeof(artist) == 'string') {
                id = artist;
            } else if (artist instanceof Artist || typeof(artist) == 'object') {
                id = artist.id;  
            } 
            if (artist == null) {
                throw new Error("Artists.findIndex: Invalid Parameter \"artist\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Artists.findIndex: Invalid Parameter \"startAt\"");
            }
            for (let i = startAt; i < this.order.length; i++) {
                if (this.order[i] == id) {
                    return i;
                }
            }
            return -1;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * 
     * @param {string | object | Artist} artist Artist ID, Artist instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: function(artist) {
        try {
            let id = null;
            if (typeof(artist) == 'string') {
                id = artist;
            } else if (artist instanceof Artist || typeof(artist) == 'object') {
                id = artist.id;  
            } 
            if (artist == null) {
                throw new Error("Artists.includes: Invalid Parameter \"artist\"");
            }
            for (let artist in this.items) {
                if (artist == id) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter
     * Returns Artist object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Artists} Filtered Artists object.
     */
    filter: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Artists.filter: \"method\" is not a function"); 
            }
            let newArtists = new Artists();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newArtists.push(this.items[this.order[i]]);
                }
            }
            return newArtists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns artist object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Artist} Artist at a given index
     */
    get: function(index) {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Artists.get: Index out of range");
            }
            return this.items[this.order[index]];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * 
     * @returns {Array} Array of IDs
     */
    getIDs: function() {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: function() {
        try {
            let ids = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(ids.includes(this.order[i]))) {
                    ids.push(this.order[i]);
                }
            }
            return ids;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Get URIs
     * Returns array of URIs in order.
     * 
     * @returns {Array} Array of URIs
     */
    getURIs: async function() {
        try {
            return await this.order.map((id) => 'spotify:artist' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get URIs No Repeats
     * Returns array of URIs with no repeats.
     * 
     * @returns {Array} Array of URIs
     */
    getURIsNoRepeats: async function() {
        try {
            let uris = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(uris.includes(this.order[i]))) {
                    uris.push(this.order[i]);
                }
            }
            return await uris.map((id) => 'spotify:artist' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * For Each
     * Runs a function on each item.
     * 
     * @param {function} method Function to be run on each item.
     */
    forEach: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Artists.forEach: \"method\" is not a function"); 
            }
            for (let i = 0; i < this.order; i++) {
                await method(this.items[this.order[i]]);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: function() {
        try {
            this.order.reverse();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pop
     * Removes last item.
     * 
     * @returns {Artist} Removed item
     */
    pop: function() {
        try {
            let id = this.order.pop();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Shift
     * Removes first item.
     * 
     * @returns {Artist} Removed item
     */
    shift: function() {
        try {
            let id = this.order.shift();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Slice
     * Removes elements.
     * 
     * @param {number} start Start of removal
     * @param {number} end End of removal (Exclusive)
     * @returns {Artists} Removed Artists.
     */
    slice: async function(start, end) {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Artists(await ids.map((id) => this.items[id]));
            for (let i = 0; i < ids.length; i++) {
                if (!(this.order.includes(ids[i]))) {
                    delete this.items[ids[i]];
                }
            }
            return items;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort
     * Sort Artists
     * 
     * @param {function} compareFunction Sorting method.
     */
    sort: async function(compareFunction) {
        try {
            let sorted = await (await Object.values(this.items)).sort(compareFunction);
            this.order = await sorted.map((item) => item.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort Safe
     * Sorts but ensures properties are present prior to sort.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async function(wrapper, order, property) {
        try {
            let fullObject = ['id', 'name', 'external_urls', 'followers', 'genres', 'href', 'images', 'popularity', 'uri'];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else {
                for (let artist in this.items) {
                    if (!(property in this.items[artist])) {
                        throw new Error("Artists.sortSafe: Invalid Parameter \"property\", you have artists that don't contain that property.");
                    }
                }
            }
            let ordered = await Object.values(this.items).sort((a, b) => {
                if (typeof(a[property]) == 'string') {
                    let aPrior = a[property].localeCompare(b[property]);
                    return order > 0 ? aPrior : (aPrior * -1) 
                }
                return order > 0 ? a[property] - b[property] : b[property]- a[property];
            });
            return new Artists(ordered);
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
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error("Artists.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play Artists
     * Plays artist on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    play: async function(wrapper, options) {
        try {
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            let tracks = new Tracks();
            for (let i = 0; i < artists.length; i++) {
                await tracks.push(await (await artists[i].getTopTracks(wrapper)).get(0));
            }   
            return await tracks.play(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Followed
     * Returns whether artists are followed by the user.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of booleans of whether artist is followed by user.
     */
    areFollowed: async function(wrapper) {
        try {
            let response = await wrapper.isFollowingArtists(this.order);
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Artist
     * Follows artist.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    follow: async function(wrapper) {
        try {
            return await wrapper.followArtists(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Artist
     * Unfollows artist.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    unfollow: async function(wrapper) {
        try {
            return await wrapper.unfollowArtists(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full artist data for all artists. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of Artist Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Artist Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
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
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            return await Promise.all(await artists.map(async (artist) => {
                return await artist.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Top Tracks
     * Returns Tracks instance with all artist's top tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} countryCode (Optional) country code.
     * @returns {Tracks}  Tracks object of artist's tracks top tracks.
     */
    getTopTracks: async function(wrapper, countryCode) {
        try {
            let tracks = new Tracks();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await tracks.concat(await artists[i].getTopTracks(wrapper, countryCode));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Tracks
     * Returns Tracks instance with all artist's tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks}  Tracks object of all artist's tracks.
     */
    getAllTracks: async function(wrapper) {
        try {
            let tracks = new Tracks();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await tracks.concat(await artists[i].getAllTracks(wrapper));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artists's Albums
     * Returns Albums instance with artists's albums.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options to be passed into each request.
     * @returns {Albums}  Albums object of artist's albums.
     */
    getAlbums: async function(wrapper, options) {
        try {
            let albums = new Albums();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await albums.concat(await artists[i].getAlbums(wrapper, options));
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artists's Albums
     * Returns Albums instance with all artists's albums.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums}  Albums object of all artist's albums.
     */
    getAllAlbums: async function(wrapper) {
        try {
            let albums = new Albums();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await albums.concat(await artists[i].getAllAlbums(wrapper));
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Related Artists
     * Returns Artists instance with Artist's Related Artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists instance of related Artists
     */
    getRelatedArtists: async function(wrapper) {
        try {
            let related = new Artists();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await related.concat(await artists[i].getRelatedArtists(wrapper));
            }
            return related;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations
     * Retrieves suggests for a random 5 of these artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     * @returns {Tracks} Tracks object with recommendations
     */
    getRecommendations: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Artists.search: Invalid Parameter \"options\"");
            }
            let ids = Object.keys(this.items);
            let seeds = [];
            for (let i = 0; i < 5; i++) {
                if (!ids.length) {
                    break;
                }
                let random = Math.round(Math.random() * (ids.length - 1));
                seeds.push(ids.slice(random, random + 1));
            }
            let _options = options ? options : {};
            if ('seed_tracks' in _options) {
                delete _options.seed_tracks;
            }
            if ('seed_genres' in _options) {
                delete _options.seed_artists;
            }
            _options.seed_artists = seeds.join(",");
            let response = await wrapper.getRecommendations(_options);
            return new Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full artist data for all artists from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the artist contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            let ids = [];
            for (let artist in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[artist].containsSimplifiedObject())) {
                        ids.push(artist);
                    }
                } else {
                    if (!(await this.items[artist].containsFullObject())) {
                        ids.push(artist);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getArtists(ids.splice(0, 50));
                    for (let i = 0; i < response.body.artists.length; i++) {
                        if (response.body.artists[i] == null) continue;
                        this.items[response.body.artists[i].id].loadFullObject(response.body.artists[i]);
                    }
                } while (ids.length > 0);
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
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Artists} Artists returned from Search.
 */
Artists.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.search: Invalid Parameter \"options\"");
        }
        let response = await wrapper.searchArtists(query, options ? options : {});
        return new Artists(response.body.artists.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Artists
 * Returns Artists object of IDs
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} artistIds Ids of artists.
 * @returns {Artists} Artists from ids.
 */
Artists.getArtists = async function(wrapper, artistIds) {
    try {
        let artists = new Artists(artistIds);
        await artists.retrieveFullObjects(wrapper);
        return artists;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Related Artists
 * Returns Artists object artists related to a given id
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} artistId Id of artists to find related to.
 * @returns {Artists} Artists related to artistID
 */
Artists.getRelatedArtists = async function(wrapper, artistId) {
    try {
        let artists = new Artists(artistId);
        return await artists.getRelatedArtists(wrapper);
    } catch (error) {
        throw error;
    }
};

Artists.addMethods = addMethods;

Artists.override = override;

 /**
 * Episode Constructor
 * Creates a new Episode Instance for a given episode.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the episode ID or contain an `id` property.
 */
function Categories(data) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Category || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Categories.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Categories.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param {Category | object | string} category Category Instance, category object or category id to add. 
     */
    push: function(category) {
        try {
            if (category instanceof Category) {
                if (!(category.id in this.items)) {
                    this.items[category.id] = category;
                }
                this.order.push(category.id);
            } else if (typeof(category) == 'object') {
                if ('category' in category) {
                    if (!(category.category.id in this.items)) {
                        this.items[category.category.id] = new Category(category.category);
                    }
                    this.order.push(category.category.id);
                } else {
                    if (!(category.id in this.items)) {
                        this.items[category.id] = new Category(category);
                    }
                    this.order.push(category.id);
                }

            } else if (typeof(category) == 'string') {
                if (!(category in this.items)) {
                    this.items[category] = new Category(category);
                }
                this.order.push(category);
            } else {
                throw new Error("Categories.push: Invalid Parameter \"category\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param {Categories | array } categories Another Categories instance or array of Category instances, category objects, or category ids to concat.
     */
    concat: function(categories) {
        try {
            if (categories instanceof Categories) {
                for (let category in categories.items) {
                    if (!(category in this.items)) {
                        this.items[category] = categories.items[category];
                    }
                    this.order.push(categories.items[category].id);
                }
            } else if (categories instanceof Array) {
                for (let i = 0; i < categories.length; i++) {
                    this.push(categories[i]);
                }
            } else {
                throw new Error("Categories.concat: Invalid Parameter \"categories\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove
     * Removes an item from the Manager Object.
     * 
     * @param { Category | object | string } category Category instance, category data, or category id to remove.
     */
    remove: function(category) {
        try {
            let id = null;
            if (category instanceof Category || typeof(category) == 'object') {
                id = category.id;
            } else if (typeof(category) == 'string') {
                id = category;
            } else {
                throw new Error("Categories.remove: Invalid Parameter \"category\"");
            }
            this.order = this.order.filter((item) => {
                return item != id;
            });
            delete this.items[id];
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
            return this.order.length;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an item
     * 
     * @param {string | object | Category} category Category ID, Category instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: function(category, startAt) {
        try {
            let id = null;
            if (typeof(category) == 'string') {
                id = category;
            } else if (category instanceof Category || typeof(category) == 'object') {
                id = category.id;  
            } 
            if (category == null) {
                throw new Error("Categories.findIndex: Invalid Parameter \"category\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Categories.findIndex: Invalid Parameter \"startAt\"");
            }
            for (let i = startAt; i < this.order.length; i++) {
                if (this.order[i] == id) {
                    return i;
                }
            }
            return -1;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * 
     * @param {string | object | Category} category Category ID, Category instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: function(category) {
        try {
            let id = null;
            if (typeof(category) == 'string') {
                id = category;
            } else if (category instanceof Category || typeof(category) == 'object') {
                id = category.id;  
            } 
            if (category == null) {
                throw new Error("Categories.includes: Invalid Parameter \"category\"");
            }
            for (let category in this.items) {
                if (category == id) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter
     * Returns Categories object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Categories} Filtered Categories object.
     */
    filter: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Categories.filter: \"method\" is not a function"); 
            }
            let newCategories = new Categories();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newCategories.push(this.items[this.order[i]]);
                }
            }
            return newCategories;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns category object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Category} Category at a given index
     */
    get: function(index)  {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Categories.get: Index out of range");
            }
            return this.items[this.order[index]];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * 
     * @returns {Array} Array of IDs
     */
    getIDs: function() {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: function() {
        try {
            let ids = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(ids.includes(this.order[i]))) {
                    ids.push(this.order[i]);
                }
            }
            return ids;
        } catch (error) {
            throw error;
        }
    },

    /**
     * For Each
     * Runs a function on each item.
     * 
     * @param {function} method Function to be run on each item.
     */
    forEach: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Categories.forEach: \"method\" is not a function"); 
            }
            for (let i = 0; i < this.order; i++) {
                await method(this.items[this.order[i]]);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: function() {
        try {
            this.order.reverse();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pop
     * Removes last item.
     * 
     * @returns {Category} Removed item
     */
    pop: function() {
        try {
            let id = this.order.pop();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Shift
     * Removes first item.
     * 
     * @returns {Category} Removed item
     */
    shift: function() {
        try {
            let id = this.order.shift();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Slice
     * Removes elements.
     * 
     * @param {number} start Start of removal
     * @param {number} end End of removal (Exclusive)
     * @returns {Categories} Removed ShCategoriesows.
     */
    slice: async function(start, end) {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Categories(await ids.map((id) => this.items[id]));
            for (let i = 0; i < ids.length; i++) {
                if (!(this.order.includes(ids[i]))) {
                    delete this.items[ids[i]];
                }
            }
            return items;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort
     * Sort Categories
     * 
     * @param {function} compareFunction Sorting method.
     */
    sort: async function(compareFunction) {
        try {
            let sorted = await (await Object.values(this.items)).sort(compareFunction);
            this.order = await sorted.map((item) => item.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort Safe
     * Sorts but ensures properties are present prior to sort.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async function(wrapper, order, property) {
        try {
            let fullObject = ['id', 'name', 'href', 'icons'];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else {
                for (let category in this.items) {
                    if (!(property in this.items[category])) {
                        throw new Error("Categories.sortSafe: Invalid Parameter \"property\", you have categories that don't contain that property.");
                    }
                }
            }
            let ordered = await Object.values(this.items).sort((a, b) => {
                if (typeof(a[property]) == 'string') {
                    let aPrior = a[property].localeCompare(b[property]);
                    return order > 0 ? aPrior : (aPrior * -1) 
                }
                return order > 0 ? a[property] - b[property] : b[property]- a[property];
            });
            return new Categories(ordered);
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
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error("Categories.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play Categories
     * Plays category on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} index (Optional) Index of category
     */
    play: async function(wrapper, index) {
        try {
            let _index = index != null ? index : 0;
            return await this.item[this.order[_index]].play(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full category data for all categories. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of Category Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper);
            let categories = await this.order.map((category) => {
                return this.items[category]; 
            });
            return await Promise.all(await categories.map(async (category) => {
                return await category.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Categories Current Data
     * Just returns whatever the category objects currently hold.
     * 
     * @returns {Array} Array of Current Category Data
     */
    getCurrentData: async function() {
        try {
            let categories = await this.order.map((category) => {
                return this.items[category]; 
            });
            return await Promise.all(await categories.map(async (category) => {
                return await category.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Categories Playlists
     * Returns Playlists instance with Categories playlists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options to be passed into request.
     * @returns {Playlists} Playlists instance with category playlists.
     */
    getPlaylists: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Category.getPlaylists: Invalid Parameter \"options\"");
            }
            let _options = options ? options : {};
            let playlists = new Playlists();
            for (let category in this.items) {
                await playlists.concat(await this.items[category].getPlaylists(wrapper, _options));
            }
            return playlists;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full category data for all Categories from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObjects: async function(wrapper) {
        try {
            for (let category in this.items) {
                if (!(await this.items[category].containsFullObject())) {
                    await this.items[category].retrieveFullObject(wrapper);
                }
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get a List of Categories
 * Returns Categories instance.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Options for request.
 * @returns {Categories} Categories instance
 */
Categories.getCategories = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Categories.getCategories: Invalid Parameter \"options\"");
        }
        let _options = options ? options : {};
        let response = await wrapper.getCategories(_options);
        return new Categories(response.body.categories);
    } catch (error) {
        throw error;
    }
}

Categories.addMethods = addMethods;

Categories.override = override;

 /**
 * Category Constructor
 * Creates a new Category Instance for a given category.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the category ID or contain an `id` property.
 */
function Category(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Category.constructor: No ID Provided");
            }
            this.name = 'name' in data ? data.name : null;
            this.href = 'href' in data ? data.href : null;
            this.icons = 'icons' in data ? data.icons : null;
        } else {
            throw new Error("Category.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Category.prototype = {
    /**
     * Play Category
     * Plays category on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    play: async function(wrapper) {
        try {
            return await (await (await this.getCategoryPlaylists(wrapper, { limit: 1 })).get(0)).play(wrapper);
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
    containsFullObject: function() {
        return ((this.name != null && this.href != null && this.icons != null));
    },

    /**
     * Get Full Object
     * Returns full category data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Category Full Object Data.
     */
    getFullObject: async function(wrapper) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                href: this.href,
                icons: this.icons,
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the category object currently holds
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any Category Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'album' };
            let properties = ['id', 'name', 'href', 'icons'];
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
     * Get Category Playlists
     * Returns Playlists instance with category playlists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options to be passed into request.
     * @returns {Playlists} Playlists instance with category playlists.
     */
    getPlaylists: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Category.getPlaylists: Invalid Parameter \"options\"");
            }
            let _options = options ? options : {};
            let response = await wrapper.getCategoryPlaylists(this.id, _options);
            return new Playlists(response.body.playlists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * 
     * @param {object} data Object with category full object data.
     */
    loadFullObject: function(data) {
        try {
            this.name = data.name;
            this.href = data.href;
            this.icons = data.icons;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full category data from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(wrapper) {
        try {
            let response = await wrapper.getCategory(this.id, {});
            this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Category
 * Returns Category instance for a given category
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} categoryId ID for category desired.
 * @param {object} options (Optional) Options for request.
 * @returns {Category} Category instance for given category
 */
Category.getCategory = async function(wrapper, categoryId, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Category.getCategory: Invalid Parameter \"options\"");
        }
        let _options = options ? options : {};
        let response = await wrapper.getCategory(categoryId, _options);
        return new Category(response.body);
    } catch (error) {
        throw error;
    }
}

Category.addMethods = addMethods;

Category.override = override;

 /**
 * Episode Constructor
 * Creates a new Episode Instance for a given episode.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the episode ID or contain an `id` property.
 */
function Episode(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Episode.constructor: No ID Provided");
            }
            this.name = 'name' in data ? data.name : null;
            this.audio_preview_url = 'audio_preview_url' in data ? data.audio_preview_url : null;
            this.description = 'description' in data ? data.description : null;
            this.duration_ms = 'duration_ms' in data ? data.duration_ms : null;
            this.explicit = 'explicit' in data ? data.explicit : null;
            this.external_urls = 'external_urls' in data ? data.external_urls : null;
            this.href = 'href' in data ? data.href : null;
            this.images = 'images' in data ? data.images : null;
            this.is_externally_hosted = 'is_externally_hosted' in data ? data.is_externally_hosted : null;
            this.is_playable = 'is_playable' in data ? data.is_playable : null;
            this.language = 'language' in data ? data.language : null;
            this.languages = 'languages' in data ? data.languages : null;
            this.release_date = 'release_date' in data ? data.release_date : null;
            this.release_date_precision = 'release_date_precision' in data ? data.release_date_precision : null;
            this.resume_point = 'resume_point' in data ? data.resume_point : null;
            this.show = 'show' in data ? data.show : null;
            this.uri = 'uri' in data ? data.uri : null;
        } else {
            throw new Error("Episode.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Episode.prototype = {
    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * 
     * @returns {boolean} Whether full object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null) && (this.audio_preview_url != null) && (this.description != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_urls != null) && (this.href != null) && (this.images != null) && (this.is_externally_hosted != null) && (this.is_playable != null) && (this.language != null) && (this.languages != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.resume_point) && (this.show) && (this.uri != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.audio_preview_url != null) && (this.description != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_urls != null) && (this.href != null) && (this.images != null) && (this.is_externally_hosted != null) && (this.is_playable != null) && (this.language != null) && (this.languages != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.resume_point) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full episode data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Episode Full Object Data.
     */
    getFullObject: async function(wrapper) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                audio_preview_url: this.audio_preview_url,
                description: this.description,
                duration_ms: this.duration_ms,
                explicit: this.explicit,
                external_urls: this.external_urls,
                href: this.href,
                images: this.images,
                is_externally_hosted: this.is_externally_hosted,
                is_playable: this.is_playable,
                language: this.language,
                languages: this.languages,
                release_date: this.release_date,
                release_date_precision: this.release_date_precision,
                resume_point: this.resume_point,
                show: this.show,
                uri: this.uri,
                type: "episode",
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified episode data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Episode Simplified Object Data.
     */
    getSimplifiedObject: async function(wrapper) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                audio_preview_url: this.audio_preview_url,
                description: this.description,
                duration_ms: this.duration_ms,
                explicit: this.explicit,
                external_urls: this.external_urls,
                href: this.href,
                images: this.images,
                is_externally_hosted: this.is_externally_hosted,
                is_playable: this.is_playable,
                language: this.language,
                languages: this.languages,
                release_date: this.release_date,
                release_date_precision: this.release_date_precision,
                resume_point: this.resume_point,
                uri: this.uri,
                type: 'episode',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the track object currently holds
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any Track Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'episode' };
            let properties = ['name', 'audio_preview_url', 'description', 'duration_ms', 'explicit', 'external_urls', 'href', 'images', 'is_externally_hosted', 'is_playable', 'language', 'languages', 'release_date', 'release_date_precision', 'resume_point', 'uri'];
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
     * Get Episode Show
     * Returns Show Object of episode's show..
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Show} Episode's Show
     */
    getShow: async function(wrapper) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return new Episode.Show(this.show);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * 
     * @param {object} data Object with episode full object data.
     */
    loadFullObject: function(data) {
        try {
            this.name = data.name;
            this.audio_preview_url = data.audio_preview_url;
            this.description = data.description;
            this.duration_ms = data.duration_ms;
            this.explicit = data.explicit;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.images = data.images;
            this.is_externally_hosted = data.is_externally_hosted;
            this.is_playable = data.is_playable;
            this.language = data.language;
            this.languages = data.languages;
            this.release_date = data.release_date;
            this.release_date_precision = data.release_date_precision;
            this.resume_point = data.resume_point;
            this.show = data.show;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Simplified Object
     * Sets simplified data (outside constructor).
     * 
     * @param {object} data Object with episode simplified object data.
     */
    loadSimplifiedObject: function(data) {
        try {
            this.name = data.name;
            this.audio_preview_url = data.audio_preview_url;
            this.description = data.description;
            this.duration_ms = data.duration_ms;
            this.explicit = data.explicit;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.images = data.images;
            this.is_externally_hosted = data.is_externally_hosted;
            this.is_playable = data.is_playable;
            this.language = data.language;
            this.languages = data.languages;
            this.release_date = data.release_date;
            this.release_date_precision = data.release_date_precision;
            this.resume_point = data.resume_point;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full episode data from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(wrapper) {
        try {
            if ('is_local' in this && this.is_local) {
                return;
            }
            let response = await wrapper.getEpisode(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Episode
 * Returns Episode object of ID
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} episodeId Id of episode.
 * @returns {Episode} Episode from id.
 */
Episode.getEpisode = async function(wrapper, episodeId) {
    try {
        let episode = new Episode(episodeId);
        await episode.retrieveFullObjects(wrapper);
        return episode;
    } catch (error) {
        throw error;
    }
};

Episode.addMethods = addMethods;

Episode.override = override;

 /**
 * Constructor
 * Creates a new Episodes Instance.
 * 
 * @param {Array | Episode | object | string} data (optional) Data to be preloaded. Single or multiple episodes.
 */
function Episodes(data) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Episode || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Episodes.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Episodes.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param { Episode | object | string } episode Episode Instance, episode object or episode id to add. 
     */
    push: function(episode) {
        try {
            if (episode instanceof Episode) {
                if (!(episode.id in this.items)) {
                    this.items[episode.id] = episode;
                }
                this.order.push(episode.id);
            } else if (typeof(episode) == 'object') {
                if (!(episode.id in this.items)) {
                    this.items[episode.id] = new Episode(episode);
                }
                this.order.push(episode.id);
            } else if (typeof(episode) == 'string') {
                if (!(episode in this.items)) {
                    this.items[episode] = new Episode(episode);
                }
                this.order.push(episode);
            } else {
                throw new Error("Episodes.push: Invalid Parameter \"episode\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param { Episodes | array } episodes Another Episodes instance or array of Episode instances, episode objects, or episode ids to concat.
     */
    concat: function(episodes) {
        try {
            if (episodes instanceof Episodes) {
                for (let episode in episodes.items) {
                    if (!(episode in this.items)) {
                        this.items[episode] = episodes.items[episode];
                    }
                    this.order.push(episodes.items[episode].id);
                }
            } else if (episodes instanceof Array) {
                for (let i = 0; i < episodes.length; i++) {
                    this.push(episodes[i]);
                }
            } else {
                throw new Error("Episodes.concat: Invalid Parameter \"episodes\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove
     * Removes an item from the Manager Object.
     * 
     * @param { Episode | object | string } episode Episode instance, episode data, or episode id to remove.
     */
    remove: function(episode) {
        try {
            let id = null;
            if (episode instanceof Episode || typeof(episode) == 'object') {
                id = episode.id;
            } else if (typeof(episode) == 'string') {
                id = episode;
            } else {
                throw new Error("Episodes.remove: Invalid Parameter \"episode\"");
            }
            this.order = this.order.filter((item) => {
                return item != id;
            });
            delete this.items[id];
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
            return this.order.length;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an item
     * 
     * @param {string | object | Episode} episode Episode ID, Episode instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: function(episode, startAt) {
        try {
            let id = null;
            if (typeof(episode) == 'string') {
                id = episode;
            } else if (episode instanceof Episode || typeof(episode) == 'object') {
                id = episode.id;  
            } 
            if (episode == null) {
                throw new Error("Episodes.findIndex: Invalid Parameter \"episode\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Episodes.findIndex: Invalid Parameter \"startAt\"");
            }
            for (let i = startAt; i < this.order.length; i++) {
                if (this.order[i] == id) {
                    return i;
                }
            }
            return -1;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * 
     * @param {string | object | Episode} episode Episode ID, Episode instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: function(episode) {
        try {
            let id = null;
            if (typeof(episode) == 'string') {
                id = episode;
            } else if (episode instanceof Episode || typeof(episode) == 'object') {
                id = episode.id;  
            } 
            if (episode == null) {
                throw new Error("Episodes.includes: Invalid Parameter \"episode\"");
            }
            for (let episode in this.items) {
                if (episode == id) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter
     * Returns Episodes object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Episodes} Filtered Episodes object.
     */
    filter: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Episodes.filter: \"method\" is not a function"); 
            }
            let newEpisodes = new Episodes();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newEpisodes.push(this.items[this.order[i]]);
                }
            }
            return newEpisodes;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns episode object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Episode} Episode at a given index
     */
    get: function(index) {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Episodes.get: Index out of range");
            }
            return this.items[this.order[index]];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * 
     * @returns {Array} Array of IDs
     */
    getIDs: function() {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: function() {
        try {
            let ids = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(ids.includes(this.order[i]))) {
                    ids.push(this.order[i]);
                }
            }
            return ids;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Get URIs
     * Returns array of URIs in order.
     * 
     * @returns {Array} Array of URIs
     */
    getURIs: async function() {
        try {
            return await this.order.map((id) => 'spotify:episode' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get URIs No Repeats
     * Returns array of URIs with no repeats.
     * 
     * @returns {Array} Array of URIs
     */
    getURIsNoRepeats: async function() {
        try {
            let uris = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(uris.includes(this.order[i]))) {
                    uris.push(this.order[i]);
                }
            }
            return await uris.map((id) => 'spotify:episode' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * For Each
     * Runs a function on each item.
     * 
     * @param {function} method Function to be run on each item.
     */
    forEach: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Episodes.forEach: \"method\" is not a function"); 
            }
            for (let i = 0; i < this.order; i++) {
                await method(this.items[this.order[i]]);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: function() {
        try {
            this.order.reverse();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pop
     * Removes last item.
     * 
     * @returns {Episode} Removed item
     */
    pop: function() {
        try {
            let id = this.order.pop();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Shift
     * Removes first item.
     * 
     * @returns {Episode} Removed item
     */
    shift: function() {
        try {
            let id = this.order.shift();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Slice
     * Removes elements.
     * 
     * @param {number} start Start of removal
     * @param {number} end End of removal (Exclusive)
     * @returns {Episodes} Removed Episodes.
     */
    slice: async function(start, end) {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Episodes(await ids.map((id) => this.items[id]));
            for (let i = 0; i < ids.length; i++) {
                if (!(this.order.includes(ids[i]))) {
                    delete this.items[ids[i]];
                }
            }
            return items;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort
     * Sort Episodes
     * 
     * @param {function} compareFunction Sorting method.
     */
    sort: async function(compareFunction) {
        try {
            let sorted = await (await Object.values(this.items)).sort(compareFunction);
            this.order = await sorted.map((item) => item.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort Safe
     * Sorts but ensures properties are present prior to sort.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async function(wrapper, order, property) {
        try {
            let fullObject = ['id', 'name', 'audio_preview_url', 'description', 'duration_ms', 'explicit', 'external_urls', 'href', 'images', 'is_externally_hosted', 'is_playable', 'language', 'languages', 'release_date', 'release_date_precision', 'resume_point', 'uri'];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else {
                for (let episode in this.items) {
                    if (!(property in this.items[episode])) {
                        throw new Error("Episodes.sortSafe: Invalid Parameter \"property\", you have episodes that don't contain that property.");
                    }
                }
            }
            let ordered = await Object.values(this.items).sort((a, b) => {
                if (typeof(a[property]) == 'string') {
                    let aPrior = a[property].localeCompare(b[property]);
                    return order > 0 ? aPrior : (aPrior * -1) 
                }
                return order > 0 ? a[property] - b[property] : b[property]- a[property];
            });
            return new Episodes(ordered);
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
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error("Episodes.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full episode data for all episodes. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Episode Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let episodes = await this.order.map((episode) => {
                return this.items[episode]; 
            });
            return await Promise.all(await episodes.map(async (episode) => {
                return await episode.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified episode data for all episodes. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Episode Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let episodes = await this.order.map((episode) => {
                return this.items[episode]; 
            });
            return await Promise.all(await episodes.map(async (episode) => {
                return await episode.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Episodes Current Data
     * Just returns whatever the episode objects currently hold.
     * 
     * @returns {array} Array of Current Episode Data
     */
    getCurrentData: async function() {
        try {
            let episodes = await this.order.map((episode) => {
                return this.items[episode]; 
            });
            return await Promise.all(await episodes.map(async (episode) => {
                return await episode.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Episode's Shows
     * Returns Shows instance with all episode's shows.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Shows} Shows object of all episode's episshowsodes.
     */
    getShows: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper);
            let shows = new Shows();
            for (show in this.items) {
                await shows.push(await this.items[show].getShow(wrapper));
            }
            return shows;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full episode data for all episodes from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the episode contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            let ids = [];
            for (let episode in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[episode].containsSimplifiedObject())) {
                        ids.push(episode);
                    } 
                } else {
                    if (!(await this.items[episode].containsFullObject())) {
                        ids.push(episode);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getEpisodes(ids.splice(0, 50));
                    for (let i = 0; i < response.body.episodes.length; i++) {
                        if (response.body.episodes[i] == null) continue;
                        this.items[response.body.episodes[i].id].loadFullObject(response.body.episodes[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Search for a Episodes
 * Returns search results for a query.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Episodes} Episodes returned from Search.
 */
Episodes.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Episodes.search: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await wrapper.searchEpisodes(query, _options);
        return new Episodes(response.body.episodes.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Episodes
 * Returns Episodes object of IDs
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} episodeIds Ids of episodes.
 * @returns {Episodes} Episodes from ids.
 */
Episodes.getEpisodes = async function(wrapper, showIds) {
    try {
        let episodes = new Episodes(episodeIds);
        await episodes.retrieveFullObjects(wrapper);
        return episodes;
    } catch (error) {
        throw error;
    }
};

Episodes.addMethods = addMethods;

Episodes.override = override;

 /**
 * Playback Constructor
 * Creates a new Playback Instance for a given user.
 */
function Playback(wrapper) {
    try {
        this.retrieveMyDevices(wrapper);
        this.retrieveMyCurrentPlaybackState(wrapper);
    } catch (error) {
        throw error;
    }
}

Playback.prototype = {
    /**
     * Get Devices
     * Returns array of devices.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of devices.
     */
    getDevices: async function(wrapper) {
        try {
            await this.retrieveMyDevices(wrapper);
            return this.devices;
        } catch (error) {
            throw error;
        }
    },

     /**
     * Get Current Playback State
     * Returns complete playback state.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {object} Playback State information.
     */
    getCurrentPlaybackState: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Currently Playing Item
     * Returns Track or Episode instance of playing item.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {Track | Episode} Playback State information.
     */
    getCurrentlyPlaying: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            if (this.currentPlayback.currently_playing_type == 'track') {
                return new Track(this.currentPlayback.item);
            } else if (this.currentPlayback.currently_playing_type == 'episode') {
                return new Episode(this.currentPlayback.item);
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Context
     * Returns context of currently playing item.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {object} Context object.
     */
    getCurrentContext: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.context;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Device
     * Returns device currently playing.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {object} Device object.
     */
    getCurrentDevice: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.device;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Playing State
     * Returns boolean if item is playing currently.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {boolean} Whether something is playing.
     */
    getPlayingState: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.is_playing;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Shuffle State
     * Returns boolean if shuffle is on or off.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {boolean} Whether stuffle is on.
     */
    getShuffleState: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.shuffle_state;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Repeat State
     * Returns string of current state of repeat.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {string} State of Repeat "off", "track", "context"
     */
    getRepeatState: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.repeat_state;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Progress
     * Returns millisecond progress into item being played.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {number} Milliseconds into item.
     */
    getProgress: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.progress_ms;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Volume
     * Returns percentage of volume.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {number} Percentage of volume
     */
    getVolume: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.device.volume_percent;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Transfer Playback
     * Switches Playback to New Device
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array} deviceIds Device to be switched to.
     * @param {object} options (Optional) Options for Transfer Request.
     * @returns {number} Percentage of volume
     */
    transferPlayback: async function(wrapper, deviceIds, options) {
        try {
            return wrapper.transferMyPlayback(deviceIds, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play
     * Plays item on current playback device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Transfer Request.
     */
    play: async function(wrapper, options) {
        try {
            return wrapper.play(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pause
     * Pauses current playback device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Transfer Request.
     */
    pause: async function(wrapper, options) {
        try {
            return wrapper.pause(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Skip to next
     * Moves Playback to next item.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Skip Request.
     */
    skipToNext: async function(wrapper, options) {
        try {
            return wrapper.skipToNext(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Skip to Previous
     * Moves Playback to previous item.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Rewind Request.
     */
    skipToPrevious: async function(wrapper, options) {
        try {
            return wrapper.skipToPrevious(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Seek
     * Moves Playback to new position in currently playing item.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} position Milliseconds in Item
     * @param {object} options (Optional) Options for Seek Request.
     */
    seek: async function(wrapper, position, options) {
        try {
            return wrapper.seek(position, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Repeat
     * Sets repeat state for current playback device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} state New Repeat state
     * @param {object} options (Optional) Options for repeat Request.
     */
    setRepeat: async function(wrapper, state, options) {
        try {
            return wrapper.setRepeat(state, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Volume
     * Sets volume for current playback device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} percent New Volume
     * @param {object} options (Optional) Options for volume Request.
     */
    setVolume: async function(wrapper, percent, options) {
        try {
            return wrapper.setVolume(percent, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Shuffle
     * Sets shuffle state for current playback device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {boolean} state New shuffle state.
     * @param {object} options (Optional) Options for shuffle Request.
     */
    setShuffle: async function(wrapper, state, options) {
        try {
            return wrapper.setShuffle(state, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve My Devices
     * Retrieves devices from spotify.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveMyDevices: async function(wrapper) {
        try {
            let response = await this.wrapper.getMyDevices();
            this.devices = response.body.devices;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve My Current Playback State
     * Retrieves current playback state from spotify.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     */
    retrieveMyCurrentPlaybackState: async function(wrapper, options) {
        try {
            let response = await this.wrapper.getMyCurrentPlaybackState();
            this.currentPlayback = response.body;
        } catch (error) {
            throw error;
        }
    },
};

Playback.addMethods = addMethods;

Playback.override = override;

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
            this._tracks = new Tracks();
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
            this._tracks = '_tracks' in data ? data._tracks : new Tracks();
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
        this.retrieved = false;
    } catch (error) {
        throw error;
    }
}

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
            let response = await wrapper.areFollowingPlaylist(this.id, [userID]);
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
            let response = await wrapper.areFollowingPlaylist(this.id, userIds);
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
            return await wrapper.followPlaylist(this.id);
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
            return await wrapper.unfollowPlaylist(this.id);
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
            return await this.addTracks(wrapper, [track]);
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
     * @param {Track | Object | String } track Track instance, track data, or track id to remove.
     */
    remove: async function(wrapper, track) {
        try {
            return await this.removeTracks(wrapper, [track]);
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
            if (!this.retrieved) {
                await this.retrieveTracks(wrapper);
            }
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
            if (!this.retrieved) {
                await this.retrieveTracks(wrapper);
            }
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
            if (!this.retrieved) {
                await this.retrieveTracks(wrapper);
            }
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
            if (!this.retrieved) {
                await this.retrieveTracks(wrapper);
            }
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
    getIDs: async function(wrapper) {
        try {
            if (!this.retrieved) {
                await this.retrieveTracks(wrapper);
            }
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
    getIDsNoRepeats: async function(wrapper) {
        try {
            if (!this.retrieved) {
                await this.retrieveTracks(wrapper);
            }
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
            if (!this.retrieved) {
                await this.retrieveTracks(wrapper);
            }
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
            if (!this.retrieved) {
                await this.retrieveTracks(wrapper);
            }
            return this._tracks.getURIsNoRepeats();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: async function(wrapper) {
        try {
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
    pop: async function() {
        try {
            if (!this.retrieved) {
                await this.retrieveTracks(wrapper);
            }
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
    shift: async function() {
        try {
            if (!this.retrieved) {
                await this.retrieveTracks(wrapper);
            }
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
            if (this.retrieved) {
                this._tracks.concat(tracks);
                if (options && options.hasOwnProperty('position')) {
                    let order = this._tracks.getIDs();
                    order.splice(options.position, 0, ...order.splice(order.length - uris.length + 1, order.length));
                    this._tracks.order = order;
                }
            }
            
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
            this._tracks = new Tracks(tracks);
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
     * @param {Number} range_start Where to select
     * @param {Number} insert_before Where to place
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response to Request
     * options.range_length: {Number} The amount of tracks to be reordered (Default 1)
     */
    reorderTracks: async function(wrapper, range_start, insert_before, options) {
        try {
            let response = await wrapper.reorderTracksInPlaylist(this.id, range_start, insert_before, options ? options : {}, this.snapshot_id);
            if (this.retrieved) {
                let order = this._tracks.getIDs();
                let range_length = (options && options.hasOwnProperty('range_length') ? options.range_length : 1);
                let selection = order.filter((item, index) => {
                    return (index >= range_start && index < range_start +  range_length);
                });
                order.splice(insert_before, 0, ...selection);
                if (insert_before > range_start) {
                    order.splice(range_start, range_length);
                } else {
                    order.splice(range_start + range_length, range_length);
                }
                this._tracks.order = order;
            }
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
                        if (tracks[i].substring(0, 7) == 'spotify') {
                            uris.push(tracks[i]);
                        } else {
                            uris.push('spotify:track:' + tracks[i]);
                        }
                    }
                }
            } else if (typeof(tracks) == 'object' && tracks[i].hasOwnProperty('uri')) {
                uris.push(tracks)
            } else if ((tracks instanceof Track || typeof(tracks) == 'object') && tracks.hasOwnProperty('id')) {
                uris.push('spotify:track:' + tracks.id);
            } else if (typeof(tracks) == 'string') {
                if (tracks.substring(0, 7) == 'spotify') {
                    uris.push(tracks);
                } else {
                    uris.push('spotify:track:' + tracks);
                }
            } else {
                throw new Error("Playlist.addTracks: Invalid Parameter \"tracks\"");
            }
            let response = await wrapper.removeTracksFromPlaylistWithSnapshotId(this.id, uris, this.snapshot_id);
            if (this.retrieved) {
                if (!(uris instanceof Array)) {
                    uris = [uris];
                }
                for (let i = 0; i < uris.length; i++) {
                    if (typeof(uris[i]) == 'object' && uris[i].hasOwnProperty('uri')) {
                        if (uris[i].hasOwnProperty('positions')) {
                            await this._tracks.removeIndexes(uris[i].positions);
                        } else {
                            await this._tracks.remove(uris[i].uri.substring(14, uris[i].uri.length));
                        }
                    } else {
                        await this._tracks.remove(uris[i].substring(14, uris[i].length));
                    }
                }
            }
            this.snapshot_id = response.body.snapshot_id;
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove tracks by index
     * Removes tracks by index from a playlist.
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array} positions Indexes to be removed
     * @returns {Object} Response to Request
     */
    removeTrackIndexes: async function(wrapper, positions) {
        try {
            let response = await wrapper.removeTracksFromPlaylistInPositions(this.id, positions instanceof Array ? positions : [positions], this.snapshot_id);
            if (this.retrieved) {
                if (positions instanceof Array) {
                    await this._tracks.removeIndexes(positions);
                } else {
                    await this._tracks.removeIndexes([positions]);
                }
            }
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
            this._tracks = new Tracks();
            let options = { offset: 0 };
            let response;
            do {
                response = await wrapper.getPlaylistTracks(this.id, options);
                await this.loadTracks(response.body.items);
                options.offset += 100;
            } while (!(response.body.items.length < 100));
            this.retrieved = true;
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
            if (tracks instanceof Tracks || tracks instanceof Array) {
                this._tracks.concat(tracks);
            } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                this._tracks.push(tracks);
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

 /**
 * Constructor
 * Creates a new Playlists Instance.
 * 
 * @param {Array | Playlist | object | string} data (optional) Data to be preloaded. Single or multiple playlists.
 */
function Playlists(playlists) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Playlist || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Playlists.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Playlists.prototype = {
/**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param {Playlist | object | string } playlist Playlist Instance, playlist object or playlist id to add. 
     */
    push: function(playlist) {
        try {
            if (playlist instanceof Playlist) {
                if (!(playlist.id in this.items)) {
                    this.items[playlist.id] = playlist;
                }
                this.order.push(playlist.id);
            } else if (typeof(playlist) == 'object') {
                if ('playlist' in playlist) {
                    if (!(playlist.playlist.id in this.items)) {
                        this.items[playlist.playlist.id] = new Playlist(playlist.playlist);
                        if ('is_local' in playlist) {
                            this.items[playlist.playlist.id].is_local = playlist.is_local;
                        }
                        if ('added_at' in playlist) {
                            this.items[playlist.playlist.id].added_at = playlist.added_at;
                        }
                        if ('added_by' in playlist) {
                            this.items[playlist.playlist.id].added_by = playlist.added_by;
                        }
                    }
                    this.order.push(playlist.playlist.id);
                } else {
                    if (!(playlist.id in this.items)) {
                        this.items[playlist.id] = new Playlist(playlist);
                    }
                    this.order.push(playlist.id);
                }

            } else if (typeof(playlist) == 'string') {
                if (!(playlist in this.items)) {
                    this.items[playlist] = new Playlist(playlist);
                }
                this.order.push(playlist);
            } else {
                throw new Error("Playlists.push: Invalid Parameter \"playlist\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param {Playlists | array } playlists Another Playlists instance or array of Playlist instances, playlist objects, or playlist ids to concat.
     */
    concat: function(playlists) {
        try {
            if (playlists instanceof Playlists) {
                for (let playlist in playlists.items) {
                    if (!(playlist in this.items)) {
                        this.items[playlist] = playlists.items[playlist];
                    }
                    this.order.push(playlists.items[playlist].id);
                }
            } else if (playlists instanceof Array) {
                for (let i = 0; i < playlists.length; i++) {
                    this.push(playlists[i]);
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
     * Removes an item from the Manager Object.
     * 
     * @param {Playlist | object | string } playlist Playlist instance, playlist data, or playlist id to remove.
     */
    remove: function(playlist) {
        try {
            let id = null;
            if (playlist instanceof Playlist || typeof(playlist) == 'object') {
                id = playlist.id;
            } else if (typeof(playlist) == 'string') {
                id = playlist;
            } else {
                throw new Error("Playlists.remove: Invalid Parameter \"playlist\"");
            }
            this.order = this.order.filter((item) => {
                return item != id;
            });
            delete this.items[id];
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
            return this.order.length;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an item
     * 
     * @param {string | object | Playlist} playlist Playlist ID, Playlist instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: function(playlist, startAt) {
        try {
            let id = null;
            if (typeof(playlist) == 'string') {
                id = playlist;
            } else if (playlist instanceof Playlist || typeof(playlist) == 'object') {
                id = playlist.id;  
            } 
            if (playlist == null) {
                throw new Error("Playlists.findIndex: Invalid Parameter \"playlist\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Playlists.findIndex: Invalid Parameter \"startAt\"");
            }
            for (let i = startAt; i < this.order.length; i++) {
                if (this.order[i] == id) {
                    return i;
                }
            }
            return -1;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * 
     * @param {string | object | Playlist} playlist Playlist ID, Playlist instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: function(playlist) {
        try {
            let id = null;
            if (typeof(playlist) == 'string') {
                id = playlist;
            } else if (playlist instanceof Playlist || typeof(playlist) == 'object') {
                id = playlist.id;  
            } 
            if (playlist == null) {
                throw new Error("Playlists.includes: Invalid Parameter \"playlist\"");
            }
            for (let playlist in this.items) {
                if (playlist == id) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter
     * Returns Playlist object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Playlists} Filtered Playlists object.
     */
    filter: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Playlists.filter: \"method\" is not a function"); 
            }
            let newPlaylists = new Playlists();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newPlaylists.push(this.items[this.order[i]]);
                }
            }
            return newPlaylists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns playlist object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Playlist} Playlist at a given index
     */
    get: function(index) {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Playlists.get: Index out of range");
            }
            return this.items[this.order[index]];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * 
     * @returns {Array} Array of IDs
     */
    getIDs: function() {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: function() {
        try {
            let ids = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(ids.includes(this.order[i]))) {
                    ids.push(this.order[i]);
                }
            }
            return ids;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Get URIs
     * Returns array of URIs in order.
     * 
     * @returns {Array} Array of URIs
     */
    getURIs: async function() {
        try {
            return await this.order.map((id) => 'spotify:playlist' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get URIs No Repeats
     * Returns array of URIs with no repeats.
     * 
     * @returns {Array} Array of URIs
     */
    getURIsNoRepeats: async function() {
        try {
            let uris = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(uris.includes(this.order[i]))) {
                    uris.push(this.order[i]);
                }
            }
            return await uris.map((id) => 'spotify:playlist' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * For Each
     * Runs a function on each item.
     * 
     * @param {function} method Function to be run on each item.
     */
    forEach: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Playlists.forEach: \"method\" is not a function"); 
            }
            for (let i = 0; i < this.order; i++) {
                await method(this.items[this.order[i]]);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: function() {
        try {
            this.order.reverse();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pop
     * Removes last item.
     * 
     * @returns {Playlist} Removed item
     */
    pop: function() {
        try {
            let id = this.order.pop();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Shift
     * Removes first item.
     * 
     * @returns {Playlist} Removed item
     */
    shift: function() {
        try {
            let id = this.order.shift();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Slice
     * Removes elements.
     * 
     * @param {number} start Start of removal
     * @param {number} end End of removal (Exclusive)
     * @returns {Playlists} Removed Playlists.
     */
    slice: async function(start, end) {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Playlists(await ids.map((id) => this.items[id]));
            for (let i = 0; i < ids.length; i++) {
                if (!(this.order.includes(ids[i]))) {
                    delete this.items[ids[i]];
                }
            }
            return items;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort
     * Sort Playlists
     * 
     * @param {function} compareFunction Sorting method.
     */
    sort: async function(compareFunction) {
        try {
            let sorted = await (await Object.values(this.items)).sort(compareFunction);
            this.order = await sorted.map((item) => item.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort Safe
     * Sorts but ensures properties are present prior to sort.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async function(wrapper, order, property) {
        try {
            let fullObject = ['collaborative', 'description', 'external_urls', 'followers', 'href', 'images', 'name', 'owner', 'public', 'snapshot_id', 'playlists', 'uri', '_tracks'];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else {
                for (let playlist in this.items) {
                    if (!(property in this.items[playlist])) {
                        throw new Error("Playlists.sortSafe: Invalid Parameter \"property\", you have playlists that don't contain that property.");
                    }
                }
            }
            let ordered = await Object.values(this.items).sort((a, b) => {
                if (typeof(a[property]) == 'string') {
                    let aPrior = a[property].localeCompare(b[property]);
                    return order > 0 ? aPrior : (aPrior * -1) 
                }
                return order > 0 ? a[property] - b[property] : b[property]- a[property];
            });
            return new Playlists(ordered);
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
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error("Playlists.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Plays Playlists
     * Plays playlists on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    play: async function(wrapper, options) {
        try {
            let tracks = await this.getTracks(wrapper);
            return await tracks.play(wrapper, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Followed
     * Returns whether playlists are followed by the user.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of booleans of whether playlist is followed by user.
     */
    areFollowing: async function(wrapper) {
        try {
            let following = [];
            let userID = await (await wrapper.getMe()).body.id;
            for (let playlist in this.items) {
                if ('id' in this.items[playlist]) {
                    let status = await this.items[playlist].areFollowing(wrapper, [userID]);
                    following.push(status[0]);
                } else {
                    following.push(null);
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Playlists
     * Follows all playlists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    follow: async function(wrapper, options) {
        try {
            for (let playlist in this.items) {
                if ('id' in this.items[playlist]) {
                    await wrapper.followPlaylist(this.items[playlist].id, options ? options : {});
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Playlists
     * Unfollows all playlists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    unfollow: async function(wrapper) {
        try {
            for (let playlist in this.items) {
                if ('id' in this.items[playlist]) {
                    await wrapper.unfollowPlaylist(this.items[playlist].id);
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full playlist data for all playlists. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Playlist Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let playlists = await this.order.map(function(playlist) {
                return this.items[playlist]; 
            });
            return await Promise.all(await playlists.map(async function(playlist) {
                return await playlist.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified playlist data for all playlists. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Playlist Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let playlists = await this.order.map(function(playlist) {
                return this.items[playlist]; 
            });
            return await Promise.all(await playlists.map(async function(playlist) {
                return await playlist.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Playlists Current Data
     * Just returns whatever the playlist objects currently hold.
     * 
     * @returns {array} Array of Current Playlist Data
     */
    getCurrentData: async function() {
        try {
            let playlists = await this.order.map(function(playlist) {
                return this.items[playlist]; 
            });
            return await Promise.all(await playlists.map(async function(playlist) {
                return await playlist.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Playlist's Tracks
     * Returns Tracks instance with all playlist's tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks} Tracks object of all playlist's tracks.
     */
    getTracks: async function(wrapper) {
        try {
            let tracks = new Playlists.Tracks();
            for (let playlist in this.items) {
                await tracks.concat(await this.items[playlist].getTracks(wrapper));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Playlist's Artists
     * Returns Artists instance with all playlist's artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists object of all playlist's artists.
     */
    getArtists: async function(wrapper) {
        try {
            let artists = new Artists();
            for (let playlist in this.items) {
                await artists.concat(await this.items[playlist].getArtists(wrapper));
            }
            return artists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Playlist's Albums
     * Returns Albums instance with all playlist's albums.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums} Albums object of all playlist's albums.
     */
    getAlbums: async function(wrapper) {
        try {
            let albums = new Albums();
            for (let playlist in this.items) {
                await albums.concat(await this.items[playlist].getAlbums(wrapper));
            }
            return albums;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full playlist data for all playlists from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the playlist contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            for (let playlist in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[playlist].containsSimplifiedObject())) {
                        await this.items[playlist].retrieveFullObject(wrapper);
                    }
                } else {
                    if (!(await this.items[playlist].containsFullObject())) {
                        await this.items[playlist].retrieveFullObject(wrapper);
                    }
                }
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
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned from Search.
 */
Playlists.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.search: Invalid Parameter \"options\"");
        }
        let response = await wrapper.searchPlaylists(query, options ? options : {});
        return new Playlists(response.body.playlists.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get User's Playlists
 * Returns followed and created playlists.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getUserPlaylists = async function(wrapper, userId, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.getUserPlaylists: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getUserPlaylists(userId, options ? options : {});
        return new Playlists(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All User Playlists
 * Returns all followed and created playlists.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getAllUserPlaylists = async function(wrapper, userId) {
    try {
        let _options = { limit: 50, offset: 0 };
        let playlists = new Playlists();
        let response;
        do {
            response = await wrapper.getUserPlaylists(userId, _options);
            await playlists.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return playlists;
    } catch (error) {
        throw error;
    }
};

/**
 * Get My Playlists
 * Returns followed and created playlists.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getMyPlaylists = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.getUserPlaylists: Invalid Parameter \"options\"");
        }
        let userId = await (await wrapper.getMe()).body.id;
        let response = await wrapper.getUserPlaylists(userId , options ? options : {});
        return new Playlists(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All User Playlists
 * Returns all followed and created playlists.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getAllMyPlaylists = async function(wrapper) {
    try {
        let _options = { limit: 50, offset: 0 };
        let userId = await (await wrapper.getMe()).body.id;
        let playlists = new Playlists();
        let response;
        do {
            response = await wrapper.getUserPlaylists(userId, _options);
            await playlists.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return playlists;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Featured Playlists
 * Returns list of featured playlists.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Playlists} Playlists returned request.
 */
Playlists.getFeaturedPlaylists = async function(wrapper) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Playlists.getUserPlaylists: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getFeaturedPlaylists(userId, options ? options : {});
        return new Playlists(response.body.playlists.items);
    } catch (error) {
        throw error;
    }
};

Playlists.addMethods = addMethods;

Playlists.override = override;

 /**
 * Show Constructor
 * Creates a new Show Instance for a given show.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the show ID or contain an `id` property.
 */
function Show(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
            this._episodes = new Episodes();
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Show.constructor: No ID Provided");
            }
            this.name = 'name' in data ? data.name : null;
            this.available_markets = 'available_markets' in data ? data.available_markets : null;
            this.copyrights = 'copyrights' in data ? data.copyrights : null;
            this.description = 'description' in data ? data.description : null;
            this.explicit = 'explicit' in data ? data.explicit : null;
            this.episodes = 'episodes' in data ? data.episodes : null;
            this.external_urls = 'external_urls' in data ? data.external_urls : null;
            this.href = 'href' in data ? data.href : null;
            this.images = 'images' in data ? data.images : null;
            this.is_externally_hosted = 'is_externally_hosted' in data ? data.is_externally_hosted : null;
            this.languages = 'languages' in data ? data.languages : null;
            this.media_type = 'media_type' in data ? data.media_type : null;
            this.publisher = 'publisher' in data ? data.publisher : null;
            this.uri = 'uri' in data ? data.uri : null;
            this._episodes = '_episodes' in data ? data._episodes : new Episodes();
            if ('episodes' in data) {
                if ('items' in data.episodes) {
                    this.loadEpisodes(data.episodes.items);
                } else if (data.episodes instanceof Array) {
                    this.loadEpisodes(data.episodes);
                }
            }
        } else {
            throw new Error("Show.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Show.prototype = {
    /**
     * Is Liked
     * Returns whether a show is saved to the user's library.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether show is saved to the user's library.
     */
    isLiked: async function(wrapper) {
        try {
            let response = await wrapper.containsMySavedShows([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Like Show
     * Adds show to the user's library.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    like: async function(wrapper) {
        try {
            return await wrapper.addToMySavedShows([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Show
    * Removes show from the user's library.
    * 
    * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
    */
    unlike: async function(wrapper) {
        try {
            return await wrapper.removeFromMySavedShows([this.id]);
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
    containsFullObject: function() {
        return ((this.name != null) && (this.available_markets != null) && (this.copyrights) && (this.description != null) && (this.explicit != null) && (this.episodes) && (this.external_urls != null) && (this.href != null) && (this.images != null) && (this.is_externally_hosted != null) && (this.languages != null) && (this.media_type != null) && (this.publisher != null) && (this.uri != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.available_markets != null) && (this.copyrights) && (this.description != null) && (this.explicit != null) && (this.external_urls != null) && (this.href != null) && (this.images != null) && (this.is_externally_hosted != null) && (this.languages != null) && (this.media_type != null) && (this.publisher != null) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full show data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Show Full Object Data.
     */
    getFullObject: async function(wrapper) {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                available_markets: this.available_markets,
                copyrights: this.copyrights,
                description: this.description,
                explicit: this.explicit,
                episodes: this.episodes,
                external_urls: this.external_urls,
                href: this.href,
                images: this.images,
                is_externally_hosted: this.is_externally_hosted,
                languages: this.languages,
                media_type: this.media_type,
                publisher: this.publisher,
                uri: this.uri,
                type: 'show',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified show data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Show Simplified Object Data.
     */
    getSimplifiedObject: async function(wrapper) {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
            }
            let data = {
                id: this.id,
                name: this.name,
                available_markets: this.available_markets,
                copyrights: this.copyrights,
                description: this.description,
                explicit: this.explicit,
                external_urls: this.external_urls,
                href: this.href,
                images: this.images,
                is_externally_hosted: this.is_externally_hosted,
                languages: this.languages,
                media_type: this.media_type,
                publisher: this.publisher,
                uri: this.uri,
                type: 'show',
            };
            return data; 
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the show object currently holds
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any Show Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'album' };
            let properties = ['name', 'available_markets', 'copyrights', 'description', 'explicit', 'episodes', 'external_urls', 'href', 'images', 'is_externally_hosted', 'languages', 'media_type', 'publisher', 'uri', '_episodes'];
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
     * Get All Show Episodes
     * Returns Episodes object of all show's episodes.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Episodes} Episodes instance with all show's episodes.
     */ 
    getAllEpisodes: async function(wrapper) {
        try {
            await this.retrieveEpisodes(wrapper);
            return this._episodes;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Show Episodes
     * Returns Episodes object of show's episodes.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional Options
     * @returns {Episodes} Episodes instance with all show's episodes.
     */ 
    getEpisodes: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Show.getEpisodes: Invalid Parameter \"options\"");
            }
            let response = await wrapper.getShowEpisodes(this.id, options ? options : {});
            let episodes = new Episodes(response.body.items);
            await this.loadEpisodes(episodes);
            return episodes;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full show data from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(wrapper) {
        try {
            let response = await wrapper.getShow(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Show Episodes
     * Retrieves all episodes in show from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveEpisodes: async function(wrapper) {
        try {
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await wrapper.getShowEpisodes(this.id, options);
                await this.loadEpisodes(response.body.items);
                options.offset += 50;
            } while (!(response.body.items.length < 50));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * 
     * @param {object} data Object with show full object data.
     */
    loadFullObject: async function(data) {
        try {
            this.name = data.name;
            this.available_markets = data.available_markets;
            this.copyrights = data.copyrights;
            this.description = data.description;
            this.explicit = data.explicit;
            this.episodes = data.episodes;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.images = data.images;
            this.is_externally_hosted = data.is_externally_hosted;
            this.languages = data.languages;
            this.media_type = data.media_type;
            this.publisher = data.publisher;
            this.uri = data.uri;
            if ('episodes' in data) {
                if ('items' in data.episodes) {
                    this.loadEpisodes(data.episodes.items);
                } else if (data.episodes instanceof Array) {
                    this.loadEpisodes(data.episodes);
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
     * @param {object} data Object with show simplified object data.
     */
    loadSimplifiedObject: async function(data) {
        try {
            this.name = data.name;
            this.available_markets = data.available_markets;
            this.copyrights = data.copyrights;
            this.description = data.description;
            this.explicit = data.explicit;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.images = data.images;
            this.is_externally_hosted = data.is_externally_hosted;
            this.languages = data.languages;
            this.media_type = data.media_type;
            this.publisher = data.publisher;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Episodes
     * Helper method to add episodes to shows's internal Episodes item.
     * 
     * @param {Array | Episode | object | string} episodes 
     */
    loadEpisodes: async function(episodes) {
        try {
            if (episodes instanceof Episodes || episodes instanceof Array) {
                this._episodes.concat(episodes);
            } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                this._episodes.push(episodes);
            } else {
                throw new Error("Show.loadEpisodes: Invalid Parameter \"episodes\"");
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Show
 * Returns Show object of ID
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} showID Id of show.
 * @returns {Show} Show from id.
 */
Show.getShow = async function(wrapper, showID) {
    try {
        let show = new Show(showID);
        await show.retrieveFullObjects(wrapper);
        return show;
    } catch (error) {
        throw error;
    }
};

Show.addMethods = addMethods;

Show.override = override;

 /**
 * Constructor
 * Creates a new Shows Instance.
 * 
 * @param {Array | Show | object | string} data (optional) Data to be preloaded. Single or multiple shows.
 */
function Shows(data) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Show || typeof(shows) == 'string' || typeof(shows) == 'object') {
                this.push(data);
            } else {
                throw new Error("Shows.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Shows.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param { Show | object | string } show Show Instance, show object or show id to add. 
     */
    push: function(show) {
        try {
            if (show instanceof Show) {
                if (!(show.id in this.items)) {
                    this.items[show.id] = show;
                }
                this.order.push(show.id);
            } else if (typeof(show) == 'object') {
                if ('show' in show) {
                    if (!(show.show.id in this.items)) {
                        this.items[show.show.id] = new Show(show.show);
                        if ('added_at' in show) {
                            this.items[show.show.id].added_at = show.added_at;
                        }
                    }
                    this.order.push(show.show.id);
                } else {
                    if (!(show.id in this.items)) {
                        this.items[show.id] = new Show(show);
                    }
                    this.order.push(show.id);
                }

            } else if (typeof(show) == 'string') {
                if (!(show in this.items)) {
                    this.items[show] = new Show(show);
                }
                this.order.push(show);
            } else {
                throw new Error("Shows.push: Invalid Parameter \"show\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param {Shows | array } shows Another Shows instance or array of Show instances, show objects, or show ids to concat.
     */
    concat: function(shows) {
        try {
            if (shows instanceof Shows) {
                for (let show in shows.items) {
                    if (!(show in this.items)) {
                        this.items[show] = shows.items[show];
                    }
                    this.order.push(shows.items[show].id);
                }
            } else if (shows instanceof Array) {
                for (let i = 0; i < shows.length; i++) {
                    this.push(shows[i]);
                }
            } else {
                throw new Error("Shows.concat: Invalid Parameter \"shows\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove
     * Removes an item from the Manager Object.
     * 
     * @param { Show | object | string } show Show instance, show data, or show id to remove.
     */
    remove: function(show) {
        try {
            let id = null;
            if (show instanceof Show || typeof(show) == 'object') {
                id = show.id;
            } else if (typeof(show) == 'string') {
                id = show;
            } else {
                throw new Error("Shows.remove: Invalid Parameter \"show\"");
            }
            this.order = this.order.filter((item) => {
                return item != id;
            });
            delete this.items[id];
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
            return this.order.length;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an item
     * 
     * @param {string | object | Show} show Show ID, Show instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: function(show, startAt) {
        try {
            let id = null;
            if (typeof(show) == 'string') {
                id = show;
            } else if (show instanceof Show || typeof(show) == 'object') {
                id = show.id;  
            } 
            if (show == null) {
                throw new Error("Shows.findIndex: Invalid Parameter \"show\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Shows.findIndex: Invalid Parameter \"startAt\"");
            }
            for (let i = startAt; i < this.order.length; i++) {
                if (this.order[i] == id) {
                    return i;
                }
            }
            return -1;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * 
     * @param {string | object | Show} show Show ID, Show instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: function(show) {
        try {
            let id = null;
            if (typeof(show) == 'string') {
                id = show;
            } else if (show instanceof Show || typeof(show) == 'object') {
                id = show.id;  
            } 
            if (show == null) {
                throw new Error("Shows.includes: Invalid Parameter \"show\"");
            }
            for (let show in this.items) {
                if (show == id) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter
     * Returns Shows object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Shows} Filtered Shows object.
     */
    filter: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Shows.filter: \"method\" is not a function"); 
            }
            let newShows = new Shows();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newShows.push(this.items[this.order[i]]);
                }
            }
            return newShows;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns show object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Show} Show at a given index
     */
    get: function(index) {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Shows.get: Index out of range");
            }
            return this.items[this.order[index]];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * 
     * @returns {Array} Array of IDs
     */
    getIDs: function() {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: function() {
        try {
            let ids = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(ids.includes(this.order[i]))) {
                    ids.push(this.order[i]);
                }
            }
            return ids;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Get URIs
     * Returns array of URIs in order.
     * 
     * @returns {Array} Array of URIs
     */
    getURIs: async function() {
        try {
            return await this.order.map((id) => 'spotify:show' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get URIs No Repeats
     * Returns array of URIs with no repeats.
     * 
     * @returns {Array} Array of URIs
     */
    getURIsNoRepeats: async function() {
        try {
            let uris = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(uris.includes(this.order[i]))) {
                    uris.push(this.order[i]);
                }
            }
            return await uris.map((id) => 'spotify:show' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * For Each
     * Runs a function on each item.
     * 
     * @param {function} method Function to be run on each item.
     */
    forEach: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Shows.forEach: \"method\" is not a function"); 
            }
            for (let i = 0; i < this.order; i++) {
                await method(this.items[this.order[i]]);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: function() {
        try {
            this.order.reverse();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pop
     * Removes last item.
     * 
     * @returns {Show} Removed item
     */
    pop: function() {
        try {
            let id = this.order.pop();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Shift
     * Removes first item.
     * 
     * @returns {Show} Removed item
     */
    shift: function() {
        try {
            let id = this.order.shift();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Slice
     * Removes elements.
     * 
     * @param {number} start Start of removal
     * @param {number} end End of removal (Exclusive)
     * @returns {Shows} Removed Shows.
     */
    slice: async function(start, end) {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Shows(await ids.map((id) => this.items[id]));
            for (let i = 0; i < ids.length; i++) {
                if (!(this.order.includes(ids[i]))) {
                    delete this.items[ids[i]];
                }
            }
            return items;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort
     * Sort Shows
     * 
     * @param {function} compareFunction Sorting method.
     */
    sort: async function(compareFunction) {
        try {
            let sorted = await (await Object.values(this.items)).sort(compareFunction);
            this.order = await sorted.map((item) => item.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort Safe
     * Sorts but ensures properties are present prior to sort.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async function(wrapper, order, property) {
        try {
            let fullObject = ['id', 'name', 'available_markets', 'copyrights', 'description', 'explicit', 'episodes', 'external_urls', 'href', 'images', 'is_externally_hosted', 'languages', 'media_type', 'publisher', 'uri', '_episodes'];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else {
                for (let show in this.items) {
                    if (!(property in this.items[show])) {
                        throw new Error("Shows.sortSafe: Invalid Parameter \"property\", you have shows that don't contain that property.");
                    }
                }
            }
            let ordered = await Object.values(this.items).sort((a, b) => {
                if (typeof(a[property]) == 'string') {
                    let aPrior = a[property].localeCompare(b[property]);
                    return order > 0 ? aPrior : (aPrior * -1) 
                }
                return order > 0 ? a[property] - b[property] : b[property]- a[property];
            });
            return new Shows(ordered);
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
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error("Shows.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Liked
     * Returns array of booleans whether shows are saved to the user's library.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Booleans Whether show are saved to the user's library.
     */
    areLiked: async function(wrapper) {
        try {
            let shows = await this.order.map((show) => {
                return this.items[show]; 
            });
            let response = await wrapper.containsMySavedShows(await shows.map((show) => show.id));
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
    * Like Shows
    * Adds shows to the user's library.
    * 
    * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
    */
    likeAll: async function(wrapper) {
        try {
            await wrapper.addToMySavedShows(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Shows
    * Removes shows from the user's library.
    * 
    * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
    */
    unlikeAll: async function(wrapper) {
        try {
            await wrapper.removeFromMySavedShows(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full show data for all shows. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Show Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let shows = await this.order.map((show) => {
                return this.items[show]; 
            });
            return await Promise.all(await shows.map(async (show) => {
                return await show.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified show data for all shows. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Show Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let shows = await this.order.map((show) => {
                return this.items[show]; 
            });
            return await Promise.all(await shows.map(async (show) => {
                return await show.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Shows Current Data
     * Just returns whatever the show objects currently hold.
     * 
     * @returns {array} Array of Current Show Data
     */
    getCurrentData: async function() {
        try {
            let shows = await this.order.map((show) => {
                return this.items[show]; 
            });
            return await Promise.all(await shows.map(async (show) => {
                return await show.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Show's Episodes
     * Returns Episodes instance with all show's episodes.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Episodes} Episodes object of all show's episodes.
     */
    getEpisodes: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper);
            let episodes = new Episodes();
            for (let show in this.items) {
                await episodes.concat(await this.items[show].getEpisodes(wrapper));
            }
            return episodes;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full show data for all shows from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the show contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            let ids = [];
            for (let show in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[show].containsSimplifiedObject())) {
                        ids.push(show);
                    } 
                } else {
                    if (!(await this.items[show].containsFullObject())) {
                        ids.push(show);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getShows(ids.splice(0, 50));
                    for (let i = 0; i < response.body.shows.length; i++) {
                        if (response.body.shows[i] == null) continue;
                        this.items[response.body.shows[i].id].loadFullObject(response.body.shows[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Search for a Shows
 * Returns search results for a query.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Shows} Shows returned from Search.
 */
Shows.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Shows.search: Invalid Parameter \"options\"");
        }
        let _options = (typeof(options) == 'object') ? options : {};
        let response = await wrapper.searchShows(query, _options);
        return new Shows(response.body.shows.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Shows
 * Returns Shows object of IDs
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} showIds Ids of shows.
 * @returns {Shows} Shows from ids.
 */
Shows.getShows = async function(wrapper, showIds) {
    try {
        let shows = new Shows(showIds);
        await shows.retrieveFullObjects(wrapper);
        return shows;
    } catch (error) {
        throw error;
    }
};

Shows.addMethods = addMethods;

Shows.override = override;

 /**
 * User Constructor
 * Creates a new User Instance for a given user.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the user ID or contain an `id` property.
 */
function User(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("User.constructor: No ID Provided");
            }
            this.display_name = 'display_name' in data ? data.display_name : null;
            this.external_urls = 'external_urls' in data ? data.external_urls : null;
            this.followers = 'followers' in data ? data.followers : null;
            this.href = 'href' in data ? data.href : null;
            this.images = 'images' in data ? data.images : null;
            this.uri = 'uri' in data ? data.uri : null;
            // Current User
            this.country = 'country' in data ? data.country : null;
            this.email = 'email' in data ? data.email : null;
            this.product = 'product' in data ? data.product : null;
        } else {
            throw new Error("User.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

User.prototype = {
    /**
     * Is Me
     * Returns whether user object is current logged in user.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether user is current logged in user.
     */
    isMe: async function(wrapper) {
        try {
            let response = await wrapper.getMe();
            return (response.body.id == this.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Followed
     * Returns whether a user is followed by the user.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether user is followed by user.
     */
    isFollowed: async function(wrapper) {
        try {
            let response = await wrapper.isFollowingUsers([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow User
     * Follows user.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    follow: async function(wrapper) {
        try {
            return await wrapper.followUsers([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow User
     * Unfollows user.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    unfollow: async function(wrapper) {
        try {
            return await wrapper.unfollowUsers([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Contains Private Object
     * Returns boolean whether private object data is present.
     * 
     * @returns {boolean} Whether private object is loaded.
     */
    containsPrivateObject: function() {
        return ((this.country != null) && (this.email != null) && (this.product != null) && (this.display_name != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.uri != null));
    },

    /**
     * Contains Public Object
     * Returns boolean whether public object data is present.
     * 
     * @returns {boolean} Whether public object is loaded.
     */
    containsPublicObject: function() {
        return ((this.display_name != null) && (this.external_urls) && (this.followers) && (this.href != null) && (this.images != null) && (this.uri != null));
    },

    /**
     * Are Following Playlist
     * Returns boolean whether user is following a playlist.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} playlistId ID of Playlist
     * @returns {boolean} Whether user is following a playlist
     */
    areFollowingPlaylist: async function(wrapper, playlistId) {
        try {
            let playlist = new Playlist(playlistId);
            let response = await playlist.areFollowing(wrapper, [this.id]);
            return response[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Private Object
     * Returns private user data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} User Private Object Data.
     */
    getPrivateObject: async function(wrapper) {
        try {
            if (!await this.isMe(wrapper)) {
                throw new Error("User.getPrivateObject: Cannot Retrieve Private Data for Non-Current User");
            }
            if (!(await this.containsPrivateObject())) {
                await this.retrievePrivateObject(wrapper);
            }
            return {
                display_name: data.display_name,
                external_urls: data.external_urls,
                followers: data.followers,
                href: data.href,
                images: data.images,
                uri: data.uri,
                country: data.country,
                email: data.email,
                product: data.product,
                type: 'user',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Public Object
     * Returns public user data. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} User Public Object Data.
     */
    getPublicObject: async function(wrapper) {
        try {
            if (!(await this.containsPublicObject())) {
                await this.retrievePublicObject(wrapper);
            }
            return {
                display_name: data.display_name,
                external_urls: data.external_urls,
                followers: data.followers,
                href: data.href,
                images: data.images,
                uri: data.uri,
                type: 'user',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the user object currently holds
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any User Data.
     */
    getCurrentData: function() {
        try {
            let data = { id: this.id, type: 'user' };
            let properties = ['display_name', 'external_urls', 'followers', 'href', 'images', 'uri', 'country', 'email', 'product'];
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
     * Get User's Playlists
     * Returns Playlists object of user's playlists
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options Additional Options to request.
     * @returns {Playlist} Playlist Object with User Playlists
     */
    getPlaylists: async function(wrapper, options) {
        try {
            return await Playlists.getUserPlaylists(wrapper, this.id, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All User's Playlists
     * Returns Playlists object of all user's playlists
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options Additional Options to request.
     * @returns {Playlist} Playlist Object with All User Playlists
     */
    getAllPlaylists: async function(wrapper, options) {
        try {
            return await Playlists.getAllUserPlaylists(wrapper, this.id, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Private Object
     * Sets private data (outside constructor).
     * 
     * @param {object} data Object with user private object data.
     */
    loadPrivateObject: function(data) {
        try {
            this.id = data.id;
            this.display_name = data.display_name;
            this.external_urls = data.external_urls;
            this.followers = data.followers;
            this.href = data.href;
            this.images = data.images;
            this.uri = data.uri;
            this.country = data.country;
            this.email = data.email;
            this.product = data.product;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Public Object
     * Sets public data (outside constructor).
     * 
     * @param {object} data Object with user public object data.
     */
    loadPublicObject: function(data) {
        try {
            this.display_name = data.display_name;
            this.external_urls = data.external_urls;
            this.followers = data.followers;
            this.href = data.href;
            this.images = data.images;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Private Object
     * Retrieves private user data from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrievePrivateObject: async function(wrapper) {
        try {
            let response = await wrapper.getMe();
            await this.loadPrivateObject(response.body);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Public Object
     * Retrieves public user data from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    retrievePublicObject: async function(wrapper) {
        try {
            let response = await wrapper.getUser(this.id);
            await this.loadPublicObject(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get User
 * Returns User object of ID
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} userId Id of user.
 * @returns {User} User from id.
 */
User.getUser = async function(wrapper, userId) {
    try {
        let user = new User(userId);
        await user.retrievePublicObject(wrapper);
        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Me
 * Returns User object of Current User
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @returns {User} User of current user.
 */
User.getMe = async function(wrapper) {
    try {
        let response = await wrapper.getMe();
        let user = new User(response.body);
        return user;
    } catch (error) {
        throw error;
    }
};

User.addMethods = addMethods;

User.override = override;

function Wrapper() {};

/**
 * Get an Episode
 * Returns data from API for an episode
 * 
 * @param {string} episodeId The episode's ID.
 * @param {Object} [options] The possible options, currently only market.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing information about the show. 
 */
let getEpisode = (episodeId, options, callback) => {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
        actualCallback = options;
        actualOptions = {};
    } else {
        actualCallback = callback;
        actualOptions = options;
    }

    return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/episodes/' + episodeId)
    .withQueryParameters(actualOptions)
    .build()
    .execute(HttpManager.get, actualCallback);
};

/**
 * Get Episodes
 * Look up several Episodes.
 * 
 * @param {string[]} episodeIDs The IDs of the episodes.
 * @param {Object} [options] The possible options, currently only market.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing information about the shows. 
 */
let getEpisodes = (episodeIDs, options, callback) => {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
        actualCallback = options;
        actualOptions = {};
    } else {
        actualCallback = callback;
        actualOptions = options;
    }
    return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/episodes')
    .withQueryParameters(
    {
        ids: episodeIDs.join(',')
    },
    actualOptions
    )
    .build()
    .execute(HttpManager.get, actualCallback);
};

/**
 * Search for an episode.
 * @param {string} query The search query.
 * @param {Object} [options] The possible options, e.g. limit, offset.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing the
 *          search results. The result is paginated. If the promise is rejected,
 *          it contains an error object. Not returned if a callback is given.
 */
let searchEpisodes = (query, options, callback) => {
    return this.search(query, ['episode'], options, callback);
};

/**
 * Get a Show
 * Returns data from API for a show
 * 
 * @param {string} showID The show's ID.
 * @param {Object} [options] The possible options, currently only market.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing information about the show. 
 */
let getShow = (showID, options, callback) => {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
        actualCallback = options;
        actualOptions = {};
    } else {
        actualCallback = callback;
        actualOptions = options;
    }
    return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/shows/' + showID)
    .withQueryParameters(actualOptions).build()
    .execute(HttpManager.get, actualCallback);
};

/**
 * Get Shows
 * Look up several shows.
 * 
 * @param {string[]} showIds The IDs of the shows.
 * @param {Object} [options] The possible options, currently only market.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing information about the shows. 
 */
let getShows = (showIds, options, callback) => {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
        actualCallback = options;
        actualOptions = {};
    } else {
        actualCallback = callback;
        actualOptions = options;
    }
    return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/shows')
    .withQueryParameters({ ids: showIds.join(',')}, actualOptions).build()
    .execute(HttpManager.get, actualCallback);
};

/**
 * Check if one or more shows is already saved in the current Spotify user’s “Your Music” library.
 * @param {string[]} showIds The show IDs
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, resolves into an array of booleans. The order
 * of the returned array's elements correspond to the track ID in the request.
 * The boolean value of true indicates that the track is part of the user's library, otherwise false.
 * Not returned if a callback is given.
 */
let containsMySavedShows = (showIds, callback) => {
    return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/me/shows/contains')
    .withQueryParameters({ ids: showIds.join(',') }).build()
    .execute(HttpManager.get, callback);
};

/**
 * Remove a show from the authenticated user's Your Music library.
 * @param {string[]} showIds The show IDs
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error.
 * Not returned if a callback is given.
 */
let removeFromMySavedShows = (showIds, callback) => {
    return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/me/shows')
    .withHeaders({ 'Content-Type': 'application/json' }).withBodyParameters({ ids: showIds }).build()
    .execute(HttpManager.del, callback);
};

/**
 * Add a show from the authenticated user's Your Music library.
 * @param {string[]} showIds The show IDs
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error. Not returned if a callback is given.
 */
let addToMySavedShows = (showIds, callback) => {
    return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/me/shows').withHeaders({ 'Content-Type': 'application/json' })
    .withBodyParameters({ ids: showIds }).build()
    .execute(HttpManager.put, callback);
};

/**
 * Retrieve the shows that are saved to the authenticated users Your Music library.
 * @param {Object} [options] Options, being market, limit, and/or offset.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which in turn contains
 *          playlist show objects. Not returned if a callback is given.
 */
let getMySavedShows = (options, callback) => {
    return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/me/shows')
    .withQueryParameters(options).build()
    .execute(HttpManager.get, callback);
};

/**
 * Get episodes in a show.
 * @param {string} showId The show's ID.
 * @param {Object} [options] Optional options, such as fields.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful
 */
let getShowEpisodes = (showId, options, callback) => {
    return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/shows/' + showId + '/episodes').withQueryParameters(options).build()
    .execute(HttpManager.get, callback);
};

/**
 * Search for an show.
 * @param {string} query The search query.
 * @param {Object} [options] The possible options, e.g. limit, offset.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing the
 *          search results. The result is paginated. If the promise is rejected,
 *          it contains an error object. Not returned if a callback is given.
 */
let searchShows = (query, options, callback) => {
    return this.search(query, ['show'], options, callback);
};

Wrapper.prototype = {
    ...SpotifyWebAPI.prototype,
    getEpisode: getEpisode,
    getEpisodes: getEpisodes,
    searchEpisodes: searchEpisodes,
    getShow: getShow,
    getShows: getShows,
    containsMySavedShows: containsMySavedShows,
    removeFromMySavedShows: removeFromMySavedShows,
    addToMySavedShows: addToMySavedShows,
    getMySavedShows: getMySavedShows,
    getShowEpisodes: getShowEpisodes,
    searchShows: searchShows,
}

Wrapper.addMethods = addMethods;
Wrapper.override = override;

var EnhancedSpotifyAPI = {
    Wrapper: Wrapper,
    Track: Track,
    Tracks: Tracks,
    Artist: Artist,
    Artists: Artists,
    Album: Album,
    Albums: Albums,
    Playlist: Playlist,
    Playlists: Playlists,
    Category: Category,
    Categories: Categories,
    Show: Show,
    Shows: Shows,
    Episode: Episode,
    Episodes: Episodes,
    Playback: Playback,
    User: User,
};

// 'use strict'

// var { addMethods, override } = require('./structures/shared');

// var SpotifyWebAPI = require('spotify-web-api-node');

// function Wrapper() {};

// Wrapper.prototype = {
//     // Inherits from spotify-web-api-node
//     ...SpotifyWebAPI.prototype,
//     // Missing Endpoints
//     ...require('./functions/Shows'),
//     ...require('./functions/Episodes'),
// }

// Wrapper.addMethods = addMethods;

// Wrapper.override = override;

// module.exports = {
//     Wrapper: Wrapper,
//     Track: require('./structures/Track'),
//     Tracks: require('./structures/Tracks'),
//     Artist: require('./structures/Artist'),
//     Artists: require('./structures/Artists'),
//     Album: require('./structures/Album'),
//     Albums: require('./structures/Albums'),
//     Playlist: require('./structures/Playlist'),
//     Playlists: require('./structures/Playlists'),
//     Category: require('./structures/Category'),
//     Categories: require('./structures/Categories'),
//     Show: require('./structures/Show'),
//     Shows: require('./structures/Shows'),
//     Episode: require('./structures/Episode'),
//     Episodes: require('./structures/Episodes'),
//     Playback: require('./structures/Playback'),
//     User: require('./structures/User'),
// };

module.exports = EnhancedSpotifyAPI;