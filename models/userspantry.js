module.exports = function(sequelize, DataTypes) {
    var UsersPantries = sequelize.define("UsersPantries", {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        },
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      itemId: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        },
        references: {
          model: 'PantryItems',
          key: 'id'
        }
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      unit: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    });
  
  
    return UsersPantries;
  };
  