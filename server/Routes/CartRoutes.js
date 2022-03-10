const Cart = require("../Models/Cart");
const router = require("express").Router();
const UserCart = require("../Controllers/CartController");

console.log("show");

router.get("/cart", async (req, res) => {
  Cart.find()
    .then((Cart) => {
      res.send(Cart);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cart Product.",
      });
    });
});

router.post("/cart/:UId", async (req, res) => {
  const { productId, quantity, name, price } = req.body;

  // const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id

  const Id = req.params.id;
  const UserId = Id;
  console.log(UserId, "userid Is Printed");

  try {
    let cart = await Cart.findOne({ UserId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, name, price }],
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", UserCart);

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
