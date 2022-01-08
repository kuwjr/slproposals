const Joi = require("joi")
const Token = require("../models/token")
const User = require("../models/user")
const db = require("../db/connection")
const errorMessages = require("../lib/errorMessages")

const validateNewUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    return schema.validate(user);
}

const validateToken = async (token) => {
    try {
        //find token with give email and token
        const doc = await Token.findOne({
            token: token
        })
        if (!doc) return Error(errorMessages.InvalidToken)
        const email = doc.email
        //if found, change `is_verified` status to true
        doc = await User.findOneAndUpdate(
            { email: email },
            { $set: { email_is_verified: true } },
            { new: true },
            (err, doc) => {
                if (err) return Error(err)
            }
        )
        if (!doc) return Error(errorMessages.MaliciousEmail)

        //delete token from db
        const count = await Token.remove({
            email: email,
            token: token
        })
        if (count != 1) return Error(errorMessages.MaliciousToken)
        return null
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {
    validateNewUser,
    validateToken
}