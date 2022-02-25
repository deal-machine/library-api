'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('aluguel', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "id_aluguel"
      },
      rentalDate: {
        allowNull:false,
        type: Sequelize.DATE,
        field: "data_aluguel"
      },
      expectedReturnDate: {
        allowNull:false,
        type: Sequelize.DATE,
        field: "dataprevista_devolucao"
      },
      returnDate: {
        type: Sequelize.DATE,
        field: "data_devolucao"
      },
      penalty: {
        type: Sequelize.REAL,
        field: "multa"
      },
      createdAt: {
        allowNull: true,
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
    await queryInterface.dropTable('aluguel');
  }
};