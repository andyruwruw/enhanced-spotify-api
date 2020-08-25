// From spotify-web-api
// Used to fix endpoints that were broken and add new endpoints not yet added.

const Request = require('./base-request');

const DEFAULT_HOST = 'api.spotify.com';
const DEFAULT_PORT = 443;
const DEFAULT_SCHEME = 'https';

module.exports.builder = function builder(accessToken) {
  return Request.builder()
    .withHost(DEFAULT_HOST)
    .withPort(DEFAULT_PORT)
    .withScheme(DEFAULT_SCHEME)
    .withAuth(accessToken);
};
