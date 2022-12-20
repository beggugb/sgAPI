'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro: {
        type: Sequelize.STRING
      },
      fechaCompra: {
        type: Sequelize.DATE
      },
      tipo: {
        type: Sequelize.STRING
      },
      nroItems: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.DECIMAL
      },
      observaciones: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      proveedors: {
        type: Sequelize.STRING
      },
      nroPagos: {
        type: Sequelize.INTEGER
      },
      fechaAprobacion: {
        type: Sequelize.DATE
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
      iva: {
        type: Sequelize.DECIMAL
      },
      descuento: {
        type: Sequelize.DECIMAL
      },
      impuesto: {
        type: Sequelize.DECIMAL
      },
      totalGeneral: {
        type: Sequelize.DECIMAL
      },
      origen: {
        type: Sequelize.STRING
      },
      proveedorId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Proveedors',
            key: 'id',
            as: 'proveedorId'
          }
      },
      sucursalId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Sucursals',
            key: 'id',
            as: 'sucursalId'
          }
      },
      usuarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id',
            as: 'usuariolId'
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
    await queryInterface.dropTable('Compras');
  }
};