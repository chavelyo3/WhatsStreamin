const db = require("../models");

module.exports = function(app) {
  app.post("/api/watchlist", req => {
    db.watchlist.create(req.body).then(() => {
      console.log("it worked!");
    });
  });
};
