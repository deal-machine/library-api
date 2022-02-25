'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reserva', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "id_reserva"
      },
      startDate: {
        allowNull:false,
        type: Sequelize.DATE,
        field: "data_inicio"
      },
      endDate: {
        allowNull:false,
        type: Sequelize.DATE,
        field: "data_fim"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "data_cadastro"
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: "data_alteracao"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reserva');
  }
};