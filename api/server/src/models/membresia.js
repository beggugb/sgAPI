'use strict';
module.exports = (sequelize, DataTypes) => {
  const Membresia = sequelize.define('Membresia', {
    orden: DataTypes.STRING,
    num: DataTypes.INTEGER,
    ivigencia: DataTypes.DATE,
    fvigencia: DataTypes.DATE,
    registro: DataTypes.DATE,	  
    tipo: DataTypes.STRING,	  
    ingresos: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    renovacion: DataTypes.BOOLEAN,
    intros: DataTypes.INTEGER,
    paqueteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Paquete',
        key: 'id',
        as: 'paqueteId'
      }
    },
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
      }
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'usuarioId'
      }
    }
  }, {});
  
  Membresia.associate = function(models) {
    // associations can be defined here
    Membresia.belongsTo(models.Paquete,{
      foreignKey: 'paqueteId',
      onDelete: 'CASCADE'
    });
    Membresia.belongsTo(models.Cliente,{
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });
    Membresia.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });
  };
  return Membresia;
};
