const Joi = require("joi")

function signUpValidation(reqBody) {
  const userSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  return userSchema.validate(reqBody)
}

function loginInValidation(reqBody) {
  const userSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  return userSchema.validate(reqBody)
}

module.exports.signUpValidation = signUpValidation
module.exports.loginInValidation = loginInValidation
