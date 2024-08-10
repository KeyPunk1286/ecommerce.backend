"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        shop_id: 1,
        title: "Product One",
        description: "Description for Product One",
        price: 19.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        shop_id: 1,
        title: "Product Two",
        description: "Description for Product Two",
        price: 29.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        shop_id: 2,
        title: "Product Three",
        description: "Description for Product Three",
        price: 39.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        shop_id: 3,
        title: "Product Four",
        description: "Description for Product Four",
        price: 49.99,
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
    await queryInterface.bulkDelete("products", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
