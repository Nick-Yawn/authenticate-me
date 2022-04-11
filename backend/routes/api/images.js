const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Image, Spot } = require('../../db/models');

const router = express.Router();

router.delete('/:id', requireAuth, asyncHandler( async (req, res, next) => {

  try {
    const image = await Image.findByPk(+req.params.id, {
      include: Spot
    });

    if( image?.Spot?.user_id === +req.user.id ){
      await image.destroy();

      res.json({id: +req.params.id})
    } else {
      const err = new Error('Delete unauthorized.')
      err.status = 401;
      next(err); 
    }
    
  } catch (e) {
    console.log(e);
    const err = new Error('There was a problem accessing the database.');
    err.status = 500;
    next(err);
  }

}));

// other image routes are in ./spots

module.exports = router;
