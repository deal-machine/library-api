'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('livro_assunto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'id_livro',
          references: {
            model: 'livro',
            key: 'id_livro',
            name:'bookId'
          }
        },
        topicId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          field: 'id_assunto',
          references: {
            model: 'assunto',
            key: 'id_assunto',
            name:'topicId',
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          name:'createdAt',
          field: 'data_cadastro'
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('livro_assunto');
  }
};