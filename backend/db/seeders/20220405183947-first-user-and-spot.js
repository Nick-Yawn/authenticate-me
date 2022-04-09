'use strict';
const { User, Spot, Image } = require('../models')
const bcrypt = require('bcryptjs');


module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return User.create(
    {
      username: 'cheng-feng',
      email: 'cheng-feng@nightcitybnb.com',
      hashedPassword: bcrypt.hashSync('cheng-feng-pw'),
      Spots: [{
        district_id: null,
        address: null,
        city: 'Tokyo',
        state: null,
        country: 'Japan',
        name: 'Cozy apartment in quiet neighborhood',
        description: 'Check it out!',
        price: 99.99,
        visible: true,
        Images: [
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-4pTY4ty7jXM-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-eCSbqFCnlmw-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-gGIJGnpMZfo-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-gR3oLVM0aqM-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-HoqwhJ93IZU-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-J6Atq83sBho-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-l5iWkE8hWuA-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-MhKXrKqmtJk-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-psdV2Rl-GvU-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-skAzasWvAMU-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-SPeydc-BBMg-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/cheng-feng-vn0DrvTDkbg-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/joshua-rawson-harris-wCgy-qHtZtM-unsplash.jpg' }
        ]
      }]
    },
    { 
      include: {
        model: Spot,
        include: Image
      }
    });

  },

    down: (queryInterface, Sequelize) => {
      
      return User.destroy({ where: { username: 'cheng-feng'}})

  }
};
