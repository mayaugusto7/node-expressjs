var book = {
    name: 'Pratical Node.js',
    keywords: 'node.js express.js mongodb websocket oauth',
    discount: 'PNJS15'
}

var express = require('express');
var path = require('path');
var app = express();

console.log(app.get('env'));

app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);

//app.set('port', 3000);
//if (process.env.PORT) {
//    app.set(process.env.PORT);
//} else {
//    app.set(3000);
//} 

app.set('trust proxy', true);
app.set('jsonp callback name', 'cb');
app.set('json replacer', function(key, value) {
    if(key === 'discount') {
        return undefined;
    } else {
        return value;
    }
});

app.set('json spaces', 4);

app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('x-powered-by', false); //por questoes de seguranca false
app.set('subdomain offset', 3);
// app.disable('etag') // etag utilizado para fazer o cacheamento das informacoes desabilita-lo nao é uma boa pratica

app.get('/jsonp', function(request, response) {
    response.jsonp(book);
});

app.get('/json', function(request, response) {
    response.send(book);
});

app.get('/users', function(request, response) {
    response.send('users');
})

app.get('/users/', function(request, response) {
    response.send('users/');
});

app.get('*', function(request, response){
    response.send('Pro Express.js Configurations');
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
            message: err.message,
            error: err
        });
    });
}

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

