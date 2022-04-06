const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image  } = require('../../db/models')

const router = express.Router();


router.get('/', asyncHandler( async (req, res, next) => {
  try{
    const spots = await Spot.findAll({
      include: [
        {
          model: Image,
          limit: 1
        }]
    })

    console.log(spots);

    return res.json({ spots })

  } catch (e) {
    console.log(e);
    const err = new Error('There was an error accessing the database.')
    err.status = 500;
    next(err);
  }
  
}));

module.exports = router;
