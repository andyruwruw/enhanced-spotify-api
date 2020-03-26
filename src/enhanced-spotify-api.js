'use strict'

let SpotifyWebAPINode = require('spotify-web-api-node');

let Track = require('./structures/Track');
let Tracks = require('./structures/Tracks');
let Artist = require('./structures/Artist');
let Artists = require('./structures/Artists');
let Album = require('./structures/Album');
let Albums = require('./structures/Albums');
let Playlist = require('./structures/Playlist');
let Profile = require('./structures/Profile');

class EnhancedSpotifyAPI extends SpotifyWebAPINode {
    constructor() {
        super();
        this.Track = Track;
        this.Tracks = Tracks;
        this.Artist = Artist;
        this.Artists = Artists;
        this.Album = Album;
        this.Albums = Albums;
        this.Playlist = Playlist;
        this.Profile = Profile;
    }
}

module.exports = EnhancedSpotifyAPI;