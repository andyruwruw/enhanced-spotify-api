/**
 * Add Methods
 * Adds functionality to Class
 * 
 * @param {object} methods Object containing new methods to be added as properties.
 */
let addMethods = (methods) => {
  try {
    for (var method in methods) {
      if (!this.prototype.hasOwnProperty(method)) {
        this.prototype[method] = methods[method];
      }
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Override
 * Replaces a method within the class.
 * 
 * @param {string} name Name of the method to replace.
 * @param {function} method Function to replace old method with.
 */
let override = (name, method) => {
  try {
    if (this.prototype.hasOwnProperty(name)) {
      this.prototype[name] = method;
    }
  } catch (error) {
    throw error;
  }
};

// Export
module.exports = {
    addMethods: addMethods,
    override: override
};