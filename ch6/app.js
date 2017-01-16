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

// The v1 routes

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

// The v2 routes that use the custom middleware

var findUserByUsernameMiddleware = function(request, response, next) {

    if(request.params.username) {
        console.log('Username param was detected: ', request.params.username);

        findUserByUsername(request.params.username, function(error, user) {
            if (error) return next(error);
            
            request.user = user;
            return next();
        });
 
    } else {
        return next();
    }

};

app.get('/v2/users/:username', findUserByUsernameMiddleware, function(request, response, next) {
    return response.render('user', request.user);
});

app.get('/v2/admin/:username', findUserByUsernameMiddleware, function(request, response, next) {
    return response.render('admin', request.user)
});

// The v3 routes app.param()
app.param('v3Username', function(request, response, next, username) {
    console.log('Username param was is detected: ', username);
    findUserByUsername(username, function(error, user) {
        if (error) return next(error);

        request.user = user;
        return next();
    });
});

app.get('/v3/users/:v3Username', function(request, response, next) {
    return response.render('user', request.user);
});

app.get('/v3/admin/:v3Username', function(request, response, next) {
    return response.render('admin', request.user);
});

// The v4 Router object
router.param('username', function(request, response, next, username) {
     console.log('Username param was is detected: ', username);
      findUserByUsername(username, function(error, user) {
        if (error) return next(error);

        request.user = user;
        return next();
    });
});

router.get('/users/:username', function(request, response, next) {
    return response.render('user', request.user);
});

router.get('/admin/:username', function(request, response, next) {
    return response.render('admin', request.user);
});

app.use('/v4', router);

app.use(errorhandler());

// Boot Sever
var server = app.listen(app.get('port'), function() {
   console.log('Express server listening on port ' + server.address().port);
});