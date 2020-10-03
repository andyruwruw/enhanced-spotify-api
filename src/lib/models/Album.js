const Models = require('../../index');

/**
 * Creates a new Album Instance for a given album
 *
 * @param {object | string} data Data to be preloaded,
 * Must either be a string of the album ID or contain an `id` property
 */
function Album(data) {
  if (typeof (data) === 'string') {
    this.id = data;
    this._tracks = new Models.Tracks();
  } else if (typeof (data) === 'object') {
    if ('id' in data) {
      this.id = data.id;
    } else {
      throw new Error('Album.constructor: No ID Provided');
    }
    this._tracks = '_tracks' in data ? data._tracks : new Models.Tracks();
    this.loadConditionally(data);
  } else {
    throw new Error('Album.constructor: Invalid Data');
  }
  this.type = 'album';
  this.tracksRetrieved = false;
}

Album.prototype = {
  /**
   * Plays album on user's active device
   *
   * @param {object} [options] (Optional) Additional options
   * @param {object} [options.offset] Where from the context to play
   * (Only valid with albums and playlists)
   * @param {number} [options.offset.position] Index of item to start with in context
   * @param {string} [options.offset.uri] URI of item to start with in context
   * @param {number} [options.position_ms] Millisecond to start with in track
   * @returns {object} Response from request
   */
  play(options) {
    const _options = options || {};
    _options.context_uri = `spotify:album:${this.id}`;
    return Models.wrapperInstance.play(_options);
  },

  /**
   * Returns whether an album is saved to the user's library
   *
   * @returns {boolean} Whether album is saved to the user's library
   */
  async isLiked() {
    const response = await Models.wrapperInstance.containsMySavedAlbums([this.id]);
    return response.body[0];
  },

  /**
   * Adds album to the user's library
   *
   * @returns {object} Response from request
   */
  like() {
    return Models.wrapperInstance.addToMySavedAlbums([this.id]);
  },

  /**
  * Removes album from the user's library
  *
  * @returns {object} Response from request
  */
  unlike() {
    return Models.wrapperInstance.removeFromMySavedAlbums([this.id]);
  },

  /**
   * Returns boolean whether full object data is present
   *
   * @returns {boolean} Whether full object is loaded
   */
  containsFullObject() {
    return ((this.name != null)
      && (this.album_type != null)
      && (this.artists != null)
      && (this.available_markets != null)
      && (this.copyrights != null)
      && (this.external_ids != null)
      && (this.external_urls != null)
      && (this.genres != null)
      && (this.href != null)
      && (this.images != null)
      && (this.label != null)
      && (this.popularity != null)
      && (this.release_date != null)
      && (this.release_date_precision != null)
      && (this.tracks != null)
      && (this.uri != null));
  },

  /**
   * Returns boolean whether simplified object data is present
   *
   * @returns {boolean} Whether simplified object is loaded
   */
  containsSimplifiedObject() {
    return ((this.name != null)
      && (this.album_type != null)
      && (this.artists != null)
      && (this.available_markets != null)
      && (this.external_urls != null)
      && (this.href != null)
      && (this.images != null)
      && (this.release_date != null)
      && (this.release_date_precision != null)
      && (this.uri != null));
  },

  /**
   * Returns full album data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Album full object data
   */
  async getFullObject() {
    if (!(await this.containsFullObject())) {
      await this.retrieveFullObject();
    }
    return {
      id: this.id,
      name: this.name,
      album_type: this.album_type,
      artists: this.artists,
      available_markets: this.available_markets,
      copyrights: this.copyrights,
      external_ids: this.external_ids,
      external_urls: this.external_urls,
      genres: this.genres,
      href: this.href,
      images: this.images,
      label: this.label,
      popularity: this.popularity,
      release_date: this.release_date,
      release_date_precision: this.release_date_precision,
      restrictions: this.restrictions,
      tracks: this.tracks,
      uri: this.uri,
      type: 'album',
    };
  },

  /**
   * Returns simplified album data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Album simplified object data
   */
  async getSimplifiedObject() {
    if (!(this.containsSimplifiedObject())) {
      await this.retrieveFullObject();
    }
    const data = {
      id: this.id,
      name: this.name,
      album_type: this.album_type,
      artists: this.artists,
      available_markets: this.available_markets,
      external_urls: this.external_urls,
      href: this.href,
      images: this.images,
      release_date: this.release_date,
      release_date_precision: this.release_date_precision,
      restrictions: this.restrictions,
      uri: this.uri,
      type: 'album',
    };
    if (this.album_group != null) {
      data.album_group = this.album_group;
    }
    return data;
  },

  /**
   * Just returns whatever the album object currently holds
   *
   * @returns {object} Any album data
   */
  getCurrentData() {
    const data = {
      id: this.id,
      type: 'album',
    };

    const properties = [
      'name',
      'album_type',
      'artists',
      'available_markets',
      'copyrights',
      'external_ids',
      'external_urls',
      'genres',
      'href',
      'images',
      'label',
      'popularity',
      'release_date',
      'release_date_precision',
      'restrictions',
      'tracks',
      'uri',
      '_tracks',
      'total_tracks',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (this[properties[i]] != null) {
        data[properties[i]] = this[properties[i]];
      }
    }
    return data;
  },

  /**
   * Returns Tracks object of album tracks
   *
   * @returns {Tracks} Tracks instance with all album tracks
   */
  async getTracks() {
    if (!this.tracksRetrieved) {
      await this.retrieveTracks();
    }
    return this._tracks;
  },

  /**
   * Returns Artists object of album artists
   *
   * @returns {Artists} Artists instance with all album artists
   */
  async getArtists() {
    if (!(this.containsSimplifiedObject())) {
      await this.retrieveFullObject();
    }
    return new Models.Artists(this.artists);
  },

  /**
   * Retrieves full album data from Spotify API
   */
  async retrieveFullObject() {
    const response = await Models.wrapperInstance.getAlbum(this.id);
    await this.loadFullObject(response.body);
  },

  /**
   * Retrieves all tracks in album from Spotify API
   */
  async retrieveTracks() {
    const options = { limit: 50, offset: 0 };
    let response;

    do {
      response = await Models.wrapperInstance.getAlbumTracks(this.id, options);
      await this.loadTracks(response.body.items);

      options.offset += 50;
    } while (!(response.body.items.length < 50));

    this.tracksRetrieved = true;
  },

  /**
   * Sets full data (outside constructor)
   *
   * @param {object} data Object with album full object data
   */
  loadFullObject(data) {
    this.name = data.name;
    this.album_type = data.album_type;
    this.artists = data.artists;
    this.available_markets = data.available_markets;
    this.copyrights = data.copyrights;
    this.external_ids = data.external_ids;
    this.external_urls = data.external_urls;
    this.genres = data.genres;
    this.href = data.href;
    this.images = data.images;
    this.label = data.label;
    this.popularity = data.popularity;
    this.release_date = data.release_date;
    this.release_date_precision = data.release_date_precision;
    this.restrictions = data.restrictions;
    this.uri = data.uri;
    this.tracks = data.tracks;
    if (data.tracks && 'items' in data.tracks) {
      this.loadTracks(data.tracks.items);
    } else {
      this.loadTracks(data.tracks);
    }
  },

  /**
   * Sets simplified data (outside constructor)
   *
   * @param {object} data Object with album simplified object data
   */
  loadSimplifiedObject(data) {
    this.id = data.id;
    this.name = data.name;
    this.album_type = data.album_type;
    this.artists = data.artists;
    this.available_markets = data.available_markets;
    this.external_urls = data.external_urls;
    this.href = data.href;
    this.images = data.images;
    this.release_date = data.release_date;
    this.release_date_precision = data.release_date_precision;
    this.restrictions = data.restrictions;
    this.uri = data.uri;
  },

  /**
   * Sets all data conditionally
   *
   * @param {object} data Object with album data
   */
  loadConditionally(data) {
    const properties = [
      'name',
      'album_type',
      'artists',
      'available_markets',
      'copyrights',
      'external_ids',
      'external_urls',
      'genres',
      'href',
      'images',
      'label',
      'popularity',
      'release_date',
      'release_date_precision',
      'restrictions',
      'tracks',
      'uri',
      'album_group',
      'total_tracks',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (properties[i] in data) {
        this[properties[i]] = data[properties[i]];
      }
    }
    if ('tracks' in data) {
      if ('items' in data.tracks) {
        this.loadTracks(data.tracks.items);
      } else if (data.tracks instanceof Array) {
        this.loadTracks(data.tracks);
      }
    }
  },

  /**
   * Helper method to add tracks to album's internal Tracks item
   *
   * @param {Tracks | Array | Track | object | string} tracks
   */
  loadTracks(tracks) {
    if (tracks instanceof Models.Tracks || tracks instanceof Array) {
      this._tracks.concat(tracks);
    } else if (typeof (tracks) === 'string') {
      this._tracks.push(tracks);
    } else if (typeof (tracks) === 'object' && 'items' in tracks) {
      this._tracks.concat(tracks.items);
    }
  },
};

/**
 * Returns Album object of ID
 *
 * @param {string} albumID Id of album.
 * @param {object} [options] (Optional) Additional options.
 * @param {string} [options.market] Country code
 * @returns {Album} Album from id.
 */
Album.getAlbum = async function getAlbum(albumID, options) {
  const response = await Models.wrapperInstance.getAlbum(albumID, options || {});
  return new Models.Album(response.body);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Album.addMethods = function addMethods(methods) {
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
Album.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Album.override: \'name\' does not exist.');
  }
};

Album.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Album.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Album.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Album.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Album.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Album.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Album.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Album.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Album.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Album.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Album.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Album.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Album.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Album.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Album.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Album.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Album.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Album.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Album;
