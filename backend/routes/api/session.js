const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const router = express.Router();

//restore session user
router.get('/', restoreUser, asyncHandler( async (req, res) => {
  let { user } = req;
  if( user ){
    user = await User.findByPk(+user.id, {
      include: { model: Spot, attributes: ['id'] }
    }) 
 
    return res.json({ user: user.toSafeObject() })
  } else {
    return res.json({});
  }
}));

const validateLogin = [
  check('credential')
    .isString()
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .isString()
    .notEmpty()
    .withMessage('Please provide a password.'),
  handleValidationErrors
]; 

//login
router.post('/', validateLogin, asyncHandler( async (req, res, next) => {
  const { credential, password } = req.body;

  const userId = await User.login({ credential, password });

  if( !userId ){
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid'];
    return next(err);
  }
   const user = await User.findByPk(userId, {
      include: { model: Spot, attributes: ['id'] }
    }) 

  await setTokenCookie(res, user);
  
  return res.json({ user: user.toSafeObject() })
}));


//logout
router.delete('/', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'logout successful' })
});

module.exports = router;
