'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define('Tarea', {
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    classNames: DataTypes.STRING,
    detalle: DataTypes.STRING,	  
    editable: DataTypes.BOOLEAN,
    backgroundColor: DataTypes.STRING,
    selectable: DataTypes.BOOLEAN,    
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'usuarioId'
      }
    }
  }, {});
  
  Tarea.associate = function(models) {
    // associations can be defined here
    Tarea.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });
  };
  return Tarea;
};
