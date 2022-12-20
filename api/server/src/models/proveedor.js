'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Proveedor.init({
    codigo: DataTypes.STRING,
    tipoFiscal: DataTypes.STRING,
    tipoProveedor: DataTypes.STRING,
    razonSocial: DataTypes.STRING,
    direccion: DataTypes.STRING,
    pais: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    contacto: DataTypes.STRING,
    mail: DataTypes.STRING,
    web: DataTypes.STRING,
    telefono: DataTypes.STRING,
    nit: DataTypes.STRING,
    filename: DataTypes.STRING,
    fundempresa: DataTypes.STRING,
    formaPago: DataTypes.STRING,
    banco: DataTypes.STRING,
    cuenta: DataTypes.STRING,
    observaciones: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Proveedor',
  });
  return Proveedor;
};