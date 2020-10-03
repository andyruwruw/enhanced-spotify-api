// Associated Models
const Models = require('../../index');

/**
 * Creates a new Playlists container instance
 *
 * @param {Array | Playlist | object | string} data (optional) Data to be preloaded,
 * Single or multiple playlists.
 */
function Playlists(items) {
  this.name = 'Playlists';
  this.type = 'Playlist';
  this.uri_type = 'playlist';
  Models.Container.call(this, items);
}

Playlists.prototype = {
  ...Models.Container.prototype,

  /**
   * Plays playlists on user's active device
   *
   * @param {object} [options] (Optional) Additional options
   */
  async play(options) {
    const tracks = await this.getTracks();
    return tracks.play(options);
  },

  /**
   * Returns whether playlists are followed by the user
   *
   * @returns {Array} Array of booleans of whether playlist is followed by user
   */
  async areFollowing() {
    const following = [];
    const userID = await (await Models.wrapperInstance.getMe()).body.id;
    const playlistIDs = Object.keys(this.items);

    for (let i = 0; i < playlistIDs.length; i += 1) {
      if ('id' in this.items[playlistIDs[i]]) {
        const status = await this.items[playlistIDs[i]].areFollowing([userID]);
        following.push(status[0]);
      } else {
        following.push(null);
      }
    }
  },

  /**
   * Follows all playlists
   *
   * @param {object} options (Optional) Additional options
   */
  async follow(options) {
    const playlistIDs = Object.keys(this.items);

    for (let i = 0; i < playlistIDs.length; i += 1) {
      if ('id' in this.items[playlistIDs[i]]) {
        await Models.wrapperInstance.followPlaylist(this.items[playlistIDs[i]].id, options || {});
      }
    }
  },

  /**
   * Unfollows all playlists
   */
  async unfollow() {
    const playlistIDs = Object.keys(this.items);

    for (let i = 0; i < playlistIDs.length; i += 1) {
      if ('id' in this.items[playlistIDs[i]]) {
        await Models.wrapperInstance.unfollowPlaylist(this.items[playlistIDs[i]].id);
      }
    }
  },

  /**
   * Returns full playlist data for all playlists,
   * Retrieves from Spotify API if necessary
   *
   * @returns {Array} Array of playlist full objects
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
   * Returns simplified playlist data for all playlists,
   * Retrieves from Spotify API if necessary
   *
   * @returns {Array} Array of playlist simplified objects
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
   * Just returns whatever the playlist objects currently hold
   *
   * @returns {Array} Array of current playlist data
   */
  async getCurrentData() {
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getCurrentData());
    }

    return result;
  },

  /**
   * Returns Tracks instance with all playlist's tracks
   *
   * @returns {Tracks} Tracks object of all playlist's tracks
   */
  async getTracks() {
    const tracks = new Models.Tracks();
    const playlistIDs = Object.keys(this.items);

    for (let i = 0; i < playlistIDs.length; i += 1) {
      await tracks.concat(await this.items[playlistIDs[i]].getTracks());
    }

    return tracks;
  },

  /**
   * Returns Artists instance with all playlist's artists
   *
   * @returns {Artists} Artists object of all playlist's artists
   */
  async getArtists() {
    const artists = new Models.Artists();
    const playlistIDs = Object.keys(this.items);

    for (let i = 0; i < playlistIDs.length; i += 1) {
      await artists.concat(await this.items[playlistIDs[i]].getArtists());
    }
    return artists;
  },

  /**
   * Returns Albums instance with all playlist's albums
   *
   * @returns {Albums} Albums object of all playlist's albums
   */
  async getAlbums() {
    const albums = new Models.Albums();
    const playlistIDs = Object.keys(this.items);

    for (let i = 0; i < playlistIDs.length; i += 1) {
      await albums.concat(await this.items[playlistIDs[i]].getAlbums());
    }
    return albums;
  },

  /**
   * Retrieves full playlist data for all playlists from Spotify API
   *
   * @param {string} objectType What to check if the playlist contains,
   * ('simplified', 'link', 'full')
   */
  async retrieveFullObjects(objectType) {
    const playlistIDs = Object.keys(this.items);

    for (let i = 0; i < playlistIDs.length; i += 1) {
      if (objectType === 'simplified') {
        if (!(await this.items[playlistIDs[i]].containsSimplifiedObject())) {
          await this.items[playlistIDs[i]].retrieveFullObject();
        }
      } else if (!(await this.items[playlistIDs[i]].containsFullObject())) {
        await this.items[playlistIDs[i]].retrieveFullObject();
      }
    }
  },
};

/**
 * Returns search results for a query
 *
 * @param {string} query String to search for
 * @param {object} [options] (Optional) Additional options
 * @returns {Playlists} Playlists returned from search
 */
Playlists.search = async function search(query, options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Playlists.search: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.searchPlaylists(query, options || {});
  return new Models.Playlists(response.body.playlists.items);
};

/**
 * Returns followed and created playlists
 *
 * @param {object} [options] (Optional) Additional options
 * @returns {Playlists} Playlists returned request
 */
Playlists.getUserPlaylists = async function getUserPlaylists(userId, options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Playlists.getUserPlaylists: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.getUserPlaylists(userId, options || {});
  return new Models.Playlists(response.body.items);
};

/**
 * Returns all followed and created playlists
 *
 * @param {object} [options] (Optional) Additional options
 * @returns {Playlists} Playlists returned request
 */
Playlists.getAllUserPlaylists = async function getAllUserPlaylists(userId) {
  const _options = {
    limit: 50,
    offset: 0,
  };

  const playlists = new Models.Playlists();
  let response;

  do {
    response = await Models.wrapperInstance.getUserPlaylists(
      userId,
      _options,
    );
    await playlists.concat(response.body.items);
    _options.offset += 50;
  } while (!(response.items.length < 50));

  return playlists;
};

/**
 * Returns followed and created playlists
 *
 * @param {object} [options] (Optional) Additional options
 * @returns {Playlists} Playlists returned request
 */
Playlists.getMyPlaylists = async function getMyPlaylists(options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Playlists.getUserPlaylists: Invalid Parameter "options"');
  }
  const userId = await (await Models.wrapperInstance.getMe()).body.id;
  const response = await Models.wrapperInstance.getUserPlaylists(
    userId,
    options || {},
  );
  return new Models.Playlists(response.body.items);
};

/**
 * Returns all followed and created playlists
 *
 * @param {object} [options] (Optional) Additional options
 * @returns {Playlists} Playlists returned request
 */
Playlists.getAllMyPlaylists = async function getAllMyPlaylists() {
  const _options = {
    limit: 50,
    offset: 0,
  };

  const userId = await (await Models.wrapperInstance.getMe()).body.id;
  const playlists = new Models.Playlists();
  let response;

  do {
    response = await Models.wrapperInstance.getUserPlaylists(
      userId,
      _options,
    );
    await playlists.concat(response.body.items);
    _options.offset += 50;
  } while (!(response.items.length < 50));

  return playlists;
};

/**
 * Returns list of featured playlists
 *
 * @param {object} [options] (Optional) Additional options
 * @returns {Playlists} Playlists returned request
 */
Playlists.getFeaturedPlaylists = async function getFeaturedPlaylists(options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Playlists.getUserPlaylists: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.getFeaturedPlaylists(options || {});
  return new Models.Playlists(response.body.playlists.items);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Playlists.addMethods = function addMethods(methods) {
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
Playlists.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Playlists.override: \'name\' does not exist.');
  }
};

Playlists.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Playlists.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Playlists.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Playlists.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Playlists.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Playlists.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Playlists.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Playlists.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Playlists.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Playlists.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Playlists.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Playlists.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Playlists.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Playlists.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Playlists.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Playlists.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Playlists.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Playlists.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Playlists;
