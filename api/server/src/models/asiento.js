'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asiento = sequelize.define('Asiento', {
    glosa: DataTypes.STRING,
    respaldo: DataTypes.STRING,
    debe: DataTypes.DECIMAL,
    haber: DataTypes.DECIMAL,
    descripcion: DataTypes.STRING,
    cc: DataTypes.STRING,
    referencia: DataTypes.STRING,
    auxiliar: DataTypes.STRING,    
    comprobanteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comprobante',
        key: 'id',
        as: 'comprobanteId'
      }
    },
    pucId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Puc',
        key: 'id',
        as: 'pucId'
      }
    },
  }, {});
  
  Asiento.associate = function(models) {
    // associations can be defined here
    Asiento.belongsTo(models.Comprobante,{
      foreignKey: 'comprobanteId',
      onDelete: 'CASCADE'
    });
    Asiento.belongsTo(models.Puc,{
      foreignKey: 'pucId',
      onDelete: 'CASCADE'
    });
  };
  return Asiento;
};
