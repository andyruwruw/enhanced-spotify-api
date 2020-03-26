'use strict';

var Artist = require('./Artist');

function Artists(artists) {
    try {
        this.artists = {};
        if (artists) {
            if (artists instanceof Array)  {
                for (let i = 0; i < artists.length; i++) {
                    this.add(artists[i]);
                }
            } else if (typeof(artists) == 'string' || typeof(artists) == 'object') {
                this.add(artists);
            } else {
                throw new Error("Artists.constructor: Invalid Parameter \"artists\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Artists.prototype = {
    /**
     * Add
     * Adds new artist to Artists Object.
     * 
     * @param {Artists | object | string } artist Artist Instance, artist object or artist id to add. 
     */
    add: function(artist) {
        try {
            if (artist instanceof Artist) {
                if (artist.id in this.artists) {
                    return;
                }
                this.artists[artist.id] = artist
            } else if (typeof(artist) == 'object') {
                if (artist.id in this.artists) {
                    return;
                }
                this.artists[artist.id] = new Artist(artist);
            } else if (typeof(artist) == 'string') {
                if (artist in this.artists) {
                    return;
                }
                this.artists[artist] = new Artist(artist);
            } else {
                throw new Error("Artists.add: Invalid Parameter \"artist\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new artists to Artists Object.
     * 
     * @param {Artists | array } artists Another Artists instance or array of Artist instances, artist objects, or artist ids to concat.
     */
    concat: function(artists) {
        if (artists instanceof Artists) {
            for (let artist in artists.artists) {
                if (artist in this.artists) {
                    return;
                }
                this.artists[artist] = artists.artists[artist];
            }
        } else if (artists instanceof Array) {
            for (let i = 0; i < artists.length; i++) {

            }
        } else {
            throw new Error("Artists.concat: Invalid Parameter \"artists\"");
        }
    },

    /**
     * Remove
     * Removes an Artist object from the Artists instance.
     * 
     * @param {Artists | array } artist Artist instance, artist data, or artist id to remove.
     */
    remove: function(artist) {
        try {
            if (artist instanceof Artist || typeof(artist) == 'object') {
                if (!(id in this.artists)) {
                    throw new Error("Artists: No ID Provided");
                }
                delete this.artists[artist.id];
            } else if (typeof(artist) == 'string') {
                if (artist in this.artists) {
                    delete this.artists[artist];
                }
            } else {
                throw new Error("Artists.remove: Invalid Parameter \"artist\"");
            }

        } catch (error) {
            throw error;
        }
    }
}

Artists.addMethods = function(methods) {
    for (var method in methods) {
      if (methods.hasOwnProperty(method)) {
        this.prototype[i] = methods[method];
      }
    }
};

module.exports = Artists;