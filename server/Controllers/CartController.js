const Cart = require("../Models/Cart");

exports.post = asyncHandler(async (req, res, next) => {
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products);
  for (var i = 0; i < products.length; i++) {
    id = products[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      products[i].qty = cart[id];
      products.push(products[i]);
    }
  }
  return res.json(products);
});
