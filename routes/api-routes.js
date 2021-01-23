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
        if (data.watchlists.length === 0) {
          res.render("user", {
            title: "Name",
            user: data
          });
        } else {
          for (let i = 0; i < data.watchlists.length; i++) {
            const movie = data.watchlists[i].dataValues.movie_title;
            const netflix = data.watchlists[i].dataValues.netflix;
            const hulu = data.watchlists[i].dataValues.hulu;
            const amazon = data.watchlists[i].dataValues.amazon;

            const obj = {
              title: "Name",
              user: data,
              movie: movie,
              netflix: netflix,
              hulu: hulu,
              amazon: amazon
            };
            res.render("user", obj);
          }
        }

        // console.log(data.get({ plain: true }));
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
