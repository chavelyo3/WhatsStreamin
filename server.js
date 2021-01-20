// Dependencies
const express = require("express");
// eslint-disable-next-line no-unused-vars
const routes = require("./routes/api-routes.js");
const syncOptions = { force: false };

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

const exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes.js")(app);

// if (process.env.NODE_ENV = "test"){
//   syncOptions.force = true;
// }

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
