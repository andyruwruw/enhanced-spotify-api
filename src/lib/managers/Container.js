const Models = require('../../index');

/**
 * Creates a new Container instance
 *
 * @param {Array | Item | object | string} data (optional) Data to be preloaded,
 * Single or multiple items
 */
function Container(items) {
  this.items = {};
  this.order = [];
  if (items) {
    if (items instanceof Array) {
      this.concat(items);
    } else if (items instanceof Models[this.type] || typeof (items) === 'string' || typeof (items) === 'object') {
      this.push(items);
    } else {
      throw new Error(`${this.name}.constructor: Invalid Parameter "items"`);
    }
  }
}

Container.prototype = {
  /**
   * Adds new item to Container object
   *
   * @param {Item | object | string } item Item instance, item object or item ID to add
   */
  push(item) {
    if (item instanceof Models[this.type]) {
      if (!(item.id in this.items)) {
        this.items[item.id] = item;
      }
      this.order.push(item.id);
    } else if (typeof (item) === 'object') {
      if ('id' in item) {
        if (!(item.id in this.items)) {
          this.items[item.id] = new Models[this.type](item);
        }

        this.order.push(item.id);
      } else if (this.uri_type in item) {
        if (!(item[this.uri_type].id in this.items)) {
          this.items[item[this.uri_type].id] = new Models[this.type](item[this.uri_type]);

          const itemKeys = Object.keys(item);

          for (let i = 0; i < itemKeys.length; i += 1) {
            if (itemKeys[i] !== this.uri_type) {
              this.items[item[this.uri_type].id][itemKeys[i]] = item[itemKeys[i]];
            }
          }
        }
        this.order.push(item.track.id);
      } else {
        throw new Error(`${this.name}.push: Invalid Parameter "item"`);
      }
    } else if (typeof (item) === 'string') {
      if (!(item in this.items)) {
        this.items[item] = new Models[this.type](item);
      }
      this.order.push(item);
    } else {
      throw new Error(`${this.name}.push: Invalid Parameter "item"`);
    }
  },

  /**
   * Adds new items to Container object
   *
   * @param {Items | Array } items Another Items instance or array of Item instances,
   * item objects, or item IDs to concat
   */
  concat(items) {
    if (items instanceof Models[this.name]) {
      for (let i = 0; i < items.order.length; i += 1) {
        if (!(items.order[i] in this.items)) {
          this.items[items.order[i]] = items.items[items.order[i]];
        }
        this.order.push(items.order[i]);
      }
    } else if (items instanceof Array) {
      for (let i = 0; i < items.length; i += 1) {
        this.push(items[i]);
      }
    } else {
      throw new Error(`${this.name}.concat: Invalid Parameter "items"`);
    }
  },

  /**
   * Returns number of items in Container
   *
   * @returns {number} Number of items in Container
   */
  size() {
    return this.order.length;
  },

  /**
   * Returns boolean if item is contained
   *
   * @param {Item | object | string } item Item instance, item data, or item ID to remove
   * @returns {boolean} Whether item is contained
   */
  includes(item) {
    let id = null;
    if (typeof (item) === 'string') {
      id = item;
    } else if ((item instanceof Models[this.type] || typeof (item) === 'object') && 'id' in item) {
      id = item.id;
    } else {
      throw new Error(`${this.name}.includes: Invalid Parameter "item"`);
    }
    return (id in this.items);
  },

  /**
   * Find index of an item
   *
   * @param {Item | object | string } item Item instance, item data, or item ID to remove
   * @param {number} start Where to start searching from,
   * Negative values will start at the given position from the end (Inclusive)
   * @returns {number} Index of item
   */
  indexOf(item, start) {
    if (start > this.order.length - 1) {
      throw new Error(`${this.name}.findIndex: Invalid Parameter "start"`);
    }
    let id = null;
    if (typeof (item) === 'string') {
      id = item;
    } else if ((item instanceof Models[this.type] || typeof (item) === 'object') && 'id' in item) {
      id = item.id;
    } else {
      throw new Error(`${this.name}.findIndex: Invalid Parameter "item"`);
    }
    return this.order.indexOf(id, start);
  },

  /**
   * Returns item at a given index
   *
   * @param {number} index Index of the item desired,
   * Negative value will return item that far from the end
   * @returns {Item} Item at a given index
   */
  get(index) {
    return this.items[this.order[index > 0 ? index : (this.order.length - 1) - index]];
  },

  /**
   * Returns array of IDs in order
   *
   * @returns {Array} Array of IDs
   */
  getIDs() {
    return this.order;
  },

  /**
   * Returns array of IDs in order with no repeats
   *
   * @returns {Array} Array of IDs
   */
  getIDsNoRepeats() {
    const ids = [];
    for (let i = 0; i < this.order.length; i += 1) {
      if (!ids.includes(this.order[i])) {
        ids.push(this.order[i]);
      }
    }
    return ids;
  },

  /**
   * Returns array of URIs in order
   * @returns {Array} Array of URIs
   */
  getURIs() {
    return this.order.map((id) => `spotify:${this.uri_type}:${id}`);
  },

  /**
   * Returns array of URIs with no repeats
   *
   * @returns {Array} Array of URIs
   */
  async getURIsNoRepeats() {
    const ids = await this.getIDsNoRepeats();
    return ids.map((id) => `spotify:${this.uri_type}:${id}`);
  },

  /**
   * Removes last item
   *
   * @returns {Item} Removed item
   */
  pop() {
    const id = this.order.pop();
    const item = this.items[id];

    if (!(this.order.includes(id))) {
      delete this.items[id];
    }
    return item;
  },

  /**
   * Removes first item
   *
   * @returns {Item} Removed item
   */
  shift() {
    const id = this.order.shift();
    const item = this.items[id];

    if (!(this.order.includes(id))) {
      delete this.items[id];
    }
    return item;
  },

  /**
   * Removes elements
   *
   * @param {Number} start Start of removal
   * @param {Number} end End of removal (Exclusive)
   * @returns {Items} Removed Items
   */
  async slice(start, end) {
    const stop = (end != null) ? end : this.order.length;
    const ids = this.order.splice(start, stop);
    const items = new Models[this.name](await ids.map((id) => this.items[id]));
    for (let i = 0; i < ids.length; i += 1) {
      if (!(this.order.includes(ids[i]))) {
        delete this.items[ids[i]];
      }
    }
    return items;
  },

  /**
   * Removes an item from the Container object
   *
   * @param {Item | object | string } item Item instance, item data, or item ID to remove
   * @returns {Item} Deleted item
   */
  remove(item) {
    let id = null;
    if (item instanceof Models[this.type] || typeof (item) === 'object') {
      id = item.id;
    } else if (typeof (item) === 'string') {
      id = item;
    } else {
      throw new Error(`${this.name}.remove: Invalid Parameter "item"`);
    }
    this.order = this.order.filter((itemID) => itemID !== id);
    const deletedItem = this.items[id];
    delete this.items[id];
    return deletedItem;
  },

  /**
   * Removes multiple items by index from the Container object
   *
   * @param {Array} indexes Indexes to be removed
   * @returns {Items} Deleted items
   */
  removeIndexes(indexes) {
    const sorted = indexes.sort((a, b) => b - a);
    if (sorted[0] > (this.order.length - 1) || sorted[sorted.length - 1] < 0) {
      throw new Error(`${this.name}.removeIndexes: Invalid Parameter "indexes", out of range.`);
    }
    const deleted = new Models[this.name]();
    for (let i = 0; i < sorted.length; i += 1) {
      const id = this.order[sorted[i]];
      this.order.splice(sorted[i], 1);
      deleted.push(this.items[id]);
      if (!this.order.includes(id)) {
        delete this.items[id];
      }
    }
    return deleted;
  },

  /**
   * Runs a function on each item
   *
   * @param {Function} method Function to be run on each item
   * @param {Function} thisArg Value to use as "this" when executing callback
   */
  async forEach(method, thisArg) {
    const items = await this.order.map((item) => this.items[item]);
    await items.forEach(method, thisArg || this);
  },

  /**
   * Returns Items object with filtered items
   *
   * @param {Function} method Method to filter by
   * @param {Function} thisArg Value to use as "this" when executing callback
   * @returns {Items} Filtered Items object
   */
  async filter(method, thisArg) {
    const newContainer = new Models[this.name]();
    const items = await this.order.map((item) => this.items[item]);
    const filteredItems = await Promise.all(await items.filter(method, thisArg || this));
    await newContainer.concat(filteredItems);
    return newContainer;
  },

  /**
   * Sort items
   * @param {Function} compareFunction Sorting method
   */
  async sort(compareFunction) {
    const items = await this.order.map((item) => this.items[item]);
    const sortedItems = await Promise.all(await items.sort(compareFunction));
    this.order = await sortedItems.map((item) => item.id);
  },

  /**
   * Reverses order of items
   */
  reverse() {
    this.order.reverse();
  },

  /**
   * Adds property with value to a given item
   *
   * @param {string} id ID of item to alter
   * @param {string} field Field to set value to
   * @param {*} value Value to set
   */
  setProperty(id, field, value) {
    if (id in this.items) {
      this.items[id][field] = value;
    } else {
      throw new Error(`${this.constructor.name}.setProperty: ID does not exist.`);
    }
  },
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Container.addMethods = function addMethods(methods) {
  const methodNames = Object.keys(methods);

  for (let i = 0; i < methodNames.length; i += 1) {
    this.prototype[methodNames[i]] = methods[methodNames[i]];
  }
};

/**
 * Replaces a method within the Class
 *
 * @param {string} name Name of the method to replace
 * @param {function} method Function to replace with
 */
Container.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Container.override: \'name\' does not exist.');
  }
};

module.exports = Container;
