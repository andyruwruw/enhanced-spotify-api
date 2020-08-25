// From spotify-web-api
// Used to fix endpoints that were broken and add new endpoints not yet added.

const superagent = require('superagent');
const WebApiError = require('./webapi-error');

const HttpManager = {};

/* Create superagent options from the base request */
const _getParametersFromRequest = function _getParametersFromRequest(request) {
  const options = {};

  if (request.getQueryParameters()) {
    options.query = request.getQueryParameters();
  }

  if (
    request.getHeaders()
    && request.getHeaders()['Content-Type'] === 'application/json'
  ) {
    options.data = JSON.stringify(request.getBodyParameters());
  } else if (request.getBodyParameters()) {
    options.data = request.getBodyParameters();
  }

  if (request.getHeaders()) {
    options.headers = request.getHeaders();
  }
  return options;
};

/* Create an error object from an error returned from the Web API */
const _getErrorObject = function _getErrorObject(defaultMessage, err) {
  let errorObject;
  if (typeof err.error === 'object' && typeof err.error.message === 'string') {
    // Web API Error format
    errorObject = new WebApiError(err.error.message, err.error.status);
  } else if (typeof err.error === 'string') {
    // Authorization Error format
    /* jshint ignore:start */
    errorObject = new WebApiError(`${err.error}: ${err.error_description}`);
    /* jshint ignore:end */
  } else if (typeof err === 'string') {
    // Serialized JSON error
    try {
      const parsedError = JSON.parse(err);
      errorObject = new WebApiError(
        parsedError.error.message,
        parsedError.error.status,
      );
    } catch (error) {
      return;
    }
  }

  if (!errorObject) {
    // Unexpected format
    errorObject = new WebApiError(`${defaultMessage}: ${JSON.stringify(err)}`);
  }

  // eslint-disable-next-line consistent-return
  return errorObject;
};

/* Make the request to the Web API */
HttpManager._makeRequest = function _makeRequest(method, options, uri, callback) {
  const req = method.bind(superagent)(uri);

  if (options.query) {
    req.query(options.query);
  }

  if (
    options.data
    && (!options.headers || options.headers['Content-Type'] !== 'application/json')
  ) {
    req.type('form');
    req.send(options.data);
  } else if (options.data) {
    req.send(options.data);
  }

  if (options.headers) {
    req.set(options.headers);
  }

  req.end((err, response) => {
    if (err) {
      const errorObject = _getErrorObject('Request error', {
        error: err,
      });
      return callback(errorObject);
    }

    return callback(null, {
      body: response.body,
      headers: response.headers,
      statusCode: response.statusCode,
    });
  });
};

/**
 * Make a HTTP GET request.
 * @param {BaseRequest} The request.
 * @param {Function} The callback function.
 */
HttpManager.get = function get(request, callback) {
  const options = _getParametersFromRequest(request);
  const method = superagent.get;

  HttpManager._makeRequest(method, options, request.getURI(), callback);
};

/**
 * Make a HTTP POST request.
 * @param {BaseRequest} The request.
 * @param {Function} The callback function.
 */
HttpManager.post = function post(request, callback) {
  const options = _getParametersFromRequest(request);
  const method = superagent.post;

  HttpManager._makeRequest(method, options, request.getURI(), callback);
};

/**
 * Make a HTTP DELETE request.
 * @param {BaseRequest} The request.
 * @param {Function} The callback function.
 */
HttpManager.del = function del(request, callback) {
  const options = _getParametersFromRequest(request);
  const method = superagent.del;

  HttpManager._makeRequest(method, options, request.getURI(), callback);
};

/**
 * Make a HTTP PUT request.
 * @param {BaseRequest} The request.
 * @param {Function} The callback function.
 */
HttpManager.put = function put(request, callback) {
  const options = _getParametersFromRequest(request);
  const method = superagent.put;

  HttpManager._makeRequest(method, options, request.getURI(), callback);
};

module.exports = HttpManager;
