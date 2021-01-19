var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // 1. Add a join to include all of each Author's Posts
    db.user.findAll({
      // include: [db.watchlist]
    }).then(function(data) {
      const obj = {
        title: "Home Page",
        user: data
    };
      res.render("homepage",obj);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // 2; Add a join to include all of the Author's Posts here
    db.user.findOne({
      where: {
        id: req.params.id
      },
     // include: [db.Post]
    }).then(function(data) {
      const obj = {
        title: "Name",
        user: data
      };
       res.render("user",obj);
    });
  });

  // app.post("/api/authors", function(req, res) {
  //   db.Author.create(req.body).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  // });

  // app.delete("/api/authors/:id", function(req, res) {
  //   db.Author.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  // });

};