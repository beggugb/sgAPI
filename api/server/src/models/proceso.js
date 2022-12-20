'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proceso = sequelize.define('Proceso', {    
    label: DataTypes.STRING,
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'usuarioId'
      }
    }
  }, {});
  
  Proceso.associate = function(models) {
    // associations can be defined here
    Proceso.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });
  };
  return Proceso;
};
