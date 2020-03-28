'use strict';

var Tracks = require('./Tracks');
var Artists = require('./Artists');
var Albums = require('./Albums');
var { addMethods, override } = require('./shared');

function Artist(data) {
    if (typeof(data) == 'string') this.id = data;
    else if (typeof(data) == 'object') {
        if ('id' in data) this.id = data.id; 
        else throw new Error("Artist: No ID Provided");
        this.name = 'name' in data ? data.name : null;
        this.external_urls = 'external_urls' in data ? data.external_urls : null;
        this.followers = 'followers' in data ? data.followers : null;
        this.genres = 'genres' in data ? data.genres : null;
        this.href = 'href' in data ? data.href : null;
        this.images = 'images' in data ? data.images : null;
        this.popularity = 'popularity' in data ? data.popularity : null;
        this.uri = 'uri' in data ? data.uri : null;
    }
    else throw new Error("Artist: Invalid Data");
}

Artist.prototype = {
    /**
     * Contains Full Object
     * Returns boolean whether full object data is present.
     * 
     * @returns {boolean} Whether full object is loaded.
     */
    containsFullObject: function() {
        return ((this.name != null) && (this.external_urls) && (this.followers) && (this.genres != null) && (this.href != null) && (this.images != null) && (this.popularity != null) && (this.uri != null));
    },

    /**
     * Contains Simplified Object
     * Returns boolean whether simplified object data is present.
     * 
     * @returns {boolean} Whether simplified object is loaded.
     */
    containsSimplifiedObject: function() {
        return ((this.name != null) && (this.external_urls) && (this.href != null) && (this.uri != null));
    },

    /**
     * Get Full Object
     * Returns full artist data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @returns {object} Artist Full Object Data.
     */
    getFullObject: async function(wrapper) {
        try {
            if (!(await this.containsFullObject()))
                await this.retrieveFullObject(wrapper);
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
    getSimplifiedObject: async function(wrapper) {
        try {
            if (!(await this.containsSimplifiedObject()))
                await this.retrieveFullObject(wrapper);
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
    getCurrentData: function () {
        try {
            let data = { id: this.id, type: 'artist' };
            let properties = ["name", "external_urls", "followers", "genres", "href", "images", "popularity", "uri", 'type'];
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
     * Load Full Object
     * Sets full data (outside constructor).
     * 
     * @param {object} data Object with artist full object data.
     */
    loadFullObject: function(data) {
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
    loadSimplifiedObject: function(data) {
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
    retrieveFullObject: async function(wrapper) {
        try {
            let response = await wrapper.getArtist(this.id);
            this.name = response.body.name;
            this.external_urls = response.body.external_urls;
            this.followers = response.body.followers;
            this.genres = response.body.genres;
            this.href = response.body.href;
            this.images = response.body.images;
            this.popularity = response.body.popularity;
            this.uri = response.body.uri;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Play Artist
     * Plays artist on user's active device.
     * 
     * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
     * @param {number} position_ms Offset where to start track in milliseconds.
     */
    play: function(wrapper, position_ms) {
        try {
            wrapper.play({ context_uri: 'spotify:artist:' + this.id, position_ms: position_ms ? position_ms : 0  });
        } catch (error) {
            throw error;
        }
    },

    getTopTracks: async function(wrapper) {
        try {
            let response =  await wrapper.getArtistTopTracks(this.id, "US");
            return new Tracks(response.body.tracks);
        } catch (error) {
            throw error;
        }
    },

    getAlbums: async function(wrapper) {
        try {
            let albums = new Albums();
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

    getRelatedArtists: async function(wrapper) {
        try {
            let response = await wrapper.getArtistRelatedArtists(this.id);
            return new Artists(response.body.artists);
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
    isFollowed: async function(wrapper) {
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
    follow: async function(wrapper) {
        try {
            await wrapper.followArtists([this.id]);
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
    unfollow: async function(wrapper) {
        try {
            await wrapper.unfollowArtists([this.id]);
        } catch (error) {
            throw error;
        }
    },
};

Artist.addMethods = addMethods;

Artist.override = override;

module.exports = Artist;