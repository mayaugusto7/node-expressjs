// Templates engines EJS Handlebars, jade, html etc.
// Nao necessitamos de importar o npm require('jade') or require('ejs')
// Tambem nao precisamos declarar a extensao do arquivo quando fazemos o render
// ex: response.render('index.jade');
// porque a configuracao esta em app.set('view engine', 'jade'); 

var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var errorhandler = require('errorhandler');

// Tipos de Rotas jade, html. template e swig
var jade = require('jade');
var consolidate = require('consolidate');

var app = express();

//app.set('views', path); or 
//app.set('views', path.join(__dirname, 'templates'));
//app.set('view engine', 'jade');
//app.engine('swig', require('swig').renderFile);

app.engine('html', jade.__express);
app.engine('template', jade.__express);
app.engine('swig', consolidate.swig);

app.set('port', process.env.PORT || 3000);
app.use(logger('combined'));
app.use(favicon(path.join('public', 'favicon.ico')));
app.use(express.static('public'));

// Defindo Rotas
app.get('/', function (request, response) {  
    response.render('index.html');
});

app.get('/template', function (request, response) {  
    response.render('index.template');
});

app.get('/swig', function (request, response) {  
    response.render('index.swig');
});

// Boot Sever
var server = app.listen(app.get('port'), function() {
   console.log('Express server listening on port ' + server.address().port);
});