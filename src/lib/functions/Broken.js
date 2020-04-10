'use strict';

var WebApiRequest = require('./webapi-request');
var HttpManager = require('./http-manager');

let play = function(options, callback) {
    /*jshint camelcase: false */
    var _options = options || {};
    var queryParams = _options.device_id
        ? { device_id: _options.device_id }
        : null;
    var postData = {};
    ['context_uri', 'uris', 'offset', 'position_ms'].forEach(function(field) {
        if (field in _options) {
        postData[field] = _options[field];
        }
    });
    return WebApiRequest.builder(this.getAccessToken())
        .withPath('/v1/me/player/play')
        .withQueryParameters(queryParams)
        .withHeaders({ 'Content-Type': 'application/json' })
        .withBodyParameters(postData)
        .build()
        .execute(HttpManager.put, callback);
};

module.exports = {
    play: play,
};
