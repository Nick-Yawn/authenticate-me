'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkInsert('districts', [
        { name: 'Watson' },
        { name: 'City Center' },
        { name: 'Heywood' },
        { name: 'Pacifica' },
        { name: 'Santo Domingo' },
        { name: 'Westbrook' }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkDelete('districts', null, {});
  }
};
