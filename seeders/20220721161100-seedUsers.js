'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    let values = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))
    values.forEach(el => {
      el.createdAt= new Date(),
      el.updatedAt= new Date() 
    })
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Users', values, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
