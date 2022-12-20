'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      nombreCorto: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      tipo: {
        type: Sequelize.STRING
      },
      inCatalogo: {
        type: Sequelize.BOOLEAN
      },
      inOferta: {
        type: Sequelize.BOOLEAN
      },
      precioVenta: {
        type: Sequelize.DECIMAL
      },
      precioCosto: {
        type: Sequelize.DECIMAL
      },
      filename: {
        type: Sequelize.STRING
      },
      colores: {
        type: Sequelize.STRING
      },
      precioOferta: {
        type: Sequelize.DECIMAL
      },
      pDescuento: {
        type: Sequelize.INTEGER
      },
      medida: {
        type: Sequelize.STRING
      },
      sma: {
        type: Sequelize.INTEGER
      },
      te: {
        type: Sequelize.INTEGER
      },
      cp: {
        type: Sequelize.INTEGER
      },
      ter: {
        type: Sequelize.INTEGER
      },
      smi: {
        type: Sequelize.INTEGER
      },
      ss: {
        type: Sequelize.INTEGER
      },
      ms: {
        type: Sequelize.INTEGER
      },
      pr: {
        type: Sequelize.INTEGER
      },
      nm: {
        type: Sequelize.STRING
      },
      nv: {
        type: Sequelize.STRING
      },
      subcategoria: {
        type: Sequelize.STRING
      },
      lote: {
        type: Sequelize.STRING
      },
      vencimiento: {
        type: Sequelize.DATE
      },      
      tipoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Tipos',
            key: 'id',
            as: 'tipoId'
          }
      }, 
      volumenId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Volumens',
            key: 'id',
            as: 'volumenId'
          }
      }, 
      origenId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Origens',
            key: 'id',
            as: 'origenId'
          }
      }, 
      categoriaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Categoria',
            key: 'id',
            as: 'categoriaId'
          }
      },
      marcaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Marcas',
            key: 'id',
            as: 'marcaId'
          }
      },
      unidadId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Unidads',
            key: 'id',
            as: 'unidadId'
          }
      },
      modeloId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Modelos',
            key: 'id',
            as: 'modeloId'
          }
      },
      industriaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Industria',
            key: 'id',
            as: 'industriaId'
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Productos');
  }
};