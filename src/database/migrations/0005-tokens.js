'use strict';
const {DataTypes} = require("sequelize");
const Sequelize = require("sequelize");
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('tokens', {
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
      token_id: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('tokens');
  }
};