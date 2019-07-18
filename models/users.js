module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    // description: DataTypes.TEXT
  });
  Users.associate = function(models) {
    Users.belongsToMany(models.PantryItems, {
      through: "UsersPantries",
      as: 'belongings',
      foreignKey: 'userId',
      onDelete: "cascade"
    });
  };
  return Users;
};
