const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        // check db if a user with username exists or not
        User.findOne({
            email
        }).then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(isMatch => {
                        if (isMatch) {
                            // console.log(user)
                            console.log('logged in')
                            return done(null, user);
                        } else {

                            return done('Password does not match user')
                        }

                    })
            } else {
                return done('Email is not registered')
            }

        })
    }

    passport.use(
        new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        }, authenticateUser)
    );

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}
module.exports = initialize