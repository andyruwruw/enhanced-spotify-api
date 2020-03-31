  /**
   * Get a Show
   * Returns data from API for a show
   * 
   * @param {string} showID The show's ID.
   * @param {Object} [options] The possible options, currently only market.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} A promise that if successful, returns an object containing information about the show. 
   */
let getShow = (showID, options, callback) => {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
        actualCallback = options;
        actualOptions = {};
    } else {
        actualCallback = callback;
        actualOptions = options;
    }

    return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/shows/' + showID)
    .withQueryParameters(actualOptions)
    .build()
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
let getShows = (showIds, options, callback) => {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
        actualCallback = options;
        actualOptions = {};
    } else {
        actualCallback = callback;
        actualOptions = options;
    }
    return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/shows')
    .withQueryParameters(
    {
        ids: showIds.join(',')
    },
    actualOptions
    )
    .build()
    .execute(HttpManager.get, actualCallback);
};

module.exports = {
    getShow: getShow,
    getShows: getShows,
}