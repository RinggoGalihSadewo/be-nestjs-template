'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        role_id: 1,
        name: 'Ringgo Galih Sadewo',
        username: 'ringgo',
        email: 'ringgo@gmail.com',
        password:
          '$2b$10$3n0SiMNyTm/EY.GBTIwj7eUjqSHBa5IzFSPP4Pi5lGPtOySawX/De',
        photo: 'default.png',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
