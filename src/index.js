'use strict'

function Wrapper() {};

Wrapper.prototype = {
    // Inherits from spotify-web-api-node
    ...require('spotify-web-api-node').prototype,
}

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
};
