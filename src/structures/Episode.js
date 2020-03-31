'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Episode Constructor
 * Creates a new Episode Instance for a given episode.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the episode ID or contain an `id` property.
 */
function Episode(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Episode.constructor: No ID Provided");
            }

        } else {
            throw new Error("Episode.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Episode.prototype = {
    
};

Episode.addMethods = addMethods;

Episode.override = override;

module.exports = Episode;