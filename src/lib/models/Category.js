const Models = require('../../index');

/**
 * Creates a new Category Instance for a given category
 *
 * @param {object | string} data Data to be preloaded,
 * Must either be a string of the category ID or contain an `id` property
 */
function Category(data) {
  if (typeof (data) === 'string') {
    this.id = data;
  } else if (typeof (data) === 'object') {
    if ('id' in data) {
      this.id = data.id;
    } else {
      throw new Error('Category.constructor: No ID Provided');
    }
    this.loadConditionally(data);
  } else {
    throw new Error('Category.constructor: Invalid Data');
  }
}

Category.prototype = {
  /**
   * Plays category on user's active device
   *
   * @param {object} options (Optional) Additional options
   * @returns {object} Response from request
   */
  async play(options) {
    return ((await this.getCategoryPlaylists({ limit: 1 })).get(0)).play(options);
  },

  /**
   * Returns boolean whether full object data is present
   *
   * @returns {boolean} Whether full object is loaded
   */
  containsFullObject() {
    return (this.name != null
      && this.href != null
      && this.icons != null
    );
  },

  /**
   * Returns full category data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Category full object data
   */
  async getFullObject() {
    if (!(this.containsFullObject())) {
      await this.retrieveFullObject();
    }
    return {
      id: this.id,
      name: this.name,
      href: this.href,
      icons: this.icons,
    };
  },

  /**
   * Just returns whatever the category object currently holds
   *
   * @returns {object} Any category data
   */
  getCurrentData() {
    const data = { id: this.id };
    const properties = [
      'id',
      'name',
      'href',
      'icons',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (this[properties[i]] != null) {
        data[properties[i]] = this[properties[i]];
      }
    }

    return data;
  },

  /**
   * Returns Playlists instance with category playlists
   *
   * @param {object} [options] (Optional) Additional options
   * @param {string} [options.country] Country code.
   * @param {number} [options.limit=20] Maximum number of items to return (Max: 50)
   * @param {number} [options.offset=0] Index of first item to return
   * @returns {Playlists} Playlists instance with category playlists.
   */
  async getPlaylists(options) {
    if (options != null && typeof (options) !== 'object') {
      throw new Error('Category.getPlaylists: Invalid Parameter "options"');
    }
    const _options = options || {};
    const response = await Models.wrapperInstance.getCategoryPlaylists(this.id, _options);
    return new Models.Playlists(response.body.playlists);
  },

  /**
   * Sets full data (outside constructor)
   *
   * @param {object} data Object with category full object data
   */
  loadFullObject(data) {
    this.name = data.name;
    this.href = data.href;
    this.icons = data.icons;
  },

  /**
   * Sets all data conditionally
   *
   * @param {object} data Object with category data
   */
  loadConditionally(data) {
    const properties = [
      'name',
      'href',
      'icons',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (properties[i] in data) {
        this[properties[i]] = data[properties[i]];
      }
    }
  },

  /**
   * Retrieves full category data from Spotify API
   */
  async retrieveFullObject() {
    const response = await Models.wrapperInstance.getCategory(this.id, {});
    await this.loadFullObject(response.body);
  },
};

/**
 * Returns Category instance for a given category
 *
 * @param {string} categoryId ID for category desired
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.country] Country code
 * @param {string} [options.locale] Desired language
 * @returns {Category} Category instance for given category
 */
Category.getCategory = async function getCategory(categoryId, options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Category.getCategory: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.getCategory(categoryId, options || {});
  return new Models.Category(response.body);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Category.addMethods = function addMethods(methods) {
  const methodNames = Object.keys(methods);

  for (let i = 0; i < methods.length; i += 1) {
    this.prototype[methodNames[i]] = methods[methodNames[i]];
  }
};

/**
 * Replaces a method within the Class
 *
 * @param {string} name Name of the method to replace
 * @param {function} method Function to replace with
 */
Category.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Category.override: \'name\' does not exist.');
  }
};

Category.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Category.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Category.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Category.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Category.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Category.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Category.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Category.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Category.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Category.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Category.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Category.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Category.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Category.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Category.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Category.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Category.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Category.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Category;
