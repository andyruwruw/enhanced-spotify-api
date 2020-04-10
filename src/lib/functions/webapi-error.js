'use strict';

// From spotify-web-api
// Used to fix endpoints that were broken and add new endpoints not yet added.

function WebapiError(message, statusCode) {
  this.name = 'WebapiError';
  this.message = message || '';
  this.statusCode = statusCode;
}

WebapiError.prototype = Error.prototype;

module.exports = WebapiError;
