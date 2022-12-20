'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Industria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Industria.init({
    nombre: DataTypes.STRING,
    codigo: DataTypes.STRING,
    pais: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Industria',
  });
  return Industria;
};
