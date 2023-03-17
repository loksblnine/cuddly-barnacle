'use strict';
const { DataTypes } = require("sequelize");
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: "users_email_key"
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};