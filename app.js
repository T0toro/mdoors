/**
 * App main file
 *
 * @module      :: app
 * @description :: Load, modules, conrollers, routes, libs and start app
 */

/**
 * Module variables
 */

var fs, express, mongoose, passport, config, app, port, connect, path;

/**
 * Module dependencies
 */

fs       = require('fs');
path     = require('path');
express  = require('express');
mongoose = require('mongoose');
passport = require('passport');
config   = require('config');

app = express();
port = process.env.PORT || 3000;

// Connect to mongodb
connect = function() {
  mongoose.connect(config.db, {server: {socketOptions: {keepAlive: 1}}});
};

// Open db connection
//----------------------------------------------

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
//----------------------------------------------

fs.readdirSync(path.join(__dirname, '/app/models')).forEach(function(file) {
  if (~file.indexOf('.js')) require(path.join(__dirname, '/app/models/', file));
});

// Bootstrap passport config
//----------------------------------------------

require('./config/passport')(passport, config);

// Bootstrap application settings
//----------------------------------------------

require('./config/express')(app, passport);

// Bootstrap routes
//----------------------------------------------

require('./config/routes')(app, passport);

// Start app
//----------------------------------------------

app.listen(port);
console.log('Express app started on port ' + port);
