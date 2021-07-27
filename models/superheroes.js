'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Superheroes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Superheroes.init(
    {
      nickname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      realName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      originDescription: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      catchPhrase: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Superheroes',
      tableName: 'superheroes',
      underscored: true
    }
  )
  return Superheroes
}
