'use strict';

var Track = require('./Track');
var { addMethods, override } = require('./shared');

function Tracks(tracks) {
    try {
        this.tracks = {};
        if (tracks) {
            if (tracks instanceof Array)  {
                for (let i = 0; i < tracks.length; i++) {
                    this.add(tracks[i]);
                }
            } else if (tracks instanceof Track || typeof(tracks) == 'string' || typeof(tracks) == 'object') {
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
            let index = Object.keys(this.tracks).length;
            if (track instanceof Track) {
                if (track.id in this.tracks) {
                    return;
                }
                this.tracks[track.id] = track;
                this.tracks[track.id].index = index;
            } else if (typeof(track) == 'object') {
                if (track.id in this.tracks) {
                    return;
                }
                this.tracks[track.id] = new Track(track);
                this.tracks[track.id].index = index;
            } else if (typeof(track) == 'string') {
                if (track in this.tracks) {
                    return;
                }
                this.tracks[track] = new Track(track);
                this.tracks[track].index = index;
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
        try {
            if (tracks instanceof Tracks) {
                for (let track in tracks.tracks) {
                    if (track in this.tracks) {
                        return;
                    }
                    let index = Object.keys(this.tracks).length;
                    this.tracks[track] = tracks.tracks[track];
                    this.tracks[track.id].index = index;
                }
            } else if (tracks instanceof Array) {
                for (let i = 0; i < tracks.length; i++) {
                    this.add(tracks[i]);
                }
            } else {
                throw new Error("Tracks.concat: Invalid Parameter \"tracks\"");
            }
        } catch (error) {
            throw error;
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
    },

    /**
     * Plays Tracks
     * Plays tracks on user's active device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} offset (Optional) Track to start on.
     * @param {number} position_ms (Optional) Offset where to start track in milliseconds.
     */
    play: async function(wrapper, offset, position_ms) {
        try {
            let tracks = await Object.values(this.tracks).sort((a, b) => {
                return a.index - b.index;
            });
            wrapper.play({ uris: await tracks.map((track) => 'spotify:track:' + track.id), offset: offset ? offset : 0, position_ms: position_ms ? position_ms : 0 });
        } catch (error) {
            throw error;
        }
    },

    /**
     * Set Property
     * Adds property with value to a given item
     * 
     * @param {string} id ID of item to alter.
     * @param {string} field Field to set value to.
     * @param {*} value Value to set.
     */
    setProperty: function(id, field, value) {
        try {
            if (id in this.tracks) {
                this.tracks[id][field] = value;
            } else {
                throw new Error("Tracks.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full track data for all tracks. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let tracks = await Object.values(this.tracks).sort((a, b) => {
                return a.index - b.index;
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let tracks = await Object.values(this.tracks).sort((a, b) => {
                return a.index - b.index;
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Link Objects.
     */
    getLinkObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'link');
            let tracks = await Object.values(this.tracks).sort((a, b) => {
                return a.index - b.index;
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Audio Features.
     */
    getAudioFeatures: async function(wrapper) {
        try {
            await this.retrieveAudioFeatures(wrapper);
            let tracks = await Object.values(this.tracks).sort((a, b) => {
                return a.index - b.index;
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Audio Analysis Data.
     */
    getAudioAnalysis: async function(wrapper) {
        try {
            await this.retrieveAudioAnalysis(wrapper);
            let tracks = await Object.values(this.tracks).sort((a, b) => {
                return a.index - b.index;
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of All Track's Data
     */
    getAllData: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            await this.retrieveAudioFeatures(wrapper);
            await this.retrieveAudioAnalysis(wrapper);
            let tracks = await Object.values(this.tracks).sort((a, b) => {
                return a.index - b.index;
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
     * 
     * @returns {array} Array of Current Track Data
     */
    getCurrentData: async function() {
        try {
            let tracks = await Object.values(this.tracks).sort((a, b) => {
                return a.index - b.index;
            });
            return await Promise.all(await tracks.map(async (track) => {
                return await track.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full track data for all tracks from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the track contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            let ids = [];
            for (let track in this.tracks) {
                if (objectType == 'simplified') {
                    if (!(await this.tracks[track].containsSimplifiedObject())) {
                        ids.push(track);
                    }
                } else if (objectType == 'link') {
                    if (!(await this.tracks[track].containsLinkObject())) {
                        ids.push(track);
                    }
                } else {
                    if (!(await this.tracks[track].containsFullObject())) {
                        ids.push(track);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getTracks(ids.splice(0, 50));
                    for (let i = 0; i < response.data.tracks.length; i++) {
                        if (response.data.tracks[i] == null) continue;
                        this.tracks[response.data.tracks[i].id].loadFullObject(response.data.tracks[i]);
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveAudioFeatures: async function(wrapper) {
        try {
            let ids = [];
            for (let track in this.tracks) {
                if (!(await this.tracks[track].containsAudioFeatures())) {
                    ids.push(track);
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getAudioFeaturesForTracks(ids.splice(0, 50));
                    for (let i = 0; i < response.data.tracks.length; i++) {
                        if (response.data.tracks[i] == null) continue;
                        this.tracks[response.data.tracks[i].id].loadAudioFeatures(response.data.tracks[i]);
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveAudioAnalysis: async function(wrapper) {
        try {
            for (let track in this.tracks) {
                if (!(await this.tracks[track].containsAudioAnalysis())) {
                    response = await wrapper.getAudioAnalysisForTrack(track);
                    this.tracks[track].loadAudioAnalysis(response.data);
                }
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Audio Feature Averages
     * Returns averages for each audio feature.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} With audio feature properties.
     */
    audioFeatureAverages: async function(wrapper) {
        try {
            await this.retrieveAudioFeatures(wrapper);
            let addAudioFeatures = async function(total, curr) {
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
            let averages = await Object.values(this.tracks).reduce(addAudioFeatures, {
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
            let size = Object.keys(this.tracks).length;
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {enumber} size Size of distributions
     * @returns {object} With audio feature properties.
     */
    audioFeatureDistributions: async function(wrapper, size) {
        try {
            await this.retrieveAudioFeatures(wrapper);
            let properties = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "loudness", "speechiness", "valence", "tempo"];
            let distributeAudioFeatures = async function(total, curr) {
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
            let distributions = await Object.values(this.tracks).reduce(distributeAudioFeatures, {
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
     * Are Liked
     * Returns array of booleans whether tracks are saved to the user's library.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Booleans Whether track are saved to the user's library.
     */
    areLiked: async function(wrapper) {
        try {
            let tracks = await Object.values(this.tracks).sort((a, b) => {
                return a.index - b.index;
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
    * 
    * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
    */
    likeAll: async function(wrapper) {
        try {
            await wrapper.addToMySavedTracks(Object.keys(this.tracks));
        } catch (error) {
            throw error;
        }
    },

    /**
    * Unlike Track
    * Removes tracks from the user's library.
    * 
    * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
    */
    unlikeAll: async function(wrapper) {
        try {
            await wrapper.removeFromMySavedTracks(Object.keys(this.tracks));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Tracks's Artists
     * Returns Artists instance with all tracks's artists.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists}  Artists object of all tracks artists.
     */
    getArtists: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper);
            let artists = new Artists();
            for (let track in this.tracks) {
                await artists.concat(await this.tracks[track].getArtists(wrapper));
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Track's Albums
     * Returns Albums instance with all track's albums.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums}  Albums object of all track's albums.
     */
    getAlbums: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper);
            let albums = new Albums();
            for (let track in this.tracks) {
                await albums.add(await this.tracks[track].getAlbum(wrapper));
            }
        } catch (error) {
            throw error;
        }
    },

    createPlaylist: async function(wrapper) {
        try {
            let playlist = new Playlist();
            for (let track in this.tracks) {
                await playlist.add(this.tracks[track]);
            }
            return playlist;
        } catch (error) {
            throw error;
        }
    },

    getURIs: function() {
        try {
            let uris = [];
            let tracks = await Object.values(this.tracks).sort((a, b) => {
                return a.index - b.index;
            });
            for (let i = 0; i < tracks.length; i++) {
                uris.push('spotify:track' + track[i].id);
            }
            return uris;
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Search for a Track
 * Returns search results for a query.
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {number} limit Number of tracks to return.
 * @param {number} offset Place in the list to start at.
 * @returns {Tracks} Tracks returned from Search.
 */
Tracks.search = async function(wrapper, query, limit, offset) {
    try {
        let options = { 
            limit: limit ? limit : 20,
            offset: offset ? offset : 0,
        };
        let response = await wrapper.searchTracks(query, options);
        return new Tracks(response.body.tracks.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Recommendations
 * Returns search results for a query based on seeds
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options Contains seeds to search for and optional parameters
 * @param {number} limit Number of tracks to return.
 * @param {number} offset Place in the list to start at.
 * @returns {Tracks} Tracks returned from Search.
 */
Tracks.getRecommendations = async function(wrapper, options, limit, offset) {
    try {   
        let actualOptions = { ...options, limit: limit, offset: offset };
        let response = await wrapper.getRecommendations(actualOptions);
        return new Tracks(response.body.tracks);
    } catch (error) {
        throw error;
    }
};

Tracks.addMethods = addMethods;

Tracks.override = override;

module.exports = Tracks;