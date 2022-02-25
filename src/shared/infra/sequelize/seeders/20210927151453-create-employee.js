'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('funcionario', [{
      nome: 'Douglas',
      data_nascimento: new Date("April, 28, 1995 21:30:00"),
      cpf: "12345678900",
      endereco: "Rua Salvador de Oliveira Leme",
      email: "95deal@gmail.com",
      senha: "123456",
      data_cadastro: new Date(),
      data_alteracao: new Date()
    }], {});
   
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('funcionario', null, {});
     
  }
};
