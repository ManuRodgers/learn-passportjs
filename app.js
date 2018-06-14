const express = require("express");
const path = require("path");
const consolidate = require("consolidate");
const ejs = require("ejs");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passportSetup = require("./config/passport-setup");

// routes
const authRoutes = require("./routes/authRoutes");

const app = express();

mongoose.connect(
  keys.mongodb.mongodbURL,
  () => {
    console.log(`mongoDB connected successfully`);
  }
);

// assign the ejs engine to .html files
app.engine("html", consolidate.ejs);

// set .html as the default extension
app.set("view engine", "html");
app.set("views", path.resolve(__dirname, "views/"));

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(5000, () => {
  console.log("app now listening for requests on port 5000");
});
