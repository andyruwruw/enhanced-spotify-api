// Associated Models
const Models = require('../../index');

/**
 * Creates a new Albums Container Instance
 *
 * @param {Array | Album | object | string} [items] (optional) Data to be preloaded,
 * single or multiple albums.
 */
function Albums(items) {
  this.name = 'Albums';
  this.type = 'Album';
  this.uri_type = 'album';
  Models.Container.call(this, items);
}

Albums.prototype = {
  ...Models.Container.prototype,

  /**
     * Plays albums on user's active device
     *
     * @param {object} [options] (Optional) Additional options
     * @param {number} [options.album_index=0] Which album to start with
     * @param {object} [options.offset] Where from the album to play
     * @param {number} [options.offset.position=0] Index of item to start with in context
     * @param {string} [options.offset.uri] URI of item to start with in context
     * @param {number} [options.position_ms=0] Millisecond to start with in track
     * @returns {object} Response from request
     */
  async play(options) {
    const _album_index = (options && typeof (options) === 'object' && 'album_index' in options) ? options.album_index : 0;
    const tracks = new Models.Tracks();
    for (let i = 0; i < this.order.length; i += 1) {
      await tracks.concat(
        await this.items[this.order[(i + _album_index) % this.order.length]].getTracks(),
      );
    }
    return tracks.play(options);
  },

  /**
   * Returns array of booleans whether albums are saved to the user's library
   *
   * @returns {Array} Array of booleans whether album are saved to the user's library
   */
  async areLiked() {
    const response = await Models.wrapperInstance.containsMySavedAlbums(this.order);
    return response.body;
  },

  /**
  * Adds albums to the user's library
  *
  * @returns {object} Response from request
  */
  likeAll() {
    return Models.wrapperInstance.addToMySavedAlbums(Object.keys(this.items));
  },

  /**
  * Removes albums from the user's library
  *
  * @returns {object} Response from request
  */
  async unlikeAll() {
    return Models.wrapperInstance.removeFromMySavedAlbums(Object.keys(this.items));
  },

  /**
   * Returns full album data for all albums,
   * Retrieves from Spotify API if necessary
   *
   * @returns {Array} Array of album full objects
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
   * Returns simplified album data for all albums,
   * Retrieves from Spotify API if necessary
   *
   * @returns {Array} Array of album simplified objects.
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
   * Just returns whatever the album objects currently hold
   *
   * @returns {Array} Array of current album data
   */
  async getCurrentData() {
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getCurrentData());
    }

    return result;
  },

  /**
   * Returns Artists instance with all album's artists
   *
   * @returns {Artists} Artists object of all album's artists
   */
  async getArtists() {
    await this.retrieveFullObjects('simplified');
    const artists = new Models.Artists();

    const albumIDs = Object.keys(this.items);

    for (let i = 0; i < albumIDs.length; i += 1) {
      await artists.concat(await this.items[albumIDs[i]].getArtists());
    }

    return artists;
  },

  /**
   * Returns Tracks instance with all album's tracks
   *
   * @returns {Tracks} Tracks object of all album's tracks
   */
  async getTracks() {
    const tracks = new Models.Tracks();

    for (let i = 0; i < this.order.length; i += 1) {
      await tracks.concat(await this.items[this.order[i]].getTracks());
    }

    return tracks;
  },

  /**
   * Retrieves full album data for all albums from Spotify API
   *
   * @param {String} [objectType] What to check if the album contains,
   * ('simplified', 'link' or 'full')
   */
  async retrieveFullObjects(objectType) {
    const ids = [];
    const albumIDs = Object.keys(this.items);

    for (let i = 0; i < albumIDs.length; i += 1) {
      if (objectType === 'simplified') {
        if (!(await this.items[albumIDs[i]].containsSimplifiedObject())) {
          ids.push(albumIDs[i]);
        }
      } else if (!(await this.items[albumIDs[i]].containsFullObject())) {
        ids.push(albumIDs[i]);
      }
    }
    if (ids.length) {
      let response;
      do {
        response = await Models.wrapperInstance.getAlbums(ids.splice(0, 50));
        for (let i = 0; i < response.body.albums.length; i += 1) {
          if (response.body.albums[i] !== null) {
            this.items[response.body.albums[i].id].loadFullObject(response.body.albums[i]);
          }
        }
      } while (ids.length > 0);
    }
  },
};

/**
 * Returns search results for a query
 *
 * @param {String} query String to search for
 * @param {object} [options] (Optional) Additional options
 * @param {number} [options.limit] Max number of results to return
 * @param {number} [options.offset] Index of first result to return
 * @param {string} [options.market] Country code
 * @param {string} [options.include_external] "audio" includes any relevant audio
 * content that is hosted externally
 * @returns {Albums} Albums returned from search
 */
Albums.search = async function search(query, options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Albums.search: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.searchAlbums(query, options || {});
  return new Models.Albums(response.body.albums.items);
};

/**
 * Returns saved albums
 *
 * @param {object} [options] (Optional) Additional options
 * @param {number} [options.limit] Max number of results to return
 * @param {number} [options.offset] Index of first result to return
 * @param {string} [options.market] Country code
 * @returns {Albums} Albums returned request
 */
Albums.getMySavedAlbums = async function getMySavedAlbums(options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Albums.getMySavedAlbums: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.getMySavedAlbums(options || {});
  return new Models.Albums(response.body.items);
};

/**
 * Returns all current user's saved albums
 *
 * @returns {Albums} Albums returned request
 */
Albums.getAllMySavedAlbums = async function getAllMySavedAlbums() {
  const _options = {
    limit: 50,
    offset: 0,
  };
  const albums = new Models.Albums();
  let response;
  do {
    response = await Models.wrapperInstance.getMySavedAlbums(_options);
    await albums.concat(response.body.items);
    _options.offset += 50;
  } while (!(response.items.length < 50));
  return albums;
};

/**
 * Returns albums object of IDs
 *
 * @param {Array} albumIDs Ids of albums
 * @returns {Albums} Albums from ids
 */
Albums.getAlbums = async function getAlbums(albumIDs) {
  const albums = new Models.Albums(albumIDs);
  await albums.retrieveFullObjects();
  return albums;
};

/**
 * Returns artist's albums
 *
 * @param {string} artistID ID for artist
 * @returns {Albums} Albums of all artist's albums
 */
Albums.getArtistAlbums = function getArtistAlbums(artistID) {
  const artist = new Models.Artist(artistID);
  return artist.getAllAlbums();
};

/**
 * Returns Albums object with user saved albums
 *
 * @param {object} [options] (Optional) Additional options
 * @param {number} [options.limit] Max number of results to return
 * @param {number} [options.offset] Index of first result to return
 * @param {string} [options.market] Country code
 * @returns {Albums} Albums of user saved albums.
 */
Albums.getNewReleases = async function getNewReleases(options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Albums.getNewReleases: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.getNewReleases(options || {});
  return new Models.Albums(response.body.albums.items);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Albums.addMethods = function addMethods(methods) {
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
Albums.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Albums.override: \'name\' does not exist.');
  }
};

Albums.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Albums.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Albums.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Albums.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Albums.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Albums.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Albums.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Albums.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Albums.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Albums.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Albums.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Albums.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Albums.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Albums.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Albums.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Albums.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Albums.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Albums.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Albums;
