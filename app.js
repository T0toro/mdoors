/**
 * App main file
 *
 * @module      :: app
 * @description :: Load, modules, conrollers, routes, libs and start app
 *
 *
 * Module dependencies
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 8085;

// Connect to mongodb
function connect() {
  mongoose.connect(
    'mongodb://localhost/mdoors', {
      server: {
        socketOptions: {
          keepAlive: 1,
        },
      },
    });
}


// Custom utils
// ----------------------------------------------

app.locals.moment = moment;

// Open db connection
// ----------------------------------------------

connect();

mongoose.connection.on('disconnected', connect);
mongoose.Promise = Promise;

// Bootstrap models
// ----------------------------------------------

fs.readdirSync(path.join(__dirname, '/app/models')).forEach((file) => {
  if (file.indexOf('.js') !== -1) {
    require(path.join(__dirname, '/app/models/', file));
  }
});

// Bootstrap passport config
// ----------------------------------------------

require('./config/passport')(passport);

// Bootstrap application settings
// ----------------------------------------------

require('./config/express')(app, passport);

// Bootstrap routes
// ----------------------------------------------

require('./config/routes')(app, passport);

// Bootstrap module
// ----------------------------------------------
require('./config/bootstrap')(app, passport);

// Routes ext
// ----------------------------------------------

app.use((err, req, res, next) => {
  // Treat as 404
  if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
    return next();
  }

  // Error page
  return res.status(500).render('500', {
    error: err.stack,
  });
});

// Assume 404 since no middleware responded
app.use((req, res) => {
  res.status(404).render('404', {
    url: req.originalUrl,
    error: 'Not found',
  });
});

// Start app
// ----------------------------------------------

app.listen(port);
