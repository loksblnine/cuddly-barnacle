'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
  up: async (queryInterface) => {
    return [await queryInterface.createTable('roles', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }),
      await queryInterface.bulkInsert('roles', [{
        id: 1,
        description: 'ADMIN'
      }, {
        id: 2,
        description: 'REGULAR'
      }])];
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('roles');
  }
};