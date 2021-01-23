const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    db.user
      .findAll({
        include: [db.watchlist]
      })
      .then(data => {
        const obj = {
          title: "Home Page",
          user: data
        };
        res.render("homepage", obj);
      });
  });

  app.get("/api/users/:id", (req, res) => {
    db.user
      .findOne({
        where: {
          id: req.params.id
        },
        include: [db.watchlist]
        // raw: true
      })
      .then(data => {
        console.log(data.watchlists[0]);
        let movie = 1;
        let netflix = 1;
        let hulu = 1;
        let amazon = 1;
        if (data.watchlists[0]) {
          movie = data.watchlists[0].dataValues.movie_title;
          netflix = data.watchlists[0].dataValues.netflix;
          hulu = data.watchlists[0].dataValues.hulu;
          amazon = data.watchlists[0].dataValues.amazon;
        }
        // console.log(data.get({ plain: true }));
        const obj = {
          title: "Name",
          user: data,
          movie: movie,
          netflix: netflix,
          hulu: hulu,
          amazon: amazon
        };
        res.render("user", obj);
      });
  });

  app.post("/api/users", req => {
    db.user.create(req.body).then(() => {
      console.log("User Added");
    });
  });

  app.delete("/api/users/delete/:id", req => {
    db.user
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(() => {
        console.log("Deleted Succesfully");
      });
  });
};
