const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/UserModel");

passport.use(
  new GoogleStrategy(
    {
      // options for Google Strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          console.log(`the current user is ${currentUser}`);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log(`the new user is ${newUser}`);
            });
        }
      });
    }
  )
);
