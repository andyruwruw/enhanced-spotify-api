const Models = require('../../index');

/**
 * Creates a new Playlist instance for a given playlist
 *
 * @param {object | string} data Data to be preloaded,
 * Must either be a string of the playlist ID or contain an `id` property
 */
function Playlist(data) {
  if (typeof (data) === 'string') {
    this.id = data;
    this._tracks = new Models.Tracks();
  } else if (typeof (data) === 'object') {
    if ('id' in data) {
      this.id = data.id;
    } else {
      throw new Error('Playlist.constructor: No ID Provided');
    }
    this.loadConditionally(data);
  } else {
    throw new Error('Playlist.constructor: Invalid Parameter "data"');
  }
  this.retrieved = false;
}

Playlist.prototype = {
  /**
   * Plays playlist on user's active device
   *
   * @param {object} [options] (Optional) Additional options
   * @param {object} [options.offset] Starting options
   * @param {number} [options.offset.position] Index of track to begin with
   * @param {string} [options.offset.uri] Track URI to begin with
   * @param {number} [options.position_ms] Position to start Playlist (milliseconds)
   * @returns {object} Result from request
   */
  play(options) {
    const _options = options || {};
    _options.context_uri = `spotify:playlist:${this.id}`;
    return Models.wrapperInstance.play(_options);
  },

  /**
   * Returns whether an playlist is followed by the user
   *
   * @returns {boolean} Whether playlist is followed by user
   */
  async isFollowed() {
    const userID = await (await Models.wrapperInstance.getMe()).body.id;
    const response = await Models.wrapperInstance.areFollowingPlaylist(this.id, [userID]);
    return response.body[0];
  },

  /**
   * Returns whether an playlist is followed by a set of users
   *
   * @param {Array} userIds User IDs to check if they're following
   * @returns {boolean} Whether playlist is followed by a set of users
   */
  async areFollowing(userIds) {
    const response = await Models.wrapperInstance.areFollowingPlaylist(this.id, userIds);
    return response.body;
  },

  /**
   * Follows playlist
   *
   * @returns {object} Result from request
   */
  follow() {
    return Models.wrapperInstance.followPlaylist(this.id);
  },

  /**
   * Unfollows playlist
   *
   * @returns {object} Result from request
   */
  unfollow() {
    return Models.wrapperInstance.unfollowPlaylist(this.id);
  },

  /**
   * Returns boolean whether full playlist object is present
   *
   * @returns {boolean} Whether full playlist object is loaded
   */
  containsFullObject() {
    return ((this.name != null)
      && (this.collaborative != null)
      && (this.description != null)
      && (this.external_urls)
      && (this.followers)
      && (this.href != null)
      && (this.images != null)
      && (this.owner)
      && (this.public != null)
      && (this.snapshot_id != null)
      && (this.tracks != null)
      && (this.uri != null));
  },

  /**
   * Returns boolean whether simplified playlist object is present
   *
   * @returns {boolean} Whether simplified playlist object is loaded
   */
  containsSimplifiedObject() {
    return ((this.name != null)
      && (this.collaborative != null)
      && (this.description != null)
      && (this.external_urls)
      && (this.href != null)
      && (this.images != null)
      && (this.owner)
      && (this.public != null)
      && (this.snapshot_id != null)
      && (this.tracks != null)
      && (this.uri != null));
  },

  /**
   * Returns full playlist data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Playlist full object data
   */
  async getFullObject() {
    if (!(this.containsFullObject())) {
      await this.retrieveFullObject();
    }
    return {
      id: this.id,
      collaborative: this.collaborative,
      description: this.description,
      external_urls: this.external_urls,
      followers: this.followers,
      href: this.href,
      images: this.images,
      name: this.name,
      owner: this.owner,
      public: this.public,
      snapshot_id: this.snapshot_id,
      tracks: this.tracks,
      uri: this.uri,
      type: 'playlist',
    };
  },

  /**
   * Returns simplified playlist data,
   * Retrieves from Spotify API if necessary
   *
   * @returns {object} Playlist simplified object data
   */
  async getSimplifiedObject() {
    if (!(this.containsSimplifiedObject())) {
      await this.retrieveFullObject();
    }
    const data = {
      id: this.id,
      collaborative: this.collaborative,
      description: this.description,
      external_urls: this.external_urls,
      href: this.href,
      images: this.images,
      name: this.name,
      owner: this.owner,
      public: this.public,
      snapshot_id: this.snapshot_id,
      tracks: this.tracks,
      uri: this.uri,
      type: 'playlist',
    };
    return data;
  },

  /**
   * Just returns whatever the playlist object currently holds
   *
   * @returns {object} Any playlist data
   */
  getCurrentData() {
    const data = {
      id: this.id,
      type: 'playlist',
    };

    const properties = [
      'collaborative',
      'description',
      'external_urls',
      'followers',
      'href',
      'images',
      'name',
      'owner',
      'public',
      'snapshot_id',
      'tracks',
      'uri',
      '_tracks',
    ];

    for (let i = 0; i < properties.length; i += 1) {
      if (this[properties[i]] != null) {
        data[properties[i]] = this[properties[i]];
      }
    }
    data._tracks = this._tracks;
    return data;
  },

  /**
   * Returns Tracks object with all playlist tracks,
   * Retrieves if necessary
   *
   * @returns {Tracks} Tracks instance with all playlist tracks
   */
  async getTracks() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks;
  },

  /**
   * Returns Artists object with all playlist artists,
   * Retrieves if necessary
   *
   * @returns {Artists} Artists instance with all playlist artists
   */
  async getArtists() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks.getArtists();
  },

  /**
   * Returns Albums object with all playlist albums,
   * Retrieves if necessary
   *
   * @returns {Albums} Albums instance with all playlist albums
   */
  async getAlbums() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks.getAlbums();
  },

  /**
   * Saves any detail changes to playlist on Spotify
   *
   * @param {object} [options] (Optional) Details to be changed
   * @param {string} [options.name] Name of playlist
   * @param {string} [options.description] Description of playlist
   * @param {boolean} [options.public] Public status of playlist
   * @param {boolean} [options.collaborative] Collaborative status of playlist
   * @returns {object} Response to request
   */
  changeDetails(options) {
    return Models.wrapperInstance.changePlaylistDetails(
      this.id,
      options,
    );
  },

  /**
   * Appends tracks to playlist
   *
   * @param {Track | Object | string } track Track instance, track object or track id to add.
   */
  push(track) {
    return this.addTracks([track]);
  },

  /**
   * Adds tracks to Playlist
   *
   * @param {Tracks | Array } tracks Another Tracks instance or array of Track instances,
   * track objects, or track ids to concat.
   */
  concat(tracks) {
    return this.addTracks(tracks);
  },

  /**
   * Removes an item from the Manager Object
   *
   * @param {Track | object | string } track Track instance, track data, or track id to remove
   */
  remove(track) {
    return this.removeTracks([track]);
  },

  /**
   * Returns number of tracks in playlist
   *
   * @returns {Number} Number of items in manager
   */
  async size() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks.size();
  },

  /**
   * Find index of an track
   *
   * @param {String | Object | Track} track Track ID, Track instance or object with `id` properity
   * @param {Number} start Where to start in the list
   * @returns {Number} Index of item
   */
  async indexOf(track, start) {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks.indexOf(track, start);
  },

  /**
   * Returns boolean if item is contained
   *
   * @param {String | Object | Track} track Track ID, Track instance or object with `id` properity
   * @returns {boolean} Whether item is contained
   */
  async includes(track) {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks.includes(track);
  },

  /**
   * Returns track object at a given index
   *
   * @param {Number} index Index of the item desired
   * @returns {Track} Track at a given index
   */
  async get(index) {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks.get(index);
  },

  /**
   * Returns array of IDs in order
   * @returns {Array} Array of IDs
   */
  async getIDs() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks.getIDs();
  },

  /**
   * Returns array of IDs in order with no repeats
   * @returns {Array} Array of IDs
   */
  async getIDsNoRepeats() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks.getIDsNoRepeats();
  },

  /**
   * Returns array of URIs in order
   * @returns {Array} Array of URIs
   */
  async getURIs() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks.getURIs();
  },

  /**
   * Returns array of URIs with no repeats
   *
   * @returns {Array} Array of URIs
   */
  async getURIsNoRepeats() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    return this._tracks.getURIsNoRepeats();
  },

  /**
   * Reverses order of items
   */
  async reverse() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    await this._tracks.reverse();
    return this.replaceTracks(this._tracks.getIDs());
  },

  /**
   * Sort Items
   *
   * @param {Function} compareFunction Sorting method
   */
  async sort(compareFunction) {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    await this._tracks.sort(compareFunction);
    return this.replaceTracks(this._tracks.getIDs());
  },

  /**
   * Removes last item
   *
   * @returns {Track} Removed item
   */
  async pop() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    await this.removeTrackIndexes([(await this.size()) - 1]);
    const track = await this._tracks.pop();
    return track;
  },

  /**
   * Removes first item
   *
   * @returns {Track} Removed item
   */
  async shift() {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    const track = await this._tracks.shift();
    await this.removeTrackIndexes([0]);
    return track;
  },

  /**
   * Filters tracks based on method provided
   *
   * @param {Function} method Method to filter by
   * @param {Function} thisArg Value to use as "this" when executing callback
   * @returns {object} Response from Request
   */
  async filter(method, thisArg) {
    if (!this.retrieved) {
      await this.retrieveTracks();
    }
    this._tracks = await this._tracks.filter(
      method,
      thisArg,
    );
    return this.replaceTracks(this._tracks);
  },

  /**
   * Adds new tracks to a playlist
   *
   * @param {Array | string | Track | object} tracks Tracks to be added
   * @param {object} [options] (Optional) Additional options
   * @param {number} [options.position] Position to insert the tracks
   * (0 based index) (Default: Append)
   * @returns {object} Response to request
   */
  async addTracks(tracks, options) {
    let uris = [];
    if (tracks instanceof Models.Tracks) {
      uris = await tracks.getURIs();
    } else if (tracks instanceof Array) {
      for (let i = 0; i < tracks.length; i += 1) {
        if (((tracks[i] instanceof Models.Track || typeof (tracks[i]) === 'object')) && 'id' in tracks[i]) {
          uris.push(`spotify:track:${tracks[i].id}`);
        } else if (typeof (tracks[i]) === 'string') {
          uris.push(`spotify:track:${tracks[i]}`);
        }
      }
    } else if (tracks instanceof Models.Track || typeof (tracks) === 'object') {
      if ('id' in tracks) {
        uris = [`spotify:track:${tracks.id}`];
      } else {
        throw new Error('Playlist.addTracks: Invalid Parameter "tracks"');
      }
    } else if (typeof (tracks) === 'string') {
      uris = [`spotify:track:${tracks}`];
    } else {
      throw new Error('Playlist.addTracks: Invalid Parameter "tracks"');
    }
    const response = await Models.wrapperInstance.addTracksToPlaylist(
      this.id,
      uris,
      options || {},
    );

    if (this.retrieved) {
      this._tracks.concat(tracks);
      if (options && 'position' in options) {
        const order = this._tracks.getIDs();
        order.splice(
          options.position,
          0,
          ...order.splice(
            order.length - uris.length + 1,
            order.length,
          ),
        );
        this._tracks.order = order;
      }
    }
    this.snapshot_id = response.body.snapshot_id;
    return response;
  },

  /**
   * Replaces all tracks of playlist with new tracks
   *
   * @param { Tracks | Array | Track | object | string } tracks
   * @returns {object} Response to request
   */
  async replaceTracks(tracks) {
    let uris = [];
    if (tracks instanceof Models.Tracks) {
      uris = await tracks.getURIs();
    } else if (tracks instanceof Array) {
      for (let i = 0; i < tracks.length; i += 1) {
        if (((tracks[i] instanceof Models.Track || typeof (tracks[i]) === 'object')) && 'id' in tracks[i]) {
          uris.push(`spotify:track:${tracks[i].id}`);
        } else if (typeof (tracks[i]) === 'string') {
          uris.push(`spotify:track:${tracks[i]}`);
        }
      }
    } else if (tracks instanceof Models.Track || typeof (tracks) === 'object') {
      if ('id' in tracks) {
        uris = [`spotify:track:${tracks.id}`];
      } else {
        throw new Error('Playlist.replaceTracks: Invalid Parameter "tracks"');
      }
    } else if (typeof (tracks) === 'string') {
      uris = [`spotify:track:${tracks}`];
    } else {
      throw new Error('Playlist.replaceTracks: Invalid Parameter "tracks"');
    }
    const response = await Models.wrapperInstance.replaceTracksInPlaylist(this.id, uris);
    this._tracks = new Models.Tracks(tracks);
    this.retrieved = true;
    this.snapshot_id = response.body.snapshot_id;
    return response;
  },

  /**
   * Reorders tracks in a playlist
   *
   * @param {Number} range_start Where to select
   * @param {Number} insert_before Where to place
   * @param {object} [options] (Optional) Additional options
   * @param {number} [options.range_length=1] The amount of tracks to be reordered
   * @returns {object} Response to request
   */
  async reorderTracks(range_start, insert_before, options) {
    const response = await Models.wrapperInstance.reorderTracksInPlaylist(
      this.id,
      range_start,
      insert_before,
      options || {},
      this.snapshot_id,
    );

    if (this.retrieved) {
      const order = this._tracks.getIDs();
      const range_length = (options && 'range_length' in options ? options.range_length : 1);
      // eslint-disable-next-line max-len
      const selection = order.filter((item, index) => (index >= range_start && index < range_start + range_length));
      order.splice(insert_before, 0, ...selection);
      if (insert_before > range_start) {
        order.splice(range_start, range_length);
      } else {
        order.splice(range_start + range_length, range_length);
      }
      this._tracks.order = order;
    }
    this.snapshot_id = response.body.snapshot_id;
    return response;
  },

  /**
   * Removes tracks from a playlist
   *
   * @param {Array | string | Track | object} tracks Tracks to be added
   * @returns {object} Response to request
   */
  async removeTracks(tracks) {
    let uris = [];
    if (tracks instanceof Models.Tracks) {
      uris = await tracks.getURIs();
    } else if (tracks instanceof Array) {
      for (let i = 0; i < tracks.length; i += 1) {
        if (typeof (tracks[i]) === 'object' && 'uri' in tracks[i]) {
          uris.push(tracks[i]);
        } else if (((tracks[i] instanceof Models.Track || typeof (tracks[i]) === 'object')) && 'id' in tracks[i]) {
          uris.push(`spotify:track:${tracks[i].id}`);
        } else if (typeof (tracks[i]) === 'string') {
          if (tracks[i].substring(0, 7) === 'spotify') {
            uris.push(tracks[i]);
          } else {
            uris.push(`spotify:track:${tracks[i]}`);
          }
        }
      }
    } else if (typeof (tracks) === 'object' && 'uri' in tracks) {
      uris.push(tracks);
    } else if ((tracks instanceof Models.Track || typeof (tracks) === 'object') && 'id' in tracks) {
      uris.push(`spotify:track:${tracks.id}`);
    } else if (typeof (tracks) === 'string') {
      if (tracks.substring(0, 7) === 'spotify') {
        uris.push(tracks);
      } else {
        uris.push(`spotify:track:${tracks}`);
      }
    } else {
      throw new Error('Playlist.addTracks: Invalid Parameter "tracks"');
    }
    const response = await Models.wrapperInstance.removeTracksFromPlaylistWithSnapshotId(
      this.id,
      uris,
      this.snapshot_id,
    );
    if (this.retrieved) {
      if (!(uris instanceof Array)) {
        uris = [uris];
      }
      for (let i = 0; i < uris.length; i += 1) {
        if (typeof (uris[i]) === 'object' && 'uri' in uris[i]) {
          if ('positions' in uris[i]) {
            await this._tracks.removeIndexes(uris[i].positions);
          } else {
            await this._tracks.remove(uris[i].uri.substring(14, uris[i].uri.length));
          }
        } else {
          await this._tracks.remove(uris[i].substring(14, uris[i].length));
        }
      }
    }
    this.snapshot_id = response.body.snapshot_id;
    return response;
  },

  /**
   * Removes tracks by index from a playlist
   *
   * @param {Array} positions Indexes to be removed
   * @returns {object} Response to request
   */
  async removeTrackIndexes(positions) {
    if (this.snapshot_id === null) {
      await this.retrieveFullObject();
    }
    const response = await Models.wrapperInstance.removeTracksFromPlaylistByPosition(
      this.id,
      positions instanceof Array ? positions : [positions],
      this.snapshot_id,
    );

    if (this.retrieved) {
      if (positions instanceof Array) {
        await this._tracks.removeIndexes(positions);
      } else {
        await this._tracks.removeIndexes([positions]);
      }
    }
    this.snapshot_id = response.body.snapshot_id;
    return response;
  },

  /**
   * Updates playlist custom cover image
   *
   * @param {string} imageData New image,
   * Base64 encoded JPEG image data, maximum payload size is 256 KB
   * @returns {object} Response to Request
   */
  uploadCoverImage(imageData) {
    return Models.wrapperInstance.uploadCustomPlaylistCoverImage(this.id, imageData);
  },

  /**
   * Retrieves full playlist data from Spotify API
   */
  async retrieveFullObject() {
    const response = await Models.wrapperInstance.getPlaylist(this.id);
    await this.loadFullObject(response.body);
  },

  /**
   * Retrieves all tracks in playlist from Spotify API
   */
  async retrieveTracks() {
    this._tracks = new Models.Tracks();
    const options = { offset: 0 };
    let response;
    do {
      response = await Models.wrapperInstance.getPlaylistTracks(this.id, options);
      await this.loadTracks(response.body.items);
      options.offset += 100;
    } while (!(response.body.items.length < 100));
    this.retrieved = true;
  },

  /**
   * Sets full data (outside constructor)
   *
   * @param {object} data Object with playlist full object data
   */
  async loadFullObject(data) {
    this.collaborative = data.collaborative;
    this.description = data.description;
    this.external_urls = data.external_urls;
    this.followers = data.followers;
    this.href = data.href;
    this.images = data.images;
    this.name = data.name;
    this.owner = data.owner;
    this.public = data.public;
    this.snapshot_id = data.snapshot_id;
    this.uri = data.uri;
    if ('tracks' in data) {
      this.tracks = data.tracks;
      if ('items' in data.tracks) {
        await this.loadTracks(data.tracks.items);
      } else {
        await this.loadTracks(data.tracks);
      }
    }
  },

  /**
   * Sets simplified data (outside constructor)
   *
   * @param {object} data Object with playlist simplified object data
   */
  async loadSimplifiedObject(data) {
    this.collaborative = data.collaborative;
    this.description = data.description;
    this.external_urls = data.external_urls;
    this.href = data.href;
    this.images = data.images;
    this.name = data.name;
    this.owner = data.owner;
    this.public = data.public;
    this.snapshot_id = data.snapshot_id;
    this.tracks = data.tracks;
    this.uri = data.uri;
  },

  /**
   * Helper method to add tracks to playlist's internal Tracks item
   *
   * @param {Array | Track | object | string} tracks
   */
  async loadTracks(tracks) {
    if (tracks instanceof Models.Tracks || tracks instanceof Array) {
      this._tracks.concat(tracks);
    } else if (typeof (tracks) === 'object' || typeof (tracks) === 'string') {
      this._tracks.add(tracks);
    } else {
      throw new Error('Playlist.loadTracks: Invalid Parameter "tracks"');
    }
  },

  /**
   * Sets all data conditionally
   *
   * @param {object} data Object with playlist data
   */
  loadConditionally(data) {
    const properties = [
      'name',
      'collaborative',
      'description',
      'external_urls',
      'followers',
      'href',
      'images',
      'owner',
      'public',
      'snapshot_id',
      'tracks',
      'uri',
    ];
    for (let i = 0; i < properties.length; i += 1) {
      if (properties[i] in data) {
        this[properties[i]] = data[properties[i]];
      }
    }
    this._tracks = '_tracks' in data ? data._tracks : new Models.Tracks();
    if ('tracks' in data) {
      if ('items' in data.tracks) {
        this.loadTracks(data.tracks.items);
      } else if (data.tracks instanceof Array) {
        this.loadTracks(data.tracks);
      }
    }
  },
};

/**
 * Returns Playlist object
 *
 * @param {string} playlistID Id of playlist
 * @returns {Playlist} Playlist from id.
 */
Playlist.getPlaylist = async function getPlaylist(playlistID) {
  const response = await Models.wrapperInstance.getPlaylist(playlistID);
  return new Models.Playlist(response.body);
};

/**
 * Creates a playlist and returns its Playlist Instance
 *
 * @param {String} name Name of new playlist
 * @param {object} [options] (Optional) Additional Options
 * @returns {Playlist} Playlist
 */
Playlist.create = async function create(name, options) {
  if (options != null && typeof (options !== 'object')) {
    throw new Error('Playlist.create: Invalid Parameter "options"');
  }
  const userID = await (await Models.wrapperInstance.getMe()).body.id;
  const _options = options || {};
  _options.name = name;
  const response = await Models.wrapperInstance.createPlaylist(userID, _options);
  return new Models.Playlist(response.body);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Playlist.addMethods = function addMethods(methods) {
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
Playlist.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Playlist.override: \'name\' does not exist.');
  }
};

Playlist.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Playlist.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Playlist.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Playlist.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Playlist.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Playlist.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Playlist.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Playlist.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Playlist.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Playlist.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Playlist.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Playlist.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Playlist.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Playlist.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Playlist.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Playlist.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Playlist.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Playlist.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Playlist;
