'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'Zelya Pidor',
      email: 'zeleniy.sifilis@gandony.ebanie'
    }, {
      name: 'Steve Jobs',
      email: 'iphone@norm.tak'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
