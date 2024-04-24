'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Customers', [{
      title: 'Customer title 1',
      user_id: 1,
      status: 'Active',
    }, {
      title: 'Customer title 2',
      user_id: 1,
      status: 'Active',
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
