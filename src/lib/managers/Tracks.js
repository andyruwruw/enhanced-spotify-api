'use strict';

// Associated Models
var Models = require('../../index');

 /**
 * Constructor
 * Creates a new Tracks Container Instance.
 * @param {Array | Track | Object | String} data (optional) Data to be preloaded. Single or multiple tracks.
 */
function Tracks(items) {
    try {
        this.name = 'Tracks';
        this.type = 'Track';
        this.uri_type = 'track';
        Models.Container.call(this, items);
    } catch (error) {
        throw error;
    }
}

Tracks.prototype = {
    ...Models.Container.prototype,

    /**
     * Plays Tracks
     * Plays tracks on user's active deviceI
     * @param {Object} options (Optional) Additional options.
     * @returns {Object} Response from request.
     * options.offset.position: {Number} (Optional) Index of track to begin with.
     * options.offset.uri: {String} (Optional) Track URI to begin with.
     * options.position_ms: {Number} Position to start playback (Milliseconds)
     */
    play: async function(options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Tracks.search: Invalid Parameter \"options\"");
            }
            let _options = options ? options : {};
            _options.uris = [];
            let offset = 0;
            if (offset.hasOwnProperty('offset')) {
                if (offset.hasOwnProperty('position')) {
                    offset = options.offset.position;
                } else if (offset.hasOwnProperty('uri') && typeof(offset.uri) == 'string') {
                    let index = this.order.indexOf(options.offset.uri);
                    if (index != -1) {
                        offset = this.order.indexOf(options.offset.uri);
                    }
                }
            }
            for (let i = 0; i < this.order.length && i < 25; i++) {
                _options.uris.push('spotify:track:' + this.order[(i + offset) % this.order.length]);
            }
            return await Models.wrapperInstance.play(_options);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    /**
     * Are Liked
     * Returns array of booleans whether tracks are saved to the user's libraryI
     * @returns {Array} Array of Booleans Whether track are saved to the user's library.
     */
    areLiked: async function() {
        try {
            let response = await Models.wrapperInstance.containsMySavedTracks(this.order);
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
    * Like Track
    * Adds tracks to the user's library.

    * @returns {Object} Response from request.
    */
    likeAll: async function() {
        try {
            return await Models.wrapperInstance.addToMySavedTracks(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Track
    * Removes tracks from the user's library.

    * @returns {Object} Response from request.
    */
    unlikeAll: async function() {
        try {
            return await Models.wrapperInstance.removeFromMySavedTracks(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full track data for all tracks. Retrieves from Spotify API if nessisaryI
     * @returns {Array} Array of Track Full Objects.
     */
    getFullObjects: async function() {
        try {
            await this.retrieveFullObjects('full');
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getFullObject());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified track data for all tracks. Retrieves from Spotify API if nessisaryI
     * @returns {Array} Array of Track Simplified Objects.
     */
    getSimplifiedObjects: async function() {
        try {
            await this.retrieveFullObjects('simplified');
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getSimplifiedObject());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Track Link Objects
     * Returns track link data for all tracks. Retrieves from Spotify API if nessisaryI
     * @returns {Array} Array of Track Link Objects.
     */
    getLinkObjects: async function() {
        try {
            await this.retrieveFullObjects('link');
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getLinkObject());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Tracks Audio Features
     * Returns audio feature data for all tracks. Retrieves from Spotify API if nessisaryI
     * @returns {Array} Array of Track Audio Features.
     */
    getAudioFeatures: async function() {
        try {
            await this.retrieveAudioFeatures();
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getAudioFeatures());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Tracks Audio Analyses
     * Returns audio analysis data for all tracks. Retrieves from Spotify API if nessisaryI
     * @returns {Array} Array of Track Audio Analysis Data.
     */
    getAudioAnalyses: async function() {
        try {
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getAudioAnalysis());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Data
     * Returns all data. Retrieves from Spotify API if nessisaryI
     * @returns {Array} Array of All Track's Data
     */
    getAllData: async function() {
        try {
            await this.retrieveFullObjects('full');
            await this.retrieveAudioFeatures();
            await this.retrieveAudioAnalyses();
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getAllData());
            }
            return result;
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
            let result = [];
            for (let i = 0; i < this.order.length; i++) {
                await result.push(await this.items[this.order[i]].getCurrentData());
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Track's Artists
     * Returns Artists instance with all track's artistsI
     * @returns {Artists} Artists object of all track's artists.
     */
    getArtists: async function() {
        try {
            await this.retrieveFullObjects('simplified');
            let artists = new Models.Artists();
            for (let track in this.items) {
                await artists.concat(await this.items[track].getArtists());
            }
            return artists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Track's Albums
     * Returns Albums instance with all track's albumsI
     * @returns {Albums} Albums object of all track's albums.
     */
    getAlbums: async function() {
        try {
            await this.retrieveFullObjects('simplified');
            let albums = new Models.Albums();
            for (let track in this.items) {
                await albums.push(await this.items[track].getAlbum());
            }
            return albums;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Audio Feature Averages
     * Returns averages for each audio featureI
     * @returns {Object} With audio feature properties.
     */
    getAudioFeatureAverages: async function() {
        try {
            await this.retrieveAudioFeatures();
            let addAudioFeatures = async (total, curr) => {
                let data = await curr.getAudioFeatures();
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
     * Returns distributions for each audio featureI
     * @param {number} size Size of distributions
     * @returns {Object} With audio feature properties.
     */
    getAudioFeatureDistributions: async function(size) {
        try {
            await this.retrieveAudioFeatures();
            let properties = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "loudness", "speechiness", "valence", "tempo"];
            let distributeAudioFeatures = async (total, curr) => {
                let data = await curr.getAudioFeatures();
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
     * Retrieves suggests for a random 5 of these tracksI
     * @param {Object} options (Optional) Additional options.
     * @returns {Tracks} Tracks object with recommendations
     */
    getRecommendations: async function(options) {
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
            let response = await Models.wrapperInstance.getRecommendations(_options);
            return new Models.Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full track data for all tracks from Spotify API
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the track contains.
     */
    retrieveFullObjects: async function(objectType) {
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
                    response = await Models.wrapperInstance.getTracks(ids.splice(0, 50));
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
     */
    retrieveAudioFeatures: async function() {
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
                    response = await Models.wrapperInstance.getAudioFeaturesForTracks(ids.splice(0, 100));
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
     */
    retrieveAudioAnalyses: async function() {
        try {
            for (let track in this.items) {
                if (!(await this.items[track].containsAudioAnalysis())) {
                    response = await Models.wrapperInstance.getAudioAnalysisForTrack(track);
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
 * @param {string} query String to search for.
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned from Search.
 */
Tracks.search = async function(query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.search: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.searchTracks(query, options ? options : {});
        return new Models.Tracks(response.body.tracks.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Recommendations
 * Returns search results for a query based on seeds
 * 
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned from Search.
 */
Tracks.getRecommendations = async function(options) {
    try {
        if (options == null || typeof(options) != 'object') {
            throw new Error("Tracks.getRecommendations: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.getRecommendations(options ? options : {});
        return new Models.Tracks(response.body.tracks);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Top Tracks
 * Returns users top played tracks.
 * 
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMyTopTracks = async function(options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.getMyTopTracks: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.getMyTopTracks(options ? options : {});
        return new Models.Tracks(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get My Recently PLayed
 * Returns users recently played tracks.
 * 
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMyRecentlyPlayedTracks = async function(options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.getMyRecentlyPlayedTracks: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.getMyRecentlyPlayedTracks(options ? options : {});
        return new Models.Tracks(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Saved Tracks
 * Returns saved tracks.
 * 
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMySavedTracks = async function(options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.getMySavedTracks: Invalid Parameter \"options\"");
        }
        let response = await Models.wrapperInstance.getMySavedTracks(options ? options : {});
        return new Models.Tracks(response.body.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get All Saved Tracks
 * Returns all saved tracks.
 * 
 * @param {Object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getAllMySavedTracks = async function() {
    try {
        let _options = { limit: 50, offset: 0 };
        let tracks = new Models.Tracks();
        let response;
        do {
            response = await Models.wrapperInstance.getMySavedTracks(_options);
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
 * @param {string} id ID for playlist
 * @returns {Tracks} Tracks from playlist.
 */
Tracks.getPlaylistTracks = async function(id) {
    try {
        let playlist = new Models.Playlist(id);
        return await playlist.getTracks();
    } catch (error) {
        throw error;
    }
};

/**
 * Get Album's Tracks
 * Returns tracks from album.
 * 
 * @param {string} id ID for album
 * @returns {Tracks} Tracks from album.
 */
Tracks.getAlbumTracks = async function(id) {
    try {
        let album = new Models.Album(id);
        return await album.getTracks();
    } catch (error) {
        throw error;
    }
};

/**
 * Get Tracks
 * Returns Tracks object of IDs
 * 
 * @param {Array} trackIds Ids of tracks.
 * @returns {Tracks} Tracks from ids.
 */
Tracks.getTracks = async function(trackIds) {
    try {
        let tracks = new Models.Tracks(trackIds);
        await tracks.retrieveFullObjects();
        return tracks;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Artist's Top Tracks
 * Returns Artist's top tracks.
 * 
 * @param {string} id ID for artist
 * @returns {Tracks} Tracks from Artist top tracks..
 */
Tracks.getArtistTopTracks = async function(id) {
    try {
        let artist = new Models.Artist(id);
        return await artist.getTopTracks();
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
};

Tracks.setCredentials = function(credentials) {
    Models.wrapperInstance.setCredentials(credentials);
};

Tracks.getCredentials = function() {
    return Models.wrapperInstance.getCredentials();
};

Tracks.resetCredentials = function() {
    Models.wrapperInstance.resetCredentials();
};

Tracks.setClientId = function(clientId) {
    Models.wrapperInstance.setClientId(clientId);
};

Tracks.setClientSecret = function(clientSecret) {
    Models.wrapperInstance.setClientSecret(clientSecret);
};

Tracks.setAccessToken = function(accessToken) {
    Models.wrapperInstance.setAccessToken(accessToken);
};

Tracks.setRefreshToken = function(refreshToken) {
    Models.wrapperInstance.setRefreshToken(refreshToken);
};

Tracks.setRedirectURI = function(redirectUri) {
    Models.wrapperInstance.setRedirectURI(redirectUri);
};

Tracks.getRedirectURI = function() {
    return Models.wrapperInstance.getRedirectURI();
};

Tracks.getClientId = function() {
    return Models.wrapperInstance.getClientId();
};

Tracks.getClientSecret = function() {
    return Models.wrapperInstance.getClientSecret();
};

Tracks.getAccessToken = function() {
    return Models.wrapperInstance.getAccessToken();
};

Tracks.getRefreshToken = function() {
    return Models.wrapperInstance.getRefreshToken();
};

Tracks.resetClientId = function() {
    return Models.wrapperInstance.resetClientId();
};

Tracks.resetClientSecret = function() {
    return Models.wrapperInstance.resetClientSecret();
};

Tracks.resetAccessToken = function() {
    return Models.wrapperInstance.resetAccessToken();
};

Tracks.resetRefreshToken = function() {
    return Models.wrapperInstance.resetRefreshToken();
};

Tracks.resetRedirectURI = function() {
    return Models.wrapperInstance.resetRedirectURI();
};

module.exports = Tracks;