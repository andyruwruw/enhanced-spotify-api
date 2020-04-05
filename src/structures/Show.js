'use strict';

var { addMethods, override } = require('./shared');

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
            this._episodes = new Show.Episodes();
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
            this._episodes = '_episodes' in data ? data._episodes : new Show.Episodes();
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

Show.Episodes = require('./Episodes');

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
            let episodes = new Show.Episodes(response.body.items);
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
            if (episodes instanceof Show.Episodes || episodes instanceof Array) {
                this._episodes.concat(episodes);
            } else if (typeof(tracks) == 'object' || typeof(tracks) == 'string') {
                this._episodes.add(episodes);
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

module.exports = Show;