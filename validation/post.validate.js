const Validator = require('validator')
const isEmpty = require('./isEmpty.validate')

module.exports = function validateLoginInput (data) {
  let errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''

  if (!Validator.isLength(data.text, {
    min: 10,
    max: 500
  })) {
    errors.text = 'Posts must be between 10 and 500 characters!'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Comment cannot be blank!'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
