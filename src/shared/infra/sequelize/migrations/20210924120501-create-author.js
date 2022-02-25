'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('autor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "id_autor"
      },
      name: {
        allowNull:false,
        type: Sequelize.STRING(80),
        field: "nome"
      }, 
      namePublication: {
        allowNull:false,
        type: Sequelize.STRING(80),
        field: 'nome_publicacao'
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
    await queryInterface.dropTable('autor');
  }
};