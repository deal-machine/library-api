'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assunto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "id_assunto"
      },
      description: {
        allowNull:false,
        type: Sequelize.STRING(80),
        field: "descricao"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "data_cadastro"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "data_alteracao"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('assunto');
  }
};