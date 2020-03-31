/**
 * Add Methods
 * Adds functionality to Class
 * 
 * @param {object} methods Object with methods as properties.
 */
let addMethods = (methods) => {
  try {
    for (var method in methods) {
      if (methods.hasOwnProperty(method)) {
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
 * @param {string} oldMethod Name of the method to replace.
 * @param {function} newMethod Function to replace old method with.
 */
let override = (oldMethod, newMethod) => {
  try {
    if (this.prototype.hasOwnProperty(oldMethod)) {
      this.prototype[oldMethod] = newMethod;
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