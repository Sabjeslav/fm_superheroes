'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('superheroes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      realName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'real_name'
      },
      originDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'origin_description'
      },
      superpowers: {
        type: Sequelize.STRING,
        allowNull: false
      },
      catchPhrase: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'catch_phrase'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('superheroes')
  }
}
