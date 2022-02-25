'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('aluguel', 'id_funcionario', Sequelize.INTEGER, { after: 'id_aluguel' });

    await queryInterface.addColumn('aluguel', 'id_exemplarlivro', Sequelize.INTEGER, { after: 'id_funcionario' });

    await queryInterface.addColumn('aluguel', 'id_usuario', Sequelize.INTEGER, { after: 'id_exemplarlivro' });

    await queryInterface.addConstraint('aluguel', {
      fields: ['id_funcionario'],
      type: 'foreign key',
      name: 'fk_funcionario_aluguel',
      references: {
        table: 'funcionario',
        field: 'id_funcionario',
      }
    });

    await queryInterface.addConstraint('aluguel',{
      fields: ['id_exemplarlivro'],
      type: 'foreign key',
      name: 'fk_exemplarlivro_aluguel',
      references:{
        table: 'exemplarlivro',
        field: 'id_exemplarlivro'
      }
    });

    await queryInterface.addConstraint('aluguel',{
      fields: ['id_usuario'],
      type: 'foreign key',
      name: 'fk_usuario_aluguel',
      references: {
        table: 'usuario',
        field: 'id_usuario'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeConstraint('aluguel', 'fk_funcionario_aluguel');
    await queryInterface.removeColumn('aluguel', 'id_funcionario');

    await queryInterface.removeConstraint('aluguel', 'fk_exemplarlivro_aluguel');
    await queryInterface.removeColumn('aluguel', 'id_exemplarlivro');

    await queryInterface.removeConstraint('aluguel', 'fk_usuario_aluguel');
    await queryInterface.removeColumn('aluguel', 'id_usuario');
  }
};
