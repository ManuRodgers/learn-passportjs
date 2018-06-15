const profileRouter = require("express").Router();
const authCheck = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    console.log(`auth login`);

    res.redirect("/auth/login");
  }
};
profileRouter.get("/", authCheck, (req, res) => {
  res.render("profile.ejs", { user: req.user });
});

module.exports = profileRouter;
