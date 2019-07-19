var db = require("../models");



module.exports = function (app) {

  // Creates a user
  app.post("/api/users", function (req, res) {
    db.Users.create(req.body).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });
  //update password
  app.put("/api/password/:newpassword/:username", function (req, res) {
    db.Users.update({
      password: req.params.newpassword
    }, {
      where: {
        user_name: req.params.username
      }
    }).then(function(data){
      res.json(data)
    })
  })
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
  // Creates or a ingredient
  app.post("/api/foods", function (req, res) {
    db.PantryItems.findOne({
      where: {
        UserId: req.body.UserId,
        item_name: req.body.item_name
      }
    }).then(function (data) {
      console.log(data);
      if (!data) {
        db.PantryItems.create(req.body).then(function (data) {
          res.json(data);
        });
      } else {
        db.PantryItems.update({
          quantity: parseFloat(data.dataValues.quantity) + parseFloat(req.body.quantity)
        }, {
          where: {
            item_name: req.body.item_name
          }
        }).then(function (data) {
          res.json(data);
        });
      }
    })
  });

  //get all foods
  app.get("/api/allfoods/:userid", function (req, res) {
    console.log("here is route" + req.params.userid);

    db.PantryItems.findAll({
      where: {
        UserId: req.params.userid
      }
    }).then(function (data) {

      res.json(data);

    });
  });



  // Get all examples
  app.get("/api/test", function (req, res) {
    db.Recipe.findAll({
      include: [{
        model: db.Ingredient,
        as: 'ingredients',
        attributes: ['id', 'name'],
        through: {
          model: db.recipeIngredients
        }

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

  // Create a new recipe
  app.post("/api/addRecipe", function (req, res) {
    console.log(req.body); //TODO: delete this.  Keep seeing this in console: [Object: null prototype] 
    db.Recipe.create(req.body).then(function (dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPantryAssembler) {
      res.json(dbPantryAssembler);
    });
  });
};