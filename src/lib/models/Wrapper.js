/* eslint-disable global-require */
/**
 * Creates a new instance of spotify-web-api-node with added functionality
 * It maintains the access token provided by Spotify to authenticate requests
 */
function Wrapper() {}

Wrapper.prototype = {
  ...require('spotify-web-api-node').prototype,
};

/**
 * Adds functionality to class
 * @param {object} methods Object containing new methods to be added as properties
 */
Wrapper.addMethods = function addMethods(methods) {
  const methodNames = Object.keys(methods);

  for (let i = 0; i < methodNames.length; i += 1) {
    this.prototype[methodNames[i]] = methods[methodNames[i]];
  }
};

/**
 * Replaces a method within the class
 * @param {string} name Name of the method to replace
 * @param {function} method Function to replace with
 */
Wrapper.override = function override(name, method) {
  if (name in this.prototype) {
    this.prototype[name] = method;
  } else {
    throw new Error('Wrapper.override: "name" does not exist.');
  }
};

module.exports = Wrapper;
