

function Playlists(playlists) {
    try {

    } catch (error) {
        throw error;
    }
}

Playlists.Playlist = require('./Playlist');

Playlists.prototype = {


};

/**
 * Search for a Playlist
 * Returns search results for a query.
 * 
 * @param {enhanced-spotify-api} wrapper Enhanced Spotify API instance for API calls.
 * @param {string} query String to search for.

 * @returns {Tracks} Tracks returned from Search.
 */
Playlists.search = async function(wrapper, query, limit, offset) {
    try {
        let options = { 
            limit: limit ? limit : 20,
            offset: offset ? offset : 0,
        };
        let response = await wrapper.searchPlaylists(query, options);
        return new Playlists(response.body.artists.items);
    } catch (error) {
        throw error;
    }
};

module.exports = Playlists;

