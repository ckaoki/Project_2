module.exports = function(sequelize, DataTypes) {
    var PantryItems = sequelize.define("PantryItems", {
      item_name: DataTypes.STRING,
     
    });
    PantryItems.associate = function(models) {
        PantryItems.belongsToMany(models.Users, {
          through: "UsersPantries",
          as: 'owner',
          foreignKey: 'itemId',
          onDelete: "cascade"
        });
      };
    return PantryItems;
  };