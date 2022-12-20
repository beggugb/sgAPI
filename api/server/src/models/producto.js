'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Producto.belongsTo(models.Tipo,{
        foreignKey: 'tipoId',
        as: 'tipos'
      });
      Producto.belongsTo(models.Volumen,{
        foreignKey: 'volumenId',
        as: 'volumen'
      });    
      Producto.belongsTo(models.Origen,{
        foreignKey: 'origenId',
        as: 'origen'
      });
      Producto.belongsTo(models.Categoria,{
        foreignKey: 'categoriaId',
        as: 'categoria'
      });
      Producto.belongsTo(models.Marca,{
        foreignKey: 'marcaId',
        as: 'marca'
      });
      Producto.belongsTo(models.Unidad,{
        foreignKey: 'unidadId',
        as: 'unidad'
      }),
      Producto.belongsTo(models.Modelo,{
        foreignKey: 'modeloId',
        as: 'modelo'
      }),
      Producto.belongsTo(models.Industria,{
        foreignKey: 'industriaId',
        as: 'industria'
      })
    }
  }
  Producto.init({
    nombre: DataTypes.STRING,
    nombreCorto: DataTypes.STRING,
    codigo: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    tipo: DataTypes.STRING,
    inCatalogo: DataTypes.BOOLEAN,
    inOferta: DataTypes.BOOLEAN,
    precioVenta: DataTypes.DECIMAL,
    precioCosto: DataTypes.DECIMAL,
    filename: DataTypes.STRING,
    colores: DataTypes.STRING,
    precioOferta: DataTypes.DECIMAL,
    pDescuento: DataTypes.INTEGER,
    medida: DataTypes.STRING,
    sma: DataTypes.INTEGER,
    te: DataTypes.INTEGER,
    cp: DataTypes.INTEGER,
    ter: DataTypes.INTEGER,
    smi: DataTypes.INTEGER,
    ss: DataTypes.INTEGER,
    ms: DataTypes.INTEGER,
    pr: DataTypes.INTEGER,
    nm: DataTypes.STRING,
    nv: DataTypes.STRING,
    subcategoria: DataTypes.STRING,
    lote: DataTypes.STRING,
    vencimiento: DataTypes.DATE,
    tipoId: DataTypes.INTEGER,
    volumenId: DataTypes.INTEGER,
    origenId: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER,
    marcaId: DataTypes.INTEGER,
    unidadId: DataTypes.INTEGER,
    modeloId: DataTypes.INTEGER,
    industriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};