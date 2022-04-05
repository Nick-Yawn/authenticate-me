'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      district_id: {
        defaultValue: null,
        type: Sequelize.INTEGER,
        references: { model: 'districts' }
      },
      address: {
        type: Sequelize.STRING(100)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      state: {
        type: Sequelize.STRING(50)
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(12,2)
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'users'}
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('spots');
  }
};
