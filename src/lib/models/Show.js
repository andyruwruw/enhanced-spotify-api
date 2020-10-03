const Models = require('../../index');

/**
 * Creates a new Show Instance for a given show
 *
 * @param {object | string} data Data to be preloaded,
 * Must either be a string of the show ID or contain an `id` property
 */
function Show(data) {
  if (typeof (data) === 'string') {
    this.id = data;
    this._episodes = new Models.Episodes();
  } else if (typeof (data) === 'object') {
    if ('id' in data) {
      this.id = data.id;
    } else {
      throw new Error('Show.constructor: No ID Provided');
    }
    this._episodes = '_episodes' in data ? data._episodes : new Models.Episodes();
    this.loadConditionally(data);
  } else {
    throw new Error('Show.constructor: Invalid Data');
  }
}

Show.prototype = {
  /**
   * Plays show on user's active device
   *
   * @param {object} [options] (Optional) Additional options
   * @param {object} [options.offset] Where from the context to play
   * (Only valid with albums and Shows)
   * @param {number} [options.offset.position] Index of item to start with in context
   * @param {string} [options.offset.uri] URI of item to start with in context
   * @returns {object} Response from request.
   */
  play(options) {
    const _options = options || {};
    _options.context_uri = `spotify:show:${this.id}`;
    return Models.wrapperInstance.play(_options);
  },

  /**
   * Returns whether a show is saved to the user's library
   *
   * @returns {boolean} Whether show is saved to the user's library
   */
  async isLiked() {
    const response = await Models.wrapperInstance.containsMySavedShows([this.id]);
    return response.body[0];
  },

  /**
   * Adds show to the user's library
   *
   * @returns {object} Response to request
   */
  like() {
    return Models.wrapperInstance.addToMySavedShows([this.id]);
  },

  /**
  * Removes show from the user's library
  *
  * @returns {object} Response to request
  */
  unlike() {
    return Models.wrapperInstance.removeFromMySavedShows([this.id]);
  },

  /**
   * Returns boolean whether full object data is present
   *
   * @returns {boolean} Whether full object is loaded
   */
  containsFullObject() {
    return ((this.name != null)
      && (this.available_markets != null)
      && (this.copyrights)
      && (this.description != null)
      && (this.explicit != null)
      && (this.episodes)
      && (this.external_urls != null)
      && (this.href != null)
      && (this.images != null)
      && (this.languages != null)
      && (this.media_type != null)
      && (this.publisher != null)
      && (this.uri != null));
  },

  /**
   * Returns boolean whether simplified object data is present
   *
   * @returns {boolean} Whether simplified object is loaded
   */
  containsSimplifiedObject() {
    return ((this.name != null)
      && (this.available_markets != null)
      && (this.copyrights)
      && (this.description != null)
      && (this.explicit != null)
      && (this.external_urls != null)
      && (this.href != null)
      && (this.images != null)
      && (this.languages != null)
      && (this.media_type != null)
      && (this.publisher != null)
      && (this.uri != null));
  },

  /**
   * Returns full show data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Show full object data.
   */
  async getFullObject() {
    if (!(this.containsFullObject())) {
      await this.retrieveFullObject();
    }
    return {
      id: this.id,
      name: this.name,
      available_markets: this.available_markets,
      copyrights: this.copyrights,
      description: this.description,
      explicit: this.explicit,
      episodes: this.episodes,
      external_urls: this.external_urls,
      href: this.href,
      images: this.images,
      is_externally_hosted: this.is_externally_hosted,
      languages: this.languages,
      media_type: this.media_type,
      publisher: this.publisher,
      uri: this.uri,
      type: 'show',
    };
  },

  /**
   * Returns simplified show data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Show simplified object data.
   */
  async getSimplifiedObject() {
    if (!(this.containsSimplifiedObject())) {
      await this.retrieveFullObject();
    }
    const data = {
      id: this.id,
      name: this.name,
      available_markets: this.available_markets,
      copyrights: this.copyrights,
      description: this.description,
      explicit: this.explicit,
      external_urls: this.external_urls,
      href: this.href,
      images: this.images,
      is_externally_hosted: this.is_externally_hosted,
      languages: this.languages,
      media_type: this.media_type,
      publisher: this.publisher,
      uri: this.uri,
      type: 'show',
    };
    return data;
  },

  /**
   * Just returns whatever the show object currently holds
   *
   * @returns {object} Any show data
   */
  getCurrentData() {
    const data = {
      id: this.id,
      type: 'album',
    };

    const properties = [
      'name',
      'available_markets',
      'copyrights',
      'description',
      'explicit',
      'episodes',
      'external_urls',
      'href',
      'images',
      'is_externally_hosted',
      'languages',
      'media_type',
      'publisher',
      'uri',
      '_episodes',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (this[properties[i]] != null) {
        data[properties[i]] = this[properties[i]];
      }
    }
    return data;
  },

  /**
   * Returns Episodes object of all show's episodes
   *
   * @returns {Episodes} Episodes instance with all show's episodes
   */
  async getAllEpisodes() {
    await this.retrieveEpisodes();
    return this._episodes;
  },

  /**
   * Returns Episodes object of show's episodes
   *
   * @param {object} [options] (Optional) Additional Options
   * @param {number} [options.limit=20] Maximum number of episodes to return (Max: 50)
   * @param {number} [options.offset=0] The index of the first episode to return
   * @param {string} [options.market] Country code
   * @returns {Episodes} Episodes instance with all show's episodes.
   */
  async getEpisodes(options) {
    if (options != null && typeof (options) !== 'object') {
      throw new Error('Show.getEpisodes: Invalid Parameter "options"');
    }
    const response = await Models.wrapperInstance.getShowEpisodes(this.id, options || {});
    const episodes = new Models.Episodes(response.body.items);
    await this.loadEpisodes(episodes);
    return episodes;
  },

  /**
   * Retrieves full show data from Spotify API
   */
  async retrieveFullObject() {
    const response = await Models.wrapperInstance.getShow(this.id);
    await this.loadFullObject(response.body);
  },

  /**
   * Retrieves all episodes in show from Spotify API
   */
  async retrieveEpisodes() {
    const options = {
      limit: 50,
      offset: 0,
    };
    let response;

    do {
      response = await Models.wrapperInstance.getShowEpisodes(this.id, options);
      await this.loadEpisodes(response.body.items);
      options.offset += 50;
    } while (!(response.body.items.length < 50));
  },

  /**
   * Sets full data (outside constructor)
   *
   * @param {object} data Object with show full object data
   */
  async loadFullObject(data) {
    this.name = data.name;
    this.available_markets = data.available_markets;
    this.copyrights = data.copyrights;
    this.description = data.description;
    this.explicit = data.explicit;
    this.episodes = data.episodes;
    this.external_urls = data.external_urls;
    this.href = data.href;
    this.images = data.images;
    this.is_externally_hosted = data.is_externally_hosted;
    this.languages = data.languages;
    this.media_type = data.media_type;
    this.publisher = data.publisher;
    this.uri = data.uri;
    if ('episodes' in data) {
      if (typeof (data.episodes) === 'object' && 'items' in data.episodes) {
        this.loadEpisodes(data.episodes.items);
      } else if (data.episodes instanceof Array) {
        this.loadEpisodes(data.episodes);
      }
    }
  },

  /**
   * Sets simplified data (outside constructor)
   *
   * @param {object} data Object with show simplified object data
   */
  async loadSimplifiedObject(data) {
    this.name = data.name;
    this.available_markets = data.available_markets;
    this.copyrights = data.copyrights;
    this.description = data.description;
    this.explicit = data.explicit;
    this.external_urls = data.external_urls;
    this.href = data.href;
    this.images = data.images;
    this.is_externally_hosted = data.is_externally_hosted;
    this.languages = data.languages;
    this.media_type = data.media_type;
    this.publisher = data.publisher;
    this.uri = data.uri;
  },

  /**
   * Sets all data conditionally
   *
   * @param {object} data Object with show data
   */
  loadConditionally(data) {
    const properties = [
      'name',
      'available_markets',
      'copyrights',
      'description',
      'explicit',
      'episodes',
      'external_urls',
      'href',
      'images',
      'is_externally_hosted',
      'languages',
      'media_type',
      'publisher',
      'uri',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (properties[i] in data) {
        this[properties[i]] = data[properties[i]];
      }
    }

    if ('episodes' in data) {
      if (typeof (data.episodes) === 'object' && 'items' in data.episodes) {
        this.loadEpisodes(data.episodes.items);
      } else if (data.episodes instanceof Array) {
        this.loadEpisodes(data.episodes);
      }
    }
  },

  /**
   * Helper method to add episodes to shows's internal Episodes item
   *
   * @param {Array | Episode | object | string} episodes
   */
  async loadEpisodes(episodes) {
    if (episodes instanceof Show.Episodes || episodes instanceof Array) {
      this._episodes.concat(episodes);
    } else if (typeof (tracks) === 'object' || typeof (tracks) === 'string') {
      this._episodes.push(episodes);
    } else {
      throw new Error('Show.loadEpisodes: Invalid Parameter "episodes"');
    }
  },
};

/**
 * Returns Show object of ID
 *
 * @param {string} showID Id of Show
 * @returns {Show} Show from id
 */
Show.getShow = async function getShow(showID) {
  const response = await Models.wrapperInstance.getShow(showID);
  return new Models.Show(response.body);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Show.addMethods = function addMethods(methods) {
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
Show.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Show.override: \'name\' does not exist.');
  }
};

Show.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Show.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Show.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Show.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Show.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Show.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Show.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Show.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Show.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Show.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Show.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Show.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Show.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Show.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Show.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Show.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Show.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Show.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Show;
