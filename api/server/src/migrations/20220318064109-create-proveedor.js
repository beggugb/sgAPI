'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Proveedors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING
      },
      tipoFiscal: {
        type: Sequelize.STRING
      },
      tipoProveedor: {
        type: Sequelize.STRING
      },
      razonSocial: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      pais: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      },
      contacto: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      web: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      fundempresa: {
        type: Sequelize.STRING
      },
      formaPago: {
        type: Sequelize.STRING
      },
      banco: {
        type: Sequelize.STRING
      },
      cuenta: {
        type: Sequelize.STRING
      },
      observaciones: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL
      },
      longitude: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Proveedors');
  }
};