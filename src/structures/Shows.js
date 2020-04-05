'use strict';

var { addMethods, override } = require('./shared');

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
            } else if (data instanceof Shows.Show || typeof(shows) == 'string' || typeof(shows) == 'object') {
                this.push(data);
            } else {
                throw new Error("Shows.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Shows.Show = require('./Show');
Shows.Episodes = require('./Episodes');

Shows.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param { Show | object | string } show Show Instance, show object or show id to add. 
     */
    push: function(show) {
        try {
            if (show instanceof Shows.Show) {
                if (!(show.id in this.items)) {
                    this.items[show.id] = show;
                }
                this.order.push(show.id);
            } else if (typeof(show) == 'object') {
                if ('show' in show) {
                    if (!(show.show.id in this.items)) {
                        this.items[show.show.id] = new Shows.Show(show.show);
                        if ('added_at' in show) {
                            this.items[show.show.id].added_at = show.added_at;
                        }
                    }
                    this.order.push(show.show.id);
                } else {
                    if (!(show.id in this.items)) {
                        this.items[show.id] = new Shows.Show(show);
                    }
                    this.order.push(show.id);
                }

            } else if (typeof(show) == 'string') {
                if (!(show in this.items)) {
                    this.items[show] = new Shows.Show(show);
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
            if (show instanceof Shows.Show || typeof(show) == 'object') {
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
            } else if (show instanceof Shows.Show || typeof(show) == 'object') {
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
            } else if (show instanceof Shows.Show || typeof(show) == 'object') {
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
            let episodes = new Shows.Episodes();
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
                    for (let i = 0; i < response.data.shows.length; i++) {
                        if (response.data.shows[i] == null) continue;
                        this.items[response.data.shows[i].id].loadFullObject(response.data.shows[i]);
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

module.exports = Shows;