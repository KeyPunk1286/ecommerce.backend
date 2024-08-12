"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("customers", [
      {
        title: "Customer One",
        user_id: 1,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Customer Two",
        user_id: 2,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Customer Three",
        user_id: 3,
        status: "inactive",
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
    await queryInterface.bulkDelete("customers", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
