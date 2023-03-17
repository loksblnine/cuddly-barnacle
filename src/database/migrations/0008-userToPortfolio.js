'use strict';
const {DataTypes} = require("sequelize");
const Sequelize = require("sequelize");
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('userSecrets', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      portfolio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'portfolios',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('userSecrets');
  }
};