var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// Login Code Needing to be Incorporated

module.exports = (router, db, ensureLoggedIn) => {
  const sequelize = db.sequelize;
  const User = db.User;
  // Load index page
  router.get("/", (req, res) => {
    res.render("index", {});
  });

  router.get("/login", (req, res) => {
    res.render("login", {});
  });

  router.get("/register", (req, res) => {
    res.render("register", {});
  });

  router.get("/index", ensureLoggedIn("/login"), (req, res) => {
    // * find user entries
    User.findByPk(req.user.id.then(dbUser => {
      // * use toJSON() to convert to raw format
      const user = dbUser.toJSON();
      res.render("index", { style: "style.css", user });
    });
  });

  // Render 404 page for any unmatched routes
  router.get("*", (req, res) => {
    res.status(404).render("404");
  });
};

