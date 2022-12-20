'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nota = sequelize.define('Nota', {
    ncuotas: DataTypes.INTEGER,
    monto: DataTypes.DECIMAL,
    pagoTotal: DataTypes.DECIMAL,
    saldoTotal: DataTypes.DECIMAL,
    gestion: DataTypes.INTEGER,
    ivigencia: DataTypes.DATE,
    fvigencia: DataTypes.DATE,      
    isVenta:  DataTypes.BOOLEAN,
    tipo:  DataTypes.STRING,
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'usuarioId'
      }
    },
    membresiaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Membresia',
        key: 'id',
        as: 'membresiaId'
      }
    },    
    compraId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Compra',
        key: 'id',
        as: 'compraId'
      }
    },    
    ventaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Venta',
        key: 'id',
        as: 'ventaId'
      }
    },
  }, {});
  
  Nota.associate = function(models) {
    // associations can be defined here
    Nota.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });
    Nota.belongsTo(models.Membresia,{
      foreignKey: 'membresiaId',
      onDelete: 'CASCADE'
    });
    Nota.belongsTo(models.Compra,{
      foreignKey: 'compraId',
      onDelete: 'CASCADE'
    });
    Nota.belongsTo(models.Venta,{
      foreignKey: 'ventaId',
      onDelete: 'CASCADE'
    });
  };
  return Nota;
};
