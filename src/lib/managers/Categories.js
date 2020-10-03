const Models = require('../../index');

/**
 * Creates a new Categories container instance
 *
 * @param {Array | Category | object | string} data (optional) Data to be preloaded,
 * Single or multiple categories
 */
function Categories(items) {
  this.name = 'Categories';
  this.type = 'Category';
  Models.Container.call(this, items);
}

Categories.prototype = {
  ...Models.Container.prototype,

  getURIs: null,

  getURIsNoRepeats: null,

  /**
   * Plays category on user's active device
   *
   * @param {number} [index] (Optional) Index of category
   */
  play(index) {
    const _index = index != null ? index : 0;
    return this.item[this.order[_index]].play();
  },

  /**
   * Returns full category data for all categories,
   * Retrieves from Spotify API if necessary
   *
   * @returns {Array} Array of category full objects
   */
  async getFullObjects() {
    await this.retrieveFullObjects();
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order].getFullObject());
    }

    return result;
  },

  /**
   * Just returns whatever the category objects currently hold
   *
   * @returns {Array} Array of current category data
   */
  async getCurrentData() {
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order].getCurrentData());
    }

    return result;
  },

  /**
   * Returns Playlists instance with categories playlists
   *
   * @param {object} [options] (Optional) Options to be passed into request
   * @returns {Playlists} Playlists instance with category playlists
   */
  async getPlaylists(options) {
    if (options != null && typeof (options) !== 'object') {
      throw new Error('Category.getPlaylists: Invalid Parameter "options"');
    }
    const _options = options || {};
    const playlists = new Categories.Playlists();

    const categoryIDs = Object.keys(this.items);

    for (let i = 0; i < categoryIDs.length; i += 1) {
      await playlists.concat(await this.items[categoryIDs[i]].getPlaylists(_options));
    }

    return playlists;
  },

  /**
   * Retrieves full category data for all categories from Spotify API
   */
  async retrieveFullObjects() {
    const categoryIDs = Object.keys(this.items);

    for (let i = 0; i < categoryIDs.length; i += 1) {
      if (!(await this.items[categoryIDs[i]].containsFullObject())) {
        await this.items[categoryIDs[i]].retrieveFullObject();
      }
    }
  },
};

/**
 * Returns Categories instance
 *
 * @param {object} [options] (Optional) Options for request
 * @returns {Categories} Categories instance
 */
Categories.getCategories = async function getCategories(options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Categories.getCategories: Invalid Parameter "options"');
  }
  const _options = options || {};
  const response = await Models.wrapperInstance.getCategories(_options);
  return new Categories(response.body.categories);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Categories.addMethods = function addMethods(methods) {
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
Categories.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Categories.override: \'name\' does not exist.');
  }
};

Categories.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Categories.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Categories.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Categories.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Categories.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Categories.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Categories.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Categories.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Categories.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Categories.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Categories.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Categories.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Categories.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Categories.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Categories.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Categories.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Categories.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Categories.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Categories;
