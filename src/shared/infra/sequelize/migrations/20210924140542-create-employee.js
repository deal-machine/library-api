'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('funcionario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "id_funcionario"
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(80),
        field: "nome"
      },
      birthDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "data_nascimento"
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING(11)
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100),
        field: "endereco"
      },
      isAdmin:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        field: "administrador",
        defaultValue: false
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(100),
        field: "senha"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'data_cadastro'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "data_alteracao"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('funcionario');
  }
};