'use strict';

var Models = require('../../index');

 /**
 * Playback Constructor
 * Creates a new Playback Instance for a given user.
 */
function Playback() {}

/**
 * Get Currently Playing Item
 * Returns Track or Episode instance of playing item.
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Playback State information.
 * options.market: {String} Country Code.
 * options.additional_types: {String} A comma-separated list of item types that your client supports besides the default track type.
 */
Playback.getCurrentlyPlaying = async function(options) {
    try {
        let _options = options ? options : {};
        let response = await Models.wrapperInstance.getMyCurrentPlayingTrack(_options);
        return response.body;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Currently Playing Item
 * Returns Track or Episode instance of playing item.
 * @param {Object} options (Optional) Additional options
 * @returns {Track | Episode} Playback State information.
 * options.market: {String} Country Code.
 */
Playback.getCurrentlyPlayingTrackOrEpisode = async function(options) {
    try {
        let _options = options ? options : {};
        _options.additional_types = "track,episode";
        let response = await Models.wrapperInstance.getMyCurrentPlayingTrack(_options);
        if (response.body.currently_playing_type == 'track') {
            return new Models.Track(response.body.item);
        } else if (response.body.currently_playing_type == 'episode') {
            return new Models.Episode(response.body.item);
        }
        return null;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Currently Playing Item
 * Returns Track or Episode instance of playing item.
 * @param {Object} options (Optional) Additional options
 * @returns {Album | Playlist | Show | Artist} Playback State information.
 * options.market: {String} Country Code.
 */
Playback.getCurrentlyPlayingContext = async function(options) {
    try {
        let _options = options ? options : {};
        _options.additional_types = "track,episode";
        let response = await Models.wrapperInstance.getMyCurrentPlayingTrack(_options);
        if (response.body.context == null) {
            return null;
        } else if (response.body.context.type == 'artist') {
            return new Models.Artist(response.body.context.uri.split(':').reverse()[0]);
        } else if (response.body.currently_playing_type == 'playlist') {
            return new Models.Playlist(response.body.context.uri.split(':').reverse()[0]);
        } else if (response.body.currently_playing_type == 'show') {
            return new Models.Show(response.body.context.uri.split(':').reverse()[0]);
        } else if (response.body.currently_playing_type == 'album') {
            return new Models.Album(response.body.context.uri.split(':').reverse()[0]);
        }
        return null;
    } catch (error) {
        throw error;
    }
};

/**
 * Transfer Playback
 * Switches Playback to New Device
 * @param {String} deviceID Device to be switched to.
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Response from request.
 * options.play: {Boolean} Ensure playback happens on new device.
 */
Playback.transferPlayback = async function(deviceID, options) {
    try {
        let _options = options ? options : {};
        _options.deviceIDs = [deviceID];
        return await Models.wrapperInstance.transferMyPlayback(_options);
    } catch (error) {
        throw error;
    }
};

/**
 * Play
 * Plays item on current playback device.
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Response from request.
 * options.context_uri: {String} Spotify URI of context to play (albums, artists, playlists).
 * options.uris: {Array} Array of Spotify Track URIs to be played.
 * options.offset: {Object} Where from the context to play (Only valid with albums and playlists).
 * options.offset.position: {Number} Index of item to start with in context.
 * options.offset.uri: {String} URI of item to start with in context.
 * options.position_ms: {Number} Millisecond to start with in track.
 */
Playback.play = async function(options) {
    try {
        return await Models.wrapperInstance.play(options);
    } catch (error) {
        throw error;
    }
};

/**
 * Pause
 * Pauses current playback device.
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Response to request.
 * options.device_id: {String} Device ID of target to command.
 */
Playback.pause = async function(options) {
    try {
        return await Models.wrapperInstance.pause(options);
    } catch (error) {
        throw error;
    }
};

/**
 * Skip to next
 * Moves Playback to next item.
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Response to request.
 * options.device_id: {String} Device ID of target to command.
 */
Playback.skipToNext = async function(options) {
    try {
        return await Models.wrapperInstance.skipToNext(options);
    } catch (error) {
        throw error;
    }
};

/**
 * Skip to Previous
 * Moves Playback to previous item.
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Response to request.
 * options.device_id: {String} Device ID of target to command.
 */
Playback.skipToPrevious = async function(options) {
    try {
        return await Models.wrapperInstance.skipToPrevious(options);
    } catch (error) {
        throw error;
    }
};

/**
 * Seek
 * Moves Playback to new position in currently playing item.
 * @param {Number} position Milliseconds in Item
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Response to request.
 * options.device_id: {String} Device ID of target to command.
 */
Playback.seek = async function(position, options) {
    try {
        return await Models.wrapperInstance.seek(position, options);
    } catch (error) {
        throw error;
    }
};

/**
 * Set Repeat
 * Sets repeat state for current playback device.
 * @param {String} state New Repeat state
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Response to request.
 * options.device_id: {String} Device ID of target to command.
 */
Playback.setRepeat = async function(state, options) {
    try {
        return await Models.wrapperInstance.setRepeat(state, options);
    } catch (error) {
        throw error;
    }
};

/**
 * Set Volume
 * Sets volume for current playback device.
 * @param {Number} percent New Volume
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Response to request.
 * options.device_id: {String} Device ID of target to command.
 */
Playback.setVolume = async function(percent, options) {
    try {
        return await Models.wrapperInstance.setVolume(percent, options);
    } catch (error) {
        throw error;
    }
};

/**
 * Set Shuffle
 * Sets shuffle state for current playback device.
 * @param {Boolean} state New shuffle state.
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Response to request.
 * options.device_id: {String} Device ID of target to command.
 */
Playback.setShuffle = async function(state, options) {
    try {
        return await Models.wrapperInstance.setShuffle(state, options);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Devices
 * Retrieves devices from spotify.
 * @returns {Object} Devices
 */
Playback.getDevices = async function() {
    try {
        let response = await Models.wrapperInstance.getMyDevices();
        return response.body.devices;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Current Playback State
 * Returns current playback state from spotify.
 * @param {Object} options (Optional) Additional options
 * @returns {Object} Current Playback State
 * options.market: {String} Country Code.
 * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
 */
Playback.getCurrentPlaybackState = async function(options) {
    try {
        let response = await Models.wrapperInstance.getMyCurrentPlaybackState(options != null ? options : {});
        return response.body;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Recently Played Tracks
 * Returns a Tracks instance of recently played tracks.
 * @param {Object} options (Optional) Additional options
 * @returns {Tracks} Recently Played Tracks
 * options.limit: {Number} Number of items to return.
 * options.after: {Number} Unix timestamp. Returns tracks played after. (Don't use before).
 * options.before: {Number} Unix timestamp. Returns tracks played before. (Don't use after).
 */
Playback.getRecentlyPlayedTracks = async function(options) {
    try {
        let response = await Models.wrapperInstance.getMyRecentlyPlayedTracks(options != null ? options : {});
        return new Models.Tracks(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Playback.addMethods = function(methods) {
    for (let method in methods) {
        this.prototype[method] = methods[method];
    }
};

/**
 * Override
 * Replaces a method within the Class.
 * @param {String} name Name of the method to replace.
 * @param {Function} method Function to replace with.
 */
Playback.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Playback.override: \"name\" does not exist.");
    }
};

Playback.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Playback.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Playback.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Playback.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Playback.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Playback.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Playback.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Playback.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Playback.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Playback.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Playback.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Playback.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Playback.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Playback.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Playback.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Playback.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Playback.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Playback.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Playback;