'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shop_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
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
      CREATE TRIGGER update_updated_at_column BEFORE UPDATE ON "Products"
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');

    // Видалення функції
    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS update_updated_at_column();
    `);

    // Видалення тригера
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS update_updated_at_column ON "Products";
    `);
  }
};
