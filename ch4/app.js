var express = require('express');
var path = require('path');
var app = express(); 

app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);


// Middleware é um padrão incrivelmente útil que permite aos desenvolvedores reutilizar código dentro de suas aplicações e até mesmo
// Compartilhá-lo com outros na forma de módulos NPM.

app.use(function(req, res, next) {
    console.log('%s %s - %s', (new Date).toString(), req.method, req.url);
    return next();
});


var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});






