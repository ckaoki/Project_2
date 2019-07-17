var db = require("../models");

module.exports = function (app) {
  // Create a user
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
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
      console.log("123");
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};