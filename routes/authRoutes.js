const authRouter = require("express").Router();
const passport = require("passport");

// auth login
authRouter.get("/login", (req, res) => {
  res.render("login.ejs", { user: req.user });
});

// auth logout
authRouter.get("/logout", (req, res) => {
  // handle with passport
  res.send("logging out");
});


// auth with google+
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: "profile" })
);

// callback route for google to redirect to
authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  function(err, req, res, next) {
    // custom error handler to catch any errors, such as TokenError
    if (err.name === "TokenError") {
      res.redirect("/auth/google"); // redirect them back to the login page
    } else {
      // Handle other errors here
    }
  },
  (req, res) => {
    // res.send(req.user);
    res.redirect("/profile/");
  }
);

module.exports = authRouter;
