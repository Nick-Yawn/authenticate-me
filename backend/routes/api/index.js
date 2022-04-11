const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js')
const { User } = require('../../db/models');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots')
const amenitiesRouter = require('./amenities');
const districtsRouter = require('./districts');
const reviewsRouter = require('./reviews');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/amenities', amenitiesRouter);
router.use('/districts', districtsRouter);
router.use('/reviews', reviewsRouter);

/* TEST ROUTE
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body })
});
*/

/* USER AUTH MIDDLEWARE TESTING ROUTES 

router.post('/test', (req,res) => {
  res.json({ requestBody: req.body })
});

router.get('/set-token-cookie', asyncHandler( async (req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user })
}));

router.get('/restore-user', restoreUser, (req, res) => {
  return res.json(req.user);
});

router.get('/require-auth', requireAuth, (req,res) => {
  return res.json(req.user);
});

*/

module.exports = router;
