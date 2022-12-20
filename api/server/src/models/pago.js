'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pago = sequelize.define('Pago', {
    fechaPago: DataTypes.DATE,
    pagoTotal: DataTypes.DECIMAL,      
    label: DataTypes.STRING,
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rol',
        key: 'id',
        as: 'rolId'
      }
    }
  }, {});
  
  Pago.associate = function(models) {
    // associations can be defined here
    Pago.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });
    
  };
  return Pago;
};
