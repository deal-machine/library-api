'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('livro', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "id_livro"
      },
      title: {
        allowNull:false,
        type: Sequelize.STRING(80),
        field: "titulo"
      },
      abstract: {
        allowNull:false,
        type: Sequelize.STRING(800),
        field: "resumo"
      },
      release: {
        allowNull:false,
        type: Sequelize.DATE,
        field: 'data_lancamento'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'data_cadastro'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'data_alteracao'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('livro');
  }
};