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
  
  // Find recipes containing the given ingredients ***************************************************
  app.get("/api/RecipesByIngredients/:ingredients", function(req, res) {
    // Change string of ingredients to array
    var searchIngredients = req.params.ingredients.split(',');
    for (var i = 0; i < searchIngredients.length; i++) {
      searchIngredients[i] = searchIngredients[i].trim();
    };
  
    db.Recipe.findAll({
      include:[{
        model: db.Ingredient,
        as: 'ingredients',
        attributes: ['id', 'name'],
        through: {model: db.recipeIngredients},
        where: {name: searchIngredients}          
        }]
      }).then(function(foundRecipes) {
        // need to query matching recipes again because recipes returned in first query
        // will not show ingredients not searched for.
        var recipeNames = [];
        foundRecipes.forEach(recipe => {
          recipeNames.push(recipe.name);
        });
  
        if(recipeNames.length>0){
          db.Recipe.findAll({
            where: {name: recipeNames},
            include:[{
              model: db.Ingredient,
              as: 'ingredients',
              attributes: ['id', 'name'],
              through: {model: db.recipeIngredients}                
              }]
            }).then(function(recipes) {
              res.json(recipes);
            });
          }
          else{
            res.json([]);
          }            
      });
    }); 



//************ Example and Test routes below this line **********/

  // Test
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
    db.Ingredient.findAll({
      include:[{
        model: db.Recipe,
        as: 'recipes',
        attributes: ['id', 'name'],
        through: {model: db.recipeIngredients}
      }]
    }).then(function(dbPantryAssembler) {
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
