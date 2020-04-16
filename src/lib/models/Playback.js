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
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of devices.
     */
    getDevices: async function(wrapper) {
        try {
            await this.retrieveMyDevices(wrapper);
            return this.devices;
        } catch (error) {
            throw error;
        }
    },

     /**
     * Get Current Playback State
     * Returns complete playback state.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Playback State information.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getCurrentPlaybackState: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Currently Playing Item
     * Returns Track or Episode instance of playing item.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Track | Episode} Playback State information.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track,episode).
     */
    getCurrentlyPlaying: async function(wrapper, options) {
        try {
            let _options = options ? options : {};
            _options.additional_types = "track,episode";
            await this.retrieveMyCurrentPlaybackState(wrapper, _options);
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
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Context object.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getCurrentContext: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.context;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Device
     * Returns device currently playing.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Device object.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getCurrentDevice: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.device;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Playing State
     * Returns boolean if item is playing currently.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Boolean} Whether something is playing.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getPlayingState: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.is_playing;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Shuffle State
     * Returns boolean if shuffle is on or off.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Boolean} Whether stuffle is on.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getShuffleState: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.shuffle_state;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Repeat State
     * Returns string of current state of repeat.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {String} State of Repeat "off", "track", "context"
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getRepeatState: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.repeat_state;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Progress
     * Returns millisecond progress into item being played.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Number} Milliseconds into item.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getProgress: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.currentPlayback.progress_ms;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Volume
     * Returns percentage of volume.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Number} Percentage of volume.
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    getVolume: async function(wrapper, options) {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            return this.device.volume_percent;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Transfer Playback
     * Switches Playback to New Device
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Array} deviceIds Device to be switched to.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response from request.
     * options.play: {Boolean} Ensure playback happens on new device.
     */
    transferPlayback: async function(wrapper, deviceIds, options) {
        try {
            return await wrapper.transferMyPlayback(deviceIds, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play
     * Plays item on current playback device.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response from request.
     * options.context_uri: {String} Spotify URI of context to play (albums, artists, playlists).
     * options.uris: {Array} Array of Spotify Track URIs to be played.
     * options.offset: {Object} Where from the context to play (Only valid with albums and playlists).
     * options.offset.position: {Number} Index of item to start with in context.
     * options.offset.uri: {String} URI of item to start with in context.
     * options.position_ms: {Number} Millisecond to start with in track.
     */
    play: async function(wrapper, options) {
        try {
            return await wrapper.play(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pause
     * Pauses current playback device.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    pause: async function(wrapper, options) {
        try {
            return await wrapper.pause(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Skip to next
     * Moves Playback to next item.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    skipToNext: async function(wrapper, options) {
        try {
            return await wrapper.skipToNext(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Skip to Previous
     * Moves Playback to previous item.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    skipToPrevious: async function(wrapper, options) {
        try {
            return await wrapper.skipToPrevious(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Seek
     * Moves Playback to new position in currently playing item.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Number} position Milliseconds in Item
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    seek: async function(wrapper, position, options) {
        try {
            return await wrapper.seek(position, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Repeat
     * Sets repeat state for current playback device.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {String} state New Repeat state
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    setRepeat: async function(wrapper, state, options) {
        try {
            return await wrapper.setRepeat(state, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Volume
     * Sets volume for current playback device.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Number} percent New Volume
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    setVolume: async function(wrapper, percent, options) {
        try {
            return await wrapper.setVolume(percent, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Shuffle
     * Sets shuffle state for current playback device.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Boolean} state New shuffle state.
     * @param {Object} options (Optional) Additional options
     * @returns {Object} Response to request.
     * options.device_id: {String} Device ID of target to command.
     */
    setShuffle: async function(wrapper, state, options) {
        try {
            return await wrapper.setShuffle(state, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve My Devices
     * Retrieves devices from spotify.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    retrieveMyDevices: async function(wrapper) {
        try {
            let response = await wrapper.getMyDevices();
            this.devices = response.body.devices;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve My Current Playback State
     * Retrieves current playback state from spotify.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options
     * options.market: {String} Country Code.
     * options.additional_types: {String} Comma-separated lists of item types (track, episode) (Default: track).
     */
    retrieveMyCurrentPlaybackState: async function(wrapper, options) {
        try {
            let response = await wrapper.getMyCurrentPlaybackState(options);
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
}

module.exports = Playback;