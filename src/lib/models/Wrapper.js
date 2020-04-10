'use strict';

 /**
 * Wrapper Constructor
 * Creates a new instance of spotify-web-api-node with added functionality. 
 * The wrapper is used to perform all requests within the library.
 * It maintains the access token provided by Spotify to authenticate requests.
 */
function Wrapper() {}

Wrapper.prototype = {
    ...require('spotify-web-api-node').prototype,
    ...require('../functions/Shows'),
    ...require('../functions/Episodes'),
}

Wrapper.prototype.play = require('../functions/Broken').play;

/**
 * Add Methods
 * Adds functionality to Class
 * @param {Object} methods Object containing new methods to be added as properties.
 */
Wrapper.addMethods = function(methods) {
    for (let method in methods) {
        this.prototype[method] = methods[method];
    }
};

/**
 * Override
 * Replaces a method within the Class.
 * @param {String} name Name of the method to replace.
 * @param {Function} method Function to replace with.
 */
Wrapper.override = function(name, method) {
    if (this.prototype.hasOwnProperty(name)) {
        this.prototype[name] = method;
    } else {
        throw new Error("Wrapper.override: \"name\" does not exist.");
    }
}

module.exports = Wrapper;