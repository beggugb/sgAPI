'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paquete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Paquete.init({
    nombre: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    diario: DataTypes.BOOLEAN,	  
    medio: DataTypes.BOOLEAN,
    enabled: DataTypes.BOOLEAN,
    meses: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Paquete',
  });
  return Paquete;
};
