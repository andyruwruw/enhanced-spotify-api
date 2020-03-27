
/**
 * Add Methods
 * Adds functionality to Class
 * 
 * @param {object} methods Object with methods as properties.
 */
let addMethods = function(methods) {
    for (var method in methods) {
      if (methods.hasOwnProperty(method)) {
        this.prototype[method] = methods[method];
      }
    }
};

/**
 * Override
 * Replaces a method within the class.
 * 
 * @param {string} oldMethod Name of the method to replace.
 * @param {function} newMethod Function to replace old method with.
 */
let override = function(oldMethod, newMethod) {
    if (this.prototype.hasOwnProperty(oldMethod)) {
        this.prototype[oldMethod] = newMethod;
    }
};

// Export
module.exports = {
    addMethods: addMethods,
    override: override
};