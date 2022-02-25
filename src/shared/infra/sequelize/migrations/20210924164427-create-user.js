'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "id_usuario"
      },
      name: {
        allowNull:false,
        type: Sequelize.STRING(80),
        field: "nome"
      },
      birthDate: {
        type: Sequelize.DATE,
        field: "data_nascimento"
      },
      cpf: {
        allowNull:false,
        type: Sequelize.STRING(11)
      },
      address: {
        allowNull:false,
        type: Sequelize.STRING(100),
        field: "endereco"
      },
      email: {
        allowNull:false,
        type: Sequelize.STRING(80)
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
    await queryInterface.dropTable('usuario');
  }
};