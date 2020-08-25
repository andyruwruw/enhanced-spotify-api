// Associated Models
const Models = require('../../index');

/**
 * Creates a new Tracks container instance
 * @param {Array | Track | object | string} [data] (optional) Data to be preloaded,
 * Single or multiple tracks
 */
function Tracks(items) {
  this.name = 'Tracks';
  this.type = 'Track';
  this.uri_type = 'track';
  Models.Container.call(this, items);
}

Tracks.prototype = {
  ...Models.Container.prototype,

  /**
   * Plays tracks on user's active device
   *
   * @param {object} [options] (Optional) Additional options
   * @param {object} [options.offset] Where from the album to play
   * @param {number} [options.offset.position=0] Index of item to start with in context
   * @param {string} [options.offset.uri] URI of item to start with in context
   * @returns {object} Response from request
   */
  async play(options) {
    if (options != null && typeof (options) !== 'object') {
      throw new Error('Tracks.search: Invalid Parameter "options"');
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
      _options.uris.push(`spotify:track:${this.order[(i + offset) % this.order.length]}`);
    }
    return Models.wrapperInstance.play(_options);
  },

  /**
   * Returns array of booleans whether tracks are saved to the user's library
   *
   * @returns {Array} Array of booleans Whether track are saved to the user's library
   */
  async areLiked() {
    const response = await Models.wrapperInstance.containsMySavedTracks(this.order);
    return response.body;
  },

  /**
   * Adds tracks to the user's library
   *
   * @returns {object} Response from request
   */
  async likeAll() {
    return Models.wrapperInstance.addToMySavedTracks(Object.keys(this.items));
  },

  /**
    * Removes tracks from the user's library
    *
    * @returns {object} Response from request.
    */
  async unlikeAll() {
    return Models.wrapperInstance.removeFromMySavedTracks(Object.keys(this.items));
  },

  /**
   * Returns full track data for all tracks,
   * Retrieves from Spotify API if necessary
   *
   * @returns {Array} Array of track full objects
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
     * Returns simplified track data for all tracks,
     * Retrieves from Spotify API if necessary
     *
     * @returns {Array} Array of track simplified objects
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
     * Returns track link data for all tracks,
     * Retrieves from Spotify API if necessary
     *
     * @returns {Array} Array of track link objects
     */
  async getLinkObjects() {
    await this.retrieveFullObjects('link');
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getLinkObject());
    }

    return result;
  },

  /**
     * Returns audio feature data for all tracks,
     * Retrieves from Spotify API if necessary
     *
     * @returns {Array} Array of track audio features
     */
  async getAudioFeatures() {
    await this.retrieveAudioFeatures();
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getAudioFeatures());
    }

    return result;
  },

  /**
     * Returns audio analysis data for all tracks,
     * Retrieves from Spotify API if necessary
     *
     * @returns {Array} Array of track audio analysis data
     */
  async getAudioAnalyses() {
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getAudioAnalysis());
    }

    return result;
  },

  /**
     * Returns all data,
     * Retrieves from Spotify API if necessary
     *
     * @returns {Array} Array of all track's data
     */
  async getAllData() {
    await this.retrieveFullObjects('full');
    await this.retrieveAudioFeatures();
    await this.retrieveAudioAnalyses();
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getAllData());
    }

    return result;
  },

  /**
   * Just returns whatever the track objects currently hold
   *
   * @returns {Array} Array of current track data
   */
  async getCurrentData() {
    const result = [];

    for (let i = 0; i < this.order.length; i += 1) {
      await result.push(await this.items[this.order[i]].getCurrentData());
    }

    return result;
  },

  /**
   * Returns Artists instance with all track's artists
   *
   * @returns {Artists} Artists object of all track's artists
   */
  async getArtists() {
    await this.retrieveFullObjects('simplified');
    const artists = new Models.Artists();
    const trackIDs = Object.keys(this.items);

    for (let i = 0; i < trackIDs.length; i += 1) {
      await artists.concat(await this.items[trackIDs[i]].getArtists());
    }
    return artists;
  },

  /**
   * Returns Albums instance with all track's albums
   *
   * @returns {Albums} Albums object of all track's albums
   */
  async getAlbums() {
    await this.retrieveFullObjects('simplified');
    const albums = new Models.Albums();
    const trackIDs = Object.keys(this.items);

    for (let i = 0; i < trackIDs.length; i += 1) {
      await albums.push(await this.items[trackIDs[i]].getAlbum());
    }
    return albums;
  },

  /**
   * Returns averages for each audio feature
   *
   * @returns {object} With audio feature properties
   */
  async getAudioFeatureAverages() {
    await this.retrieveAudioFeatures();

    const addAudioFeatures = async (total, curr) => {
      const data = await curr.getAudioFeatures();
      return {
        duration_ms: total.duration_ms + data.duration_ms,
        key: total.key + data.key,
        mode: total.mode + data.mode,
        time_signature: total.time_signature + data.time_signature,
        acousticness: total.acousticness + data.acousticness,
        danceability: total.danceability + data.danceability,
        energy: total.energy + data.energy,
        instrumentalness: total.instrumentalness + data.instrumentalness,
        liveness: total.liveness + data.liveness,
        loudness: total.loudness + data.loudness,
        speechiness: total.speechiness + data.speechiness,
        valence: total.valence + data.valence,
        tempo: total.tempo + data.tempo,
      };
    };

    const averages = await Object.values(this.items).reduce(addAudioFeatures, {
      duration_ms: 0,
      key: 0,
      mode: 0,
      time_signature: 0,
      acousticness: 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      liveness: 0,
      loudness: 0,
      speechiness: 0,
      valence: 0,
      tempo: 0,
    });

    const size = Object.keys(this.items).length;
    const properties = Object.keys(averages);

    for (let i = 0; i < properties.length; i += 1) {
      averages[properties[i]] /= size;
    }
    return averages;
  },

  /**
   * Returns distributions for each audio feature
   *
   * @param {number} size Size of distributions
   * @returns {object} With audio feature properties
   */
  async getAudioFeatureDistributions(size) {
    await this.retrieveAudioFeatures();

    const properties = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'loudness',
      'speechiness',
      'valence',
      'tempo',
    ];

    const distributeAudioFeatures = async (total, curr) => {
      const data = await curr.getAudioFeatures();
      for (let i = 0; i < properties.length; i += 1) {
        const divisor = (properties[i] === 'tempo') ? 1 : 250;
        // eslint-disable-next-line no-param-reassign
        total[properties[i]][Math.round((data[properties[i]] / divisor) * size - 1)] += 1;
      }
      return total;
    };

    const emptyDistribution = [];

    for (let i = 0; i < size.length; i += 1) {
      emptyDistribution.push(0);
    }

    const distributions = await Object.values(this.items).reduce(distributeAudioFeatures, {
      acousticness: emptyDistribution,
      danceability: emptyDistribution,
      energy: emptyDistribution,
      instrumentalness: emptyDistribution,
      liveness: emptyDistribution,
      loudness: emptyDistribution,
      speechiness: emptyDistribution,
      valence: emptyDistribution,
      tempo: emptyDistribution,
    });

    return distributions;
  },

  /**
   * Retrieves suggests for a random 5 of these tracks
   *
   * @param {object} [options] (Optional) Additional options
   * @returns {Tracks} Tracks object with recommendations
   */
  async getRecommendations(options) {
    if (options != null && typeof (options) !== 'object') {
      throw new Error('Tracks.search: Invalid Parameter "options"');
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
    if ('seed_artists' in _options) {
      delete _options.seed_artists;
    }
    if ('seed_genres' in _options) {
      delete _options.seed_artists;
    }
    _options.seed_tracks = seeds.join(',');
    const response = await Models.wrapperInstance.getRecommendations(_options);
    return new Models.Tracks(response.body.tracks);
  },

  /**
   * Retrieves full track data for all tracks from Spotify API
   *
   * @param {string} objectType What to check if the track contains,
   * ('simplified', 'link', 'full')
   */
  async retrieveFullObjects(objectType) {
    const ids = [];
    const trackIDs = Object.keys(this.items);

    for (let i = 0; i < trackIDs.length; i += 1) {
      if (objectType === 'simplified') {
        if (!(await this.items[trackIDs[i]].containsSimplifiedObject())) {
          ids.push(trackIDs[i]);
        }
      } else if (objectType === 'link') {
        if (!(await this.items[trackIDs[i]].containsLinkObject())) {
          ids.push(trackIDs[i]);
        }
      } else if (!(await this.items[trackIDs[i]].containsFullObject())) {
        ids.push(trackIDs[i]);
      }
    }
    if (ids.length) {
      let response;
      do {
        response = await Models.wrapperInstance.getTracks(ids.splice(0, 50));
        for (let i = 0; i < response.body.tracks.length; i += 1) {
          if (response.body.tracks[i] !== null) {
            this.items[response.body.tracks[i].id].loadFullObject(response.body.tracks[i]);
          }
        }
      } while (ids.length > 0);
    }
  },

  /**
   * Retrieves audio feature data for all tracks from Spotify API
   */
  async retrieveAudioFeatures() {
    const ids = [];
    const trackIDs = Object.keys(this.items);

    for (let i = 0; i < trackIDs.length; i += 1) {
      if (!(await this.items[trackIDs[i]].containsAudioFeatures())) {
        ids.push(trackIDs[i]);
      }
    }
    if (ids.length) {
      let response;
      do {
        response = await Models.wrapperInstance.getAudioFeaturesForTracks(ids.splice(0, 100));
        for (let i = 0; i < response.body.audio_features.length; i += 1) {
          if (response.body.audio_features[i] !== null) {
            const track = this.items[response.body.audio_features[i].id];
            track.loadAudioFeatures(response.body.audio_features[i]);
          }
        }
      } while (ids.length > 0);
    }
  },

  /**
   * Retrieves audio analysis data for all tracks from Spotify API
   */
  async retrieveAudioAnalyses() {
    const trackIDs = Object.keys(this.items);
    let response;

    for (let i = 0; i < trackIDs.length; i += 1) {
      if (!(await this.items[trackIDs[i]].containsAudioAnalysis())) {
        response = await Models.wrapperInstance.getAudioAnalysisForTrack(trackIDs[i]);
        this.items[trackIDs[i]].loadAudioAnalysis(response.body);
      }
    }
  },
};

/**
 * Returns search results for a query
 *
 * @param {string} query String to search for
 * @param {object} [options] (Optional) Additional options
 * @returns {Tracks} Tracks returned from search
 */
Tracks.search = async function search(query, options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Tracks.search: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.searchTracks(query, options || {});
  return new Models.Tracks(response.body.tracks.items);
};

/**
 * Returns search results for a query based on seeds
 *
 * @param {object} [options] (Optional) Additional options
 * @returns {Tracks} Tracks returned from Search
 */
Tracks.getRecommendations = async function getRecommendations(options) {
  if (options === null || typeof (options) !== 'object') {
    throw new Error('Tracks.getRecommendations: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.getRecommendations(options || {});
  return new Models.Tracks(response.body.tracks);
};

/**
 * Returns users top played tracks
 *
 * @param {object} [options] (Optional) Additional options
 * @returns {Tracks} Tracks returned request
 */
Tracks.getMyTopTracks = async function getMyTopTracks(options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Tracks.getMyTopTracks: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.getMyTopTracks(options || {});
  return new Models.Tracks(response.body.items);
};

/**
 * Returns users recently played tracks
 *
 * @param {object} [options] (Optional) Additional options
 * @returns {Tracks} Tracks returned request
 */
Tracks.getMyRecentlyPlayedTracks = async function getMyRecentlyPlayedTracks(options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Tracks.getMyRecentlyPlayedTracks: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.getMyRecentlyPlayedTracks(options || {});
  return new Models.Tracks(response.body.items);
};

/**
 * Returns saved tracks
 *
 * @param {object} [options] (Optional) Additional options
 * @returns {Tracks} Tracks returned request
 */
Tracks.getMySavedTracks = async function getMySavedTracks(options) {
  if (options != null && typeof (options) !== 'object') {
    throw new Error('Tracks.getMySavedTracks: Invalid Parameter "options"');
  }
  const response = await Models.wrapperInstance.getMySavedTracks(options || {});
  return new Models.Tracks(response.body.items);
};

/**
 * Returns all saved tracks
 *
 * @param {object} [options] (Optional) Additional options
 * @returns {Tracks} Tracks returned request
 */
Tracks.getAllMySavedTracks = async function getAllMySavedTracks() {
  const _options = {
    limit: 50,
    offset: 0,
  };
  const tracks = new Models.Tracks();
  let response;

  do {
    response = await Models.wrapperInstance.getMySavedTracks(_options);
    await tracks.concat(response.body.items);
    _options.offset += 50;
  } while (!(response.items.length < 50));

  return tracks;
};

/**
 * Returns tracks from playlist
 *
 * @param {string} id ID for playlist
 * @returns {Tracks} Tracks from playlist
 */
Tracks.getPlaylistTracks = function getPlaylistTracks(id) {
  const playlist = new Models.Playlist(id);
  return playlist.getTracks();
};

/**
 * Returns tracks from album
 *
 * @param {string} id ID for album
 * @returns {Tracks} Tracks from album
 */
Tracks.getAlbumTracks = function getAlbumTracks(id) {
  const album = new Models.Album(id);
  return album.getTracks();
};

/**
 * Returns Tracks object of IDs
 *
 * @param {Array} trackIds Ids of tracks
 * @returns {Tracks} Tracks from ids
 */
Tracks.getTracks = async function getTracks(trackIds) {
  const tracks = new Models.Tracks(trackIds);
  await tracks.retrieveFullObjects();
  return tracks;
};

/**
 * Returns Artist's top tracks
 *
 * @param {string} id ID for artist
 * @returns {Tracks} Tracks from Artist top tracks
 */
Tracks.getArtistTopTracks = function (id) {
  const artist = new Models.Artist(id);
  return artist.getTopTracks();
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Tracks.addMethods = function addMethods(methods) {
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
Tracks.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Tracks.override: \'name\' does not exist.');
  }
};

Tracks.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Tracks.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Tracks.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Tracks.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Tracks.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Tracks.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Tracks.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Tracks.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Tracks.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Tracks.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Tracks.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Tracks.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Tracks.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Tracks.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Tracks.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Tracks.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Tracks.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Tracks.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Tracks;
