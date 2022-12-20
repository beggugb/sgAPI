'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comprobante = sequelize.define('Comprobante', {
    tipo: DataTypes.STRING,
    label: DataTypes.STRING,
    ncomprobante: DataTypes.STRING,
    glosa: DataTypes.STRING,
    impuesto: DataTypes.DECIMAL,
    subtotal: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    gestion: DataTypes.INTEGER,
    tDebe: DataTypes.DECIMAL,
    tHaber: DataTypes.DECIMAL,
    estado: DataTypes.STRING,    
    cajaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Caja',
        key: 'id',
        as: 'cajaId'
      }
    },
    ventaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Venta',
        key: 'id',
        as: 'ventaId'
      }
    }
  }, {});
  
  Comprobante.associate = function(models) {
    // associations can be defined here
    Comprobante.belongsTo(models.Caja,{
      foreignKey: 'cajaId',
      onDelete: 'CASCADE'
    });
    Comprobante.belongsTo(models.Venta,{
      foreignKey: 'ventaId',
      onDelete: 'CASCADE'
    });
  };
  return Comprobante;
};
