'use strict';

var { addMethods, override } = require('./shared');

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
            } else if (data instanceof Episodes.Episode || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Episodes.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Episodes.Episode = require('./Episode');
Episodes.Shows = require('./Shows');

Episodes.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param { Episode | object | string } episode Episode Instance, episode object or episode id to add. 
     */
    push: (episode) => {
        try {
            if (episode instanceof Episodes.Episode) {
                if (!(episode.id in this.items)) {
                    this.items[episode.id] = episode;
                }
                this.order.push(episode.id);
            } else if (typeof(episode) == 'object') {
                if (!(episode.id in this.items)) {
                    this.items[episode.id] = new Episodes.Episode(episode);
                }
                this.order.push(episode.id);
            } else if (typeof(episode) == 'string') {
                if (!(episode in this.items)) {
                    this.items[episode] = new Episodes.Episode(episode);
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
    concat: (episodes) => {
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
    remove: (episode) => {
        try {
            let id = null;
            if (episode instanceof Episodes.Episode || typeof(episode) == 'object') {
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
    size: () => {
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
    indexOf: (episode, startAt) => {
        try {
            let id = null;
            if (typeof(episode) == 'string') {
                id = episode;
            } else if (episode instanceof Episodes.Episode || typeof(episode) == 'object') {
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
    includes: (episode) => {
        try {
            let id = null;
            if (typeof(episode) == 'string') {
                id = episode;
            } else if (episode instanceof Episodes.Episode || typeof(episode) == 'object') {
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
    filter: async (method) => {
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
    get: (index) => {
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
    getIDs: () => {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: () => {
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
    getURIs: async () => {
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
    getURIsNoRepeats: async () => {
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
    forEach: async (method) => {
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
    reverse: () => {
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
    pop: () => {
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
    shift: () => {
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
    slice: async (start, end) => {
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
    sort: async (compareFunction) => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async (wrapper, order, property) => {
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
    setProperty: (id, field, value) => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Episode Full Objects.
     */
    getFullObjects: async (wrapper) => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Episode Simplified Objects.
     */
    getSimplifiedObjects: async (wrapper) => {
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
    getCurrentData: async () => {
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Shows} Shows object of all episode's episshowsodes.
     */
    getShows: async (wrapper) => {
        try {
            await this.retrieveFullObjects(wrapper);
            let shows = new Episodes.Shows();
            for (let episode in this.items) {
                await shows.add(await this.items[show].getShow(wrapper));
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
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the episode contains.
     */
    retrieveFullObjects: async (wrapper, objectType) => {
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
                    for (let i = 0; i < response.data.episodes.length; i++) {
                        if (response.data.episodes[i] == null) continue;
                        this.items[response.data.episodes[i].id].loadFullObject(response.data.episodes[i]);
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Episodes} Episodes returned from Search.
 */
Episodes.search = async (wrapper, query, options) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} episodeIds Ids of episodes.
 * @returns {Episodes} Episodes from ids.
 */
Episodes.getEpisodes = async (wrapper, showIds) => {
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

module.exports = Episodes;