'use strict'

var SpotifyWebAPINode = require('spotify-web-api-node');

function EnhancedSpotifyAPI() {};

EnhancedSpotifyAPI.prototype = SpotifyWebAPINode.prototype;

EnhancedSpotifyAPI.prototype.Track = require('./structures/Track');

EnhancedSpotifyAPI.prototype.Tracks = require('./structures/Tracks');

EnhancedSpotifyAPI.prototype.Artist = require('./structures/Artist');

EnhancedSpotifyAPI.prototype.Artists = require('./structures/Artists');

EnhancedSpotifyAPI.prototype.Album = require('./structures/Album');

EnhancedSpotifyAPI.prototype.Albums = require('./structures/Albums');

EnhancedSpotifyAPI.prototype.Playlist = require('./structures/Playlist');

module.exports = EnhancedSpotifyAPI;