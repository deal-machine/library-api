'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exemplarlivro', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "id_exemplarlivro"
      },
      sampleCode: {
        allowNull:false,
        type: Sequelize.STRING(20),
        field: "codigo_exemplar"
      },
      provider: {
        allowNull:false,
        type: Sequelize.STRING(80),
        field: "fornecedor"
      },
      purchaseDate: {
        allowNull:false,
        type: Sequelize.DATE,
        field:"data_compra"
      },
      bookId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        field: "id_livro",
        references: {
          model:'livro',
          key:'id_livro'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:"data_cadastro"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "data_alteracao"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exemplarlivro');
  }
};