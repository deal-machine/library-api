'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('livro_autor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "id_livro",
          references: {
            model: 'livro',
            key: 'id_livro'
          }
        },
        authorId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          field: "id_autor",
          references: {
            model: 'autor',
            key: 'id_autor'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: "data_cadastro"
        },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('livro_autor');
  }
};