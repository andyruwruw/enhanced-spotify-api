'use strict';

var Models = require('../../index');

 /**
 * Playback Constructor
 * Creates a new Playback Instance for a given user.
 */
function Playback() {}

Playback.prototype = {
    /**
     * Get Devices
     * Returns array of devices.
     * @returns {Array} Array of devices.
     */
    getDevices: async function() {
        try {
            await this.retrieveMyDevices();
            return this.devices;
        } catch (error) {
            throw error;
        }
    },

     /**
     * Get Current Playback State
     * Returns complete playback state.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Playback State information.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getCurrentPlaybackState: async function(options) {
        try {
            await this.retrieveMyCurrentPlaybackState(options);
            return this.currentPlayback;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Currently Playing Item
     * Returns Track or Episode instance of playing item.
     * @param {Object} options (Optional) Additional options
     * @returns {Track | Episode} Playback State information.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track,episode).
     */
    getCurrentlyPlaying: async function(options) {
        try {
            let _options = options ? options : {};
            _options.additional_types = "track,episode";
            await this.retrieveMyCurrentPlaybackState(_options);
            if (this.currentPlayback.currently_playing_type == 'track') {
                return new Models.Track(this.currentPlayback.item);
            } else if (this.currentPlayback.currently_playing_type == 'episode') {
                return new Models.Episode(this.currentPlayback.item);
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Context
     * Returns context of currently playing item.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Context object.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getCurrentContext: async function(options) {
        try {
            await this.retrieveMyCurrentPlaybackState(options);
            return this.currentPlayback.context;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Device
     * Returns device currently playing.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Device object.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getCurrentDevice: async function(options) {
        try {
            await this.retrieveMyCurrentPlaybackState(options);
            return this.currentPlayback.device;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Playing State
     * Returns boolean if item is playing currently.
     * @param {Object} options (Optional) Additional options
     * @returns {Boolean} Whether something is playing.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getPlayingState: async function(options) {
        try {
            await this.retrieveMyCurrentPlaybackState(options);
            return this.currentPlayback.is_playing;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Shuffle State
     * Returns boolean if shuffle is on or off.
     * @param {Object} options (Optional) Additional options
     * @returns {Boolean} Whether stuffle is on.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getShuffleState: async function(options) {
        try {
            await this.retrieveMyCurrentPlaybackState(options);
            return this.currentPlayback.shuffle_state;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Repeat State
     * Returns string of current state of repeat.
     * @param {Object} options (Optional) Additional options
     * @returns {String} State of Repeat "off", "track", "context"
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getRepeatState: async function(options) {
        try {
            await this.retrieveMyCurrentPlaybackState(options);
            return this.currentPlayback.repeat_state;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Progress
     * Returns millisecond progress into item being played.
     * @param {Object} options (Optional) Additional options
     * @returns {Number} Milliseconds into item.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getProgress: async function(options) {
        try {
            await this.retrieveMyCurrentPlaybackState(options);
            return this.currentPlayback.progress_ms;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Volume
     * Returns percentage of volume.
     * @param {Object} options (Optional) Additional options
     * @returns {Number} Percentage of volume.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getVolume: async function(options) {
        try {
            await this.retrieveMyCurrentPlaybackState(options);
            return this.device.volume_percent;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Transfer Playback
     * Switches Playback to New Device
     * @param {Array} deviceIds Device to be switched to.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response from request.
     * options.play: {Boolean} Ensure playback happens on new device.
     */
    transferPlayback: async function(deviceIds, options) {
        try {
            return await Models.wrapperInstance.transferMyPlayback(deviceIds, options);
        } catch (error) {
            throw error;
        }
    },

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
    play: async function(options) {
        try {
            return await Models.wrapperInstance.play(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pause
     * Pauses current playback device.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    pause: async function(options) {
        try {
            return await Models.wrapperInstance.pause(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Skip to next
     * Moves Playback to next item.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    skipToNext: async function(options) {
        try {
            return await Models.wrapperInstance.skipToNext(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Skip to Previous
     * Moves Playback to previous item.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    skipToPrevious: async function(options) {
        try {
            return await Models.wrapperInstance.skipToPrevious(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Seek
     * Moves Playback to new position in currently playing item.
     * @param {Number} position Milliseconds in Item
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    seek: async function(position, options) {
        try {
            return await Models.wrapperInstance.seek(position, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Repeat
     * Sets repeat state for current playback device.
     * @param {String} state New Repeat state
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    setRepeat: async function(state, options) {
        try {
            return await Models.wrapperInstance.setRepeat(state, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Volume
     * Sets volume for current playback device.
     * @param {Number} percent New Volume
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    setVolume: async function(percent, options) {
        try {
            return await Models.wrapperInstance.setVolume(percent, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Shuffle
     * Sets shuffle state for current playback device.
     * @param {Boolean} state New shuffle state.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    setShuffle: async function(state, options) {
        try {
            return await Models.wrapperInstance.setShuffle(state, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve My Devices
     * Retrieves devices from spotify.
     */
    retrieveMyDevices: async function() {
        try {
            let response = await Models.wrapperInstance.getMyDevices();
            this.devices = response.body.devices;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve My Current Playback State
     * Retrieves current playback state from spotify.
     * @param {Object} options (Optional) Additional options
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    retrieveMyCurrentPlaybackState: async function(options) {
        try {
            let response = await Models.wrapperInstance.getMyCurrentPlaybackState(options);
            this.currentPlayback = response.body;
        } catch (error) {
            throw error;
        }
    },
}

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