'use strict';

var { addMethods, override } = require('./shared');

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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
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

module.exports = Episode;