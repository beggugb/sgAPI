'use strict';
module.exports = (sequelize, DataTypes) => {
  const imembresias = sequelize.define('imembresias', {
    usuarioId: DataTypes.INTEGER,
    ivigencia: DataTypes.DATE,
    fvigencia: DataTypes.DATE,	  
    ingresos: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,	  
    cliente: DataTypes.STRING,
    paquete: DataTypes.STRING,	  
    valor: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN

  }, {});
  
  imembresias.associate = function(models) {
    // associations can be defined here
  };
  return imembresias;
};
