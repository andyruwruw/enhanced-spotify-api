'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Tracks Manager Instance.
 * @param {Array | Track | object | string} data (optional) Data to be preloaded. Single or multiple tracks.
 */
function Tracks(items) {
    this.name = 'Tracks';
    this.type = 'Track';
    this.uri_type = 'track';
    Models.Manager.call(this, items);
}

Tracks.prototype = {
    ...Models.Manager.prototype,

    /**
     * Plays Tracks
     * Plays tracks on user's active device.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response from request.
     * options.offset.position: {Number} (Optional) Index of track to begin with.
     * options.offset.uri: {String} (Optional) Track URI to begin with.
     * options.position_ms: {Number} Position to start playback (Milliseconds)
     */
    play: async function(wrapper, options) {
        try {
            let _options = options ? options : {};
            _options.uris = await this.order.map((track) => 'spotify:track:' + this.items[track].id);
            return await wrapper.play(_options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Liked
     * Returns array of booleans whether tracks are saved to the user's library.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of Booleans Whether track are saved to the user's library.
     */
    areLiked: async function(wrapper) {
        try {
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            let response = await wrapper.containsMySavedTracks(await tracks.map((track) => track.id));
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
    * Like Track
    * Adds tracks to the user's library.
    * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
    * @returns {Object} Response from request.
    */
    likeAll: async function(wrapper) {
        try {
            return await wrapper.addToMySavedTracks(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Track
    * Removes tracks from the user's library.
    * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
    * @returns {Object} Response from request.
    */
    unlikeAll: async function(wrapper) {
        try {
            return await wrapper.removeFromMySavedTracks(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full track data for all tracks. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of Track Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified track data for all tracks. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of Track Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Link Objects
     * Returns track link data for all tracks. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of Track Link Objects.
     */
    getLinkObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'link');
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getLinkObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Tracks Audio Features
     * Returns audio feature data for all tracks. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of Track Audio Features.
     */
    getAudioFeatures: async function(wrapper) {
        try {
            await this.retrieveAudioFeatures(wrapper);
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getAudioFeatures(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Tracks Audio Analysis
     * Returns audio analysis data for all tracks. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of Track Audio Analysis Data.
     */
    getAudioAnalysis: async function(wrapper) {
        try {
            await this.retrieveAudioAnalysis(wrapper);
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getAudioAnalysis(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Data
     * Returns all data. Retrieves from Spotify API if nessisary.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Array} Array of All Track's Data
     */
    getAllData: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            await this.retrieveAudioFeatures(wrapper);
            await this.retrieveAudioAnalysis(wrapper);
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getAllData(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Tracks Current Data
     * Just returns whatever the track objects currently hold.
     * @returns {Array} Array of Current Track Data
     */
    getCurrentData: async function() {
        try {
            let tracks = await this.order.map((track) => {
                return this.items[track]; 
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Track's Artists
     * Returns Artists instance with all track's artists.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Artists} Artists object of all track's artists.
     */
    getArtists: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let artists = new Artists();
            for (let track in this.items) {
                await artists.concat(await this.items[track].getArtists(wrapper));
            }
            return artists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Track's Albums
     * Returns Albums instance with all track's albums.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Albums} Albums object of all track's albums.
     */
    getAlbums: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let albums = new Albums();
            for (let track in this.items) {
                await albums.add(await this.items[track].getAlbum(wrapper));
            }
            return albums;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Audio Feature Averages
     * Returns averages for each audio feature.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @returns {Object} With audio feature properties.
     */
    getAudioFeatureAverages: async function(wrapper) {
        try {
            await this.retrieveAudioFeatures(wrapper);
            let addAudioFeatures = async (total, curr) => {
                let data = await curr.getAudioFeatures(wrapper);
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
                }
            };
            let averages = await Object.values(this.items).reduce(addAudioFeatures, {
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
            let size = Object.keys(this.items).length;
            for (let property in averages) {
                averages[property] /= size;
            }
            return averages;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Audio Feature Distributions
     * Returns distributions for each audio feature.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {number} size Size of distributions
     * @returns {Object} With audio feature properties.
     */
    getAudioFeatureDistributions: async function(wrapper, size) {
        try {
            await this.retrieveAudioFeatures(wrapper);
            let properties = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "loudness", "speechiness", "valence", "tempo"];
            let distributeAudioFeatures = async (total, curr) => {
                let data = await curr.getAudioFeatures(wrapper);
                for (let i = 0; i < properties.length; i++) {
                    let divisor = (properties[i] == 'tempo') ? 1 : 250;
                    total[properties[i]][ Math.round((data[properties[i]] / divisor) * size - 1) ] += 1;
                }
                return total;
            };
            let emptyDistribution = [];
            for (let i = 0; i < size.length; i++) {
                emptyDistribution.push(0);
            }
            let distributions = await Object.values(this.items).reduce(distributeAudioFeatures, {
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
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations
     * Retrieves suggests for a random 5 of these tracks.
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {Object} options (Optional) Additional options.
     * @returns {Tracks} Tracks object with recommendations
     */
    getRecommendations: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Tracks.search: Invalid Parameter \"options\"");
            }
            let ids = Object.keys(this.items);
            let seeds = [];
            for (let i = 0; i < 5; i++) {
                if (!ids.length) {
                    break;
                }
                let random = Math.round(Math.random() * (ids.length - 1));
                seeds.push(ids.slice(random, random + 1));
            }
            let _options = options ? options : {};
            if ('seed_artists' in _options) {
                delete _options.seed_artists;
            }
            if ('seed_genres' in _options) {
                delete _options.seed_artists;
            }
            _options.seed_tracks = seeds.join(",");
            let response = await wrapper.getRecommendations(_options);
            return new Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full track data for all tracks from Spotify API
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the track contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            let ids = [];
            for (let track in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[track].containsSimplifiedObject())) {
                        ids.push(track);
                    }
                } else if (objectType == 'link') {
                    if (!(await this.items[track].containsLinkObject())) {
                        ids.push(track);
                    }
                } else {
                    if (!(await this.items[track].containsFullObject())) {
                        ids.push(track);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getTracks(ids.splice(0, 50));
                    for (let i = 0; i < response.body.tracks.length; i++) {
                        if (response.body.tracks[i] == null) continue;
                        this.items[response.body.tracks[i].id].loadFullObject(response.body.tracks[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Audio Features
     * Retrieves audio feature data for all tracks from Spotify API
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    retrieveAudioFeatures: async function(wrapper) {
        try {
            let ids = [];
            for (let track in this.items) {
                if (!(await this.items[track].containsAudioFeatures())) {
                    ids.push(track);
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getAudioFeaturesForTracks(ids.splice(0, 50));
                    for (let i = 0; i < response.body.tracks.length; i++) {
                        if (response.body.tracks[i] == null) continue;
                        this.items[response.body.tracks[i].id].loadAudioFeatures(response.body.tracks[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Audio Analysis
     * Retrieves audio analysis data for all tracks from Spotify API
     * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
     */
    retrieveAudioAnalysis: async function(wrapper) {
        try {
            for (let track in this.items) {
                if (!(await this.items[track].containsAudioAnalysis())) {
                    response = await wrapper.getAudioAnalysisForTrack(track);
                    this.items[track].loadAudioAnalysis(response.body);
                }
            }
        } catch (error) {
            throw error;
        }
    }
};

/**
 * Search for a Track
 * Returns search results for a query.
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} query String to search for.
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned from Search.
 */
Tracks.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.search: Invalid Parameter \"options\"");
        }
        let response = await wrapper.searchTracks(query, options ? options : {});
        return new Tracks(response.body.tracks.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Recommendations
 * Returns search results for a query based on seeds
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned from Search.
 */
Tracks.getRecommendations = async function(wrapper, options) {
    try {
        if (options == null || typeof(options) != 'object') {
            throw new Error("Tracks.getRecommendations: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getRecommendations(options ? options : {});
        return new Tracks(response.body.tracks);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Top Tracks
 * Returns users top played tracks.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMyTopTracks = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.getMyTopTracks: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getMyTopTracks(options ? options : {});
        return new Tracks(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get My Recently PLayed
 * Returns users recently played tracks.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMyRecentlyPlayedTracks = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.getMyRecentlyPlayedTracks: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getMyRecentlyPlayedTracks(options ? options : {});
        return new Tracks(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Saved Tracks
 * Returns saved tracks.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMySavedTracks = async function(wrapper, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.getMySavedTracks: Invalid Parameter \"options\"");
        }
        let response = await wrapper.getMySavedTracks(options ? options : {});
        return new Tracks(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All Saved Tracks
 * Returns all saved tracks.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getAllMySavedTracks = async function(wrapper) {
    try {
        let _options = { limit: 50, offset: 0 };
        let tracks = new Tracks();
        let response;
        do {
            response = await wrapper.getMySavedTracks(_options);
            await tracks.concat(response.body.items);
            _options.offset += 50;
        } while (!(response.items.length < 50));
        return tracks;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Playlist Tracks
 * Returns tracks from playlist.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} id ID for playlist
 * @returns {Tracks} Tracks from playlist.
 */
Tracks.getPlaylistTracks = async function(wrapper, id) {
    try {
        let playlist = new Tracks.Playlist(id);
        return await playlist.getTracks(wrapper);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Album's Tracks
 * Returns tracks from album.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} id ID for album
 * @returns {Tracks} Tracks from album.
 */
Tracks.getAlbumTracks = async function(wrapper, id) {
    try {
        let album = new Tracks.Album(id);
        return await album.getTracks(wrapper);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Tracks
 * Returns Tracks object of IDs
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {Array} trackIds Ids of tracks.
 * @returns {Tracks} Tracks from ids.
 */
Tracks.getTracks = async function(wrapper, trackIds) {
    try {
        let tracks = new Tracks(trackIds);
        await tracks.retrieveFullObjects(wrapper);
        return tracks;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Artist's Top Tracks
 * Returns Artist's top tracks.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API Wrapper instance for API calls.
 * @param {string} id ID for artist
 * @returns {Tracks} Tracks from Artist top tracks..
 */
Tracks.getArtistTopTracks = async function(wrapper, id) {
    try {
        let artist = new Tracks.Artist(id);
        return await artist.getTopTracks(wrapper);
    } catch (error) {
        throw error;
    }
};

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Tracks.addMethods = function(methods) {
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
Tracks.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Tracks.override: \"name\" does not exist.");
    }
}

module.exports = Tracks;