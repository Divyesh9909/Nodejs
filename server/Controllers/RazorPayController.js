const Razorpay = require("razorpay");
const Cart = require("../Models/Cart");
const { router } = require("express").Router();
const razorpay = new Razorpay({
  key_id: "rzp_test_wdI4ddEn3RPMnZ",
  key_secret: "gxN4MDD915OkQA2i5eYWfk6K",
});

const RazorPayFunc = (req, res) => {
  const someVar = req.params.CartId;

  if (someVar) {
    Cart.find({ _id: someVar }).then(async (data, err) => {
      if (data) {
        const options = {
          amount: 10 * 10,
          currency: "INR",
          receipt: "this is a new payment by Divyesh", //any unique id
        };

        try {
          const response = await Razorpay.orders.create(options);
          res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
          });
        } catch (error) {
          res.status(400).json({
            message: error.error.description,
            success: false,
          });
        }
      }
    });
  }
};

module.exports = { RazorPayFunc };
