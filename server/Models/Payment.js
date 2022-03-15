const mongoose = require("mongoose");

const PaymentSchema = mongoose.model(
  "Payment",

  new mongoose.Schema({
    userId: { type: String, required: true },

    productId: { type: String, required: true },

    cartId: { type: String, required: true },
  })
);

module.exports = PaymentSchema;
