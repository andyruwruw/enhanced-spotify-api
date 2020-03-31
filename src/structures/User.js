'use strict';

var { addMethods, override } = require('./shared');

 /**
 * User Constructor
 * Creates a new User Instance for a given user.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the user ID or contain an `id` property.
 */
function User(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("User.constructor: No ID Provided");
            }

        } else {
            throw new Error("User.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

User.prototype = {
    
};

User.addMethods = addMethods;

User.override = override;

module.exports = User;