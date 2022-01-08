const express = require("express")
const router = express.Router()
const crypto = require("crypto")
const { validateNewUser, validateToken } = require("../lib/validations")
const messages = require("../lib/errorMessages")
const generateToken = require("../lib/generateToken")
const User = require("../models/user")
const passport = require('passport')
const sendMail = require("../lib/sendMail")
const db = require("../db/connection")
const Token = require("../models/token")

//register user
router.post("/register", async (req, res) => {
    try {
        //check if user is already logged in
        if (req.isAuthenticated()) return res.status(403).send(messages.PermissionDenied)

        //validate the new user object
        const { err } = validateNewUser(req)
        if (err) return res.status(400).send(error.details[0].message)

        //check if email already exists
        const user = await User.findOne( {email: req.body.email} )
        if (user) return res.status(400).send(messages.EmailAlreadyInUse)

        //create new user object
        const newUser = new User({
            email: req.body.email,
            password: crypto.createHash("sha256").update(req.body.password).digest("hex")
        })

        //save user to db
        await newUser.save()

        //generate token
        const tkn = generateToken(4)

        //add token to `tokens` collection with email
        await Token.create({
            email: newUser.email,
            token: tkn
        })

        //send email with token
        sendMail(newUser.email, "Welcome to SL Proposals", `Your token: ${tkn}`)
        res.status(200).send(messages.VerifyYourEmail)
    } catch (e) {
        res.status(400).send(e)
    }
})

//verify token endpoint
router.post("/verify/:token", (req, res) => {
    try{
        //check if user is already logged in
        if (req.isAuthenticated()) return res.status(403).send(messages.PermissionDenied)

        //validate token
        if (req.params.token.length != 8) return res.status(403).send(messages.InvalidToken)

        //verify token process
        err = validateToken(req.params.token)
        if (err) return res.status(403).send(err)

        res.status(200).send("Thank You for verifying your email, you can use your account now.")
    }catch(e){
        res.status(400).send(e)
    }
})

//user log in
router.post("/login",
    passport.authenticate(
        'local',
        {
            //successRedirect: '/',
            failureRedirect: '/login'
        }
    ),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.send('my name is ' + req.user.username);
    }
)

module.exports = router;