'use strict';
const {
  Model
} = require('sequelize');
module.exports.model = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
      // define association here
      this.hasMany(Product, { foreignKey: 'productUuid', as: 'products' })
    }

    toJSON(){
      return {...this.get(), id: undefined}
    }
  }
  ShoppingCart.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};
