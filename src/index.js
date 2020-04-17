'use strict'

var fs = require('fs');
var path = require('path');

var EnhancedSpotifyAPI = module.exports;

fs.readdirSync(path.join(__dirname, 'lib', 'models')).forEach(function(file) {
    file = file.replace('.js', '');
    var command = file;
    EnhancedSpotifyAPI.__defineGetter__(command, function() {
        return require('./lib/models/' + file);
    });
});

fs.readdirSync(path.join(__dirname, 'lib', 'managers')).forEach(function(file) {
    file = file.replace('.js', '');
    var command = file;
    EnhancedSpotifyAPI.__defineGetter__(command, function() {
        return require('./lib/managers/' + file);
    });
});

EnhancedSpotifyAPI.use = function(model) {
    try {
        if (typeof(model) != 'function') {
            throw new Error("enhanced-spotify-api.use: Invalid parameter \"model\".");
        }
        this.__defineGetter__(model.constructor.name, model);
    } catch (error) {
        throw error;
    }
};

EnhancedSpotifyAPI.wrapperInstance = new EnhancedSpotifyAPI.Wrapper();

EnhancedSpotifyAPI.setCredentials = function(credentials) {
    this.wrapperInstance.setCredentials(credentials);
};

EnhancedSpotifyAPI.getCredentials = function() {
    return this.wrapperInstance.getCredentials();
};

EnhancedSpotifyAPI.resetCredentials = function() {
    this.wrapperInstance.resetCredentials();
};

EnhancedSpotifyAPI.setClientId = function(clientId) {
    this.wrapperInstance.setClientId(clientId);
};

EnhancedSpotifyAPI.setClientSecret = function(clientSecret) {
    this.wrapperInstance.setClientSecret(clientSecret);
};

EnhancedSpotifyAPI.setAccessToken = function(accessToken) {
    this.wrapperInstance.setAccessToken(accessToken);
};

EnhancedSpotifyAPI.setRefreshToken = function(refreshToken) {
    this.wrapperInstance.setRefreshToken(refreshToken);
};

EnhancedSpotifyAPI.setRedirectURI = function(redirectUri) {
    this.wrapperInstance.setRedirectURI(redirectUri);
};

EnhancedSpotifyAPI.getRedirectURI = function() {
    return this.wrapperInstance.getRedirectURI();
};

EnhancedSpotifyAPI.getClientId = function() {
    return this.wrapperInstance.getClientId();
};

EnhancedSpotifyAPI.getClientSecret = function() {
    return this.wrapperInstance.getClientSecret();
};

EnhancedSpotifyAPI.getAccessToken = function() {
    return this.wrapperInstance.getAccessToken();
};

EnhancedSpotifyAPI.getRefreshToken = function() {
    return this.wrapperInstance.getRefreshToken();
};

EnhancedSpotifyAPI.resetClientId = function() {
    return this.wrapperInstance.resetClientId();
};

EnhancedSpotifyAPI.resetClientSecret = function() {
    return this.wrapperInstance.resetClientSecret();
};

EnhancedSpotifyAPI.resetAccessToken = function() {
    return this.wrapperInstance.resetAccessToken();
};

EnhancedSpotifyAPI.resetRefreshToken = function() {
    return this.wrapperInstance.resetRefreshToken();
};

EnhancedSpotifyAPI.resetRedirectURI = function() {
    return this.wrapperInstance.resetRedirectURI();
};