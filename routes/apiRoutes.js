var db = require("../models");

module.exports = function(app) {

  // Creates a user
  app.post("/api/users", function (req, res) {
    db.Users.create(req.body).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });
  // Get one user
  app.get("/api/users/:username", function (req, res) {
    var username = req.params.username;
    // console.log(username);
    db.Users.findAll({
      where: {
        user_name: username
      }
    }).then(function (user) {
      res.json(user);
      // console.log(user);
    });
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.recipeIngredients.findAll({}).then(function(pantryAssemblerDb) {
      res.json(pantryAssemblerDb);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    console.log(req.body); //TODO: delete this.  Keep seeing this in console: [Object: null prototype] 
    db.recipeIngredients.create(req.body).then(function(pantryAssemblerDb) {
      res.json(pantryAssemblerDb);
    });
  });

  // Create a new recipe
  app.post("/api/addRecipe", function(req, res) {
    console.log(req.body); //TODO: delete this.  Keep seeing this in console: [Object: null prototype] 
    db.recipeIngredients.create(req.body).then(function(pantryAssemblerDb) {
      res.json(pantryAssemblerDb);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function(pantryAssemblerDb) {
      res.json(pantryAssemblerDb);
    });
  });
};
