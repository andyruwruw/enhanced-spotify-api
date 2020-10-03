const Models = require('../../index');

/**
 * Creates a new Artists container instance
 *
 * @param {Array | Artist | object | string} [data] Data to be preloaded,
 * Single or multiple artists
 */
function Artists(items) {
  this.name = 'Artists';
  this.type = 'Artist';
  this.uri_type = 'artist';
  Models.Container.call(this, items);
}

Artists.prototype = {
  ...Models.Container.prototype,

  /**
   * Plays artist on user's active device
   *
   * @param {object} options (Optional) Additional options
   * @returns {object} Response from request
   */
  async play(options) {
    const tracks = new Models.Tracks();
    for (let i = 0; i < this.order.length; i += 1) {
      await tracks.push(await (await this.items[this.order[i]].getTopTracks()).get(0));
    }
    return tracks.play(options);
  },

  /**
   * Returns whether artists are followed by the user
   *
   * @returns {Array} Array of booleans of whether artist is followed by user
   */
  async areFollowed() {
    const response = await Models.wrapperInstance.isFollowingArtists(this.order);
    return response.body;
  },

  /**
   * Follows artist
   */
  followAll() {
    return Models.wrapperInstance.followArtists(Object.keys(this.items));
  },

  /**
   * Unfollows artist
   */
  unfollowAll() {
    return Models.wrapperInstance.unfollowArtists(Object.keys(this.items));
  },

  /**
   * Returns full artist data for all artists,
   * Retrieves from Spotify API if necessary
   *
   * @returns {Array} Array of artist full objects.
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
   * Returns simplified artist data for all artists,
   * Retrieves from Spotify API if necessary
   *
   * @returns {array} Array of artist simplified objects
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
   * Just returns whatever the artist objects currently hold
   *
   * @returns {array} Array of current artist data
   */
  async getCurrentData() {
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getCurrentData());
    }

    return result;
  },

  /**
   * Returns Tracks instance with all artist's top tracks
   *
   * @param {string} [countryCode] (Optional) country code
   * @returns {Tracks}  Tracks object of artist's tracks top tracks
   */
  async getTopTracks(countryCode) {
    const tracks = new Models.Tracks();
    const artists = await this.order.map((artist) => this.items[artist]);
    for (let i = 0; i < artists.length; i += 1) {
      await tracks.concat(await artists[i].getTopTracks(countryCode));
    }
    return tracks;
  },

  /**
   * Returns Tracks instance with all artist's tracks
   *
   * @returns {Tracks}  Tracks object of all artist's tracks
   */
  async getAllTracks() {
    const tracks = new Models.Tracks();
    const artists = await this.order.map((artist) => this.items[artist]);

    for (let i = 0; i < artists.length; i += 1) {
      await tracks.concat(await artists[i].getAllTracks());
    }

    return tracks;
  },

  /**
   * Returns Albums instance with artists's albums
   *
   * @param {object} [options] (Optional) Options to be passed into each request
   * @returns {Albums}  Albums object of artist's albums
   */
  async getAlbums(options) {
    const albums = new Models.Albums();
    const artists = await this.order.map((artist) => this.items[artist]);

    for (let i = 0; i < artists.length; i += 1) {
      await albums.concat(await artists[i].getAlbums(options));
    }
  },

  /**
   * Returns Albums instance with all artists's albums
   *
   * @returns {Albums}  Albums object of all artist's albums
   */
  async getAllAlbums() {
    const albums = new Models.Albums();
    const artists = await this.order.map((artist) => this.items[artist]);

    for (let i = 0; i < artists.length; i += 1) {
      await albums.concat(await artists[i].getAllAlbums());
    }
  },

  /**
   * Returns Artists instance with artist's related artists
   *
   * @returns {Artists} Artists instance of related artists
   */
  async getRelatedArtists() {
    const related = new Models.Artists();

    for (let i = 0; i < this.order.length; i += 1) {
      await related.concat(await this.items[this.order[i]].getRelatedArtists());
    }

    return related;
  },

  /**
   * Retrieves suggests for a random 5 of these artists
   *
   * @param {object} [options] (Optional) Additional options
   * @returns {Tracks} Tracks object with recommendations
   */
  async getRecommendations(options) {
    if (options != null && typeof (options) !== 'object') {
      throw new Error('Artists.search: Invalid Parameter "options"');
    }
    const ids = Object.keys(this.items);
    const seeds = [];
    for (let i = 0; i < 5; i += 1) {
      if (!ids.length) {
        break;
      }
      const random = Math.round(Math.random() * (ids.length - 1));
      seeds.push(ids.slice(random, random + 1));
    }
    const _options = options || {};
    if ('seed_tracks' in _options) {
      delete _options.seed_tracks;
    }
    if ('seed_genres' in _options) {
      delete _options.seed_artists;
    }
    _options.seed_artists = seeds.join(',');
    const response = await Models.wrapperInstance.getRecommendations(_options);
    return new Models.Tracks(response.body.tracks);
  },

  /**
   * Retrieves full artist data for all artists from Spotify API
   *
   * @param {string} objectType What to check if the artist contains,
   * ('simplified', 'link', 'full')
   */
  async retrieveFullObjects(objectType) {
    const ids = [];
    const artistIDs = Object.keys(this.items);

    for (let i = 0; i < artistIDs.length; i += 1) {
      if (objectType === 'simplified') {
        if (!(await this.items[artistIDs[i]].containsSimplifiedObject())) {
          ids.push(artistIDs[i]);
        }
      } else if (!(await this.items[artistIDs[i]].containsFullObject())) {
        ids.push(artistIDs[i]);
      }
    }

    if (ids.length) {
      let response;
      do {
        response = await Models.wrapperInstance.getArtists(ids.splice(0, 50));
        for (let i = 0; i < response.body.artists.length; i += 1) {
          if (response.body.artists[i] !== null) {
            this.items[response.body.artists[i].id].loadFullObject(response.body.artists[i]);
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
 * @param {number} [options.limit] Max number of results to return
 * @param {number} [options.offset] Index of first result to return
 * @param {string} [options.market] Country code
 * @returns {Artists} Artists returned from search
 */
Artists.search = async function search(query, options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Artists.search: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.searchArtists(query, options || {});
  return new Models.Artists(response.body.artists.items);
};

/**
 * Returns Artists object of IDs
 *
 * @param {Array} artistIds Ids of artists
 * @returns {Artists} Artists from ids
 */
Artists.getArtists = async function getArtists(artistIds) {
  const artists = new Models.Artists(artistIds);
  await artists.retrieveFullObjects();
  return artists;
};

/**
 * Returns Artists object artists related to a given id
 *
 * @param {string} artistId Id of artists to find related to
 * @returns {Artists} Artists related to artistID
 */
Artists.getRelatedArtists = async function getRelatedArtists(artistId) {
  const artists = new Models.Artists(artistId);
  return artists.getRelatedArtists();
};

/**
 * Returns Artists object of user's top artists
 *
 * @param {object} options (Optional) Additional options
 * @returns {Artists} User's top artists
 */
Artists.getMyTopArtists = async function getMyTopArtists(options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Artists.getMyTopArtists: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.getMyTopArtists(options || {});
  return new Models.Artists(response.body.items);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Artists.addMethods = function addMethods(methods) {
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
Artists.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Artists.override: \'name\' does not exist.');
  }
};

Artists.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Artists.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Artists.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Artists.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Artists.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Artists.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Artists.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Artists.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Artists.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Artists.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Artists.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Artists.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Artists.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Artists.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Artists.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Artists.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Artists.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Artists.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Artists;
