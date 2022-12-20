'use strict';
module.exports = (sequelize, DataTypes) => {
  const Caja = sequelize.define('Caja', {
    estado: DataTypes.BOOLEAN,
    montoInicial: DataTypes.DECIMAL,
    montoEgreso: DataTypes.DECIMAL,
    montoIngreso: DataTypes.DECIMAL,
    montoFinal: DataTypes.DECIMAL,
    fechaCierre: DataTypes.DATE,
    registro: DataTypes.DATE,
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'usuarioId'
      }
    }
  }, {});
  
  Caja.associate = function(models) {
    // associations can be defined here
    Caja.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });
  };
  return Caja;
};
