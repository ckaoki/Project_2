module.exports = function(sequelize, DataTypes) {
    var PantryItems = sequelize.define("PantryItems", {
      item_name: DataTypes.STRING,
     
    });
    // PantryItems.associate = function(models) {
    //     Recipe.belongsToMany(models.Users, {
    //       through: "recipeIngredients",
    //       as: 'ingredients',
    //       foreignKey: 'recipeId',
    //       onDelete: "cascade"
    //     });
    //   };
    return PantryItems;
  };