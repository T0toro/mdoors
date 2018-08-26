/**
 * App main file
 *
 * @module      :: app
 * @description :: Load, modules, conrollers, routes, libs and start app
 *
 *
 * Module dependencies
 */

import mongoose from 'mongoose';
import express from 'express';

import passport from 'passport';

const app = express();
const port = process.env.PORT || 8085;

// Connect to mongodb
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mdoors', { useMongoClient: true });

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

app.use((err, _, res, next) => {
  // Treat as 404
  if (
    err.message
    && (err.message.includes('not found')
    || (~err.message.includes('Cast to ObjectId failed')))
  ) { return next(); }

  // Error page
  return res.status(500).json({ error: err.stack });
});

// Assume 404 since no middleware responded
app.use((req, res) => res.status(404).json({
  url: req.originalUrl,
  error: 'Not found',
}));

// Start app
// ----------------------------------------------

app.listen(port);
