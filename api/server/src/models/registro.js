'use strict';
module.exports = (sequelize, DataTypes) => {
  const Registro = sequelize.define('Registro', {
    registro: DataTypes.DATE,
    tipo: DataTypes.STRING,
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
      }
    }
  }, {});
  
  Registro.associate = function(models) {
    // associations can be defined here
    Registro.belongsTo(models.Cliente,{
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });
  };
  return Registro;
};
