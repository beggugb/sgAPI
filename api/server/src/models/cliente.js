'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cliente.init({
    nombres: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    celular: DataTypes.STRING,
    filename: DataTypes.STRING,    
    pais: DataTypes.STRING,
    sexo: DataTypes.STRING,	  
    ciudad: DataTypes.STRING,
    ci: DataTypes.STRING,	  
    nit: DataTypes.STRING,	  
    estado: DataTypes.BOOLEAN,
    ciudad: DataTypes.STRING,
    pais: DataTypes.STRING,
    tipo: DataTypes.STRING,
    isCliente: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};
