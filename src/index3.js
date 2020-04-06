'use strict'

var { addMethods, override } = require('./structures/shared');

var SpotifyWebAPI = require('spotify-web-api-node');

function Wrapper() {};

Wrapper.prototype = {
    // Inherits from spotify-web-api-node
    ...SpotifyWebAPI.prototype,
    // Missing Endpoints
    ...require('./functions/Shows'),
    ...require('./functions/Episodes'),
}

Wrapper.addMethods = addMethods;

Wrapper.override = override;

module.exports = {
    Wrapper: Wrapper,
    Track: require('./structures/Track'),
    Tracks: require('./structures/Tracks'),
    Artist: require('./structures/Artist'),
    Artists: require('./structures/Artists'),
    Album: require('./structures/Album'),
    Albums: require('./structures/Albums'),
    Playlist: require('./structures/Playlist'),
    Playlists: require('./structures/Playlists'),
    Category: require('./structures/Category'),
    Categories: require('./structures/Categories'),
    Show: require('./structures/Show'),
    Shows: require('./structures/Shows'),
    Episode: require('./structures/Episode'),
    Episodes: require('./structures/Episodes'),
    Playback: require('./structures/Playback'),
    User: require('./structures/User'),
};
