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
        const movie = data.watchlists[0].dataValues.movie_title;
        const netflix = data.watchlists[0].dataValues.netflix;
        // console.log(data.get({ plain: true }));
        const obj = {
          title: "Name",
          user: data,
          movie: movie,
          netflix: netflix
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
