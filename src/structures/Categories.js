'use strict';

var { addMethods, override } = require('./shared');

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
            } else if (data instanceof Categories.Category || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Categories.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Categories.Category = require('./Category');
Categories.Playlists = require('./Playlists');

Categories.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param {Category | object | string} category Category Instance, category object or category id to add. 
     */
    push: function(category) {
        try {
            if (category instanceof Categories.Category) {
                if (!(category.id in this.items)) {
                    this.items[category.id] = category;
                }
                this.order.push(category.id);
            } else if (typeof(category) == 'object') {
                if ('category' in category) {
                    if (!(category.category.id in this.items)) {
                        this.items[category.category.id] = new Categories.Category(category.category);
                    }
                    this.order.push(category.category.id);
                } else {
                    if (!(category.id in this.items)) {
                        this.items[category.id] = new Categories.Category(category);
                    }
                    this.order.push(category.id);
                }

            } else if (typeof(category) == 'string') {
                if (!(category in this.items)) {
                    this.items[category] = new Categories.Category(category);
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
            if (category instanceof Categories.Category || typeof(category) == 'object') {
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
            } else if (category instanceof Categories.Category || typeof(category) == 'object') {
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
            } else if (category instanceof Categories.Category || typeof(category) == 'object') {
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
            let playlists = new Categories.Playlists();
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

module.exports = Categories;