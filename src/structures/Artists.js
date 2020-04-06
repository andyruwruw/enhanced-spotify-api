'use strict';

var { addMethods, override } = require('./shared');

var Tracks = require('./Tracks');
var Artist = require('./Artist');
var Albums = require('./Albums');

function Artists(data) {
    try {
        this.items = {};
        this.order = [];
        if (data) {
            if (data instanceof Array)  {
                for (let i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            } else if (data instanceof Artist || typeof(data) == 'string' || typeof(data) == 'object') {
                this.push(data);
            } else {
                throw new Error("Artists.constructor: Invalid Parameter \"data\"");
            }
        }
    } catch (error) {
        throw error;
    }
}

Artists.prototype = {
    /**
     * Push
     * Adds new item to Manager Object.
     * 
     * @param {Artist | object | string } artist Artist Instance, artist object or artist id to add. 
     */
    push: function(artist) {
        try {
            if (artist instanceof Artist) {
                if (!(artist.id in this.items)) {
                    this.items[artist.id] = artist;
                }
                this.order.push(artist.id);
            } else if (typeof(artist) == 'object') {
                if ('artist' in artist) {
                    if (!(artist.artist.id in this.items)) {
                        this.items[artist.artist.id] = new Artist(artist.artist);
                        if ('is_local' in artist) {
                            this.items[artist.artist.id].is_local = artist.is_local;
                        }
                        if ('added_at' in artist) {
                            this.items[artist.artist.id].added_at = artist.added_at;
                        }
                        if ('added_by' in artist) {
                            this.items[artist.artist.id].added_by = artist.added_by;
                        }
                    }
                    this.order.push(artist.artist.id);
                } else {
                    if (!(artist.id in this.items)) {
                        this.items[artist.id] = new Artist(artist);
                    }
                    this.order.push(artist.id);
                }

            } else if (typeof(artist) == 'string') {
                if (!(artist in this.items)) {
                    this.items[artist] = new Artist(artist);
                }
                this.order.push(artist);
            } else {
                throw new Error("Artists.push: Invalid Parameter \"artist\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Concat
     * Adds new items to Manager Object.
     * 
     * @param {Artists | array } artists Another Artists instance or array of Artist instances, artist objects, or artist ids to concat.
     */
    concat: function(artists) {
        try {
            if (artists instanceof Artists) {
                for (let artist in artists.items) {
                    if (!(artist in this.items)) {
                        this.items[artist] = artists.items[artist];
                    }
                    this.order.push(artists.items[artist].id);
                }
            } else if (artists instanceof Array) {
                for (let i = 0; i < artists.length; i++) {
                    this.push(artists[i]);
                }
            } else {
                throw new Error("Artists.concat: Invalid Parameter \"artists\"");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Remove
     * Removes an item from the Manager Object.
     * 
     * @param {Artist | object | string } artist Artist instance, artist data, or artist id to remove.
     */
    remove: function(artist) {
        try {
            let id = null;
            if (artist instanceof Artist || typeof(artist) == 'object') {
                id = artist.id;
            } else if (typeof(artist) == 'string') {
                id = artist;
            } else {
                throw new Error("Artists.remove: Invalid Parameter \"artist\"");
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
    size: function() {
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
     * @param {string | object | Artist} artist Artist ID, Artist instance or object with `id` properity.
     * @param {number} startAt Where to start in the list.
     * @returns {number} Index of item.
     */
    indexOf: function(artist, startAt) {
        try {
            let id = null;
            if (typeof(artist) == 'string') {
                id = artist;
            } else if (artist instanceof Artist || typeof(artist) == 'object') {
                id = artist.id;  
            } 
            if (artist == null) {
                throw new Error("Artists.findIndex: Invalid Parameter \"artist\"");
            }
            if (startAt > this.order.length - 1 || startAt < 0) {
                throw new Error("Artists.findIndex: Invalid Parameter \"startAt\"");
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
     * @param {string | object | Artist} artist Artist ID, Artist instance or object with `id` properity.
     * @returns {boolean} Whether item is contained.
     */
    includes: function(artist) {
        try {
            let id = null;
            if (typeof(artist) == 'string') {
                id = artist;
            } else if (artist instanceof Artist || typeof(artist) == 'object') {
                id = artist.id;  
            } 
            if (artist == null) {
                throw new Error("Artists.includes: Invalid Parameter \"artist\"");
            }
            for (let artist in this.items) {
                if (artist == id) {
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
     * Returns Artist object with filtered items.
     * 
     * @param {function} method Method to filter by.
     * @returns {Artists} Filtered Artists object.
     */
    filter: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Artists.filter: \"method\" is not a function"); 
            }
            let newArtists = new Artists();
            for (let i = 0; i < this.order; i++) {
                if (await method(this.items[this.order[i]])) {
                    await newArtists.push(this.items[this.order[i]]);
                }
            }
            return newArtists;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get by Index
     * Returns artist object at a given index
     * 
     * @param {number} index Index of the item desired.
     * @returns {Artist} Artist at a given index
     */
    get: function(index) {
        try {
            if (index > this.order.length - 1 || index < 0) {
                throw new Error("Artists.get: Index out of range");
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
    getIDs: function() {
        return this.order;
    },

    /**
     * Get IDs
     * Returns array of IDs in order with no repeats.
     * 
     * @returns {Array} Array of IDs
     */
    getIDsNoRepeats: function() {
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
    getURIs: async function() {
        try {
            return await this.order.map((id) => 'spotify:artist' + id);
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
    getURIsNoRepeats: async function() {
        try {
            let uris = [];
            for (let i = 0; i < this.order.length; i++) {
                if (!(uris.includes(this.order[i]))) {
                    uris.push(this.order[i]);
                }
            }
            return await uris.map((id) => 'spotify:artist' + id);
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
    forEach: async function(method) {
        try {
            if (typeof(method) != 'function') {
                throw new Error("Artists.forEach: \"method\" is not a function"); 
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
    reverse: function() {
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
     * @returns {Artist} Removed item
     */
    pop: function() {
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
     * @returns {Artist} Removed item
     */
    shift: function() {
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
     * @returns {Artists} Removed Artists.
     */
    slice: async function(start, end) {
        try {
            let stop = (end != null) ? end : this.order.length;
            let ids = this.order.splice(start, stop);
            let items = new Artists(await ids.map((id) => this.items[id]));
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
     * Sort Artists
     * 
     * @param {function} compareFunction Sorting method.
     */
    sort: async function(compareFunction) {
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
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} order -1 or 1
     * @param {string} property Property to sort by.
     */
    sortSafe: async function(wrapper, order, property) {
        try {
            let fullObject = ['id', 'name', 'external_urls', 'followers', 'genres', 'href', 'images', 'popularity', 'uri'];
            let propertyPrior = property.split('.')[0];
            if (fullObject.includes(propertyPrior)) {
                await this.retrieveFullObjects(wrapper);
            } else {
                for (let artist in this.items) {
                    if (!(property in this.items[artist])) {
                        throw new Error("Artists.sortSafe: Invalid Parameter \"property\", you have artists that don't contain that property.");
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
            return new Artists(ordered);
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
            if (id in this.items) {
                this.items[id][field] = value;
            } else {
                throw new Error("Artists.setProperty: ID does not exist.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play Artists
     * Plays artist on user's active device.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    play: async function(wrapper, options) {
        try {
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            let tracks = new Tracks();
            for (let i = 0; i < artists.length; i++) {
                await tracks.push(await (await artists[i].getTopTracks(wrapper)).get(0));
            }   
            return await tracks.play(wrapper);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Are Followed
     * Returns whether artists are followed by the user.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of booleans of whether artist is followed by user.
     */
    areFollowed: async function(wrapper) {
        try {
            let response = await wrapper.isFollowingArtists(this.order);
            return response.body;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Artist
     * Follows artist.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    follow: async function(wrapper) {
        try {
            return await wrapper.followArtists(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Artist
     * Unfollows artist.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     */
    unfollow: async function(wrapper) {
        try {
            return await wrapper.unfollowArtists(Object.keys(this.items));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Full Objects
     * Returns full artist data for all artists. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Array} Array of Artist Full Objects.
     */
    getFullObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'full');
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            return await Promise.all(await artists.map(async (artist) => {
                return await artist.getFullObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Objects
     * Returns simplified artist data for all artists. Retrieves from Spotify API if nessisary.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {array} Array of Artist Simplified Objects.
     */
    getSimplifiedObjects: async function(wrapper) {
        try {
            await this.retrieveFullObjects(wrapper, 'simplified');
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            return await Promise.all(await artists.map(async (artist) => {
                return await artist.getSimplifiedObject(wrapper);
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artists Current Data
     * Just returns whatever the artist objects currently hold.
     * 
     * @returns {array} Array of Current Artist Data
     */
    getCurrentData: async function() {
        try {
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            return await Promise.all(await artists.map(async (artist) => {
                return await artist.getCurrentData();
            }));
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Top Tracks
     * Returns Tracks instance with all artist's top tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} countryCode (Optional) country code.
     * @returns {Tracks}  Tracks object of artist's tracks top tracks.
     */
    getTopTracks: async function(wrapper, countryCode) {
        try {
            let tracks = new Tracks();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await tracks.concat(await artists[i].getTopTracks(wrapper, countryCode));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Tracks
     * Returns Tracks instance with all artist's tracks.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks}  Tracks object of all artist's tracks.
     */
    getAllTracks: async function(wrapper) {
        try {
            let tracks = new Tracks();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await tracks.concat(await artists[i].getAllTracks(wrapper));
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artists's Albums
     * Returns Albums instance with artists's albums.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Options to be passed into each request.
     * @returns {Albums}  Albums object of artist's albums.
     */
    getAlbums: async function(wrapper, options) {
        try {
            let albums = new Albums();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await albums.concat(await artists[i].getAlbums(wrapper, options));
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artists's Albums
     * Returns Albums instance with all artists's albums.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums}  Albums object of all artist's albums.
     */
    getAllAlbums: async function(wrapper) {
        try {
            let albums = new Albums();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await albums.concat(await artists[i].getAllAlbums(wrapper));
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Related Artists
     * Returns Artists instance with Artist's Related Artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists instance of related Artists
     */
    getRelatedArtists: async function(wrapper) {
        try {
            let related = new Artists();
            let artists = await this.order.map((artist) => {
                return this.items[artist]; 
            });
            for (let i = 0; i < artists.length; i++) {
                await related.concat(await artists[i].getRelatedArtists(wrapper));
            }
            return related;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Recommendations
     * Retrieves suggests for a random 5 of these artists.
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     * @returns {Tracks} Tracks object with recommendations
     */
    getRecommendations: async function(wrapper, options) {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Artists.search: Invalid Parameter \"options\"");
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
            if ('seed_tracks' in _options) {
                delete _options.seed_tracks;
            }
            if ('seed_genres' in _options) {
                delete _options.seed_artists;
            }
            _options.seed_artists = seeds.join(",");
            let response = await wrapper.getRecommendations(_options);
            return new Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /** 
     * Retrieve Full Objects
     * Retrieves full artist data for all artists from Spotify API
     * 
     * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} objectType Optional | 'simplified', 'link' or 'full', what to check if the artist contains.
     */
    retrieveFullObjects: async function(wrapper, objectType) {
        try {
            let ids = [];
            for (let artist in this.items) {
                if (objectType == 'simplified') {
                    if (!(await this.items[artist].containsSimplifiedObject())) {
                        ids.push(artist);
                    }
                } else {
                    if (!(await this.items[artist].containsFullObject())) {
                        ids.push(artist);
                    }
                }
            }
            if (ids.length) {
                let response;
                do {
                    response = await wrapper.getArtists(ids.splice(0, 50));
                    for (let i = 0; i < response.data.artists.length; i++) {
                        if (response.data.artists[i] == null) continue;
                        this.items[response.data.artists[i].id].loadFullObject(response.data.artists[i]);
                    }
                } while (ids.length > 0);
            }
        } catch (error) {
            throw error;
        }
    },
}

/**
 * Search for an Artist
 * Returns search results for a query.
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.
 * @param {object} options (Optional) Additional options.
 * @returns {Artists} Artists returned from Search.
 */
Artists.search = async function(wrapper, query, options) {
    try {
        if (options != null && typeof(options) != 'object') {
            throw new Error("Tracks.search: Invalid Parameter \"options\"");
        }
        let response = await wrapper.searchArtists(query, options ? options : {});
        return new Artists(response.body.artists.items);
    } catch (error) {
        throw error;
    }
};

/**
 * Get Artists
 * Returns Artists object of IDs
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} artistIds Ids of artists.
 * @returns {Artists} Artists from ids.
 */
Artists.getArtists = async function(wrapper, artistIds) {
    try {
        let artists = new Artists(artistIds);
        await artists.retrieveFullObjects(wrapper);
        return artists;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Related Artists
 * Returns Artists object artists related to a given id
 * 
 * @param {Wrapper} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} artistId Id of artists to find related to.
 * @returns {Artists} Artists related to artistID
 */
Artists.getRelatedArtists = async function(wrapper, artistId) {
    try {
        let artists = new Artists(artistId);
        return await artists.getRelatedArtists(wrapper);
    } catch (error) {
        throw error;
    }
};

Artists.addMethods = addMethods;

Artists.override = override;

module.exports = Artists;