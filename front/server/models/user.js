'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../src/encript');

module.exports.model = (sequelize, DataTypes) => {
  const user_model={
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        checkEmptyName(name) {
          if(name===''){
            throw new Error('name must not be empty');
          }

        }
      }
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
      validate: {
        checkRole(role){
          const allowed_roles= ['admin', 'user']
          if (!allowed_roles.includes(role)){
            throw new Error('Must be an allowed role: '+allowed_roles.toString().replace(",",", "));
          }

        }
      }
    }
  
  }
  module.exports.fields = user_model;
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
    }
    toJSON() {
      return { ...this.get(), id: undefined, password: undefined }
    }
  }
  User.init(
    user_model,
    {
      hooks: {
        //this encrypt the password before store
        afterValidate: async (user, options) => {
          const hash = await hashPassword(user.password);
          user.password = hash;
        }
      },
      sequelize,
      tableName: 'User',
      modelName: 'User',
    }

  );
  return User;
};