'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Playback Constructor
 * Creates a new Playback Instance for a given user.
 */
function Playback(wrapper) {
    try {
        this.retrieveMyDevices(wrapper);
        this.retrieveMyCurrentPlaybackState(wrapper);
    } catch (error) {
        throw error;
    }
}

Playback.Track = require('./Track');
Playback.Episode = require('./Episode');

Playback.prototype = {
    /**
     * Get Devices
     * Returns array of devices.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of devices.
     */
    getDevices: async (wrapper) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {object} Playback State information.
     */
    getCurrentPlaybackState: async (wrapper, options) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {Track | Episode} Playback State information.
     */
    getCurrentlyPlaying: async (wrapper, options) => {
        try {
            await this.retrieveMyCurrentPlaybackState(wrapper, options);
            if (this.currentPlayback.currently_playing_type == 'track') {
                return new Playback.Track(this.currentPlayback.item);
            } else if (this.currentPlayback.currently_playing_type == 'episode') {
                return new Playback.Episode(this.currentPlayback.item);
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {object} Context object.
     */
    getCurrentContext: async (wrapper, options) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {object} Device object.
     */
    getCurrentDevice: async (wrapper, options) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {boolean} Whether something is playing.
     */
    getPlayingState: async (wrapper, options) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {boolean} Whether stuffle is on.
     */
    getShuffleState: async (wrapper, options) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {string} State of Repeat "off", "track", "context"
     */
    getRepeatState: async (wrapper, options) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {number} Milliseconds into item.
     */
    getProgress: async (wrapper, options) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     * @returns {number} Percentage of volume
     */
    getVolume: async (wrapper, options) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {Array} deviceIds Device to be switched to.
     * @param {object} options (Optional) Options for Transfer Request.
     * @returns {number} Percentage of volume
     */
    transferPlayback: async (wrapper, deviceIds, options) => {
        try {
            return wrapper.transferMyPlayback(deviceIds, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play
     * Plays item on current playback device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Transfer Request.
     */
    play: async (wrapper, options) => {
        try {
            return wrapper.play(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pause
     * Pauses current playback device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Transfer Request.
     */
    pause: async (wrapper, options) => {
        try {
            return wrapper.pause(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Skip to next
     * Moves Playback to next item.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Skip Request.
     */
    skipToNext: async (wrapper, options) => {
        try {
            return wrapper.skipToNext(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Skip to Previous
     * Moves Playback to previous item.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Rewind Request.
     */
    skipToPrevious: async (wrapper, options) => {
        try {
            return wrapper.skipToPrevious(options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Seek
     * Moves Playback to new position in currently playing item.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} position Milliseconds in Item
     * @param {object} options (Optional) Options for Seek Request.
     */
    seek: async (wrapper, position, options) => {
        try {
            return wrapper.seek(position, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Repeat
     * Sets repeat state for current playback device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} state New Repeat state
     * @param {object} options (Optional) Options for repeat Request.
     */
    setRepeat: async (wrapper, state, options) => {
        try {
            return wrapper.setRepeat(state, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Volume
     * Sets volume for current playback device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} percent New Volume
     * @param {object} options (Optional) Options for volume Request.
     */
    setVolume: async (wrapper, percent, options) => {
        try {
            return wrapper.setVolume(percent, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Shuffle
     * Sets shuffle state for current playback device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {boolean} state New shuffle state.
     * @param {object} options (Optional) Options for shuffle Request.
     */
    setShuffle: async (wrapper, state, options) => {
        try {
            return wrapper.setShuffle(state, options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve My Devices
     * Retrieves devices from spotify.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveMyDevices: async (wrapper) => {
        try {
            let response = await this.wrapper.getMyDevices();
            this.devices = response.body.devices;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve My Current Playback State
     * Retrieves current playback state from spotify.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options for Playback Request.
     */
    retrieveMyCurrentPlaybackState: async (wrapper, options) => {
        try {
            let response = await this.wrapper.getMyCurrentPlaybackState();
            this.currentPlayback = response.body;
        } catch (error) {
            throw error;
        }
    },
};

Playback.addMethods = addMethods;

Playback.override = override;

module.exports = Playback;