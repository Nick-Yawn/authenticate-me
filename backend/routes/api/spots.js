const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, Amenity, District, Review, Booking, User, SpotAmenity   } = require('../../db/models')

const router = express.Router();


router.get('/', asyncHandler( async (req, res, next) => {
  const options = {
      where: { 
        visible: true 
      },
      include: [
        {
          model: Image,
          limit: 1
        }]
  }

  let query = req.query.q;
  if( query ){
    query += '%'
    options.where[Op.or] = [
        { name:         { [Op.iLike]: query }},
        { city:         { [Op.iLike]: query }},
        { description:  { [Op.iLike]: query }},
        { country:      { [Op.iLike]: query }},
      ] 
  } 

  try{
    const spots = await Spot.findAll(options)

    return res.json({ spots })

  } catch (e) {
    console.log(e);
    const err = new Error('There was an error accessing the database.')
    err.status = 500;
    next(err);
  }
  
}));

router.get('/my-spots', requireAuth, asyncHandler( async (req, res, next) => {
  const options = {
      where: { user_id: req.user.id},
      include: {
        model: Image,
        limit: 1
      }
  }

  let query = req.query.q;
  if( query ){
    query += '%'
    options.where[Op.or] = [
        { name:         { [Op.iLike]: query }},
        { city:         { [Op.iLike]: query }},
        { description:  { [Op.iLike]: query }},
        { country:      { [Op.iLike]: query }},
      ] 
  } 

  try{
    const spots = await Spot.findAll(options);

    return res.json({ spots });
  } catch (e) {
    console.log(e);
    const err = new Error('There was a problem accessing your spots.');
    err.status = 500;
    next(err);
  }
}));

router.get('/favorites', requireAuth, asyncHandler( async (req, res, next) => {

  // THIS DOESN'T WORK YET
  const options = {
      where: { visible: true },
      through: {model: 'favorites'}
  }
 
  let query = req.query.q;
  if( query ){
    query += '%'
    options.where[Op.or] = [
        { name:         { [Op.iLike]: query }},
        { city:         { [Op.iLike]: query }},
        { description:  { [Op.iLike]: query }},
        { country:      { [Op.iLike]: query }},
      ] 
  } 
  
 
  try{
    const user = await User.findByPk(req.user.id);
    const spots = await user.getSpots(options);

    return res.json({ spots });
  } catch (e) {
    console.log(e);
    const err = new Error('There was a problem accessing your spots.');
    err.status = 500;
    next(err);
  }
}));

router.get('/:id', asyncHandler( async (req, res, next) => {
  try {
    const spot = await Spot.findByPk(+req.params.id, {
      include: [Image, Amenity, District, User, 
        { 
          model: Booking,
          attributes: ['start_date', 'end_date']
        },
        {
          model: Review,
          include: User
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
            },
            {
              model: Review,
              include: User
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
          }, 
          {
            model: Review,
            include: User
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

// review validators

router.post('/:id/reviews', requireAuth, asyncHandler( async (req, res, next) => {
  const { body } = req.body;
  const spotId = req.params.id;
  
  try {
    const review = await Review.create({
      user_id: +req.user.id,
      spot_id: +spotId,
      body,
      rating: 5
    })
    
    const spotInclusive = await Spot.findByPk(+spotId, {
      include: [Image, Amenity, District, User, 
        { 
          model: Booking,
          attributes: ['start_date', 'end_date']
        },
        {
          model: Review,
          include: User
        }]
      });
    
    return res.json({spot: spotInclusive})
    
  } catch (e) {
    console.log(e);
    const err = new Error('Unable to create review.')
    err.status = 500;
    next(err); 
  }  

} ));

router.post('/:id/images', requireAuth, asyncHandler( async (req, res, next) => {
  const { url } = req.body;
  const spotId = req.params.id;

  try {
    const spot = await Spot.findByPk(+spotId);
    if( +spot.user_id !== +req.user.id ) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }
  
    const image = await Image.create({
      spot_id: +spotId,
      url
    });

    return res.json({ image })

  } catch (e) {
    console.log(e);
    const err = new Error('There was a problem accessing the database.')
    err.status = 500;
    next(err);
  }
  
}));

router.get('/:id/images', asyncHandler( async (req, res, next) => {
  const spotId = req.params.id;
  
  try {
    const images = await Image.findAll({where: {spot_id: +spotId}});    

    return res.json({images});

  } catch (e) {
    const err = new Error('There was a problem accessing the database.')
    err.status = 500;
    next(err);
  } 

}));

module.exports = router;
