const PaymentModel = require("../Models/Payment");

module.exports = PaymentRoutesFunc = async (req, res) => {
  const id = req.params.id;
  userId = id;
  const Payment = new PaymentModel({
    userId,
    productId: req.body.productId,
    cartId: req.body.cartId,
    paymentId: req.body.paymentId,
  });
  Payment.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.send({ message: "Payment Successfully..!" });
    }
  });
};

module.exports = PaymentRoutesFunc;
