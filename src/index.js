/* eslint-disable no-restricted-properties */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

const EnhancedSpotifyAPI = module.exports;

fs.readdirSync(path.join(__dirname, 'lib', 'models')).forEach((file) => {
  const noExtension = file.replace('.js', '');
  const command = noExtension;
  EnhancedSpotifyAPI.__defineGetter__(command, () => require(`./lib/models/${noExtension}`));
});

fs.readdirSync(path.join(__dirname, 'lib', 'managers')).forEach((file) => {
  const noExtension = file.replace('.js', '');
  const command = noExtension;
  EnhancedSpotifyAPI.__defineGetter__(command, () => require(`./lib/managers/${noExtension}`));
});

EnhancedSpotifyAPI.use = function use(model) {
  if (typeof (model) !== 'function') {
    throw new Error('enhanced-spotify-api.use: Invalid parameter "model".');
  }
  this.__defineGetter__(model.constructor.name, model);
};

EnhancedSpotifyAPI.wrapperInstance = new EnhancedSpotifyAPI.Wrapper();

EnhancedSpotifyAPI.setCredentials = function setCredentials(credentials) {
  this.wrapperInstance.setCredentials(credentials);
};

EnhancedSpotifyAPI.getCredentials = function getCredentials() {
  return this.wrapperInstance.getCredentials();
};

EnhancedSpotifyAPI.resetCredentials = function resetCredentials() {
  this.wrapperInstance.resetCredentials();
};

EnhancedSpotifyAPI.setClientId = function setClientId(clientId) {
  this.wrapperInstance.setClientId(clientId);
};

EnhancedSpotifyAPI.setClientSecret = function setClientSecret(clientSecret) {
  this.wrapperInstance.setClientSecret(clientSecret);
};

EnhancedSpotifyAPI.setAccessToken = function setAccessToken(accessToken) {
  this.wrapperInstance.setAccessToken(accessToken);
};

EnhancedSpotifyAPI.setRefreshToken = function setRefreshToken(refreshToken) {
  this.wrapperInstance.setRefreshToken(refreshToken);
};

EnhancedSpotifyAPI.setRedirectURI = function setRedirectURI(redirectUri) {
  this.wrapperInstance.setRedirectURI(redirectUri);
};

EnhancedSpotifyAPI.getRedirectURI = function getRedirectURI() {
  return this.wrapperInstance.getRedirectURI();
};

EnhancedSpotifyAPI.getClientId = function getClientId() {
  return this.wrapperInstance.getClientId();
};

EnhancedSpotifyAPI.getClientSecret = function getClientSecret() {
  return this.wrapperInstance.getClientSecret();
};

EnhancedSpotifyAPI.getAccessToken = function getAccessToken() {
  return this.wrapperInstance.getAccessToken();
};

EnhancedSpotifyAPI.getRefreshToken = function getRefreshToken() {
  return this.wrapperInstance.getRefreshToken();
};

EnhancedSpotifyAPI.resetClientId = function resetClientId() {
  return this.wrapperInstance.resetClientId();
};

EnhancedSpotifyAPI.resetClientSecret = function resetClientSecret() {
  return this.wrapperInstance.resetClientSecret();
};

EnhancedSpotifyAPI.resetAccessToken = function resetAccessToken() {
  return this.wrapperInstance.resetAccessToken();
};

EnhancedSpotifyAPI.resetRefreshToken = function resetRefreshToken() {
  return this.wrapperInstance.resetRefreshToken();
};

EnhancedSpotifyAPI.resetRedirectURI = function resetRedirectURI() {
  return this.wrapperInstance.resetRedirectURI();
};
