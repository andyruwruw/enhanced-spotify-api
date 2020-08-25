const WebApiRequest = require('./webapi-request');
const HttpManager = require('./http-manager');

const play = function play(options, callback) {
  const _options = options || {};
  const queryParams = _options.device_id
    ? { device_id: _options.device_id }
    : null;
  const postData = {};
  ['context_uri', 'uris', 'offset', 'position_ms'].forEach((field) => {
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
  play,
};
