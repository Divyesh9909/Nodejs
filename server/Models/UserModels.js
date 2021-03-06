const { Schema, model } = require("mongoose");

const schema = new Schema({
  // sign in database
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    default: "",
  },
  cart: [
    {
      pro_id: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = model("usermodel", schema); //accessing a model
