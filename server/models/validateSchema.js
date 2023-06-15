const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

exports.validateSchema = Joi.object({
    firstName : Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().lowercase().email().required().label("Email"),
    password: passwordComplexity().required().label("Password")
})

exports.loginvalidateSchema = Joi.object({
    email: Joi.string().lowercase().email().required().label("Email"),
    password: passwordComplexity().required().label("Password")
})

exports.updatevalidateSchema = Joi.object({
    firstName : Joi.string().label("First Name"),
    lastName: Joi.string().label("Last Name"),
    email: Joi.string().lowercase().email().label("Email"),
})

exports.passwordvalidateSchema = Joi.object({
    password: passwordComplexity().label("Password")
})