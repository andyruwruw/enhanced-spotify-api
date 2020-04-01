'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Artist Constructor
 * Creates a new Artist Instance for a given artist.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the artist ID or contain an `id` property.
 */
function Artist(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Artist.constructor: No ID Provided");
            }
            this.name = 'name' in data ? data.name : null;
            this.external_urls = 'external_urls' in data ? data.external_urls : null;
            this.followers = 'followers' in data ? data.followers : null;
            this.genres = 'genres' in data ? data.genres : null;
            this.href = 'href' in data ? data.href : null;
            this.images = 'images' in data ? data.images : null;
            this.popularity = 'popularity' in data ? data.popularity : null;
            this.uri = 'uri' in data ? data.uri : null;
        } else {
            throw new Error("Artist.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Artist.Tracks = require('./Tracks');
Artist.Artists = require('./Artists');
Artist.Albums = require('./Albums');

Artist.prototype = {
    /**
     * Play Artist
     * Plays artist on user's active device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {object} options (Optional) Additional options.
     */
    play: async (wrapper, options) => {
        try {
            let _options = options ? options : {};
            _options.context_uri = 'spotify:artist:' + this.id;
            return await wrapper.play(_options);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Is Followed
     * Returns whether an artist is followed by the user.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {boolean} Whether artist is followed by user.
     */
    isFollowed: async (wrapper) => {
        try {
            let response = await wrapper.isFollowingArtists([this.id]);
            return response.body[0];
        } catch (error) {
            throw error;
        }
    },

    /**
     * Follow Artist
     * Follows artist.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    follow: async (wrapper) => {
        try {
            return await wrapper.followArtists([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Unfollow Artist
     * Unfollows artist.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    unfollow: async (wrapper) => {
        try {
            return await wrapper.unfollowArtists([this.id]);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * 
     * @returns {boolean} Whether full object is loaded.
     */
    containsFullObject: () => {
        return ((this.name != null) && (this.external_urls) && (this.followers) && (this.genres != null) && (this.href != null) && (this.images != null) && (this.popularity != null) && (this.uri != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: () => {
        return ((this.name != null) && (this.external_urls) && (this.href != null) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full artist data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Artist Full Object Data.
     */
    getFullObject: async (wrapper) => {
        try {
            if (!(await this.containsFullObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                external_urls: this.external_urls,
                followers: this.followers,
                genres: this.genres,
                href: this.href,
                images: this.images,
                popularity: this.popularity,
                uri: this.uri,
                type: 'artist',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Simplified Object
     * Returns simplified artist data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Artist Simplified Object Data.
     */
    getSimplifiedObject: async (wrapper) => {
        try {
            if (!(await this.containsSimplifiedObject())) {
                await this.retrieveFullObject(wrapper);
            }
            return {
                id: this.id,
                name: this.name,
                external_urls: this.external_urls,
                href: this.href,
                uri: this.uri,
                type: 'artist',
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Current Data
     * Just returns whatever the artist object currently holds
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Any Artist Data.
     */
    getCurrentData: () => {
        try {
            let data = { id: this.id, type: 'artist' };
            let properties = ['name', 'external_urls', 'followers', 'genres', 'href', 'images', 'popularity', 'uri'];
            for (let i = 0; i < properties.length; i++) {
                if (this[properties[i]] != null) {
                    data[properties[i]] = this[properties[i]];
                }
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artist's Top Tracks
     * Returns Tracks instance with Artist's top Tracks.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {string} countryCode (Optional) country code.
     * @returns {Tracks} Tracks instance of artist's top Tracks
     */
    getTopTracks: async (wrapper, countryCode) => {
        try {
            let response =  await wrapper.getArtistTopTracks(this.id, countryCode ? countryCode : "US");
            return new Artist.Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Tracks
     * Returns Tracks instance with All Artist's Tracks.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Tracks} Tracks instance with All Artist's Tracks
     */
    getAllTracks: async (wrapper) => {
        try {
            let tracks = new Artist.Tracks();
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await wrapper.getArtistAlbums(this.id, options);
                let albums = new Artist.Albums(response.body.items);
                await tracks.concat(await albums.getAllTracks(wrapper));
                options.offset += 50;
            } while (!(response.body.items.length < 50));
            return tracks;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Artist's Albums
     * Returns Albums instance with Artist's Albums.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums} Albums instance with Artist's Albums
     */
    getAlbums: async (wrapper, options) => {
        try {
            if (options != null && typeof(options) != 'object') {
                throw new Error("Artist.getAlbums: Invalid Parameter \"options\"");
            }
            let response = await wrapper.getArtistAlbums(this.id, options ? options : {});
            return new Artist.Albums(response.body.items);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get All Artist's Albums
     * Returns Albums instance with All Artist's Albums.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Albums} Albums instance with All Artist's Albums
     */
    getAllAlbums: async (wrapper) => {
        try {
            let albums = new Artist.Albums();
            let options = { limit: 50, offset: 0 };
            let response;
            do {
                response = await wrapper.getArtistAlbums(this.id, options);
                await albums.concat(response.body.items);
                options.offset += 50;
            } while (!(response.body.items.length < 50));
            return albums;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get Related Artists
     * Returns Artists instance with Artist's Related Artists.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {Artists} Artists instance of related Artists
     */
    getRelatedArtists: async (wrapper) => {
        try {
            let response = await wrapper.getArtistRelatedArtists(this.id);
            return new Artist.Artists(response.body.artists);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Full Object
     * Sets full data (outside constructor).
     * 
     * @param {object} data Object with artist full object data.
     */
    loadFullObject: (data) => {
        try {
            this.name = data.name;
            this.external_urls = data.external_urls;
            this.followers = data.followers;
            this.genres = data.genres;
            this.href = data.href;
            this.images = data.images;
            this.popularity = data.popularity;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Load Simplified Object
     * Sets simplified data (outside constructor).
     * 
     * @param {object} data Object with artist simplified object data.
     */
    loadSimplifiedObject: (data) => {
        try {
            this.name = data.name;
            this.external_urls = data.external_urls;
            this.href = data.href;
            this.uri = data.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieve Full Object
     * Retrieves full artist data from Spotify API
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async (wrapper) => {
        try {
            let response = await wrapper.getArtist(this.id);
            await this.loadFullObject(response.body);
        } catch (error) {
            throw error;
        }
    },
};

/**
 * Get Artist
 * Returns Artist object of ID
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {Array} artistID Id of artist.
 * @returns {Artist} Artist from id.
 */
Artist.getArtist = async (wrapper, artistID) => {
    try {
        let artist = new Artist(artistID);
        await artist.retrieveFullObject(wrapper);
        return artist;
    } catch (error) {
        throw error;
    }
};

Artist.addMethods = addMethods;

Artist.override = override;

module.exports = Artist;