// Middleware é um padrão incrivelmente útil que permite aos desenvolvedores reutilizar código dentro de suas aplicações e até mesmo
// Compartilhá-lo com outros na forma de módulos NPM.
// Importando e instanciando as dependencias

var express = require('express');
var path = require('path');
var fs = require('fs');
var compression = require('compression');
var logger = require('morgan');
var timeout = require('connect-timeout');
var methodOverride = require('method-override');
var responseTime = require('response-time');
var favicon = require('serve-favicon');
var serveIndex = require('serve-index');
var vhost = require('vhost');
var busboy = require('connect-busboy');
var errorhandler = require('errorhandler');

// Intancia e configuracao do App
var app = express(); 

app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);

//Um caminho global evita a ambiguidade, razão pela qual usamos __dirname.
app.use(compression({threshold: 1}));
app.use(logger('combined'));
app.use(methodOverride('_method'));
app.use(responseTime(4));
//app.use(favicon(path.join('public', 'favicon.ico')));
app.use(favicon(path.join('public', 'favicon.ico')));

// Aplicando Middleware
app.use('/shared', serveIndex(path.join('public', 'shared'), {icons: true}));
app.use(express.static(__dirname + '/public'));

// Defindo rotas 'routes'
app.use('/upload', busboy({immediate: true}));
app.use('/upload', function(request, response) {
    request.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file.on('data', function(data) {
            fs.writeFile('upload' + fieldname + filename, data);
        });

        file.on('end', function() {
            console.log('File' + fieldname + 'is ended');
        });
    });

    request.busboy.on('finish', function() {
        console.log('Busboy is finished');
        response.status(201).end();
    });
});

app.get('/slow-request', timeout('1s'), function(request, response, next) {
    setTimeout(function() {
        if (request.timedout) return false;
        return next();
    }, 999 + Math.round(Math.random()));
}, function(request, response, next) {
    response.send('ok');
});

app.delete('/purchase-orders', function(request, response) {
    console.log('The DELETE route has been triggered');
    response.status(204).end();
});

app.get('/response-time', function(request, response) {
    setTimeout(function() {
        response.status(200).end();
    }, 513);
});

app.get('/', function(request, response) {
    response.send('Pro Express.js Middleware');
});

app.get('/compression', function(request, response) {
    response.render('index');
});

// Aplicando eventos de erro
app.use(errorhandler());

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/images'));
app.use('/js', express.static(__dirname + '/public/javascripts'));

app.use(function(req, res, next) {
    console.log('%s %s - %s', (new Date).toString(), req.method, req.url);
    return next();
});

// route
app.use('/admin', function(req, res, next) {
    console.log('%s %s - %s', (new Date).toString(), req.method, req.url);
    return next();
});

// Boot Sever
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});






