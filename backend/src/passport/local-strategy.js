const passport = require('passport')
const User = require("../models/user")
const crypto = require("crypto");

const LocalStrategy = require('passport-local').Strategy;

passport.use(
    
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        function (username, password, done) {
            User.findOne({ email: username }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, 'Incorrect username.');
                }
                if (user.password != crypto.createHash("sha256").update(password).digest("hex")) {
                    return done(null, false, 'Incorrect password.');
                }
                if (user.email_is_verified == false) {
                    return done(null, false, 'User email not verified.')
                }
                return done(null, user);
            });
        }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport