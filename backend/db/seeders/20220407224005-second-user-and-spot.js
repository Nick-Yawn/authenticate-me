'use strict';
const { User, Spot, Image, Amenity } = require('../models')
const bcrypt = require('bcryptjs');


module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return User.create(
    {
      username: 'qinghon-shen',
      email: 'qinghong-shen@nightcitybnb.com',
      hashedPassword: bcrypt.hashSync('qinghong-shen-pw'),
      Spots: [{
        user_id: 5,
        district_id: null,
        address: null,
        city: 'Shanghai',
        state: null,
        country: 'China',
        name: 'Luxe Shanghai Tower Apt',
        description: 'Do not miss these views!',
        price: 750,
        visible: true,
        Images: [
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/decry-yae-osDk4IkK6SM-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/marc-olivier-jodoin-uqmOB8z9YvM-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/mikhail-preobrazhenskiy-x1qooT_pUWY-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/qinghong-shen-A71hpMTGZ4I-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/qinghong-shen-RoN5gHMOMUc-unsplash.jpg' },
          { url: 'https://night-city-bnb-static.s3.us-west-2.amazonaws.com/qinghong-shen-T9mdDR5UwKw-unsplash.jpg' }
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
      
      return User.destroy({ where: { username: 'qinghong-shen'}})

  }
};
