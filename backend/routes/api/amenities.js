const express = require('express');
const asyncHandler = require('express-async-handler');

const { Spot, Image, Amenity, District, Review, Booking, User  } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler( async (req, res, next) => {
  try {
    const amenities = await Amenity.findAll();

    return res.json({ amenities });
  } catch (e) {
    console.log(e);
    const err = new Error('There was an error accessing the database.')
    err.status = 500;
    next(err);
  }
  
}));


module.exports = router;
