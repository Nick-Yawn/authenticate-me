'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkInsert('amenities', [
        { name: 'Wifi', icon_class: 'fa-solid fa-wifi' },
        { name: 'Dishes and Silverware', icon_class: 'fa-solid fa-plate-utensils' },
        { name: 'Refrigerator', icon_class: 'fa-solid fa-refrigerator' },
        { name: 'Cooking Basics', icon_class: 'fa-solid fa-kitchen-set' },
        { name: 'Coffee Maker', icon_class: 'fa-solid fa-coffee-pot' },
        { name: 'Bottled Water', icon_class: 'fa-solid fa-bottle-water' },
        { name: 'Filtered Water', icon_class: 'fa-solid fa-faucet-drip' },
        { name: 'Shower', icon_class: 'fa-solid fa-shower' },
        { name: 'Wine Glasses', icon_class: 'fa-solid fa-wine-glass-empty' },
        { name: 'Full Bar', icon_class: 'fa-solid fa-martini-glass-citrus' },
        { name: 'On-site Chef', icon_class: 'fa-solid fa-hat-chef' },
        { name: 'Air Conditioning', icon_class: 'fa-solid fa-air-conditioner' },
        { name: 'Concierge', icon_class: 'fa-solid fa-bell-concierge' },
        { name: 'Dryer', icon_class: 'fa-solid fa-dryer' },
        { name: 'Microwave', icon_class: 'fa-solid fa-microwave' },
        { name: 'Dedicated Workspace', icon_class: 'fa-solid fa-lamp-desk' },
        { name: 'Gym', icon_class: 'fa-solid fa-dumbbell' },
        { name: 'Heating', icon_class: 'fa-solid fa-heat' },
        { name: 'Elevator', icon_class: 'fa-solid fa-elevator' },
        { name: 'Access to Public Transportation', icon_class: 'fa-solid fa-taxi-bus' },
        { name: 'Pet Friendly', icon_class: 'fa-solid fa-paw-simple' },
        { name: 'Oven', icon_class: 'fa-solid fa-oven' },
        { name: 'TV', icon_class: 'fa-solid fa-tv' },
        { name: 'Pool', icon_class: 'fa-solid fa-person-swimming' },
        { name: 'Washing Machine', icon_class: 'fa-solid fa-washing-machine' },
        { name: 'Accessible', icon_class: 'fa-solid fa-wheelchair-move' },
        { name: 'CBRN Defense', icon_class: 'fa-solid fa-circle-radiation' },
        { name: 'Acid Rain Defense', icon_class: 'fa-solid fa-cloud-showers-heavy' },
        { name: 'Storm Defense', icon_class: 'fa-solid fa-house-tsunami' },
        { name: 'Armed Security', icon_class: 'fa-solid fa-person-military-rifle' },
        { name: 'Encrypted Uplink', icon_class: 'fa-solid fa-file-shield' },
        { name: 'Passive Security', icon_class: 'fa-solid fa-building-shield' },
        { name: 'Safe', icon_class: 'fa-solid fa-vault' },
        { name: 'Blender', icon_class: 'fa-solid fa-blender' },
        { name: 'Private Entrance', icon_class: 'fa-solid fa-door-closed' },
        { name: 'Onsite Parking', icon_class: 'fa-solid fa-car' },
        { name: 'Self Check-in', icon_class: 'fa-solid fa-key' },
        { name: 'Private Nursery', icon_class: 'fa-solid fa-seedling' },
        { name: 'Sleeping Facilities', icon_class: 'fa-solid fa-bed' },
        { name: 'First Aid Kit', icon_class: 'fa-solid fa-kit-medical' },
        { name: 'Fire Extinguisher', icon_class: 'fa-solid fa-fire-extinguisher' }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkDelete('amenities', null, {});
  }
};
