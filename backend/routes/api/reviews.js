const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');

const router = express.Router();

router.delete('/:id', requireAuth, asyncHandler( async (req, res, next) => {

  try {
    const review = await Review.findByPk(+req.params.id);

    if( review?.user_id === +req.user.id ){
      await review.destroy();

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

router.put('/:id', requireAuth, asyncHandler( async (req, res, next) => {
  try {
    const review = await Review.findByPk(+req.params.id);

    if( review.user_id === +req.user.id ){
      review.body = req.body.body // yikes
      await review.save();

      res.json(review)
    } else {
      const err = new Error('Edit unauthorized')
      err.status = 401;
      next(err);
    }

  } catch (e) {
    console.log(e);
    const err = new Error('There was a problem accessing the database.')
    err.status = 500;
    next(err);
  }
}));

module.exports = router;
