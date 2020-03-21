var TrackDAO = require('./daos/TrackDAO.js');
var TracksDAO = require('./daos/TracksDAO.js');
var ArtistDAO = require('./daos/ArtistDAO.js');
var ArtistsDAO = require('./daos/ArtistsDAO.js');

var enhancedSpotifyAPI = {
    TrackDAO: TrackDAO,
    TracksDAO: TracksDAO,
    ArtistDAO: ArtistDAO,
    ArtistsDAO: ArtistsDAO,
};
module.exports = enhancedSpotifyAPI;