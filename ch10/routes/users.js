var express = require('express');
var router = express.Router();

module.exports.findUser = function(req, res, next) {
    // ... Query to find a user in the database
};

module.exports.updateUser = function(req, res, next) {
     // ... Query to update a user in the database
};

module.exports.removeUser = function(req, res, next) {
     // ... Query to remove a user in the database
};

module.exports = router;