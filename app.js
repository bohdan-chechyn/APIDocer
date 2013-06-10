
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    path = require('path');

var app = express();

var usersController = require('./controllers/users');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function (req, res) {
  fs.readFile('public/html/index.html', function(err, data) {
    res.end(data);
  });
});


app.post('/auth/', usersController.auth);
app.post('/logout/');
app.get('/account/');

app.post('/users/', usersController.add);

app.post('/apis/');
app.get('/apis/:id');
app.get('/apis/my');
app.put('/apis/:id/share');
app.post('/apis/:apiId/methods');
app.get('/apis/:apiId/methods'); // ?categoryId=123123
app.put('/apis/:apiId/methods/:methodId');

app.post('/apis/:apiId/categories');
app.get('/apis/:apiId/categories');




http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
