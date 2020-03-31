'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Show Constructor
 * Creates a new Show Instance for a given show.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the show ID or contain an `id` property.
 */
function Show(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Show.constructor: No ID Provided");
            }

        } else {
            throw new Error("Show.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Show.prototype = {
    
};

Show.addMethods = addMethods;

Show.override = override;

module.exports = Show;