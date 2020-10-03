/* eslint-disable no-console */
const Models = require('../../index');

/**
 * Creates a new Track instance for a given track
 *
 * @param {object | string} data Data to be preloaded,
 * Must either be a string of the track ID or contain an `id` property
 */
function Track(data) {
  if (typeof (data) === 'string') {
    this.id = data;
  } else if (typeof (data) === 'object') {
    if ('id' in data) {
      this.id = data.id;
    } else {
      throw new Error('Track.constructor: No ID Provided');
    }
    this.loadConditionally(data);
  } else {
    throw new Error('Track.constructor: Invalid Data');
  }
  this.type = 'track';
}

Track.prototype = {
  /**
   * Plays track on user's active device
   * @param {object} [options] (Optional) Additional options
   * @param {number} [options.position_ms] Position to start playback
   * (Milliseconds) (Depreciated? spotify-web-api-node?)
   * @returns {object} Response from request
   */
  async play(options) {
    const _options = options || {};
    _options.uris = [`spotify:track:${this.id}`];
    return Models.wrapperInstance.play(_options);
  },

  /**
   * Returns whether this track is saved to the user's library
   *
   * @returns {boolean} Whether this track is saved to the user's library
   */
  async isLiked() {
    const response = await Models.wrapperInstance.containsMySavedTracks([this.id]);
    return response.body[0];
  },

  /**
   * Adds this track to the user's library
   *
   * @returns {object} Response from request
   */
  like() {
    return Models.wrapperInstance.addToMySavedTracks([this.id]);
  },

  /**
  * Removes this track from the user's library
  *
  * @returns {object} Response from request
  */
  unlike() {
    return Models.wrapperInstance.removeFromMySavedTracks([this.id]);
  },

  /**
   * Returns boolean whether full object data is present
   *
   * @returns {boolean} Whether full object is loaded
   */
  containsFullObject() {
    return ((this.name != null)
      && (this.album != null)
      && (this.artists != null)
      && (this.available_markets != null)
      && (this.disc_number != null)
      && (this.duration_ms != null)
      && (this.explicit != null)
      && (this.external_ids != null)
      && (this.external_urls != null)
      && (this.href != null)
      && (this.popularity != null)
      && (this.track_number != null)
      && (this.uri != null)
      && (this.is_local != null));
  },

  /**
   * Returns boolean whether simplified object data is present
   *
   * @returns {boolean} Whether simplified object is loaded
   */
  containsSimplifiedObject() {
    return ((this.name != null)
      && (this.artists != null)
      && (this.available_markets != null)
      && (this.disc_number != null)
      && (this.duration_ms != null)
      && (this.explicit != null)
      && (this.external_urls)
      && (this.href != null)
      && (this.track_number != null)
      && (this.uri != null)
      && (this.is_local != null));
  },

  /**
   * Returns boolean whether link object data is present
   *
   * @returns {boolean} Whether link object is loaded
   */
  containsLinkObject() {
    return ((this.external_urls != null)
      && (this.href != null)
      && (this.uri != null));
  },

  /**
   * Returns boolean whether audio feature data is present
   *
   * @returns {boolean} Whether audio features data is loaded
   */
  containsAudioFeatures() {
    return ((this.duration_ms != null)
      && (this.key != null)
      && (this.mode != null)
      && (this.time_signature != null)
      && (this.acousticness != null)
      && (this.danceability != null)
      && (this.energy != null)
      && (this.instrumentalness != null)
      && (this.liveness != null)
      && (this.loudness != null)
      && (this.speechiness != null)
      && (this.valence != null)
      && (this.tempo != null)
      && (this.uri != null)
      && (this.track_href != null)
      && (this.analysis_url != null));
  },

  /**
   * Returns boolean whether audio analysis data is present
   *
   * @returns {boolean} Whether audio analysis data is loaded
   */
  containsAudioAnalysis() {
    return ((this.bars != null)
      && (this.beats != null)
      && (this.sections != null)
      && (this.segments != null)
      && (this.tatums != null)
      && (this.track != null));
  },

  /**
   * Returns full track data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Track full object data
   */
  async getFullObject() {
    if (!(this.containsFullObject())) {
      await this.retrieveFullObject();
    }
    const result = {
      id: this.id,
      name: this.name,
      album: this.album,
      artists: this.artists,
      available_markets: this.available_markets,
      disc_number: this.disc_number,
      duration_ms: this.duration_ms,
      explicit: this.explicit,
      external_ids: this.external_ids,
      external_urls: this.external_urls,
      href: this.href,
      popularity: this.popularity,
      preview_url: this.preview_url,
      track_number: this.track_number,
      uri: this.uri,
      is_local: this.is_local,
      type: 'track',
    };
    if (this.is_playable != null) {
      result.is_playable = this.is_playable;
    }
    if (this.linked_from != null) {
      result.linked_from = this.linked_from;
    }
    if (this.restrictions != null) {
      result.restrictions = this.restrictions;
    }
    return result;
  },

  /**
   * Returns simplified track data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Track simplified object data
   */
  async getSimplifiedObject() {
    if (!(this.containsSimplifiedObject())) {
      await this.retrieveFullObject();
    }
    const result = {
      id: this.id,
      name: this.name,
      artists: this.artists,
      available_markets: this.available_markets,
      disc_number: this.disc_number,
      duration_ms: this.duration_ms,
      explicit: this.explicit,
      external_urls: this.external_urls,
      href: this.href,
      preview_url: this.preview_url,
      track_number: this.track_number,
      uri: this.uri,
      is_local: this.is_local,
      type: 'track',
    };
    if (this.is_playable != null) {
      result.is_playable = this.is_playable;
    }
    if (this.linked_from != null) {
      result.linked_from = this.linked_from;
    }
    if (this.restrictions != null) {
      result.restrictions = this.restrictions;
    }
    return result;
  },

  /**
   * Returns track link data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Track link data
   */
  async getLinkObject() {
    if (!(this.containsLinkObject())) {
      await this.retrieveFullObject();
    }
    return {
      id: this.id,
      external_urls: this.external_urls,
      href: this.href,
      uri: this.uri,
      type: 'track',
    };
  },

  /**
   * Returns audio feature data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Track audio feature data
   */
  async getAudioFeatures() {
    if (!(this.containsAudioFeatures())) {
      await this.retrieveAudioFeatures();
    }
    return {
      id: this.id,
      duration_ms: this.duration_ms,
      key: this.key,
      mode: this.mode,
      time_signature: this.time_signature,
      acousticness: this.acousticness,
      danceability: this.danceability,
      energy: this.energy,
      instrumentalness: this.instrumentalness,
      liveness: this.liveness,
      loudness: this.loudness,
      speechiness: this.speechiness,
      valence: this.valence,
      tempo: this.tempo,
      uri: this.uri,
      track_href: this.track_href,
      analysis_url: this.analysis_url,
      type: 'audio_features',
    };
  },

  /**
   * Returns audio analysis data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Track audio analysis data
   */
  async getAudioAnalysis() {
    if (!(this.containsAudioAnalysis())) {
      await this.retrieveAudioAnalysis();
    }
    const results = {
      bars: this.bars,
      beats: this.beats,
      sections: this.sections,
      segments: this.segments,
      tatums: this.tatums,
      track: this.track,
    };
    if (this.meta != null) {
      results.meta = this.meta;
    }
    return results;
  },

  /**
   * Returns all data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} All track's data
   */
  async getAllData() {
    if (!(this.containsAudioAnalysis())) {
      await this.retrieveAudioAnalysis();
    }
    if (!(this.containsAudioFeatures())) {
      await this.retrieveAudioFeatures();
    }
    if (!(this.containsFullObject())) {
      await this.retrieveFullObject();
    }
    const results = {
      id: this.id,
      name: this.name,
      album: this.album,
      artists: this.artists,
      available_markets: this.available_markets,
      disc_number: this.disc_number,
      explicit: this.explicit,
      external_ids: this.external_ids,
      external_urls: this.external_urls,
      href: this.href,
      popularity: this.popularity,
      preview_url: this.preview_url,
      track_number: this.track_number,
      type: 'track',
      uri: this.uri,
      is_local: this.is_local,
      duration_ms: this.duration_ms,
      key: this.key,
      mode: this.mode,
      time_signature: this.time_signature,
      acousticness: this.acousticness,
      danceability: this.danceability,
      energy: this.energy,
      instrumentalness: this.instrumentalness,
      liveness: this.liveness,
      loudness: this.loudness,
      speechiness: this.speechiness,
      valence: this.valence,
      tempo: this.tempo,
      track_href: this.track_href,
      analysis_url: this.analysis_url,
      bars: this.bars,
      beats: this.beats,
      sections: this.sections,
      segments: this.segments,
      tatums: this.tatums,
      track: this.track,
    };
    if (this.meta != null) {
      results.meta = this.meta;
    }
    if (this.is_playable != null) {
      results.is_playable = this.is_playable;
    }
    if (this.linked_from != null) {
      results.linked_from = this.linked_from;
    }
    if (this.restrictions != null) {
      results.restrictions = this.restrictions;
    }
    return results;
  },

  /**
   * Just returns whatever the track object currently hold
   *
   * @returns {object} Any track data
   */
  getCurrentData() {
    const data = {
      id: this.id,
      type: 'track',
    };

    const properties = [
      'name',
      'album',
      'artists',
      'available_markets',
      'disc_number',
      'explicit',
      'external_ids',
      'external_urls',
      'href',
      'is_playable',
      'linked_from',
      'restrictions',
      'popularity',
      'preview_url',
      'track_number',
      'uri',
      'is_local',
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'loudness',
      'speechiness',
      'valence',
      'tempo',
      'track_href',
      'analysis_url',
      'bars',
      'beats',
      'sections',
      'segments',
      'tatums',
      'track',
      'meta',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (this[properties[i]] != null) {
        data[properties[i]] = this[properties[i]];
      }
    }
    return data;
  },

  /**
   * Returns Artists object with track's artists
   */
  async getArtists() {
    if (!(this.artists != null)) {
      await this.retrieveFullObject();
    }
    return new Models.Artists(this.artists);
  },

  /**
   * Returns Album object for track's album
   */
  async getAlbum() {
    if (!this.album) {
      await this.retrieveFullObject();
    }
    return new Models.Album(this.album);
  },

  /**
   * Returns recommendations for track
   *
   * @param {object} [options] (Optional) Additional options
   * @param {number} [options.limit] Number of tracks to retrieve
   * @param {number} [options.target_[audio_feature]] Value to target for specific audio feature
   * @param {number} [options.min_[audio_feature]] Minimum value for specific audio feature
   * @param {number} [options.max_[audio_feature]] Maximum value for specific audio feature
   * @returns {Tracks} Track instance with recommended tracks
   */
  async getRecommendations(options) {
    if (options != null && typeof (options) !== 'object') {
      throw new Error('Track.getRecommendations: Invalid Parameter "options"');
    }
    const _options = options || {};
    if ('seed_artists' in _options) {
      delete _options.seed_artists;
    }
    if ('seed_genres' in _options) {
      delete _options.seed_artists;
    }
    _options.seed_tracks = this.id;
    const response = await Models.wrapperInstance.getRecommendations(_options);
    return new Models.Tracks(response.body.tracks);
  },

  /**
   * Returns recommendations for track with added target on audio feature values
   *
   * @param {object} [options] (Optional) Additional options
   * @param {number} [options.limit] Number of tracks to retrieve
   * @returns {Tracks} Track Instance with recommended tracks
   */
  async getRecommendationWithAudioFeatures(options) {
    if (options != null && typeof (options) !== 'object') {
      throw new Error('Track.getRecommendationWithAudioFeatures: Invalid Parameter "options"');
    }
    if (!(await this.containsAudioFeatures())) {
      await this.retrieveAudioFeatures();
    }
    const _options = options || {};
    if ('seed_artists' in _options) {
      delete _options.seed_artists;
    }
    if ('seed_genres' in _options) {
      delete _options.seed_artists;
    }
    _options.seed_tracks = this.id;
    _options.target_acousticness = this.acousticness;
    _options.target_danceability = this.danceability;
    _options.target_energy = this.energy;
    _options.target_instrumentalness = this.instrumentalness;
    _options.target_liveness = this.liveness;
    _options.target_mode = this.mode;
    _options.target_speechiness = this.speechiness;
    _options.target_tempo = this.tempo;
    _options.target_valence = this.valence;
    const response = await Models.wrapperInstance.getRecommendations(_options);
    return new Models.Tracks(response.body.tracks);
  },

  /**
   * Sets full data (outside constructor)
   *
   * @param {object} data Object with track full object data
   */
  loadFullObject(data) {
    this.name = data.name;
    this.album = data.album;
    this.artists = data.artists;
    this.available_markets = data.available_markets;
    this.disc_number = data.disc_number;
    this.duration_ms = data.duration_ms;
    this.explicit = data.explicit;
    this.external_ids = data.external_ids;
    this.external_urls = data.external_urls;
    this.href = data.href;
    this.is_playable = data.is_playable;
    this.linked_from = data.linked_from;
    this.restrictions = data.restrictions;
    this.popularity = data.popularity;
    this.preview_url = data.preview_url;
    this.track_number = data.track_number;
    this.uri = data.uri;
    this.is_local = data.is_local;
  },

  /**
   * Sets simplified data (outside constructor)
   *
   * @param {object} data Object with track simplified object data
   */
  loadSimplifiedObject(data) {
    this.name = data.name;
    this.artists = data.artists;
    this.available_markets = data.available_markets;
    this.disc_number = data.disc_number;
    this.duration_ms = data.duration_ms;
    this.explicit = data.explicit;
    this.external_urls = data.external_urls;
    this.href = data.href;
    this.is_playable = data.is_playable;
    this.linked_from = data.linked_from;
    this.restrictions = data.restrictions;
    this.preview_url = data.preview_url;
    this.track_number = data.track_number;
    this.uri = data.uri;
    this.is_local = data.is_local;
  },

  /**
   * Sets link data (outside constructor)
   *
   * @param {object} data Object with track link object data
   */
  loadLinkObject(data) {
    this.external_urls = data.external_urls;
    this.href = data.href;
    this.uri = data.uri;
  },

  /**
   * Sets audio feature data (outside constructor)
   *
   * @param {object} data Object with track audio feature data
   */
  loadAudioFeatures(data) {
    this.duration_ms = data.duration_ms;
    this.key = data.key;
    this.mode = data.mode;
    this.time_signature = data.time_signature;
    this.acousticness = data.acousticness;
    this.danceability = data.danceability;
    this.energy = data.energy;
    this.instrumentalness = data.instrumentalness;
    this.liveness = data.liveness;
    this.loudness = data.loudness;
    this.speechiness = data.speechiness;
    this.valence = data.valence;
    this.tempo = data.tempo;
    this.uri = data.uri;
    this.track_href = data.track_href;
    this.analysis_url = data.analysis_url;
  },

  /**
   * Sets audio analysis data (outside constructor)
   *
   * @param {object} data Object with track audio analysis data
   */
  loadAudioAnalysis(data) {
    this.bars = data.bars;
    this.beats = data.beats;
    this.sections = data.sections;
    this.segments = data.segments;
    this.tatums = data.tatums;
    this.track = data.track;
    if ('meta' in data) {
      this.meta = data.meta;
    }
  },

  /**
   * Sets all data conditionally
   *
   * @param {object} data Object with track data
   */
  loadConditionally(data) {
    const properties = [
      'name',
      'album',
      'artists',
      'available_markets',
      'disc_number',
      'duration_ms',
      'explicit',
      'external_ids',
      'external_urls',
      'href',
      'is_playable',
      'linked_from',
      'restrictions',
      'popularity',
      'preview_url',
      'track_number',
      'uri',
      'is_local',
      'key',
      'mode',
      'time_signature',
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'loudness',
      'speechiness',
      'valence',
      'tempo',
      'track_href',
      'analysis_url',
      'bars',
      'beats',
      'sections',
      'segments',
      'tatums',
      'track',
      'meta',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (properties[i] in data) {
        this[properties[i]] = data[properties[i]];
      }
    }
  },

  /**
   * Retrieves full track data from Spotify API
   */
  async retrieveFullObject() {
    if ('is_local' in this && this.is_local) {
      return;
    }
    const response = await Models.wrapperInstance.getTrack(this.id);
    await this.loadFullObject(response.body);
  },

  /**
   * Retrieves audio feature data from Spotify API
   */
  async retrieveAudioFeatures() {
    if ('is_local' in this && this.is_local) {
      return;
    }
    const response = await Models.wrapperInstance.getAudioFeaturesForTrack(this.id);
    await this.loadAudioFeatures(response.body);
  },

  /**
   * Retrieves audio analysis data from Spotify API
   */
  async retrieveAudioAnalysis() {
    if ('is_local' in this && this.is_local) {
      return;
    }
    const response = await Models.wrapperInstance.getAudioAnalysisForTrack(this.id);
    await this.loadAudioAnalysis(response.body);
  },
};

/**
 * Returns Track object of ID
 *
 * @param {string} trackID Id of track
 * @returns {Track} Track from id
 */
Track.getTrack = async function getTrack(trackID) {
  const response = await Models.wrapperInstance.getTrack(trackID);
  return new Models.Track(response.body);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Track.addMethods = function addMethods(methods) {
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
Track.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Track.override: \'name\' does not exist.');
  }
};

Track.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Track.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Track.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Track.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Track.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Track.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Track.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Track.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Track.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Track.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Track.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Track.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Track.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Track.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Track.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Track.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Track.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Track.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Track;
