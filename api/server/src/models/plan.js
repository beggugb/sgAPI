'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    cuota: DataTypes.INTEGER,
    fechaPago: DataTypes.DATE,
    importe: DataTypes.DECIMAL,
    estado: DataTypes.STRING,  
    mes: DataTypes.INTEGER,
    isVenta: DataTypes.BOOLEAN,
    gestion: DataTypes.INTEGER,  
    notaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Nota',
        key: 'id',
        as: 'notaId'
      }
    }
  }, {});
  
  Plan.associate = function(models) {
    // associations can be defined here
    Plan.belongsTo(models.Nota,{
      foreignKey: 'notaId',
      onDelete: 'CASCADE'
    });
  };
  return Plan;
};
