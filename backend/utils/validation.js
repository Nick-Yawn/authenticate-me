const { validationResult } = require('express-validator');

const handleValidationErrors = (req, rest, next) => {
  const validationErrors = validationResult(req);

  if( !validationErrors.isEmpty() ){
    const errors = validationErrors.array().map( e => e.msg );

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  } else {
    next();
  }
};

module.exports = {
  handleValidationErrors
}; 
