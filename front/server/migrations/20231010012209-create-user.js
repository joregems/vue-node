'use strict';
const { user_model } = require('../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkPasswordStrength(password) {
            // Initialize variables
            // Check password length
            if (password.length < 8) {
              throw new Error('password must be at least 8 characters long');
            }
  
            // Check for mixed case
            else if (!(password.match(/[a-z]/) && password.match(/[A-Z]/))) {
              throw new Error('password must contain lowercase and uppercase letters');
            }
  
            // Check for numbers
            else if (!password.match(/\d/)) {
              throw new Error('password must include at least one number');
            }
  
            // Check for special characters
            if (!password.match(/[^a-zA-Z\d]/)) {
              throw new Error('password must include at least one special character.');
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('User');
  }
};