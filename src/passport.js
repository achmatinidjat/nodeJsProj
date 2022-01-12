const localStrategy = require("passport-local").Strategy;

const auth = require("./services/auth");

module.exports = function(passport) {
    passport.use(
        "local",
        new localStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            (email, password, next) => {
                auth.login(email, password, next);
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};
