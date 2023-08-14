'use strict';
const uuidv4 = require('uuid').v4;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('post_category', [
      {
        id: uuidv4(),
        name: 'sports',
        slug: 'sports',
        description:
          "It seems like you're asking about sports in general. Sports refer to various physical activities or games that involve competition and physical exertion, often governed by a set of rules or regulations. Sports can be recreational, competitive, or professional, and they are enjoyed by people of all ages and from all walks of life.",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('post_category', null, {});
  },
};
