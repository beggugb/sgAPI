'use strict';
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
      unique: true
    },
    password: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    sucursalId: DataTypes.INTEGER,    
    rolId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rol',
        key: 'id',
        as: 'rolId'
      }
    }    
  }, {});
  
  Usuario.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  /*Usuario.beforeUpdate((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });*/
  Usuario.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  Usuario.associate = function (models) {
    // associations can be defined here
    Usuario.belongsTo(models.Rol, {
      foreignKey: 'rolId',
      onDelete: 'CASCADE'
    });    
  };
  return Usuario;
};
