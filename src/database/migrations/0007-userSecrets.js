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
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('userSecrets');
  }
};