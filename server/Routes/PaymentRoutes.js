const Router = require("express");
const router = Router();

const PaymentRoutesFunc = require("../Controllers/PaymentController");

router.post("/Payment/:id", PaymentRoutesFunc);

module.exports = router;
