'use strict'

var fs = require('fs');
var path = require('path');

var EnhancedSpotifyAPI = module.exports;

fs.readdirSync(path.join(__dirname, 'lib', 'models')).forEach(function(file) {
    file = file.replace('.js', '');
    var command = file;
    EnhancedSpotifyAPI.__defineGetter__(command, function() {
        return require('./lib/models/' + file);
    });
});

fs.readdirSync(path.join(__dirname, 'lib', 'managers')).forEach(function(file) {
    file = file.replace('.js', '');
    var command = file;
    EnhancedSpotifyAPI.__defineGetter__(command, function() {
        return require('./lib/managers/' + file);
    });
});

EnhancedSpotifyAPI.use = function(model) {
    try {
        if (typeof(model) != 'function') {
            throw new Error("enhanced-spotify-api.use: Invalid parameter \"model\".");
        }
        this.__defineGetter__(model.constructor.name, model);
    } catch (error) {
        throw error;
    }
};
