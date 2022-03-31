const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .isEmail()
    .withMessage('Please provide an email address.'),
  check('username')
    .isString()
    .isLength({ min: 4, max: 30 })
    .withMessage('Please provide a username of at least 4 and at most 30 characters.')
    .not()
    .isEmail()
    .withMessage('Username cannot an email address'),
  check('password')
    .isString()
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors  
];

// sign up
router.post('/', validateSignup, asyncHandler( async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie( res, user );
  
  return res.json({ user });
}));


module.exports = router;
