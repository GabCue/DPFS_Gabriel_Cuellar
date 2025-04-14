'use strict';

const path = require('path');
const users = require(path.resolve(__dirname, '../../data/users.json'));

module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();
    const usersWithTimestamps = users.map(user => ({
      ...user,
      createdAt: timestamp,
      updatedAt: timestamp
    }));
    await queryInterface.bulkInsert('Users', usersWithTimestamps, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
