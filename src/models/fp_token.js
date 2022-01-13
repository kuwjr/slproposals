const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fpTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("fp_token", fpTokenSchema, "fp_tokens");