const Models = require('../../index');

/**
 * Creates a new Artist Instance for a given artist
 *
 * @param {object | string} data Data to be preloaded,
 * Must either be a string of the artist ID or contain an `id` property
 */
function Artist(data) {
  if (typeof (data) === 'string') {
    this.id = data;
  } else if (typeof (data) === 'object') {
    if ('id' in data) {
      this.id = data.id;
    } else {
      throw new Error('Artist.constructor: No ID Provided');
    }
    this.loadConditionally(data);
  } else {
    throw new Error('Artist.constructor: Invalid Data');
  }
}

Artist.prototype = {
  /**
   * Plays artist on user's active device
   *
   * @param {object} [options] (Optional) Additional options
   * @param {number} [options.position_ms] Position to start playback (Milliseconds)
   * @returns {object} Response from request
   */
  play(options) {
    const _options = options || {};
    _options.context_uri = `spotify:artist:${this.id}`;
    return Models.wrapperInstance.play(_options);
  },

  /**
   * Returns whether an artist is followed by the user
   *
   * @returns {boolean} Whether artist is followed by user
   */
  async isFollowed() {
    const response = await Models.wrapperInstance.isFollowingArtists([this.id]);
    return response.body[0];
  },

  /**
   * Follows artist
   *
   * @returns {object} Response from request
   */
  follow() {
    return Models.wrapperInstance.followArtists([this.id]);
  },

  /**
   * Unfollows artist
   *
   * @returns {object} Response from request
   */
  unfollow() {
    return Models.wrapperInstance.unfollowArtists([this.id]);
  },

  /**
   * Returns boolean whether full object data is present
   *
   * @returns {boolean} Whether full object is loaded
   */
  containsFullObject() {
    return ((this.name != null)
      && (this.external_urls)
      && (this.followers)
      && (this.genres != null)
      && (this.href != null)
      && (this.images != null)
      && (this.popularity != null)
      && (this.uri != null));
  },

  /**
   * Returns boolean whether simplified object data is present
   *
   * @returns {boolean} Whether simplified object is loaded
   */
  containsSimplifiedObject() {
    return ((this.name != null)
      && (this.external_urls)
      && (this.href != null)
      && (this.uri != null));
  },

  /**
   * Returns full artist data,
   * retrieves from Spotify API if necessary
   *
   * @returns {object} Artist full object data
   */
  async getFullObject() {
    if (!(this.containsFullObject())) {
      await this.retrieveFullObject();
    }
    return {
      id: this.id,
      name: this.name,
      external_urls: this.external_urls,
      followers: this.followers,
      genres: this.genres,
      href: this.href,
      images: this.images,
      popularity: this.popularity,
      uri: this.uri,
      type: 'artist',
    };
  },

  /**
   * Returns simplified artist data,
   * retrieves from Spotify API if necessary
   *
   * @returns {object} Artist simplified object data
   */
  async getSimplifiedObject() {
    if (!(this.containsSimplifiedObject())) {
      await this.retrieveFullObject();
    }
    return {
      id: this.id,
      name: this.name,
      external_urls: this.external_urls,
      href: this.href,
      uri: this.uri,
      type: 'artist',
    };
  },

  /**
   * Just returns whatever the artist object currently holds
   *
   * @returns {object} Any artist data
   */
  getCurrentData() {
    const data = {
      id: this.id,
      type: 'artist',
    };

    const properties = [
      'name',
      'external_urls',
      'followers',
      'genres',
      'href',
      'images',
      'popularity',
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
   * Returns Tracks instance with Artist's top tracks
   *
   * @param {String} countryCode Country code.
   * @returns {Tracks} Tracks instance of artist's top tracks
   */
  async getTopTracks(countryCode) {
    const response = await Models.wrapperInstance.getArtistTopTracks(
      this.id,
      countryCode || 'US',
    );
    return new Models.Tracks(response.body.tracks);
  },

  /**
   * Returns Tracks instance with all artist's tracks
   *
   * @returns {Tracks} Tracks instance with all artist's tracks
   */
  async getAllTracks() {
    const tracks = new Models.Tracks();

    const options = {
      limit: 50,
      offset: 0,
    };
    let response;

    do {
      response = await Models.wrapperInstance.getArtistAlbums(
        this.id,
        options,
      );

      const albums = new Models.Albums(response.body.items);
      await tracks.concat(await albums.getTracks());

      options.offset += 50;
    } while (!(response.body.items.length < 50));

    return tracks;
  },

  /**
   * Returns Albums instance with artist's albums
   *
   * @param {object} [options] (Optional) Additional options
   * @param {string} [options.include_groups] Comma-separated list of keywords used to filter
   * (album, single, appears_on, comilation) (Default: all)
   * @param {string} [options.country] Country code
   * @param {number} [options.limit] Number of items to return
   * @param {number} [options.offset] Index of first item to return.
   * @returns {Albums} Albums instance with artist's albums.
   */
  async getAlbums(options) {
    if (options != null && typeof (options) !== 'object') {
      throw new Error('Artist.getAlbums: Invalid Parameter "options"');
    }
    const response = await Models.wrapperInstance.getArtistAlbums(
      this.id,
      options || {},
    );
    return new Models.Albums(response.body.items);
  },

  /**
   * Returns Albums instance with all artist's albums
   *
   * @returns {Albums} Albums instance with all artist's albums
   */
  async getAllAlbums() {
    const albums = new Models.Albums();

    const options = {
      limit: 50,
      offset: 0,
    };
    let response;

    do {
      response = await Models.wrapperInstance.getArtistAlbums(this.id, options);
      await albums.concat(response.body.items);

      options.offset += 50;
    } while (!(response.body.items.length < 50));

    return albums;
  },

  /**
   * Returns Artists instance with artist's related artists
   *
   * @returns {Artists} Artists instance of related artists
   */
  async getRelatedArtists() {
    const response = await Models.wrapperInstance.getArtistRelatedArtists(this.id);
    return new Models.Artists(response.body.artists);
  },

  /**
   * Sets full data (outside constructor)\
   *
   * @param {object} data Object with artist full object data
   */
  loadFullObject(data) {
    this.name = data.name;
    this.external_urls = data.external_urls;
    this.followers = data.followers;
    this.genres = data.genres;
    this.href = data.href;
    this.images = data.images;
    this.popularity = data.popularity;
    this.uri = data.uri;
  },

  /**
   * Sets simplified data (outside constructor)
   *
   * @param {object} data Object with artist simplified object data
   */
  loadSimplifiedObject(data) {
    this.name = data.name;
    this.external_urls = data.external_urls;
    this.href = data.href;
    this.uri = data.uri;
  },

  /**
   * Sets all data conditionally
   *
   * @param {object} data Object with artist data
   */
  loadConditionally(data) {
    const properties = [
      'name',
      'external_urls',
      'followers',
      'genres',
      'href',
      'images',
      'popularity',
      'uri',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (properties[i] in data) {
        this[properties[i]] = data[properties[i]];
      }
    }
  },

  /**
   * Retrieves full artist data from Spotify API
   */
  async retrieveFullObject() {
    const response = await Models.wrapperInstance.getArtist(this.id);
    await this.loadFullObject(response.body);
  },
};

/**
 * Returns Artist object of ID
 *
 * @param {string} artistID Id of artist
 * @returns {Artist} Artist from id
 */
Artist.getArtist = async function getArtist(artistID) {
  const response = await Models.wrapperInstance.getArtist(artistID);
  return new Models.Artist(response.body);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Artist.addMethods = function addMethods(methods) {
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
Artist.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Artist.override: \'name\' does not exist.');
  }
};

Artist.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Artist.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Artist.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Artist.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Artist.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Artist.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Artist.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Artist.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Artist.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Artist.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Artist.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Artist.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Artist.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Artist.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Artist.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Artist.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Artist.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Artist.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Artist;
