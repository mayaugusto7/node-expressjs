var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

/**
 * req.query
 */
app.get('/search', function (req, res) {
  console.log(req.query)
  res.end(JSON.stringify(req.query) + '\r\n');
});

/**
 * req.params
 * imprime os parametros que foram inputados eviados 
 */
app.get('/params/:role/:name/:status', function (req, res) {
  console.log(req.params);
  res.end();
});

/**
 * req.body
 * imprime o corpo da requisicao como resposta
 */
app.post('/body', function (req, res) {
  console.log(req.body);
  res.end(JSON.stringify(req.body) + '\r\n');
});

/**
 * req.route
 * Info rotas
 */
app.get('/params/:role/:name/:status', function (req, res) {
  console.log(req.params);
  console.log(req.route);
  res.end();
});

/**
 * req.cookies
 * Info cookie
 */
app.get('/cookies', function (req, res) {
  if (!req.cookies.counter)
    res.cookie('counter', 0);
  else
    res.cookie('counter', parseInt(req.cookies.counter, 10) + 1);
  res.status(200).send(req.cookies);
});

/**
 * req.signedCookies
 */
app.use(cookieParser('abc'));
// ... Other middleware
app.get('/signed-cookies', function (req, res) {
  if (!req.signedCookies.counter)
    res.cookie('counter', 0, { signed: true });
  else
    res.cookie('counter', parseInt(req.signedCookies.counter, 10) + 1, { signed: true });
  res.status(200).send('cookies are: ', req.signedCookies);
});
// ...

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
