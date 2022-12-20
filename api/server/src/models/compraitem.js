'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompraItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompraItem.belongsTo(models.Compra, {
        foreignKey: 'compraId',
        as: 'compra',
      });
      CompraItem.belongsTo(models.Producto, {
        foreignKey: 'productoId',
        as: 'producto',
      });

    }
  }
  CompraItem.init({
    cantidad: DataTypes.INTEGER,
    codigo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    categoria: DataTypes.STRING,
    marca: DataTypes.STRING,
    gestion: DataTypes.INTEGER,
    mes: DataTypes.INTEGER,
    subTotal: DataTypes.DECIMAL,
    unidad: DataTypes.STRING,
    compraId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CompraItem',
  });
  return CompraItem;
};