const Cart = require("../Models/Cart");
// const {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// } = require("");

const router = require("express").Router();

// get

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
  //   const newCart = new Cart(req.body);
  // res.json({
  //   status: 200,
  //   message: "your cart",
  // });
});

//CREATE

// router.post("/Cart", async (req, res) => {
//   const newCart = new Cart(req.body);

//   try {
//     const savedCart = await newCart.save();
//     res.status(200).json(savedCart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// create

router.post("/cart", async (req, res) => {
  const { productId, quantity, name, price } = req.body;

  const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id

  try {
    let cart = await Cart.findOne({ userId });

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
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
