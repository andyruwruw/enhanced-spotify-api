let SpotifyWebAPI = require('spotify-web-api-node');
const authToken = require('./authentication.json').authToken;
let { Wrapper } = require('../src/index');

const generateWrapper = () => {
    try {
        let wrapper = new Wrapper();
        wrapper.setAccessToken(authToken);
        return wrapper;
    } catch (error) {
        throw error;
    }
};

const generateSpotifyWebAPI = () => {
    try {
        let spotifyWebAPI = new SpotifyWebAPI();
        spotifyWebAPI.setAccessToken(authToken);
        return spotifyWebAPI;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    generateSpotifyWebAPI: generateSpotifyWebAPI,
    generateWrapper: generateWrapper,
    authToken: authToken,
}