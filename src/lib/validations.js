const Joi = require("joi")
const Token = require("../models/token")
const User = require("../models/user")
const db = require("../db/connection")
const errorMessages = require("./messages")

const validateNewUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    })
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