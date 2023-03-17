'use strict';
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('portfolios', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('now')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('now')
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('portfolios');
  }
};