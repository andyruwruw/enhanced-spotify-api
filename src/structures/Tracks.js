'use strict';

var Track = require('./Track');

function Tracks(tracks) {
    try {
        this.tracks = {};
        if (tracks) {
            if (tracks instanceof Array)  {
                for (let i = 0; i < tracks.length; i++) {
                    this.add(tracks[i]);
                }
            } else if (typeof(tracks) == 'string' || typeof(tracks) == 'object') {
                this.add(tracks);
            } else {
                throw new Error("Tracks.constructor: Invalid Parameter \"tracks\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Tracks.prototype = {
    /**
     * Add
     * Adds new track to Tracks Object.
     * 
     * @param {Track | object | string } track Track Instance, track object or track id to add. 
     */
    add: function(track) {
        try {
            if (track instanceof Track) {
                if (track.id in this.tracks) {
                    return;
                }
                this.tracks[track.id] = track
            } else if (typeof(track) == 'object') {
                if (track.id in this.tracks) {
                    return;
                }
                this.tracks[track.id] = new Track(track);
            } else if (typeof(track) == 'string') {
                if (track in this.tracks) {
                    return;
                }
                this.tracks[track] = new Track(track);
            } else {
                throw new Error("Tracks.add: Invalid Parameter \"track\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new tracks to Tracks Object.
     * 
     * @param {Tracks | array } tracks Another Tracks instance or array of Track instances, track objects, or track ids to concat.
     */
    concat: function(tracks) {
        if (tracks instanceof Tracks) {
            for (let track in tracks.tracks) {
                if (track in this.tracks) {
                    return;
                }
                this.tracks[track] = tracks.tracks[track];
            }
        } else if (tracks instanceof Array) {
            for (let i = 0; i < tracks.length; i++) {

            }
        } else {
            throw new Error("Tracks.concat: Invalid Parameter \"tracks\"");
        }
    },

    /**
     * Remove
     * Removes an Track object from the Tracks instance.
     * 
     * @param {Track | object | string } track Track instance, track data, or track id to remove.
     */
    remove: function(track) {
        try {
            if (track instanceof Track || typeof(track) == 'object') {
                if (!(id in this.tracks)) {
                    throw new Error("Tracks.remove: No ID Provided");
                }
                delete this.tracks[track.id];
            } else if (typeof(track) == 'string') {
                if (track in this.tracks) {
                    delete this.tracks[track];
                }
            } else {
                throw new Error("Tracks.remove: Invalid Parameter \"track\"");
            }

        } catch (error) {
            throw error;
        }
    }
}

Tracks.addMethods = function(methods) {
    for (var method in methods) {
      if (methods.hasOwnProperty(method)) {
        this.prototype[i] = methods[method];
      }
    }
};

module.exports = Tracks;