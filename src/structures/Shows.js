'use strict';

var { addMethods, override } = require('./shared');

function Shows(data) {
    try {

    } catch (error) {
        throw error;
    }
}

Shows.prototype = {

};

Shows.addMethods = addMethods;

Shows.override = override;

module.exports = Shows;