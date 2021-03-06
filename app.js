/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  nodemailer = require("nodemailer");

var stripeApiKey = "pk_WK8kK7pQe0wBeHigrI9yGLEpqGqvs";
var stripeApiKeyTesting = "9PrrkDKIT6vyetcQBbR1RY93eu9Npu8e";

var stripe = require('stripe')(stripeApiKeyTesting);

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.post('/purchase', routes.purchase);
app.post('/submit-story', routes.submit_story);


// JSON API
// app.get('/api/name', api.name);
app.get('/api/guides', api.guides);
app.get('/api/guides/:language', api.guides);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
