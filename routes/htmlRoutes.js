var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(pantryAssemblerdb) {
      res.render("index", {
        msg: "Welcome!",
        examples: pantryAssemblerdb
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(pantryAssemblerdb) {
      res.render("example", {
        example: pantryAssemblerdb
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
