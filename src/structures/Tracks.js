'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Constructor
 * Creates a new Tracks Instance.
 * 
 * @param {Array | Track | object | string} data (optional) Data to be preloaded. Single or multiple tracks.
 */
function Tracks(data) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Tracks.Track || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Tracks.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Tracks.Track = require('./Track');
Tracks.Artist = require('./Artist');
Tracks.Artists = require('./Artists');
Tracks.Album = require('./Album');
Tracks.Albums = require('./Albums');
Tracks.Playlist = require('./Playlist');

Tracks.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param {Track | object | string } track Track Instance, track object or track id to add. 
     */
    push: (track) => {
        try {
            if (track instanceof Tracks.Track) {
                if (!(track.id in this.items)) {
                    this.items[track.id] = track;
                }
                this.order.push(track.id);
            } else if (typeof(track) == 'object') {
                if ('track' in track) {
                    if (!(track.track.id in this.items)) {
                        this.items[track.track.id] = new Tracks.Track(track.track);
                        if ('is_local' in track) {
                            this.items[track.track.id].is_local = track.is_local;
                        }
                        if ('added_at' in track) {
                            this.items[track.track.id].added_at = track.added_at;
                        }
                        if ('added_by' in track) {
                            this.items[track.track.id].added_by = track.added_by;
                        }
                    }
                    this.order.push(track.track.id);
                } else {
                    if (!(track.id in this.items)) {
                        this.items[track.id] = new Tracks.Track(track);
                    }
                    this.order.push(track.id);
                }

            } else if (typeof(track) == 'string') {
                if (!(track in this.items)) {
                    this.items[track] = new Tracks.Track(track);
                }
                this.order.push(track);
            } else {
                throw new Error("Tracks.push: Invalid Parameter \"track\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param {Tracks | array } tracks Another Tracks instance or array of Track instances, track objects, or track ids to concat.
     */
    concat: (tracks) => {
        try {
            if (tracks instanceof Tracks) {
                for (let track in tracks.items) {
                    if (!(track in this.items)) {
                        this.items[track] = tracks.items[track];
                    }
                    this.order.push(tracks.items[track].id);
                }
            } else if (tracks instanceof Array) {
                for (let i = 0; i < tracks.length; i++) {
                    this.push(tracks[i]);
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
     * Removes an item from the Manager Object.
     * 
     * @param {Track | object | string } track Track instance, track data, or track id to remove.
     */
    remove: (track) => {
        try {
            let id = null;
            if (track instanceof Tracks.Track || typeof(track) == 'object') {
                id = track.id;
            } else if (typeof(track) == 'string') {
                id = track;
            } else {
                throw new Error("Tracks.remove: Invalid Parameter \"track\"");
            }
            this.order = this.order.filter((item) => {
                return item != id;
            });
            delete this.items[id];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Size
     * Returns number of items in manager.
     * 
     * @returns {number} Number of items in manager.
     */
    size: () => {
        try {
            return this.order.length;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Index Of
     * Find index of an item
     * 
     * @param {string | object | Track} track Track ID, Track instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: (track, startAt) => {
        try {
            let id = null;
            if (typeof(track) == 'string') {
                id = track;
            } else if (track instanceof Tracks.Track || typeof(track) == 'object') {
                id = track.id;  
            } 
            if (track == null) {
                throw new Error("Tracks.findIndex: Invalid Parameter \"track\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Tracks.findIndex: Invalid Parameter \"startAt\"");
            }
            for (let i = startAt; i < this.order.length; i++) {
                if (this.order[i] == id) {
                    return i;
                }
            }
            return -1;
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Includes Item
     * Returns boolean if item is contained.
     * 
     * @param {string | object | Track} track Track ID, Track instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: (track) => {
        try {
            let id = null;
            if (typeof(track) == 'string') {
                id = track;
            } else if (track instanceof Tracks.Track || typeof(track) == 'object') {
                id = track.id;  
            } 
            if (track == null) {
                throw new Error("Tracks.includes: Invalid Parameter \"track\"");
            }
            for (let track in this.items) {
                if (track == id) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter
     * Returns Track object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Tracks} Filtered Tracks object.
     */
    filter: async (method) => {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Tracks.filter: \"method\" is not a function"); 
            }
            let newTracks = new Tracks();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newTracks.push(this.items[this.order[i]]);
                }
            }
            return newTracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns track object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Track} Track at a given index
     */
    get: (index) => {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Tracks.get: Index out of range");
            }
            return this.items[this.order[index]];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get IDs
     * Returns array of IDs in order.
     * 
     * @returns {Array} Array of IDs
     */
    getIDs: () => {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: () => {
        try {
            let ids = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(ids.includes(this.order[i]))) {
                    ids.push(this.order[i]);
                }
            }
            return ids;
        } catch (error) {
            throw error;
        }
    },
    
    /**
     * Get URIs
     * Returns array of URIs in order.
     * 
     * @returns {Array} Array of URIs
     */
    getURIs: async () => {
        try {
            return await this.order.map((id) => 'spotify:track' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get URIs No Repeats
     * Returns array of URIs with no repeats.
     * 
     * @returns {Array} Array of URIs
     */
    getURIsNoRepeats: async () => {
        try {
            let uris = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(uris.includes(this.order[i]))) {
                    uris.push(this.order[i]);
                }
            }
            return await uris.map((id) => 'spotify:track' + id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * For Each
     * Runs a function on each item.
     * 
     * @param {function} method Function to be run on each item.
     */
    forEach: async (method) => {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Tracks.forEach: \"method\" is not a function"); 
            }
            for (let i = 0; i < this.order; i++) {
                await method(this.items[this.order[i]]);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reverse
     * Reverses order of items
     */
    reverse: () => {
        try {
            this.order.reverse();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Pop
     * Removes last item.
     * 
     * @returns {Track} Removed item
     */
    pop: () => {
        try {
            let id = this.order.pop();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Shift
     * Removes first item.
     * 
     * @returns {Track} Removed item
     */
    shift: () => {
        try {
            let id = this.order.shift();
            let item = this.items[id];
            if (!(this.order.includes(id))) {
                delete this.items[id];
            }
            return item;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Slice
     * Removes elements.
     * 
     * @param {number} start Start of removal
     * @param {number} end End of removal (Exclusive)
     * @returns {Tracks} Removed Tracks.
     */
    slice: async (start, end) => {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Tracks(await ids.map((id) => this.items[id]));
            for (let i = 0; i < ids.length; i++) {
                if (!(this.order.includes(ids[i]))) {
                    delete this.items[ids[i]];
                }
            }
            return items;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort
     * Sort Tracks
     * 
     * @param {function} compareFunction Sorting method.
     */
    sort: async (compareFunction) => {
        try {
            let sorted = await (await Object.values(this.items)).sort(compareFunction);
            this.order = await sorted.map((item) => item.id);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sort Safe
     * Sorts but ensures properties are present prior to sort.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async (wrapper, order, property) => {
        try {
            let fullObject = ["name", "album", "artists", "available_markets", "disc_number", "duration_ms", "explicit", "external_ids", "external_urls", "href", "is_playable", "linked_from", "restrictions", "popularity", "preview_url", "track_number", "uri", "is_local"];
            let audioFeatures = ["duration_ms","key","mod","time_signature","acousticness","danceability","energy","instrumentalness","liveness","loudness","speechiness","valence","tempo","uri","track_href","analysis_url"];
            let audioAnalysis = [ "bars", "beats", "sections", "segments", "tatums", "track"];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else if (audioFeatures.includes(propertyPrior)) {
                await this.retrieveAudioFeatures(wrapper);
            } else if (audioAnalysis.includes(propertyPrior)) {
                for (let track in this.items) {
                    await this.items[track].retrieveAudioAnalysis(wrapper);
                }
            } else {
                for (let track in this.items) {
                    if (!(property in this.items[track])) {
                        throw new Error("Tracks.sortSafe: Invalid Parameter \"property\", you have tracks that don't contain that property.");
                    }
                }
            }
            let ordered = await Object.values(this.items).sort((a, b) => {
                if (typeof(a[property]) == 'string') {
                    let aPrior = a[property].localeCompare(b[property]);
                    return order > 0 ? aPrior : (aPrior * -1) 
                }
                return order > 0 ? a[property] - b[property] : b[property]- a[property];
            });
            return new Tracks(ordered);
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
    setProperty: (id, field, value) => {
        try {
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error("Tracks.setProperty: ID does not exist.");
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
     * @param {object} options (Optional) Additional options.
     */
    play: async (wrapper, options) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Booleans Whether track are saved to the user's library.
     */
    areLiked: async (wrapper) => {
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
    * 
    * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
    */
    likeAll: async (wrapper) => {
        try {
            await wrapper.addToMySavedTracks(Object.keys(this.items));
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
    unlikeAll: async (wrapper) => {
        try {
            await wrapper.removeFromMySavedTracks(Object.keys(this.items));
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
    getFullObjects: async (wrapper) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Simplified Objects.
     */
    getSimplifiedObjects: async (wrapper) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Link Objects.
     */
    getLinkObjects: async (wrapper) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Audio Features.
     */
    getAudioFeatures: async (wrapper) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Track Audio Analysis Data.
     */
    getAudioAnalysis: async (wrapper) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of All Track's Data
     */
    getAllData: async (wrapper) => {
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
     * 
     * @returns {array} Array of Current Track Data
     */
    getCurrentData: async () => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists object of all track's artists.
     */
    getArtists: async (wrapper) => {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let artists = new Tracks.Artists();
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums} Albums object of all track's albums.
     */
    getAlbums: async (wrapper) => {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let albums = new Tracks.Albums();
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} With audio feature properties.
     */
    getAudioFeatureAverages: async (wrapper) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} size Size of distributions
     * @returns {object} With audio feature properties.
     */
    getAudioFeatureDistributions: async (wrapper, size) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     * @returns {Tracks} Tracks object with recommendations
     */
    getRecommendations: async (wrapper, options) => {
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
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the track contains.
     */
    retrieveFullObjects: async (wrapper, objectType) => {
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
                    for (let i = 0; i < response.data.tracks.length; i++) {
                        if (response.data.tracks[i] == null) continue;
                        this.items[response.data.tracks[i].id].loadFullObject(response.data.tracks[i]);
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
    retrieveAudioFeatures: async (wrapper) => {
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
                    for (let i = 0; i < response.data.tracks.length; i++) {
                        if (response.data.tracks[i] == null) continue;
                        this.items[response.data.tracks[i].id].loadAudioFeatures(response.data.tracks[i]);
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
    retrieveAudioAnalysis: async (wrapper) => {
        try {
            for (let track in this.items) {
                if (!(await this.items[track].containsAudioAnalysis())) {
                    response = await wrapper.getAudioAnalysisForTrack(track);
                    this.items[track].loadAudioAnalysis(response.data);
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
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned from Search.
 */
Tracks.search = async (wrapper, query, options) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned from Search.
 */
Tracks.getRecommendations = async (wrapper, options) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMyTopTracks = async (wrapper, options) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMyRecentlyPlayedTracks = async (wrapper, options) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getMySavedTracks = async (wrapper, options) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {object} options (Optional) Additional options.
 * @returns {Tracks} Tracks returned request.
 */
Tracks.getAllMySavedTracks = async (wrapper) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} id ID for playlist
 * @returns {Tracks} Tracks from playlist.
 */
Tracks.getPlaylistTracks = async (wrapper, id) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} id ID for album
 * @returns {Tracks} Tracks from album.
 */
Tracks.getAlbumTracks = async (wrapper, id) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} trackIds Ids of tracks.
 * @returns {Tracks} Tracks from ids.
 */
Tracks.getTracks = async (wrapper, trackIds) => {
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
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} id ID for artist
 * @returns {Tracks} Tracks from Artist top tracks..
 */
Tracks.getArtistTopTracks = async (wrapper, id) => {
    try {
        let artist = new Tracks.Artist(id);
        return await artist.getTopTracks(wrapper);
    } catch (error) {
        throw error;
    }
};

Tracks.addMethods = addMethods;

Tracks.override = override;

module.exports = Tracks;