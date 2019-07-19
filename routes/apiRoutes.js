var db = require("../models");

module.exports = function (app) {

  // ----------------------------
  //           USERS             
  // ----------------------------

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

  // ----------------------------
  //        SHOPPING LIST           
  // ----------------------------
  
app.get("/api/items", function(req, res) {
  db.Item.findAll({}).then(function(dbItem) {
    res.json(dbItem);
  });
});

app.post("/api/items", function(req, res) {
  db.Item.create({
    text: req.body.text,
    complete: req.body.complete
  }).then(function(dbItem) {
    res.json(dbItem);
  });
});


app.delete("/api/items/:id", function(req, res) {
  db.Item.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbItem) {
    res.json(dbItem);
  });

});

app.put("/api/items", function(req, res) {
  db.Item.update({
    text: req.body.text,
    complete: req.body.complete
  }, {
    where: {
      id: req.body.id
    }
  }).then(function(dbItem) {
    res.json(dbItem);
  });
});


  // ----------------------------
  //          RECIPES            
  // ----------------------------

  // Create a new recipe
  //
  // Request:
  //        {
  //            name: string
  //            description: string
  //            instructions: string
  //            ingredients: [IngredientId1, IngredientId2, IngredientId3]
  //        }
  // Response:
  //       [ {
  //            id: integer
  //            name: string
  //            description: string
  //            instructions: string
  //        } ]
  // app.post("/api/recipes/add", function (req, res) {
  //   //TODO: delete this.  Keep seeing this in console: [Object: null prototype] 
  //   console.log(req.body); 
  //   db.Recipe.create(req.body).then(function (dbPantryAssembler) {
  //     res.json(dbPantryAssembler);
  //   });
  // });

  // Get all recipes
  //
  // Request:
  //         empty
  // Response:
  //       [ {
  //            name: string
  //            description: string
  //            instructions: string
  //        } ]
  //
  // app.get("/api/recipes/all", function (req, res) {
  //   res.json([
  //     {
  //       name: 'Test 1',
  //       description: 'Description 1',
  //       instructions: 'Instructions 1'
  //     },
  //     {
  //       name: 'Test 2',
  //       description: 'Description 2',
  //       instructions: 'Instructions 2'
  //     },
  //   ]);
  //   db.Recipe.findAll({
  //     include: [{
  //       model: db.Ingredient,
  //       as: 'ingredients',
  //       attributes: ['id', 'name'],
  //       through: { model: db.recipeIngredients }
  //     }]
  //   }).then(function (dbPantryAssembler) {
  //     res.json(dbPantryAssembler);
  //   });
  // });

  // Search recipes by ingredients
  //
  // Request:
  //         ["water", "sugar", "bananas", "butter"]
  // Response:
  //       [ {
  //            name: string
  //            description: string
  //            instructions: string
  //        } ]
  //
  // app.get("/api/ingredients/:ingredient", function (req, res) {
  //   db.recipeIngredients.findAll
  //   ({ 
  //     where: {ingredient: req.params.body 
  //     }}.then(
  //     function (pantryAssemblerDb) {
  //       res.json(pantryAssemblerDb);
  //     }
  //   ));
  // });

  // app.get("/api/recipes/search", function (req, res) {
  //   res.json([
  //     {
  //       name: 'Matched Recipe 1',
  //       description: 'Description 1',
  //       instructions: 'Instructions 1'
  //     },
  //     {
  //       name: 'Matched Recipe 2',
  //       description: 'Description 2',
  //       instructions: 'Instructions 2'
  //     },
  //   ]);
  // });

  // Get sample recipes.
  // 
  // Searches for the top 3 most used recipes.

  // Encounter.findAll({ order: 'rand()', limit: 3 }).then((encounter) => {
  //   include: [{
  //     model: db.Recipes,
  //     as: 'recipes',
  //     attributes: ['name', 'description', 'instructions'],
  //     through: { model: db.Recipes }
  //   }]
  // });

  // app.post("/api/samplerecipes", function (req, res) {
  //   db.Recipes.create(req.body).then(function (dbPantryAssembler) {
  //     res.json(dbPantryAssembler);
  //   });
  // });

  // Request:
  //         empty
  // Response:
  //       [ {
  //            name: string
  //            description: string
  //            instructions: string
  //        } ]
  //
  // app.get("/api/recipes/sample", function (req, res) {
  //   res.json([
  //     {
  //       name: 'Sample Recipe 1',
  //       description: 'Description 1',
  //       instructions: 'Instructions 1'
  //     },
  //     {
  //       name: 'Sample Recipe 2',
  //       description: 'Description 2',
  //       instructions: 'Instructions 2'
  //     },
  //     {
  //       name: 'Sample Recipe 3',
  //       description: 'Description 3',
  //       instructions: 'Instructions 3'
  //     },
  //   ]);
  // });

  // ----------------------------
  //         INGREDIENTS          
  // ----------------------------

  // Add ingredient
  app.post("/api/ingredients/add", function (req, res) {
    console.log("Logging request");
    console.log(req.body);
    res.json({ name: "responsebodysomething" });
    db.Ingredient.create(req.body).then(function (dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  // Get all ingredients
  // app.get("/api/ingredients/all", function (req, res) {
  //   db.Ingredients.findAll(req.body).then(function (dbPantryAssembler) {
  //     res.json(dbPantryAssembler);
  //   });
  // });

  // ----------------------------
  //           TESTS             
  // ----------------------------

  // Get all examples
  app.get("/api/test", function (req, res) {
    db.Recipe.findAll({
      include: [{
        model: db.Ingredient,
        as: 'ingredients',
        attributes: ['id', 'name'],
        through: { model: db.recipeIngredients }
      }]
    }).then(function (dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  app.get("/api/test2", function (req, res) {
    db.Ingredient.findAll({}).then(function (dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  app.get("/api/examples", function (req, res) {
    db.recipeIngredients.findAll({}).then(function (dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    console.log(req.body); //TODO: delete this.  Keep seeing this in console: [Object: null prototype] 
    db.Recipe.create(req.body).then(function (dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function (dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });
};
