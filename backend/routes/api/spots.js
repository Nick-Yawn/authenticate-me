const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, Amenity, District, Review, Booking, User, SpotAmenity   } = require('../../db/models')

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

router.delete('/:id', requireAuth, asyncHandler( async (req, res, next) => {
  const id = req.params.id;
 
  try {
    await Spot.destroy({ where: { id: +id, user_id: +req.user.id } });
    return res.json({}) 
  } catch (e) {
    console.log(e);
    const err = new Error('Deletion failed.')
    err.status = 500;
    next(err);
  }
}));

router.post('/', requireAuth,  asyncHandler( async (req, res, next) => {
  const { id, name, address, city, state, country, districtId, price, description, amenities, visible } = req.body; 
 
  if( id ){
    try {
      const spot = await Spot.findByPk(id);
      if( +spot.user_id !== +req.user.id ){
        const err = new Error('Unauthorized edit.')
        err.status = 403;
        return next(err);
      } 
      
      spot.set({name, address, city, state, country, districtId, price, description, visible});
    
      try {
        await spot.save();

        await SpotAmenity.destroy({ where: {spotId: id}});

        const amenityObjects = amenities.map(a => ({spotId: id, amenityId: a }))
        
        await SpotAmenity.bulkCreate(amenityObjects);

        const spotInclusive = await Spot.findByPk(spot.id, {
          include: [Image, Amenity, District, Review, User, 
            { 
              model: Booking,
              attributes: ['start_date', 'end_date']
            }]
          });
        console.log(spotInclusive);

        res.json({spot: spotInclusive});
      } catch(e) {
        console.log(e);
        const err = new Error("There was a problem saving the spot, or with setting amenities.");
        err.status = 500;
        next(err);
      }  

    } catch (e) {
      console.log(e);
      const err = new Error("There was a problem updating the spot.")
      err.status = 500;
      next(err);
    }
  } else {
    try {
      const spot = await Spot.create({
        user_id: req.user.id,
        name,
        address,
        city,
        state,
        country,
        districtId,
        price,
        description,
        visible
      })
      
      const amenityObjects = amenities.map(a => ({spotId: spot.id, amenityId: a }))
      
      await SpotAmenity.bulkCreate(amenityObjects);

      const spotInclusive = await Spot.findByPk(spot.id, {
        include: [Image, Amenity, District, Review, User, 
          { 
            model: Booking,
            attributes: ['start_date', 'end_date']
          }]
        });
      console.log(spotInclusive) 
 
      return res.json({spot: spotInclusive})  
    } catch (e) { 
      console.error(e);
      const err = new Error("There was a problem creating the spot.")
      err.status = 500;
      next(err);
    }
  }

}));

module.exports = router;
