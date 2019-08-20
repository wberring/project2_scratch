var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

//code from login routes (NEED TO Make Routes Work!)
module.exports = (router, db, ensureLoggedIn) => {
  const sequelize = db.sequelize;
  const User = db.User;

  router
    .route("/api/users")
    .all(require("connect-ensure-login").ensureLoggedIn("/login"))
    .get((req, res, next) => {
      // * find user entries
      User.findByPk(req.user.id.then(dbUser => {
        // * use toJSON() to convert to raw format 
        const user = dbUser.toJSON();
        })
        res.json(user),
      });
    });


    .post((req, res, next) => {
      next();
    })
    .put((req, res, next) => {
      next();
    })
    .delete((req, res, next) => {
      next();
    });

  router
    .route("/api/logs")
    .all(require("connect-ensure-login").ensureLoggedIn("/login"))
    .get((req, res, next) => {
      next();
    })
    .post((req, res, next) => {
      // * add user_id to the data object to be submitted
      const data = { ...req.body, UserId: req.user.id };
      Log.create(data)
        .then(log => {
          res.json(log.dataValues);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .put((req, res, next) => {
      next();
    })
    .delete((req, res, next) => {
      next();
    });
};