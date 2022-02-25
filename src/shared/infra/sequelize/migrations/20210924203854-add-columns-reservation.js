'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('reserva', 'id_funcionario', Sequelize.INTEGER);

    await queryInterface.addColumn('reserva', 'id_exemplarlivro', Sequelize.INTEGER);
    
    await queryInterface.addColumn('reserva', 'id_usuario', Sequelize.INTEGER);
    
    await queryInterface.addColumn('reserva', 'id_aluguel', Sequelize.INTEGER);

    await queryInterface.addConstraint('reserva', {
      fields: ['id_funcionario'],
      type: 'foreign key',
      name: 'fk_funcionario_reserva',
      references: {
        table: 'funcionario',
        field: 'id_funcionario'
      }
    });

    await queryInterface.addConstraint('reserva', {
      fields: ['id_exemplarlivro'],
      type: 'foreign key',
      name: 'fk_exemplarlivro_reserva',
      references: {
        table: 'exemplarlivro',
        field: 'id_exemplarlivro'
      }
    });

    await queryInterface.addConstraint('reserva', {
      fields: ['id_usuario'],
      type: 'foreign key',
      name: 'fk_usuario_reserva',
      references: {
        table: 'usuario',
        field: 'id_usuario'
      }
    });

    await queryInterface.addConstraint('reserva', {
      fields: ['id_aluguel'],
      type: 'foreign key',
      name: 'fk_aluguel_reserva',
      onDelete:"SET NULL",
      references: {
        table: 'aluguel',
        field: 'id_aluguel',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeConstraint('reserva', 'fk_funcionario_reserva');
    await queryInterface.removeColumn('reserva','id_funcionario');

    await queryInterface.removeConstraint('reserva', 'fk_exemplarlivro_reserva');
    await queryInterface.removeColumn('reserva','id_exemplarlivro');

    await queryInterface.removeConstraint('reserva', 'fk_usuario_reserva');
    await queryInterface.removeColumn('reserva','id_usuario');

    await queryInterface.removeConstraint('reserva', 'fk_aluguel_reserva');
    await queryInterface.removeColumn('reserva','id_aluguel');
    
  }
};
