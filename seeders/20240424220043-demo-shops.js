'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Shops', [{
      customer_id: 1,
      title: 'Shop title 1',
      is_active: true
    }, {
      customer_id: 1,
      title: 'Shop title 2',
      is_active: true
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Shops', null, {});
  }
};
