const Models = require('../../index');

/**
 * Creates a new Shows container instance
 * @param {Array | Show | object | string} [data] (optional) Data to be preloaded,
 * Single or multiple shows.
 */
function Shows(items) {
  this.name = 'Shows';
  this.type = 'Show';
  this.uri_type = 'show';
  Models.Container.call(this, items);
}

Shows.prototype = {
  ...Models.Container.prototype,

  /**
   * Plays shows on user's active device
   *
   * @param {object} [options] (Optional) Additional options
   * @param {number} [options.show_index=0] Which show to start with
   * @param {object} [options.offset] Where from the show to play
   * @param {number} [options.offset.position=0] Index of item to start with in context
   * @param {string} [options.offset.uri] URI of item to start with in context
   * @param {number} [options.position_ms=0] Millisecond to start with in track
   * @returns {object} Response from request
   */
  async play(options) {
    const _show_index = (options && typeof (options) === 'object' && 'show_index' in options) ? options.show_index : 0;
    const episodes = new Models.Episodes();
    for (let i = 0; i < this.order.length; i += 1) {
      await episodes.concat(
        await this.items[this.order[(i + _show_index) % this.order.length]].getEpisodes(),
      );
    }
    return episodes.play(options);
  },

  /**
   * Returns array of booleans whether shows are saved to the user's library
   *
   * @returns {array} Array of Booleans Whether show are saved to the user's library
   */
  async areLiked() {
    const shows = await this.order.map((show) => this.items[show]);
    const showIDs = await shows.map((show) => show.id);
    const response = await Models.wrapperInstance.containsMySavedShows(showIDs);
    return response.body;
  },

  /**
  * Adds shows to the user's library
  *
  * @returns {object} Response from request
  */
  async likeAll() {
    return Models.wrapperInstance.addToMySavedShows(Object.keys(this.items));
  },

  /**
  * Removes shows from the user's library
  *
  * @returns {object} Response from request
  */
  async unlikeAll() {
    return Models.wrapperInstance.removeFromMySavedShows(Object.keys(this.items));
  },

  /**
   * Returns full show data for all shows,
   * Retrieves from Spotify API if necessary
   *
   * @returns {array} Array of show full objects
   */
  async getFullObjects() {
    await this.retrieveFullObjects('full');
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getFullObject());
    }

    return result;
  },

  /**
   * Returns simplified show data for all shows,
   * Retrieves from Spotify API if necessary
   *
   * @returns {array} Array of show simplified objects
   */
  async getSimplifiedObjects() {
    await this.retrieveFullObjects('simplified');
    const result = [];
    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getSimplifiedObject());
    }
    return result;
  },

  /**
   * Just returns whatever the show objects currently hold
   *
   * @returns {array} Array of current show data
   */
  async getCurrentData() {
    const result = [];
    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getCurrentData());
    }
    return result;
  },

  /**
   * Returns Episodes instance with all show's episodes
   *
   * @returns {Episodes} Episodes object of all show's episodes
   */
  async getEpisodes() {
    await this.retrieveFullObjects();
    const episodes = new Shows.Episodes();
    const showIDs = Object.keys(this.items);

    for (let i = 0; i < showIDs.length; i += 1) {
      await episodes.concat(await this.items[showIDs[i]].getEpisodes());
    }
    return episodes;
  },

  /**
   * Retrieves full show data for all shows from Spotify API
   *
   * @param {string} objectType What to check if the show contains
   * ('simplified', 'link', 'full')
   */
  async retrieveFullObjects(objectType) {
    const ids = [];
    const showIDs = Object.keys(this.items);

    for (let i = 0; i < showIDs.length; i += 1) {
      if (objectType === 'simplified') {
        if (!(await this.items[showIDs[i]].containsSimplifiedObject())) {
          ids.push(showIDs[i]);
        }
      } else if (!(await this.items[showIDs[i]].containsFullObject())) {
        ids.push(showIDs[i]);
      }
    }

    if (ids.length) {
      let response;

      do {
        response = await Models.wrapperInstance.getShows(ids.splice(0, 50));

        for (let i = 0; i < response.body.shows.length; i += 1) {
          if (response.body.shows[i] !== null) {
            this.items[response.body.shows[i].id].loadFullObject(response.body.shows[i]);
          }
        }
      } while (ids.length > 0);
    }
  },
};

/**
 * Returns search results for a query
 *
 * @param {string} query String to search for
 * @param {object} [options] (Optional) Additional options
 * @returns {Shows} Shows returned from search
 */
Shows.search = async function search(query, options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Shows.search: Invalid Parameter "options"');
  }
  const _options = (typeof (options) === 'object') ? options : {};
  const response = await Models.wrapperInstance.searchShows(query, _options);
  return new Shows(response.body.shows.items);
};

/**
 * Returns Shows object of IDs
 *
 * @param {Array} showIds Ids of shows
 * @returns {Shows} Shows from ids
 */
Shows.getShows = async function getShows(showIds) {
  const shows = new Shows(showIds);
  await shows.retrieveFullObjects();
  return shows;
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Shows.addMethods = function addMethods(methods) {
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
Shows.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Shows.override: \'name\' does not exist.');
  }
};

Shows.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Shows.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Shows.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Shows.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Shows.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Shows.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Shows.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Shows.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Shows.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Shows.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Shows.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Shows.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Shows.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Shows.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Shows.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Shows.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Shows.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Shows.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Shows;
