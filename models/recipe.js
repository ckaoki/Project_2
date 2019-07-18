module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    instructions: DataTypes.STRING    
  });

  Recipe.associate = function(models) {
    Recipe.belongsToMany(models.Ingredient, {
      through: "recipeIngredients",
      as: 'ingredients',
      foreignKey: 'recipeId',
      onDelete: "cascade"
    });
  };

  return Recipe;
};
