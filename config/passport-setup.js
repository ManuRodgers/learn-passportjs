const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/UserModel");

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => {
      next(null, user);
    })
    .catch(err => {
      console.error(err);
    });
});

passport.use(
  new GoogleStrategy(
    {
      // options for Google Strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, next) => {
      // passport callback function
      User.findOne({ googleId: profile.id })
        .then(currentUser => {
          if (currentUser) {
            next(null, currentUser);
            console.log(`the current user is ${currentUser}`);
          } else {
            new User({
              username: profile.displayName,
              googleId: profile.id
            })
              .save()
              .then(newUser => {
                next(null, newUser);
                console.log(`the new user is ${newUser}`);
              })
              .catch(err => {
                console.error(err);
              });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  )
);
