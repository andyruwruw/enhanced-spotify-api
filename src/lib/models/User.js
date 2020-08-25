const Models = require('../../index');

/**
 * Creates a new User Instance for a given user
 *
 * @param {object | string} data Data to be preloaded,
 * Must either be a string of the user ID or contain an `id` property.
 */
function User(data) {
  if (typeof (data) === 'string') {
    this.id = data;
  } else if (typeof (data) === 'object') {
    if ('id' in data) {
      this.id = data.id;
    } else {
      throw new Error('User.constructor: No ID Provided');
    }
    this.loadConditionally(data);
  } else {
    throw new Error('User.constructor: Invalid Data');
  }
}

User.prototype = {
  /**
   * Returns whether this user is the current logged in user
   *
   * @returns {boolean} Whether user is current logged in user
   */
  async isMe() {
    if (this.meStatus === null) {
      const response = await Models.wrapperInstance.getMe();
      this.meStatus = (response.body.id === this.id);
    }
    return this.meStatus;
  },

  /**
   * Returns whether this user is followed by the current user
   *
   * @returns {boolean} Whether this user is followed by the current user
   */
  async isFollowed() {
    const response = await Models.wrapperInstance.isFollowingUsers([this.id]);
    return response.body[0];
  },

  /**
   * Follows this user
   *
   * @returns {object} Response from request
   */
  follow() {
    return Models.wrapperInstance.followUsers([this.id]);
  },

  /**
   * Unfollows this user
   *
   * @returns {object} Response from request
   */
  unfollow() {
    return Models.wrapperInstance.unfollowUsers([this.id]);
  },

  /**
   * Returns boolean whether private object data is present
   *
   * @returns {boolean} Whether private object is loaded
   */
  containsPrivateObject() {
    return ((this.country != null)
      && (this.email != null)
      && (this.product != null)
      && (this.display_name != null)
      && (this.external_urls)
      && (this.followers)
      && (this.href != null)
      && (this.images != null)
      && (this.uri != null));
  },

  /**
   * Returns boolean whether public object data is present
   *
   * @returns {boolean} Whether public object is loaded
   */
  containsPublicObject() {
    return ((this.display_name != null)
      && (this.external_urls)
      && (this.followers)
      && (this.href != null)
      && (this.images != null)
      && (this.uri != null));
  },

  /**
   * Returns private user data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} User private object data
   */
  async getPrivateObject() {
    if (!(this.containsPrivateObject())) {
      await this.retrievePrivateObject();
    }
    return {
      id: this.id,
      display_name: this.display_name,
      external_urls: this.external_urls,
      followers: this.followers,
      href: this.href,
      images: this.images,
      uri: this.uri,
      country: this.country,
      email: this.email,
      product: this.product,
      type: 'user',
    };
  },

  /**
   * Returns public user data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} User public object data
   */
  async getPublicObject() {
    if (!(this.containsPublicObject())) {
      await this.retrievePublicObject();
    }
    return {
      id: this.id,
      display_name: this.display_name,
      external_urls: this.external_urls,
      followers: this.followers,
      href: this.href,
      images: this.images,
      uri: this.uri,
      type: 'user',
    };
  },

  /**
   * Just returns whatever the user object currently holds
   *
   * @returns {object} Any user data
   */
  getCurrentData() {
    const data = {
      id: this.id,
      type: 'user',
    };

    const properties = [
      'display_name',
      'external_urls',
      'followers',
      'href',
      'images',
      'uri',
      'country',
      'email',
      'product',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (this[properties[i]] != null) {
        data[properties[i]] = this[properties[i]];
      }
    }
    return data;
  },

  /**
   * Returns Playlists object of user's playlists
   *
   * @param {object} options (Optional) Additional options
   * @returns {Playlist} Playlist object with user playlists
   */
  async getPlaylists(options) {
    if (await this.isMe()) {
      return Models.Playlists.getMyPlaylists(options);
    }
    return Models.Playlists.getUserPlaylists(this.id, options);
  },

  /**
   * Returns Playlists object of all user's playlists
   *
   * @returns {Playlists} Playlists object with all user playlists
   */
  async getAllPlaylists() {
    if (await this.isMe()) {
      return Models.Playlists.getAllMyPlaylists();
    }
    return Models.Playlists.getAllUserPlaylists(this.id);
  },

  /**
   * Sets private data (outside constructor)
   *
   * @param {object} data Object with user private object data
   */
  loadPrivateObject(data) {
    this.id = data.id;
    this.display_name = data.display_name;
    this.external_urls = data.external_urls;
    this.followers = data.followers;
    this.href = data.href;
    this.images = data.images;
    this.uri = data.uri;
    this.country = data.country;
    this.email = data.email;
    this.product = data.product;
  },

  /**
   * Sets public data (outside constructor)
   *
   * @param {object} data Object with user public object data
   */
  loadPublicObject(data) {
    this.display_name = data.display_name;
    this.external_urls = data.external_urls;
    this.followers = data.followers;
    this.href = data.href;
    this.images = data.images;
    this.uri = data.uri;
  },

  /**
   * Sets all data conditionally
   *
   * @param {object} data Object with user data
   */
  loadConditionally(data) {
    const properties = [
      'display_name',
      'external_urls',
      'followers',
      'href',
      'images',
      'uri',
      'country',
      'email',
      'product',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (properties[i] in data) {
        this[properties[i]] = data[properties[i]];
      }
    }
  },

  /**
   * Retrieves private user data from Spotify API
   */
  async retrievePrivateObject() {
    const response = await Models.wrapperInstance.getMe();
    if (response.body.id !== this.id) {
      throw new Error('User.retrievePrivateObject: Cannot Retrieve Private Data for Non-Current User');
    }
    await this.loadPrivateObject(response.body);
  },

  /**
   * Retrieves public user data from Spotify API
   */
  async retrievePublicObject() {
    const response = await Models.wrapperInstance.getUser(this.id);
    await this.loadPublicObject(response.body);
  },
};

/**
 * Returns User object of current user
 *
 * @returns {User} Current user
 */
User.getMe = async function getMe() {
  const response = await Models.wrapperInstance.getMe();
  return new Models.User(response.body);
};

/**
 * Returns User object of ID
 *
 * @param {string} userID Id of user
 * @returns {User} User from id
 */
User.getUser = async function getUser(userID) {
  const response = await Models.wrapperInstance.getUser(userID);
  return new Models.User(response.body);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
User.addMethods = function addMethods(methods) {
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
User.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('User.override: \'name\' does not exist.');
  }
};

User.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

User.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

User.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

User.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

User.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

User.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

User.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

User.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

User.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

User.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

User.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

User.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

User.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

User.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

User.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

User.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

User.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

User.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = User;
