'use strict';

/**
 * Module dependencies.
 */

let mongoose, User, LocalStrategy;

/**
 * Module dependencies.
 */

mongoose = require('mongoose');
LocalStrategy = require('passport-local').Strategy;
User = mongoose.model('User');

/**
 * Expose
 */

module.exports = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
      var user = new User({
        name: 'Totoro', 
        email: 'troinof@gmail.com'
      });

      user.save();
      
      console.info(email, password);
        User.find({
        }, (err, user) => {
          console.info(user);
            if (err) { return done(err); }

            if (Array.isArray(user) && !user.length) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }

            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            return done(null, user);
        });

    }
);
