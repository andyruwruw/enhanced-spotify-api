const Models = require('../../index');

function Playback() {}

/**
 * Returns Track or Episode instance of playing item
 *
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.market] Country code
 * @param {string} [options.additional_types] A comma-separated list of item types
 * that your client supports besides the default track type
 * @returns {object} Playback State information
 */
Playback.getCurrentlyPlaying = async function getCurrentlyPlaying(options) {
  const _options = options || {};
  const response = await Models.wrapperInstance.getMyCurrentPlayingTrack(_options);
  return response.body;
};

/**
 * Returns Track or Episode instance of playing item
 *
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.market] Country code
 * @returns {Track | Episode} Playback State information
 */
// eslint-disable-next-line max-len
Playback.getCurrentlyPlayingTrackOrEpisode = async function getCurrentlyPlayingTrackOrEpisode(options) {
  const _options = options || {};
  _options.additional_types = 'track,episode';
  const response = await Models.wrapperInstance.getMyCurrentPlayingTrack(_options);
  if (response.body.currently_playing_type === 'track') {
    return new Models.Track(response.body.item);
  } if (response.body.currently_playing_type === 'episode') {
    return new Models.Episode(response.body.item);
  }
  return null;
};

/**
 * Returns Class instance of playing context
 *
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.market] Country code
 * @returns {Album | Playlist | Show | Artist} Playback state information
 */
Playback.getCurrentlyPlayingContext = async function getCurrentlyPlayingContext(options) {
  const _options = options || {};
  _options.additional_types = 'track,episode';
  const response = await Models.wrapperInstance.getMyCurrentPlayingTrack(_options);
  if (response.body.context === null) {
    return null;
  } if (response.body.context.type === 'artist') {
    return new Models.Artist(response.body.context.uri.split(':').reverse()[0]);
  } if (response.body.currently_playing_type === 'playlist') {
    return new Models.Playlist(response.body.context.uri.split(':').reverse()[0]);
  } if (response.body.currently_playing_type === 'show') {
    return new Models.Show(response.body.context.uri.split(':').reverse()[0]);
  } if (response.body.currently_playing_type === 'album') {
    return new Models.Album(response.body.context.uri.split(':').reverse()[0]);
  }
  return null;
};

/**
 * Switches Playback to New Device
 *
 * @param {string} deviceID Device to be switched to.
 * @param {object} [options] (Optional) Additional options
 * @param {object} [options.play] Ensure playback happens on new device
 * @returns {object} Response from request.
 */
Playback.transferPlayback = function transferPlayback(deviceID, options) {
  const _options = options || {};
  _options.deviceIDs = [deviceID];
  return Models.wrapperInstance.transferMyPlayback(_options);
};

/**
 * Plays item on current playback device
 *
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.context_uri] Spotify URI of context to play
 * (albums, artists, playlists)
 * @param {Array} [options.uris] Array of Spotify Track URIs to be played
 * (Only valid with albums and playlists)
 * @param {object} [options.offset] Index of item to start with in context
 * @param {number} [options.offset.position] (Optional) Additional options
 * @param {string} [options.offset.uri] URI of item to start with in context
 * @param {number} [options.position_ms] Millisecond to start with in track
 * @returns {object} Response from request.
 */
Playback.play = function play(options) {
  return Models.wrapperInstance.play(options);
};

/**
 * Pauses current playback device
 *
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.device_id] Device ID of target to command
 * @returns {object} Response to request.
 */
Playback.pause = function (options) {
  return Models.wrapperInstance.pause(options);
};

/**
 * Moves Playback to next item
 *
 * @param {object} options (Optional) Additional options
 * @param {string} [options.device_id] Device ID of target to command
 * @returns {object} Response to request.
 */
Playback.skipToNext = function skipToNext(options) {
  return Models.wrapperInstance.skipToNext(options);
};

/**
 * Moves Playback to previous item
 *
 * @param {object} options (Optional) Additional options
 * @param {string} [options.device_id] Device ID of target to command
 * @returns {object} Response to request
 */
Playback.skipToPrevious = async function skipToPrevious(options) {
  return Models.wrapperInstance.skipToPrevious(options);
};

/**
 * Moves playback to new position in currently playing item
 *
 * @param {Number} position Milliseconds in item
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.device_id] Device ID of target to command
 * @returns {object} Response to request
 */
Playback.seek = function seek(position, options) {
  return Models.wrapperInstance.seek(position, options);
};

/**
 * Sets repeat state for current playback device
 *
 * @param {string} state New Repeat state
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.device_id] Device ID of target to command
 * @returns {object} Response to request
 */
Playback.setRepeat = function setRepeat(state, options) {
  return Models.wrapperInstance.setRepeat(state, options);
};

/**
 * Sets volume for current playback device
 *
 * @param {Number} percent New volume
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.device_id] Device ID of target to command
 * @returns {object} Response to request
 */
Playback.setVolume = function setVolume(percent, options) {
  return Models.wrapperInstance.setVolume(percent, options);
};

/**
 * Sets shuffle state for current playback device
 *
 * @param {boolean} state New shuffle state
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.device_id] Device ID of target to command
 * @returns {object} Response to request
 */
Playback.setShuffle = function setShuffle(state, options) {
  return Models.wrapperInstance.setShuffle(state, options);
};

/**
 * Retrieves devices from spotify
 *
 * @returns {object} Devices
 */
Playback.getDevices = async function getDevices() {
  const response = await Models.wrapperInstance.getMyDevices();
  return response.body.devices;
};

/**
 * Returns current playback state from spotify
 *
 * @param {object} [options] (Optional) Additional options
 * @param {string} [options.market] Country code
 * @param {string} [options.additional_types=track] Comma-separated lists of item types
 * (track, episode)
 * @returns {object} Current Playback State
 */
Playback.getCurrentPlaybackState = async function getCurrentPlaybackState(options) {
  const response = await Models.wrapperInstance.getMyCurrentPlaybackState(options || {});
  return response.body;
};

/**
 * Returns a Tracks instance of recently played tracks
 *
 * @param {object} [options] (Optional) Additional options
 * @param {number} [options.limit] Number of items to return
 * @param {number} [options.before] Unix timestamp,
 * Returns tracks played before (Don't use after)
 * @param {number} [options.after] Unix timestamp,
 * Returns tracks played after (Don't use before)
 * @returns {Tracks} Recently played tracks
 */
Playback.getRecentlyPlayedTracks = async function getRecentlyPlayedTracks(options) {
  const response = await Models.wrapperInstance.getMyRecentlyPlayedTracks(options || {});
  return new Models.Tracks(response.body.items);
};

/**
 * Adds functionality to Class
 *
 * @param {object} methods Object containing new methods to be added as properties
 */
Playback.addMethods = function addMethods(methods) {
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
Playback.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Playback.override: \'name\' does not exist.');
  }
};

Playback.setCredentials = function setCredentials(credentials) {
  Models.wrapperInstance.setCredentials(credentials);
};

Playback.getCredentials = function getCredentials() {
  return Models.wrapperInstance.getCredentials();
};

Playback.resetCredentials = function resetCredentials() {
  Models.wrapperInstance.resetCredentials();
};

Playback.setClientId = function setClientId(clientId) {
  Models.wrapperInstance.setClientId(clientId);
};

Playback.setClientSecret = function setClientSecret(clientSecret) {
  Models.wrapperInstance.setClientSecret(clientSecret);
};

Playback.setAccessToken = function setAccessToken(accessToken) {
  Models.wrapperInstance.setAccessToken(accessToken);
};

Playback.setRefreshToken = function setRefreshToken(refreshToken) {
  Models.wrapperInstance.setRefreshToken(refreshToken);
};

Playback.setRedirectURI = function setRedirectURI(redirectUri) {
  Models.wrapperInstance.setRedirectURI(redirectUri);
};

Playback.getRedirectURI = function getRedirectURI() {
  return Models.wrapperInstance.getRedirectURI();
};

Playback.getClientId = function getClientId() {
  return Models.wrapperInstance.getClientId();
};

Playback.getClientSecret = function getClientSecret() {
  return Models.wrapperInstance.getClientSecret();
};

Playback.getAccessToken = function getAccessToken() {
  return Models.wrapperInstance.getAccessToken();
};

Playback.getRefreshToken = function getRefreshToken() {
  return Models.wrapperInstance.getRefreshToken();
};

Playback.resetClientId = function resetClientId() {
  return Models.wrapperInstance.resetClientId();
};

Playback.resetClientSecret = function resetClientSecret() {
  return Models.wrapperInstance.resetClientSecret();
};

Playback.resetAccessToken = function resetAccessToken() {
  return Models.wrapperInstance.resetAccessToken();
};

Playback.resetRefreshToken = function resetRefreshToken() {
  return Models.wrapperInstance.resetRefreshToken();
};

Playback.resetRedirectURI = function resetRedirectURI() {
  return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Playback;
