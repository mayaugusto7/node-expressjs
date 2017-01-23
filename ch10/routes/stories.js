var express = require('express');
var router = express.Router();

module.exports.findStories = function(req, res, next) {
    // ... Query to find stories from the database
};

module.exports.createStory = function(req, res, next) {
    // ... Query to create a story in the database
};

module.exports = router;