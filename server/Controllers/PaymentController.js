const PaymentModel = require("../Models/Payment");

module.exports = PaymentRoutesFunc = async (req, res) => {
  const { productId, cartId } = req.body;

  const id = req.params.id;
  const userId = id;

  try {
    let Payment = await PaymentModel.findOne({ paymentId });
    if (Payment) {
      let itemIndex = Payment.products.findIndex(
        (p) => p.productId == productId
      );
      if (itemIndex) {
        let Payment = Payment.products[itemIndex];
        Payment.cartId = cartId;
        Payment.productId[itemIndex] = Payment;
      } else {
        Payment.productId.push({
          productId,
          cartId,
          userId,
        });
      }
      Payment = await Payment.save();
      return res.status(201).send(Payment);
    } else {
      const newpamyment = await Payment.Create({
        userId,
        productId,
        cartId,
      });
      return res.status(201).send(newpamyment);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("pls try again letter");
  }
};
module.exports = PaymentModel;
