var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var errorhandler = require('errorhandler');

var app = express();

var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.use(logger('combined'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('public'));

// object
var users = {
    'azat': {
        email: 'hi@azat.co',
        website: 'http://azat.co',
        blog: 'http://webapplog.com'
    }
};

var findUserByUsername = function(username, callback) {

    if (!users[username]) {
        return callback(new Error(
            'No user matching ' + username
        ));
    }

     return callback(null, users[username]);
};

app.get('/v1/users/:username', function(request, response, next) {
    
    var username = request.params.username;
    
    findUserByUsername(username, function(error, user) {
        if (error) return next(error);

        return response.render('user', user);
    });
});

app.get('/v1/admin/:username', function(request, response, next) {

    var username = request.params.username;

    findUserByUsername(username, function(error, user) {
        if(error) return next(error);

        return response.render('admin', user);
    });

});

// Boot Sever
var server = app.listen(app.get('port'), function() {
   console.log('Express server listening on port ' + server.address().port);
});