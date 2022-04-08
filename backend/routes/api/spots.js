const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, Amenity, District, Review, Booking, User  } = require('../../db/models')

const router = express.Router();


router.get('/', asyncHandler( async (req, res, next) => {
  try{
    const spots = await Spot.findAll({
      where: { visible: true},
      include: [
        {
          model: Image,
          limit: 1
        }]
    })

    return res.json({ spots })

  } catch (e) {
    console.log(e);
    const err = new Error('There was an error accessing the database.')
    err.status = 500;
    next(err);
  }
  
}));

router.get('/:id', asyncHandler( async (req, res, next) => {
  try {
    const spot = await Spot.findByPk(+req.params.id, {
      include: [Image, Amenity, District, Review, User, 
        { 
          model: Booking,
          attributes: ['start_date', 'end_date']
        }]
    });

    return res.json({ spot })
 
  } catch (e) {
    console.log(e);
    const err = new Error('There was an error accessing the database.');
    err.status = 500;
    next(err);
  }
} ))

router.post('/', requireAuth, asyncHandler( async (req, res, next) => {
  const { id, name, address, city, state, districtId, price, description, amenities, visible } = req.body; 
 
  if( id ){
    try {
      const spot = await Spot.findByPk(id);
      if( spot.userId !== req.user.id ){
        const err = new Error('Unauthorized edit.')
        err.status = 403;
        return next(err);
      } 
      
      const simpleProps ={name, address, city, state, districtId, price, description, visible}; 
      for( let prop in simpleProps){
        spot[prop] = simpleProps[prop];
      }  
 
    } catch (e) {
      const err = new Error("There was a problem updating the spot.")
      err.status = 500;
      next(err);
    }
  } else {
    try {
      const spot = await Spot.create({
        name,
        address,
        city,
        state,
        districtId,
        price,
        description,
        visible,
        Amenities: [...amenities],
      }, {
        include: Amenity
      })
    } catch (e) {
      const err = new Error("There was a problem creating the spot.")
      err.status = 500;
      next(err);
    }
  }
}));

module.exports = router;
