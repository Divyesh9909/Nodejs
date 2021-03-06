const Product = require("../Models/Products");
const findAll = (req, res) => {
  Product.find()
    .then((Product) => {
      res.send(Product);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Product.",
      });
    });
};

const findById = (req, res) => {
  console.log("req.params.id ", req.params);
  Product.find({ id: Number(req.params.productId) })
    .then((productId) => {
      res.send(productId);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Product.",
      });
    });
};

module.exports = { findAll, findById };
