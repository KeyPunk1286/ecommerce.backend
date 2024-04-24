'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [{
      shop_id: 1,
      title: 'Example Product 1',
      description: 'Description for example product 1',
      price: 9.99,
    }, {
      shop_id: 2,
      title: 'Example Product 2',
      description: 'Description for example product 2',
      price: 19.95,
    }, {
      shop_id: 1,
      title: 'Example Product 3',
      description: 'Description for example product 3',
      price: 19.96,
    }, {
      shop_id: 2,
      title: 'Example Product 4',
      description: 'Description for example product 4',
      price: 19.97,
    }, {
      shop_id: 1,
      title: 'Example Product 5',
      description: 'Description for example product 5',
      price: 19.98,
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
