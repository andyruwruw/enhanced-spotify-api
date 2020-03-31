'use strict';

var { addMethods, override } = require('./shared');

function Episodes(data) {
    try {

    } catch (error) {
        throw error;
    }
}

Episodes.prototype = {

};

Episodes.addMethods = addMethods;

Episodes.override = override;

module.exports = Episodes;