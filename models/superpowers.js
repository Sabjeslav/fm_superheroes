'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class superpowers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      superpowers.belongsToMany(models.Superhero, {
        through: 'superheroes_to_superpowers',
        foreignKey: 'superpowerId',
      });
    }
  }
  superpowers.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'superpowers',
      tableName: 'superpowers',
      underscored: true,
    }
  );
  return superpowers;
};
