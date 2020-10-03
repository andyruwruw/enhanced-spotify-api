const Models = require('../../index');

/**
 * Creates a new Episodes container instance
 *
 * @param {Array | Episode | object | string} data (optional) Data to be preloaded,
 * Single or multiple episodes
 */
function Episodes(items) {
  this.name = 'Episodes';
  this.type = 'Episode';
  this.uri_type = 'episode';
  Models.Container.call(this, items);
}

Episodes.prototype = {
  ...Models.Container.prototype,

  /**
   * Plays episodes on user's active device
   *
   * @param {object} [options] (Optional) Additional options
   * @param {object} [options.offset] Where from the album to play
   * @param {number} [options.offset.position=0] Index of item to start with in context
   * @param {string} [options.offset.uri] URI of item to start with in context
   * @param {number} [options.position_ms=0] Millisecond to start with in track
   * @returns {object} Response from request.
   */
  async play(options) {
    if (options != null && typeof (options) !== 'object') {
      throw new Error('Episodes.search: Invalid Parameter "options"');
    }
    const _options = options || {};
    _options.uris = [];
    let offset = 0;
    if ('offset' in offset) {
      if ('position' in offset) {
        offset = options.offset.position;
      } else if ('uri' in offset && typeof (offset.uri) === 'string') {
        const index = this.order.indexOf(options.offset.uri);
        if (index !== -1) {
          offset = this.order.indexOf(options.offset.uri);
        }
      }
    }
    for (let i = 0; i < this.order.length && i < 25; i += 1) {
      _options.uris.push(`spotify:episode:${this.order[(i + offset) % this.order.length]}`);
    }
    return Models.wrapperInstance.play(_options);
  },

  /**
   * Returns full episode data for all episodes,
   * Retrieves from Spotify API if necessary
   *
   * @returns {Array} Array of episode full objects
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
   * Returns simplified episode data for all episodes,
   * Retrieves from Spotify API if necessary
   *
   * @returns {Array} Array of Episode simplified objects
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
   * Just returns whatever the episode objects currently hold
   *
   * @returns {Array} Array of current episode data
   */
  async getCurrentData() {
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getCurrentData());
    }

    return result;
  },

  /**
   * Returns Shows instance with all episode's shows
   *
   * @returns {Shows} Shows object of all episodes' shows
   */
  async getShows() {
    await this.retrieveFullObjects();
    const shows = new Episodes.Shows();
    const episodeIDs = Object.keys(this.items);

    for (let i = 0; i < episodeIDs.length; i += 1) {
      await shows.add(await this.items[episodeIDs[i]].getShow());
    }

    return shows;
  },

  /**
   * Retrieves full episode data for all episodes from Spotify API
   *
   * @param {string} objectType What to check if the episode contains,
   * ('simplified', 'link', 'full')
   */
  async retrieveFullObjects(objectType) {
    const ids = [];
    const episodeIDs = Object.keys(this.items);

    for (let i = 0; i < episodeIDs.length; i += 1) {
      if (objectType === 'simplified') {
        if (!(await this.items[episodeIDs[i]].containsSimplifiedObject())) {
          ids.push(episodeIDs[i]);
        }
      } else if (!(await this.items[episodeIDs[i]].containsFullObject())) {
        ids.push(episodeIDs[i]);
      }
    }

    if (ids.length) {
      let response;
      do {
        response = await Models.wrapperInstance.getEpisodes(ids.splice(0, 50));
        for (let i = 0; i < response.body.episodes.length; i += 1) {
          if (response.body.episodes[i] !== null) {
            this.items[response.body.episodes[i].id].loadFullObject(response.body.episodes[i]);
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
 * @returns {Episodes} Episodes returned from search
 */
Episodes.search = async function search(query, options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Episodes.search: Invalid Parameter "options"');
  }
  const _options = (typeof (options) === 'object') ? options : {};
  const response = await Models.wrapperInstance.searchEpisodes(query, _options);
  return new Episodes(response.body.episodes.items);
};

/**
 * Returns Episodes object of IDs
 *
 * @param {Array} episodeIds Ids of episodes
 * @returns {Episodes} Episodes from ids
 */
Episodes.getEpisodes = async function getEpisodes(episodeIds) {
  const episodes = new Episodes(episodeIds);
  await episodes.retrieveFullObjects();
  return episodes;
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Episodes.addMethods = function addMethods(methods) {
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
Episodes.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Episodes.override: \'name\' does not exist.');
  }
};

Episodes.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Episodes.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Episodes.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Episodes.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Episodes.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Episodes.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Episodes.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Episodes.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Episodes.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Episodes.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Episodes.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Episodes.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Episodes.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Episodes.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Episodes.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Episodes.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Episodes.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Episodes.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Episodes;
