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
module.exports = findAll;
