const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    // products: [
    //   {
    //     productId: {
    //       type: String,
    //     },
    //     quantity: {
    //       type: Number,
    //       default: 1,
    //     },
    //   },
    // ],
    products: [
      {
        productId: String,
        quantity: Number,
        name: String,
        price: Number,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
