const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email address already in use."],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email."],
        required: true,
    },

    email_is_verified: {
        default: false,
        type: Boolean,
    },

    password: {
        type: String,
        required: true,
    },

    // type: {
    //     type: String,
    //     enum: { values: ['bride', 'groom'], message: "{VALUE} is not supported."},
    //     required: true,
    // },

    // homeTown: {
    //     type: String,
    //     required: true,
    // },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("user", UserSchema, "users");