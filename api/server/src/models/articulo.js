'use strict';
module.exports = (sequelize, DataTypes) => {
  const Articulo = sequelize.define('Articulo', {
    nombre: DataTypes.STRING,
    code: DataTypes.STRING,
    variantes: DataTypes.STRING,
    pventa: DataTypes.DECIMAL,
    filename: DataTypes.STRING,
    stock: DataTypes.INTEGER,    
    categoriaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categoria',
        key: 'id',
        as: 'categoriaId'
      }
    }
  }, {});
  
  Articulo.associate = function(models) {
    // associations can be defined here
    Articulo.belongsTo(models.Categoria,{
      foreignKey: 'categoriaId',
      onDelete: 'CASCADE'
    });
  };
  return Articulo;
};
