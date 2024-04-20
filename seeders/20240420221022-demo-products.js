'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [{
      name: 'Example Product 1',
      price: 9.99,
      description: 'Description for example product 1'
    }, {
      name: 'Example Product 2',
      price: 19.99,
      description: 'Description for example product 2'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
