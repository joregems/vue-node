'use strict';
const {
  Model
} = require('sequelize');
module.exports.model = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining  associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }
    toJSON(){
      return {...this.get(), id:undefined, userId:undefined}
    }
  }
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'Post',
  });
  return Post;
};