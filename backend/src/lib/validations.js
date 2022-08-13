const Joi = require("joi")
const Token = require("../models/token")
const User = require("../models/user")
const db = require("../db/connection")
const errorMessages = require("./messages")

const validateNewUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),

        //slproposals - public
        type: Joi.string().valid("Bride", "Groom").required(),
        marital_status: Joi.string().valid("Unmarried", "Separated", "Divorced", "Widowed").required(),
        dob: Joi.date().required(),
        career: Joi.string().min(2).required(),
        educational_field: Joi.string().required(),
        educational_level: Joi.string().valid("None", "School", "Diploma", "Degree", "Masters", "PHD"),
        hometown: Joi.string().min(2).required(),

        //slproposals - personal
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        cp_name: Joi.string().min(3).required(),
        cp_relationship: Joi.string().valid("Self", "Father", "Mother", "Brother", "Sister", "Guardian", "Other").required(),
        mobile_number: Joi.string().length(12).pattern(/^[+0-9]+$/).required(),
        contact_preference: Joi.string().valid("Email", "Phone").required(),
        country: Joi.string().min(2).required(),
        height: Joi.number().required(),
        weight: Joi.number().required(),
        expectations: Joi.string().max(10000).optional()
    }).options({ abortEarly: false });

    return schema.validate(user);
}

const validateToken = (token) => {
    const schema = Joi.object({
        token: Joi.string().min(8).max(8).required(),
    })
    return schema.validate(token);
}

const validateEmail = (email) =>{
    const schema = Joi.object({
        email: Joi.string().email().required()
    })
    return schema.validate(email)
}

const validatePassword = (password) =>{
    const schema = Joi.object({
        password: Joi.string().min(3).required()
    })
    return schema.validate(password)
}

module.exports = {
    validateNewUser,
    validateToken,
    validateEmail,
    validatePassword,
}