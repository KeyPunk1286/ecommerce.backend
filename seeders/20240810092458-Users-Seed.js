"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "john.doe@example.com",
        firstname: "John",
        secondname: "Michael",
        lastname: "Doe",
        password: "hashed_password_1",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "jane.smith@example.com",
        firstname: "Jane",
        secondname: "Ann",
        lastname: "Smith",
        password: "hashed_password_2",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "alice.brown@example.com",
        firstname: "Alice",
        secondname: "Mary",
        lastname: "Brown",
        password: "hashed_password_3",
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
    await queryInterface.bulkDelete("users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
