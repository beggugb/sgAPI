'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SucursalItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gestion: {
        type: Sequelize.INTEGER
      },
      mes: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      costo: {
        type: Sequelize.DECIMAL
      },
      valor: {
        type: Sequelize.DECIMAL
      },
      sucursalId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Sucursals',
            key: 'id',
            as: 'sucursalId'
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
      categoria: {
        type: Sequelize.STRING
      },
      marca: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('SucursalItems');
  }
};