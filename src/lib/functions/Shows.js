const WebApiRequest = require('./webapi-request');
const HttpManager = require('./http-manager');

/**
 * Get a Show
 * Returns data from API for a show
 *
 * @param {string} showID The show's ID.
 * @param {Object} [options] The possible options, currently only market.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful,
 * returns an object containing information about the show.
 */
const getShow = function getShow(showID, options, callback) {
  let actualCallback; let
    actualOptions;
  if (typeof options === 'function' && !callback) {
    actualCallback = options;
    actualOptions = {};
  } else {
    actualCallback = callback;
    actualOptions = options;
  }
  return WebApiRequest.builder(this.getAccessToken()).withPath(`/v1/shows/${showID}`)
    .withQueryParameters(actualOptions).build()
    .execute(HttpManager.get, actualCallback);
};

/**
 * Get Shows
 * Look up several shows.
 *
 * @param {string[]} showIds The IDs of the shows.
 * @param {Object} [options] The possible options, currently only market.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful,
 * returns an object containing information about the shows.
 */
const getShows = function getShows(showIds, options, callback) {
  let actualCallback; let
    actualOptions;
  if (typeof options === 'function' && !callback) {
    actualCallback = options;
    actualOptions = {};
  } else {
    actualCallback = callback;
    actualOptions = options;
  }
  return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/shows')
    .withQueryParameters({ ids: showIds.join(',') }, actualOptions).build()
    .execute(HttpManager.get, actualCallback);
};

/**
 * Check if one or more shows is already saved in the current Spotify user’s “Your Music” library.
 * @param {string[]} showIds The show IDs
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful,
 * resolves into an array of booleans. The order
 * of the returned array's elements correspond to the track ID in the request.
 * The boolean value of true indicates that the track is part of the user's library,
 * otherwise false.
 * Not returned if a callback is given.
 */
const containsMySavedShows = function containsMySavedShows(showIds, callback) {
  return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/me/shows/contains')
    .withQueryParameters({ ids: showIds.join(',') }).build()
    .execute(HttpManager.get, callback);
};

/**
 * Remove a show from the authenticated user's Your Music library.
 * @param {string[]} showIds The show IDs
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error.
 * Not returned if a callback is given.
 */
const removeFromMySavedShows = function removeFromMySavedShows(showIds, callback) {
  return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/me/shows')
    .withHeaders({ 'Content-Type': 'application/json' }).withBodyParameters({ ids: showIds })
    .build()
    .execute(HttpManager.del, callback);
};

/**
 * Add a show from the authenticated user's Your Music library.
 * @param {string[]} showIds The show IDs
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful returns null,
 * otherwise an error. Not returned if a callback is given.
 */
const addToMySavedShows = function addToMySavedShows(showIds, callback) {
  return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/me/shows').withHeaders({ 'Content-Type': 'application/json' })
    .withBodyParameters({ ids: showIds })
    .build()
    .execute(HttpManager.put, callback);
};

/**
 * Retrieve the shows that are saved to the authenticated users Your Music library.
 * @param {Object} [options] Options, being market, limit, and/or offset.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful,
 * resolves to an object containing a paging object which in turn contains
 * playlist show objects. Not returned if a callback is given.
 */
const getMySavedShows = function getMySavedShows(options, callback) {
  return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/me/shows')
    .withQueryParameters(options).build()
    .execute(HttpManager.get, callback);
};

/**
 * Get episodes in a show.
 * @param {string} showId The show's ID.
 * @param {Object} [options] Optional options, such as fields.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful
 */
const getShowEpisodes = function getShowEpisodes(showId, options, callback) {
  return WebApiRequest.builder(this.getAccessToken())
    .withPath(`/v1/shows/${showId}/episodes`).withQueryParameters(options).build()
    .execute(HttpManager.get, callback);
};

/**
 * Search for an show.
 * @param {string} query The search query.
 * @param {Object} [options] The possible options, e.g. limit, offset.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing the
 *          search results. The result is paginated. If the promise is rejected,
 *          it contains an error object. Not returned if a callback is given.
 */
const searchShows = function searchShows(query, options, callback) {
  return this.search(query, ['show'], options, callback);
};

module.exports = {
  getShow,
  getShows,
  containsMySavedShows,
  removeFromMySavedShows,
  addToMySavedShows,
  getMySavedShows,
  getShowEpisodes,
  searchShows,
};
