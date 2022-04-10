'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkInsert('spot_amenities', [
        {spot_id: 1, amenity_id: 1},
        {spot_id: 1, amenity_id: 2},
        {spot_id: 1, amenity_id: 3},
        {spot_id: 1, amenity_id: 4},
        {spot_id: 1, amenity_id: 5},
        {spot_id: 1, amenity_id: 7},
        {spot_id: 1, amenity_id: 8},
        {spot_id: 1, amenity_id: 18},
        {spot_id: 1, amenity_id: 37},
        {spot_id: 1, amenity_id: 40},
        {spot_id: 2, amenity_id: 1},
        {spot_id: 2, amenity_id: 2},
        {spot_id: 2, amenity_id: 3},
        {spot_id: 2, amenity_id: 4},
        {spot_id: 2, amenity_id: 5},
        {spot_id: 2, amenity_id: 6},
        {spot_id: 2, amenity_id: 7},
        {spot_id: 2, amenity_id: 8},
        {spot_id: 2, amenity_id: 9},
        {spot_id: 2, amenity_id: 10},
        {spot_id: 2, amenity_id: 12},
        {spot_id: 2, amenity_id: 13},
        {spot_id: 2, amenity_id: 15},
        {spot_id: 2, amenity_id: 14},
        {spot_id: 2, amenity_id: 16},
        {spot_id: 2, amenity_id: 17},
        {spot_id: 2, amenity_id: 18},
        {spot_id: 2, amenity_id: 19},
        {spot_id: 2, amenity_id: 20},
        {spot_id: 2, amenity_id: 22},
        {spot_id: 2, amenity_id: 23},
        {spot_id: 2, amenity_id: 24},
        {spot_id: 2, amenity_id: 25},
        {spot_id: 2, amenity_id: 27},
        {spot_id: 2, amenity_id: 28},
        {spot_id: 2, amenity_id: 29},
        {spot_id: 2, amenity_id: 30},
        {spot_id: 2, amenity_id: 31},
        {spot_id: 2, amenity_id: 32},
        {spot_id: 2, amenity_id: 33},
        {spot_id: 2, amenity_id: 34},
        {spot_id: 2, amenity_id: 37},
        {spot_id: 2, amenity_id: 39},
        {spot_id: 2, amenity_id: 40},
        {spot_id: 2, amenity_id: 41},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkDelete('spot_amenities', null, {});
  }
};
