'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Compra.belongsTo(models.Proveedor,{
        foreignKey: 'proveedorId',
        as: 'proveedor'
      })
      Compra.belongsTo(models.Sucursal,{
        foreignKey: 'sucursalId',
        as: 'sucursal'
      })
      Compra.belongsTo(models.Usuario,{
        foreignKey: 'usuarioId',
        as: 'usuario'
      })

    }
  }
  Compra.init({
    nro: DataTypes.STRING,
    fechaCompra: DataTypes.DATE,
    tipo: DataTypes.STRING,
    nroItems: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    observaciones: DataTypes.STRING,
    estado: DataTypes.STRING,
    proveedors: DataTypes.STRING,
    nroPagos: DataTypes.INTEGER,
    fechaAprobacion: DataTypes.DATE,
    gestion: DataTypes.INTEGER,
    mes: DataTypes.INTEGER,
    subTotal: DataTypes.DECIMAL,
    iva: DataTypes.DECIMAL,
    descuento: DataTypes.DECIMAL,
    impuesto: DataTypes.DECIMAL,
    totalGeneral: DataTypes.DECIMAL,
    origen: DataTypes.STRING,
    proveedorId: DataTypes.INTEGER,
    sucursalId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};