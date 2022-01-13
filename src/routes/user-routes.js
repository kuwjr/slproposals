const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const {
  validateNewUser,
  validateToken,
  validateEmail,
  validatePassword,
} = require("../lib/validations");
const generateToken = require("../lib/generateToken");
const User = require("../models/user");
const passport = require("passport");
const sendMail = require("../lib/sendMail");
const db = require("../db/connection");
const Token = require("../models/token");
const Fp_Token = require("../models/fp_token");
const messages = require("../lib/messages");
require("../passport/local-strategy");

//register user
router.post("/register", async (req, res) => {
  try {
    //check if user is already logged in
    if (req.isAuthenticated())
      return res.status(403).send(messages.PermissionDenied);

    //validate the new user object
    const v = validateNewUser({
      email: req.body.email,
      password: req.body.password,
    });
    if (v.error) return res.status(400).send(v.error.details[0].message);

    //check if email already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(messages.EmailAlreadyInUse);

    //create new user object
    const newUser = new User({
      email: req.body.email,
      password: crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex"),
    });

    //save user to db
    await newUser.save();

    //generate token
    const tkn = generateToken(4);

    //add token to `tokens` collection with email
    await Token.create({
      email: newUser.email,
      token: tkn,
    });

    //send email with token
    sendMail(newUser.email, "Welcome to SL Proposals", `Your token: ${tkn}`);
    res.status(200).send(messages.VerifyYourEmail);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//verify token endpoint
router.get("/verify/:token", async (req, res) => {
  try {
    //check if user is already logged in
    if (req.isAuthenticated())
      return res.status(403).send(messages.PermissionDenied);

    //validate token length
    const v = validateToken({
      token: req.params.token,
    });
    if (v.error) return res.status(403).send(messages.InvalidToken);

    //find token in db
    const deletedToken = await Token.findOneAndDelete({
      token: { $eq: req.params.token },
    });
    if (deletedToken == null)
      return res.status(403).send(messages.InvalidToken);

    //if found, change `is_verified` status to true
    const changedToTrue = await User.findOneAndUpdate(
      { email: deletedToken.email },
      { email_is_verified: true }
    );
    if (changedToTrue == null)
      return res.status(500).send(messages.InternalServerError);

    return res.status(200).send(messages.EmailVerificationSuccess);
  } catch (e) {
    return res.status(400).send(e);
  }
});

//resend verification email
router.post("/resend-email-verification", async (req, res) => {
  try {
    //check if user is already logged in
    if (req.isAuthenticated())
      return res.status(403).send(messages.PermissionDenied);

    //validate email address
    const v = validateEmail({
      email: req.body.email,
    });
    if (v.error) return res.status(403).send(messages.InvalidEmail);

    //regenerate token
    const tkn = generateToken(4);

    //check if email address exists in Tokens collection
    const updatedToken = await Token.findOneAndUpdate(
      { email: req.body.email },
      { token: tkn }
    );
    if (updatedToken == null)
      return res.status(403).send(messages.EmailNotFound);

    //resend email with new token
    sendMail(
      updatedToken.email,
      "Resent verification token",
      `Your token: ${tkn}`
    );
    res.status(200).send(messages.EmailVerificationResent);
  } catch (e) {
    return res.status(400).send(e);
  }
});

//user log in
router.post(
  "/login",
  passport.authenticate("local", {
    // successRedirect: "/proposals",
    // failureRedirect: "/frontend/login",
  }),
  (req, res) => {
    res.status(200).send("Logged in successfully");
  }
);

//user log out
router.post("/logout", (req, res) => {
  //check if user is already logged in
  if (!req.isAuthenticated())
    return res.status(403).send(messages.PermissionDenied);

  req.logout();
  res.status(200).send("successfully logged out");
});

//forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    //check if user is already logged in
    if (req.isAuthenticated())
      return res.status(403).send(messages.PermissionDenied);

    //validate email address
    const v = validateEmail({
      email: req.body.email,
    });
    if (v.error) return res.status(403).send(messages.InvalidEmail);

    //check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(messages.EmailNotFound);

    //generate fp_token
    const fp_tkn = generateToken(4);

    //send email with fp_token
    sendMail(
      user.email,
      "Link to reset your password",
      `Your token: ${fp_tkn}`
    );

    //check for pending fp_token
    const updatedToken = await Fp_Token.findOneAndUpdate(
      { email: req.body.email },
      { token: fp_tkn }
    );
    if (updatedToken != null)
      return res.status(200).send(messages.PasswordResetEmailReSent);

    //if new email, add token to `fp_tokens` collection with email
    await Fp_Token.create({
      email: user.email,
      token: fp_tkn,
    });

    res.status(200).send(messages.PasswordResetEmailSent);
  } catch (e) {
    return res.status(400).send(e);
  }
});

//verify fp_token endpoint
router.post("/reset-password/:token", async (req, res) => {
  try {
    //check if user is already logged in
    if (req.isAuthenticated())
      return res.status(403).send(messages.PermissionDenied);

    //validate token length
    const v = validateToken({
      token: req.params.token,
    });
    if (v.error) return res.status(403).send(messages.InvalidToken);

    //validate password
    const v2 = validatePassword({
      password: req.body.password,
    });
    if (v2.error) return res.status(403).send(messages.PasswordNotStrong);

    //find token in db
    const deletedToken = await Fp_Token.findOneAndDelete({
      token: { $eq: req.params.token },
    });
    if (deletedToken == null)
      return res.status(403).send(messages.InvalidToken);

    //if found, change `password` to new password
    const passwordChanged = await User.findOneAndUpdate(
      { email: deletedToken.email },
      {
        password: crypto
          .createHash("sha256")
          .update(req.body.password)
          .digest("hex"),
      }
    );
    if (passwordChanged == null)
      return res.status(500).send(messages.InternalServerError);

    //send an email to user informing about password change
    sendMail(
      passwordChanged.email,
      "Your password has been changed successfully",
      `This email is to inform about the password change.`
    );
    return res.status(200).send(messages.PasswordResetSuccess);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
