'use strict';

var mongoose = require('mongoose');
var morgan = require('morgan');
var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var fs = require('fs');
var compress = require('compression');

var app = module.exports.app = exports.app = express();

var config = {
  appRoot: __dirname // required config
};

// Connect to database
var mongoURI = process.env.MONGO_URI || 'mongodb://localhost/running-exoJP';
mongoose.connect(mongoURI, {});
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
if (app.get('env') == 'production') {
  var accessLogStream = fs.createWriteStream(__dirname + '/access.log',{flags: 'a'});
  app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: accessLogStream }));
} else {
  app.use(morgan('dev'));
  // app.use(require('connect-livereload')());
}

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  app.use(compress());
  app.use(express.static(__dirname + "/dist"));
  app.all('\//^(?!api).*/', function(req, res, next) {
      // Just send the index.html for other files than API to support HTML5Mode in Angular
      res.sendFile('/dist/index.html', { root: __dirname });
  });


  var port = process.env.PORT || 3000;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
