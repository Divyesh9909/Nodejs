const Router = require("express");
const router = Router();

const PaymentRoutesFunc = require("../Controllers/PaymentController");

router.get("/Payment/:id", PaymentRoutesFunc);

module.exports = router;
