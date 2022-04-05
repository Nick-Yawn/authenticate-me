'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkInsert('users', [
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashed_password: bcrypt.hashSync('password')
        },
        {
          email: 'user1@user.io',
          username: 'FakeUser1',
          hashed_password: bcrypt.hashSync('password2')
        },
        {
          email: 'user2@user.io',
          username: 'FakeUser2',
          hashed_password: bcrypt.hashSync('password3')
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkDelete('users', 
        { username: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }, 
        {});
  }
};
