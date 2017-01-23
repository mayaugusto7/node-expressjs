var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * Routes
 */
var index = require('./routes/index');
var stories = require('./routes/stories');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('combined'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('abc'));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Endpoints Definition
 * EPT abreviation
 */

var storiesEpt = '/stories';
var usersEpt = '/users';
var routes = ('./routes');

app.use('/', index);

/**Stories*/
app.get(storiesEpt, stories.findStories);
app.get(storiesEpt, stories.createStory);
app.get(storiesEpt, require('./routes').stories.findStories);
app.get(storiesEpt, routes.stories.findStories);
app.get(storiesEpt, routes.stories.createStory);

/**Users*/
app.get(usersEpt, users.findUser);
app.get(usersEpt, users.updateUser);
app.get(usersEpt, users.removeUser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var debug = require('debug')('request');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);
});