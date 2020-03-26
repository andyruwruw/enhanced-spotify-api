'use strict';

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
     * Get Full Object
     * Returns full artist data. Retrieves from Spotify API if nessisary.
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @returns {object} Artist Full Object Data.
     */
    getFullObject: async function(enhancedSpotifyAPI) {
        try {
            if (!(await this.containsFullObject()))
                await this.retrieveFullObject(enhancedSpotifyAPI);
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
     * Retrieve Full Object
     * Retrieves full artist data from Spotify API
     * 
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     */
    retrieveFullObject: async function(enhancedSpotifyAPI) {
        try {
            let response = await enhancedSpotifyAPI.getArtist(this.id);
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
     * @param {enhanced-spotify-api} enhancedSpotifyAPI Enhanced Spotify API instance for API calls.
     * @param {number} position_ms Offset where to start track in milliseconds.
     */
    play: function(enhancedSpotifyAPI, position_ms) {
        try {
            enhancedSpotifyAPI.play({ context_uri: 'spotify:artist:' + this.id, position_ms: position_ms ? position_ms : 0  });
        } catch (error) {
            throw error;
        }
    }
}

Artist.addMethods = function(methods) {
    for (var method in methods) {
      if (methods.hasOwnProperty(method)) {
        this.prototype[i] = methods[method];
      }
    }
};

module.exports = Artist;