'use strict';

var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Manager Instance.
 * @param {Array | Item | Object | String} data (optional) Data to be preloaded. Single or multiple items.
 */
function Manager(items) {
    try {
        this.items = {};
        this.order = [];
        if (items) {
            if (items instanceof Array)  {
                this.concat(items);
            } else if (items instanceof Models[this.type] || typeof(items) == 'string' || typeof(items) == 'object') {
                this.push(items);
            } else {
                throw new Error(this.name + ".constructor: Invalid Parameter \"items\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Manager.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * @param {Item | Object | String } item Item Instance, item object or item ID to add. 
     */
    push: function(item) {
        try {
            if (item instanceof Models[this.type]) {
                if (!this.items.hasOwnProperty(item.id)) {
                    this.items[item.id] = item;
                }
                this.order.push(item.id);
            } else if (typeof(item) == 'object') {
                if (item.hasOwnProperty('track')) {
                    if (!this.items.hasOwnProperty(item.track.id)) {
                        this.items[item.track.id] = new Models[this.type](item.track);
                        if (item.hasOwnProperty('is_local')) {
                            this.items[item.track.id].is_local = item.is_local;
                        }
                        if (item.hasOwnProperty('added_at')) {
                            this.items[item.track.id].added_at = item.added_at;
                        }
                        if (item.hasOwnProperty('added_by')) {
                            this.items[item.track.id].added_by = item.added_by;
                        }
                    }
                    this.order.push(item.track.id);
                } else {
                    if (!this.items.hasOwnProperty(item.id)) {
                        this.items[item.id] = new Models[this.type](item);
                    }
                    this.order.push(item.id);
                }
            } else if (typeof(item) == 'string') {
                if (!this.items.hasOwnProperty(item)) {
                    this.items[item] = new Models[this.type](item);
                }
                this.order.push(item);
            } else {
                throw new Error(this.name + ".push: Invalid Parameter \"item\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * @param {Items | Array } items Another Items instance or array of Item instances, item objects, or item IDs to concat.
     */
    concat: function(items) {
        try {
            if (items instanceof Models[this.name]) {
                for (let i = 0; i < items.order.length; i++) {
                    if (!this.items.hasOwnProperty(items.order[i])) {
                        this.items[items.order[i]] = items.items[items.order[i]];
                    }
                    this.order.push(items.order[i]);
                }
            } else if (items instanceof Array) {
                for (let i = 0; i < items.length; i++) {
                    this.push(items[i]);
                }
            } else {
                throw new Error(this.name + ".concat: Invalid Parameter \"items\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Size
     * Returns number of items in manager.
     * @returns {Number} Number of items in manager.
     */
    size: function() {
        try {
            return this.order.length;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * @param {Item | Object | String } item Item instance, item data, or item ID to remove.
     * @returns {Boolean} Whether item is contained.
     */
    includes: function(item) {
        try {
            let id = null;
            if (typeof(item) == 'string') {
                id = item;
            } else if ((item instanceof Models[this.type] || typeof(item) == 'object') && item.hasOwnProperty('id')) {
                id = item.id;  
            } else {
                throw new Error(this.name + ".includes: Invalid Parameter \"item\"");
            }
            return this.items.hasOwnProperty(id);
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an item
     * @param {Item | Object | String } item Item instance, item data, or item ID to remove.
     * @param {Number} start Where to start searching from. Negative values will start at the given position from the end (Inclusive).
     * @returns {Number} Index of item.
     */
    indexOf: function(item, start) {
        try {
            if (start > this.order.length - 1) {
                throw new Error(this.name + ".findIndex: Invalid Parameter \"start\"");
            } 
            let id = null;
            if (typeof(item) == 'string') {
                id = item;
            } else if ((item instanceof Models[this.type] || typeof(item) == 'object') && item.hasOwnProperty('id')) {
                id = item.id;  
            } else {
                throw new Error(this.name + ".findIndex: Invalid Parameter \"item\"");
            }
            return this.order.indexOf(id, start);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns item at a given index
     * @param {Number} index Index of the item desired. Negative value will return item that far from the end.
     * @returns {Item} Item at a given index
     */
    get: function(index) {
        try {
            if (index > this.order.length - 1) {
                throw new Error(this.name + ".get: Index out of range");
            }
            return this.items[this.order[index > 0 ? index : (this.order.length - 1) - index]];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * @returns {Array} Array of IDs
     */
    getIDs: function() {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: function() {
        try {
            let ids = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!ids.includes(this.order[i])) {
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
     * @returns {Array} Array of URIs
     */
    getURIs: async function() {
        try {
            return await this.order.map((id) => 'spotify:' + this.uri_type + ':' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get URIs No Repeats
     * Returns array of URIs with no repeats.
     * @returns {Array} Array of URIs
     */
    getURIsNoRepeats: async function() {
        try {
            let ids = await this.getIDsNoRepeats();
            return await ids.map((id) => 'spotify:' + this.uri_type + ':' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pop
     * Removes last item.
     * @returns {Item} Removed item
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
     * @returns {Item} Removed item
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
     * @param {Number} start Start of removal
     * @param {Number} end End of removal (Exclusive)
     * @returns {Items} Removed Items.
     */
    slice: async function(start, end) {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Models[this.name](await ids.map((id) => this.items[id]));
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
     * Remove
     * Removes an item from the Manager Object.
     * @param {Item | Object | String } item Item instance, item data, or item ID to remove.
     * @returns {Item} Deleted item.
     */
    remove: function(item) {
        try {
            let id = null;
            if (item instanceof Models[this.type] || typeof(item) == 'object') {
                id = item.id;
            } else if (typeof(item) == 'string') {
                id = item;
            } else {
                throw new Error(this.name + ".remove: Invalid Parameter \"item\"");
            }
            this.order = this.order.filter((item) => {
                return item != id;
            });
            let deletedItem = this.items[id];
            delete this.items[id];
            return deletedItem;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove Indexes
     * Removes multiple items by index from the manager Object.
     * @param {Array} indexes Indexes to be removed.
     * @returns {Items} Deleted items.
     */
    removeIndexes: function(indexes) {
        try {
            let sorted = indexes.sort((a, b) => b - a);
            if (sorted[0] > (this.order.length - 1) || sorted[sorted.length - 1] < 0) {
                throw new Error(this.name + ".removeIndexes: Invalid Parameter \"indexes\", out of range.");
            }
            let deleted = new Models[this.name]();
            for (let i = 0; i < sorted.length; i++) {
                let id = this.order[sorted[i]];
                this.order.splice(sorted[i], 1);
                deleted.push(this.items[id]);
                if (!this.order.includes(id)) {
                    delete this.items[id];
                }
            }
            return deleted;
        } catch (error) {
            throw error;
        }
    },

    /**
     * For Each
     * Runs a function on each item.
     * @param {Function} method Function to be run on each item.
     * @param {Function} thisArg Value to use as "this" when executing callback.
     */
    forEach: async function(method, thisArg) {
        try {
            let items = await this.order.map((item) => {
                return this.items[item];
            });
            await items.forEach(method, thisArg ? thisArg: this);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter
     * Returns Items object with filtered items.
     * @param {Function} method Method to filter by.
     * @param {Function} thisArg Value to use as "this" when executing callback.
     * @returns {Items} Filtered Items object.
     */
    filter: async function(method, thisArg) {
        try {
            let newManager = new Models[this.name]();
            let items = await this.order.map((item) => {
                return this.items[item];
            });
            let filteredItems = await Promise.all(await items.filter(method, thisArg ? thisArg: this));
            await newManager.concat(filteredItems);
            return newManager;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort
     * Sort Items
     * @param {Function} compareFunction Sorting method.
     */
    sort: async function(compareFunction) {
        try {
            let items = await this.order.map((item) => {
                return this.items[item];
            });
            let sortedItems = await Promise.all(await items.sort(compareFunction));
            this.order = await sortedItems.map((item) => item.id);
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
     * Set Property
     * Adds property with value to a given item
     * @param {String} id ID of item to alter.
     * @param {String} field Field to set value to.
     * @param {*} value Value to set.
     */
    setProperty: function(id, field, value) {
        try {
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error(this.constructor.name + ".setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },
}

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Manager.addMethods = function(methods) {
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
Manager.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Manager.override: \"name\" does not exist.");
    }
}

module.exports = Manager;