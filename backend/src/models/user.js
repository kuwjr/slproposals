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

    type: {
        type: String,
        enum: { values: ['Bride', 'Groom'], message: "{VALUE} is not supported."},
        required: true,
    },

    marital_status: {
        type: String,
        enum: { values: ['Unmarried', 'Separated', 'Divorced', 'Widowed'], message: "{VALUE} is not supported."},
        required: true,
    },

    dob: {
        type: Date,
        required: true,
    },

    career: {
        type: String,
        required: true,
    },

    educational_field: {
        type: String
    },

    educational_level: {
        type: String,
        enum: { values: ["None", "School", "Diploma", "Degree", "Masters", "PHD"], message: "{VALUE} is not supported."},
        required: true,
    },

    hometown: {
        type: String,
        required: true,
    },

    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },

    cp_name: {
        type: String,
        required: true,
    },

    cp_relationship: {
        type: String,
        enum: { values: ["Self", "Father", "Mother", "Brother", "Sister", "Guardian", "Other"], message: "{VALUE} is not supported."},
        required: true,
    },

    mobile_number: {
        type: String,
        required: true,
    },

    contact_preference: {
        type: String,
        enum: { values: ["Email", "Phone"], message: "{VALUE} is not supported."},
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    height: {
        type: String,
        required: true,
    },

    weight: {
        type: String,
        required: true,
    },

    expectations: {
        type: String
    },

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