'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });

    // Створення функції для тригера
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Додавання тригера для автоматичного оновлення updated_at
    await queryInterface.sequelize.query(`
      CREATE TRIGGER update_updated_at_column BEFORE UPDATE ON "Users"
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');

    // Видалення функції
    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS update_updated_at_column();
    `);

    // Видалення тригера
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS update_updated_at_column ON "Users";
    `);
  }
};
