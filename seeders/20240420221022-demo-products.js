'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [{
      user_id: 1,
      name: 'Example Product 1',
      price: 9.99,
      description: 'Description for example product 1'
    }, {
      user_id: 2,
      name: 'Example Product 2',
      price: 19.95,
      description: 'Description for example product 2'
    }, {
      user_id: 1,
      name: 'Example Product 3',
      price: 19.96,
      description: 'Description for example product 3'
    }, {
      user_id: 2,
      name: 'Example Product 4',
      price: 19.97,
      description: 'Description for example product 4'
    }, {
      user_id: 1,
      name: 'Example Product 5',
      price: 19.98,
      description: 'Description for example product 5'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
