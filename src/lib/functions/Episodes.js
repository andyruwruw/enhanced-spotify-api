'use strict';

var WebApiRequest = require('./webapi-request');
var HttpManager = require('./http-manager');

/**
 * Get an Episode
 * Returns data from API for an episode
 * 
 * @param {string} episodeId The episode's ID.
 * @param {Object} [options] The possible options, currently only market.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing information about the show. 
 */
let getEpisode = function(episodeId, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
        actualCallback = options;
        actualOptions = {};
    } else {
        actualCallback = callback;
        actualOptions = options;
    }

    return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/episodes/' + episodeId)
    .withQueryParameters(actualOptions)
    .build()
    .execute(HttpManager.get, actualCallback);
};

/**
 * Get Episodes
 * Look up several Episodes.
 * 
 * @param {string[]} episodeIDs The IDs of the episodes.
 * @param {Object} [options] The possible options, currently only market.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing information about the shows. 
 */
let getEpisodes = function(episodeIDs, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
        actualCallback = options;
        actualOptions = {};
    } else {
        actualCallback = callback;
        actualOptions = options;
    }
    return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/episodes')
    .withQueryParameters(
    {
        ids: episodeIDs.join(',')
    },
    actualOptions
    )
    .build()
    .execute(HttpManager.get, actualCallback);
};

/**
 * Search for an episode.
 * @param {string} query The search query.
 * @param {Object} [options] The possible options, e.g. limit, offset.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @returns {Promise|undefined} A promise that if successful, returns an object containing the
 *          search results. The result is paginated. If the promise is rejected,
 *          it contains an error object. Not returned if a callback is given.
 */
let searchEpisodes = function(query, options, callback) {
    return this.search(query, ['episode'], options, callback);
};

module.exports = {
    getEpisode: getEpisode,
    getEpisodes: getEpisodes,
    searchEpisodes: searchEpisodes,
};