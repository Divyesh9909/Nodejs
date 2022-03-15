const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String },
    price: { type: Number },
    description: { type: String },

    category: { type: String },
    image: { type: String },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
