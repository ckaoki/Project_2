var db = require("../models");
var Sequelize = require("sequelize");

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
  //        RECIPE SEARCH             
  // ----------------------------

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
  
    //Get three random recipes
    app.get("/api/sampleRecipes", function (req,res){
      db.Recipe.findAll({ 
        order: Sequelize.literal('rand()'),
        limit: 3,
        include:[{
          model: db.Ingredient,
          as: 'ingredients',
          attributes: ['id', 'name'],
          through: {model: db.recipeIngredients} 
        }] 
      }).then(function(recipes){
        res.json(recipes);
      })
    })


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
  //        CREATE RECIPES            
  // ----------------------------

  app.post("/api/new", function(req, res) {
    var addIngredients = req.params.ingredients.split(',');
    for (var i = 0; i < addIngredients.length; i++) {
      addIngredients[i] = addIngredients[i].trim();
    };
    db.Recipe.create({
      name: req.body.name,
      description: req.body.description,
      instructions: req.body.instructions,
      img: req.body.img
    }).then(function(recipes){
      res.json(recipes);
    });
  });


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


  // ----------------------------
  //           TESTS             
  // ----------------------------

  // Get all examples
//   app.get("/api/test", function (req, res) {

//     db.Recipe.findAll({
//       include: [{
//         model: db.Ingredient,
//         as: 'ingredients',
//         attributes: ['id', 'name'],

//         through: {model: db.recipeIngredients}

//       }]
//     }).then(function (dbPantryAssembler) {
//       res.json(dbPantryAssembler);
//     });
//   });

//    app.get("/api/test2", function(req, res) {
//     db.Ingredient.findAll({
//       include:[{
//         model: db.Recipe,
//         as: 'recipes',
//         attributes: ['id', 'name'],
//         through: {model: db.recipeIngredients}
//       }]
//     }).then(function(dbPantryAssembler) {

//   app.get("/api/test2", function (req, res) {
//     db.Ingredient.findAll({}).then(function (dbPantryAssembler) {
//       res.json(dbPantryAssembler);
//     });
//   });

};
=======
    });
  }


