const Razorpay = require("razorpay");
const { router } = require("express").Router();
const razorpay = new Razorpay({
  key_id: "rzp_test_wdI4ddEn3RPMnZ",
  key_secret: "gxN4MDD915OkQA2i5eYWfk6K",
});

const RazorPayFunc = async (req, res) => {
  const options = {
    amount: 10 * 10,
    currency: "INR",
    receipt: "this is a new payment by Divyesh", //any unique id
  };

  try {
    const response = await razorpay.orders.create(options);
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
};

module.exports = { RazorPayFunc };
