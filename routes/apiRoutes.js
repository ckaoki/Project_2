var db = require("../models");

module.exports = function(app) {
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
