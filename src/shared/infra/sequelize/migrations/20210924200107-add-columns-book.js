'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('livro', 'id_editora', Sequelize.INTEGER);

    await queryInterface.addConstraint('livro', {
      fields: ['id_editora'],
      type: 'foreign key',
      name: 'fk_editora_livro',
      references: {
        table: 'editora',
        field: 'id_editora'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeConstraint('livro','fk_editora_livro');
    await queryInterface.removeColumn('livro', 'id_editora');
  }
};
