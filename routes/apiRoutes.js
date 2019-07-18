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
  // Create a food
  // app.post("/api/foods", function (req, res) {
  //   db.UsersPantries.create(req.body).then(function (dbfoods) {
  //     res.json(dbfoods);
  //   });

    

  // });


  // Get all examples
  app.get("/api/test", function(req, res) {
    db.Recipe.findAll({
      include:[{
        model: db.Ingredient,
        as: 'ingredients',
        attributes: ['id', 'name'],
        through: {model: db.recipeIngredients}

      }]
    }).then(function(dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  app.get("/api/test2", function(req, res) {
    db.Ingredient.findAll({}).then(function(dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  app.get("/api/examples", function(req, res) {
    db.recipeIngredients.findAll({}).then(function(dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    console.log(req.body); //TODO: delete this.  Keep seeing this in console: [Object: null prototype] 
    db.Recipe.create(req.body).then(function(dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  // Create a new recipe
  app.post("/api/addRecipe", function(req, res) {
    console.log(req.body); //TODO: delete this.  Keep seeing this in console: [Object: null prototype] 
    db.Recipe.create(req.body).then(function(dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function(dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });
};