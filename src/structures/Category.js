'use strict';

var { addMethods, override } = require('./shared');

 /**
 * Category Constructor
 * Creates a new Category Instance for a given category.
 * 
 * @param {object | string} data Data to be preloaded. Must either be a string of the category ID or contain an `id` property.
 */
function Category(data) {
    try {
        if (typeof(data) == 'string') {
            this.id = data;
        } else if (typeof(data) == 'object') {
            if ('id' in data) {
                this.id = data.id; 
            } else {
                throw new Error("Category.constructor: No ID Provided");
            }
            this.name = 'name' in data ? data.name : null;
            this.href = 'href' in data ? data.href : null;
            this.icons = 'icons' in data ? data.icons : null;
        } else {
            throw new Error("Category.constructor: Invalid Data");
        }
    } catch (error) {
        throw error;
    }
}

Category.prototype = {
    
};

Category.addMethods = addMethods;

Category.override = override;

module.exports = Category;
