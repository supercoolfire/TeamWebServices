const Validator = require('validatorjs');

const reviewValidationRules = {
  text: 'required|string',
  date: 'required|date',
};

const validateReview = (req, res, next) => {
  const data = {
    text: req.body.text,
    date: req.body.date,
  };

  const validation = new Validator(data, reviewValidationRules);

  if (validation.fails()) {
    return res.status(400).json({
      error: 'Validation failed',
      messages: validation.errors.all(),
    });
  }

  next();
};

module.exports = validateReview;
