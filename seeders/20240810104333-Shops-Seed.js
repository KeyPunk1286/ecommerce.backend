"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("shops", [
      {
        customer_id: 1,
        title: "Shop One",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_id: 2,
        title: "Shop two",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        customer_id: 3,
        title: "Shop Three",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("shops", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
