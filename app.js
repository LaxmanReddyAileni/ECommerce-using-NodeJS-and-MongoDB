const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error"); //Controller import

const mongoConnect = require("./utils/database").mongoConnect;
const User = require("./models/user");

const app = express(); //running express as a function

app.set("view engine", "ejs"); //ejs is also a template engine instead of handlebars and jade/pug
app.set("Views", "Views");

const adminRoutes = require("./routes/admin"); //Used by admin to create and edit/delete the products
const shoprouter = require("./routes/shop"); //Used by user

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("622e973eaf8c1890325794eb") // userId is from Database // Call models=>user.js
    .then((user) => {
      req.user = new User(user.name,user.email,user.cart,user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes); //Filtering paths
app.use(shoprouter); // This app uses routes where controllers are initialized In Controleers the get post methods and logics are defined
app.use(errorController.get404); //Error controller logic

// This goes to utils => database.js
mongoConnect(() => {
  app.listen(3000);
});
