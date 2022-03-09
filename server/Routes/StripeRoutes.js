const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51Kb0A0SAZ7D5bbj4VoDpxIUxi7eyeP09DZAfBXHHEstLzui9IgGQ7yaJ8FMVY4VyQ0uJQd4dnppXd3ku2UOFXRT600UiVQNB0F"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
  //   console.log(stripe);
});

module.exports = router;
