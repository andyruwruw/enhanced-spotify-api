const Models = require('../../index');

/**
 * Creates a new Episode Instance for a given episode
 *
 * @param {object | string} data Data to be preloaded,
 * Must either be a string of the episode ID or contain an `id` property.
 */
function Episode(data) {
  if (typeof (data) === 'string') {
    this.id = data;
  } else if (typeof (data) === 'object') {
    if ('id' in data) {
      this.id = data.id;
    } else {
      throw new Error('Episode.constructor: No ID Provided');
    }
    this.loadConditionally(data);
  } else {
    throw new Error('Episode.constructor: Invalid Data');
  }
}

Episode.prototype = {
  /**
   * Plays episode on user's active device
   *
   * @param {object} [options] (Optional) Additional options.
   * @param {number} [options.position_ms=0] Position to start playback (milliseconds)
   * @returns {object} Response from request.
   */
  play(options) {
    const _options = options || {};
    _options.uris = [`spotify:episode:${this.id}`];
    return Models.wrapperInstance.play(_options);
  },

  /**
   * Returns boolean whether full object data is present
   *
   * @returns {boolean} Whether full object is loaded
   */
  containsFullObject() {
    return ((this.name != null)
      && (this.audio_preview_url != null)
      && (this.description != null)
      && (this.duration_ms != null)
      && (this.explicit != null)
      && (this.external_urls != null)
      && (this.href != null)
      && (this.images != null)
      && (this.is_externally_hosted != null)
      && (this.is_playable != null)
      && (this.languages != null)
      && (this.release_date != null)
      && (this.release_date_precision != null)
      && (this.show)
      && (this.uri != null)
    );
  },

  /**
   * Returns boolean whether simplified object data is present
   *
   * @returns {boolean} Whether simplified object is loaded
   */
  containsSimplifiedObject() {
    return ((this.name != null)
      && (this.audio_preview_url != null)
      && (this.description != null)
      && (this.duration_ms != null)
      && (this.explicit != null)
      && (this.external_urls != null)
      && (this.href != null)
      && (this.images != null)
      && (this.is_externally_hosted != null)
      && (this.is_playable != null)
      && (this.languages != null)
      && (this.release_date != null)
      && (this.release_date_precision != null)
      && (this.uri != null)
    );
  },

  /**
   * Returns full episode data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Episode full object data
   */
  async getFullObject() {
    if (!(this.containsFullObject())) {
      await this.retrieveFullObject();
    }
    const result = {
      id: this.id,
      name: this.name,
      audio_preview_url: this.audio_preview_url,
      description: this.description,
      duration_ms: this.duration_ms,
      explicit: this.explicit,
      external_urls: this.external_urls,
      href: this.href,
      images: this.images,
      is_externally_hosted: this.is_externally_hosted,
      is_playable: this.is_playable,
      languages: this.languages,
      release_date: this.release_date,
      release_date_precision: this.release_date_precision,
      show: this.show,
      uri: this.uri,
      type: 'episode',
    };
    if (this.resume_point != null) {
      result.resume_point = this.resume_point;
    }
    if (this.language != null) {
      result.language = this.language;
    }
    return result;
  },

  /**
   * Returns simplified episode data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Episode simplified object data
   */
  async getSimplifiedObject() {
    if (!(this.containsSimplifiedObject())) {
      await this.retrieveFullObject();
    }
    const result = {
      id: this.id,
      name: this.name,
      audio_preview_url: this.audio_preview_url,
      description: this.description,
      duration_ms: this.duration_ms,
      explicit: this.explicit,
      external_urls: this.external_urls,
      href: this.href,
      images: this.images,
      is_externally_hosted: this.is_externally_hosted,
      is_playable: this.is_playable,
      languages: this.languages,
      release_date: this.release_date,
      release_date_precision: this.release_date_precision,
      uri: this.uri,
      type: 'episode',
    };
    if (this.resume_point != null) {
      result.resume_point = this.resume_point;
    }
    if (this.language != null) {
      result.language = this.language;
    }
    return result;
  },

  /**
   * Just returns whatever the track object currently holds
   *
   * @returns {object} Any episode data
   */
  getCurrentData() {
    const data = {
      id: this.id,
      type: 'episode',
    };

    const properties = [
      'name',
      'audio_preview_url',
      'description',
      'duration_ms',
      'explicit',
      'external_urls',
      'href',
      'images',
      'is_externally_hosted',
      'is_playable',
      'language',
      'languages',
      'release_date',
      'release_date_precision',
      'resume_point',
      'uri',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (this[properties[i]] != null) {
        data[properties[i]] = this[properties[i]];
      }
    }
    return data;
  },

  /**
   * Returns Show object of episode's show
   *
   * @returns {Show} Episode's show
   */
  async getShow() {
    if (!(this.containsFullObject())) {
      await this.retrieveFullObject();
    }
    return new Models.Show(this.show);
  },

  /**
   * Sets full data (outside constructor)
   *
   * @param {object} data Object with episode full object data
   */
  loadFullObject(data) {
    this.name = data.name;
    this.audio_preview_url = data.audio_preview_url;
    this.description = data.description;
    this.duration_ms = data.duration_ms;
    this.explicit = data.explicit;
    this.external_urls = data.external_urls;
    this.href = data.href;
    this.images = data.images;
    this.is_externally_hosted = data.is_externally_hosted;
    this.is_playable = data.is_playable;
    this.language = data.language;
    this.languages = data.languages;
    this.release_date = data.release_date;
    this.release_date_precision = data.release_date_precision;
    this.resume_point = data.resume_point;
    this.show = data.show;
    this.uri = data.uri;
  },

  /**
   * Sets simplified data (outside constructor)
   *
   * @param {object} data Object with episode simplified object data
   */
  loadSimplifiedObject(data) {
    this.name = data.name;
    this.audio_preview_url = data.audio_preview_url;
    this.description = data.description;
    this.duration_ms = data.duration_ms;
    this.explicit = data.explicit;
    this.external_urls = data.external_urls;
    this.href = data.href;
    this.images = data.images;
    this.is_externally_hosted = data.is_externally_hosted;
    this.is_playable = data.is_playable;
    this.language = data.language;
    this.languages = data.languages;
    this.release_date = data.release_date;
    this.release_date_precision = data.release_date_precision;
    this.resume_point = data.resume_point;
    this.uri = data.uri;
  },

  /**
   * Sets all data conditionally
   *
   * @param {object} data Object with episode data
   */
  loadConditionally(data) {
    const properties = [
      'name',
      'audio_preview_url',
      'description',
      'duration_ms',
      'explicit',
      'external_urls',
      'href',
      'images',
      'is_externally_hosted',
      'is_playable',
      'language',
      'languages',
      'release_date',
      'release_date_precision',
      'resume_point',
      'show',
      'uri',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (properties[i] in data) {
        this[properties[i]] = data[properties[i]];
      }
    }
  },

  /**
   * Retrieves full episode data from Spotify API
   */
  async retrieveFullObject() {
    const response = await Models.wrapperInstance.getEpisode(this.id);
    await this.loadFullObject(response.body);
  },
};

/**
 * Returns Episode object of ID
 *
 * @param {String} episodeId Id of episode
 * @returns {Episode} Episode from id
 */
Episode.getEpisode = async function getEpisode(episodeId) {
  const response = await Models.wrapperInstance.getEpisode(episodeId);
  return new Models.Episode(response.body);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Episode.addMethods = function addMethods(methods) {
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
Episode.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Episode.override: \'name\' does not exist.');
  }
};

Episode.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Episode.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Episode.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Episode.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Episode.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Episode.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Episode.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Episode.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Episode.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Episode.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Episode.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Episode.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Episode.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Episode.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Episode.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Episode.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Episode.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Episode.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Episode;
