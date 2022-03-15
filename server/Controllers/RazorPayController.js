const Razorpay = require("razorpay");
const Cart = require("../Models/Cart");
const { router } = require("express").Router();
const razorpay = new Razorpay({
  key_id: "rzp_test_wdI4ddEn3RPMnZ",
  key_secret: "gxN4MDD915OkQA2i5eYWfk6K",
});

const RazorPayFunc = async (req, res) => {
  const id = req.param.id;
  const userId = id;
  const options = {
    amount: 10 * 10,
    currency: "INR",
    receipt: "this is a new payment by Divyesh", //any unique id
  };

  try {
    const response = await razorpay.orders.create(options);
    if (response) {
      res.json({
        userId,
        order_id: response.id,
        currency: response.currency,
        amount: response.amount,
        productId: req.body.productId,
      });
    }
  } catch (error) {
    res.status(400).json({
      // message: error.error.description,
      success: false,
      message: error.message,
    });
  }
};

module.exports = { RazorPayFunc };
