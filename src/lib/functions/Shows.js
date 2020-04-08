'use strict';

/**
 * Get a Show
 * Returns data from API for a show
 * 
 * @param {string} showID The show's ID.
 * @param {Object} [options] The possible options, currently only market.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing information about the show. 
 */
let getShow = function(showID, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
        actualCallback = options;
        actualOptions = {};
    } else {
        actualCallback = callback;
        actualOptions = options;
    }
    return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/shows/' + showID)
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
 * @returns {Promise|undefined} A promise that if successful, returns an object containing information about the shows. 
 */
let getShows = function(showIds, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
        actualCallback = options;
        actualOptions = {};
    } else {
        actualCallback = callback;
        actualOptions = options;
    }
    return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/shows')
    .withQueryParameters({ ids: showIds.join(',')}, actualOptions).build()
    .execute(HttpManager.get, actualCallback);
};

/**
 * Check if one or more shows is already saved in the current Spotify user’s “Your Music” library.
 * @param {string[]} showIds The show IDs
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, resolves into an array of booleans. The order
 * of the returned array's elements correspond to the track ID in the request.
 * The boolean value of true indicates that the track is part of the user's library, otherwise false.
 * Not returned if a callback is given.
 */
let containsMySavedShows = function(showIds, callback) {
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
let removeFromMySavedShows = function(showIds, callback) {
    return WebApiRequest.builder(this.getAccessToken()).withPath('/v1/me/shows')
    .withHeaders({ 'Content-Type': 'application/json' }).withBodyParameters({ ids: showIds }).build()
    .execute(HttpManager.del, callback);
};

/**
 * Add a show from the authenticated user's Your Music library.
 * @param {string[]} showIds The show IDs
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful returns null, otherwise an error. Not returned if a callback is given.
 */
let addToMySavedShows = function(showIds, callback) {
    return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/me/shows').withHeaders({ 'Content-Type': 'application/json' })
    .withBodyParameters({ ids: showIds }).build()
    .execute(HttpManager.put, callback);
};

/**
 * Retrieve the shows that are saved to the authenticated users Your Music library.
 * @param {Object} [options] Options, being market, limit, and/or offset.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which in turn contains
 *          playlist show objects. Not returned if a callback is given.
 */
let getMySavedShows = function(options, callback) {
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
let getShowEpisodes = function(showId, options, callback) {
    return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/shows/' + showId + '/episodes').withQueryParameters(options).build()
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
let searchShows = function(query, options, callback) {
    return this.search(query, ['show'], options, callback);
};

module.exports = {
    getShow: getShow,
    getShows: getShows,
    containsMySavedShows: containsMySavedShows,
    removeFromMySavedShows: removeFromMySavedShows,
    addToMySavedShows: addToMySavedShows,
    getMySavedShows: getMySavedShows,
    getShowEpisodes: getShowEpisodes,
    searchShows: searchShows,
};