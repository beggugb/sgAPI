'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompraItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.DECIMAL
      },
      categoria: {
        type: Sequelize.STRING
      },
      marca: {
        type: Sequelize.STRING
      },
      gestion: {
        type: Sequelize.INTEGER
      },
      mes: {
        type: Sequelize.INTEGER
      },
      subTotal: {
        type: Sequelize.DECIMAL
      },
      unidad: {
        type: Sequelize.STRING
      },     
      compraId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Compras',
            key: 'id',
            as: 'compraId'
          }
      },
      productoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Productos',
            key: 'id',
            as: 'productoId'
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
    await queryInterface.dropTable('CompraItems');
  }
};