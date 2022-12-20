'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SucursalItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SucursalItem.belongsTo(models.Sucursal,{
        foreignKey: 'sucursalId',
        as :'sucursal'
      })
      SucursalItem.belongsTo(models.Producto,{
        foreignKey: 'productoId',
        as :'producto'
      }) 
    }
  }
  SucursalItem.init({
    gestion: DataTypes.INTEGER,
    mes: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    costo: DataTypes.DECIMAL,
    valor: DataTypes.DECIMAL,
    sucursalId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    categoria: DataTypes.STRING,
    marca: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SucursalItem',
  });
  return SucursalItem;
};