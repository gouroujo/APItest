'use strict';

var mongoose = require('mongoose');
var morgan = require('morgan');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

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
}

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
