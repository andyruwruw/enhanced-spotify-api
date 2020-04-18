'use strict';

var Models = require('../../index');

 /**
 * Episode Constructor
 * Creates a new Episode Instance for a given episode.
 * @param {Object | String} data Data to be preloaded. Must either be a string of the episode ID or contain an `id` property.
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
            this.loadConditionally(data);
        } else {
            throw new Error("Episode.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Episode.prototype = {
    /**
     * Play Episode
     * Plays episode on user's active device.
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response from request.
     * options.position_ms: {Number} Position to start playback (Milliseconds)
     */
    play: async function(options) {
        try {
            let _options = options ? options : {};
            _options.uris = [ 'spotify:episode:' + this.id ];
            return await Models.wrapperInstance.play(_options);
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
        return ((this.name != null) && (this.audio_preview_url != null) && (this.description != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_urls != null) && (this.href != null) && (this.images != null) && (this.is_externally_hosted != null) && (this.is_playable != null) && (this.languages != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.show) && (this.uri != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * @returns {Boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.audio_preview_url != null) && (this.description != null) && (this.duration_ms != null) && (this.explicit != null) && (this.external_urls != null) && (this.href != null) && (this.images != null) && (this.is_externally_hosted != null) && (this.is_playable != null) && (this.languages != null) && (this.release_date != null) && (this.release_date_precision != null) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full episode data. Retrieves from Spotify API if nessisary.
     * @returns {Object} Episode Full Object Data.
     */
    getFullObject: async function() {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject();
            }
            let result = {
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
                languages: this.languages,
                release_date: this.release_date,
                release_date_precision: this.release_date_precision,
                show: this.show,
                uri: this.uri,
                type: "episode",
            };
            if (this.resume_point != null) {
                result.resume_point = this.resume_point;
            }
            if (this.language != null) {
                result.language = this.language;
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified episode data. Retrieves from Spotify API if nessisary.
     * 
     * @returns {Object} Episode Simplified Object Data.
     */
    getSimplifiedObject: async function() {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject();
            }
            let result = {
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
                languages: this.languages,
                release_date: this.release_date,
                release_date_precision: this.release_date_precision,
                uri: this.uri,
                type: 'episode',
            };
            if (this.resume_point != null) {
                result.resume_point = this.resume_point;
            }
            if (this.language != null) {
                result.language = this.language;
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the track object currently holds
     * @returns {Object} Any Track Data.
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
     * @returns {Show} Episode's Show
     */
    getShow: async function() {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject();
            }
            return new Models.Show(this.show);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * @param {Object} data Object with episode full object data.
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
     * @param {Object} data Object with episode simplified object data.
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
     * Load Conditionally
     * Sets all data conditionally.
     * @param {Object} data Object with episode data.
     */
    loadConditionally: function(data) {
        try {
            let properties = ["name", "audio_preview_url", "description", "duration_ms", "explicit", "external_urls", "href", "images", "is_externally_hosted", "is_playable", "language", "languages", "release_date", "release_date_precision", "resume_point", "show", "uri"];
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
     * Retrieves full episode data from Spotify API
     */
    retrieveFullObject: async function() {
        try {
            let response = await Models.wrapperInstance.getEpisode(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Episode
 * Returns Episode object of ID
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {String} episodeId Id of episode.
 * @returns {Episode} Episode from id.
 */
Episode.getEpisode = async function(episodeId) {
    try {
        let response = await Models.wrapperInstance.getEpisode(episodeId);
        return new Models.Episode(response.body);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Episode.addMethods = function(methods) {
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
Episode.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Episode.override: \"name\" does not exist.");
    }
};

Episode.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Episode.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Episode.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Episode.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Episode.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Episode.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Episode.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Episode.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Episode.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Episode.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Episode.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Episode.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Episode.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Episode.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Episode.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Episode.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Episode.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Episode.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Episode;