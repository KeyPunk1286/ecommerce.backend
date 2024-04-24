'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'Zelya Pidor',
      email: 'zeleniy.sifilis@gandony.ebanie',
      password: '123456',
      token: '',
    }, {
      name: 'Steve Jobs',
      email: 'iphone@norm.tak',
      password: '123456',
      token: '',
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
