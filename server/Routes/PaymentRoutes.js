const Router = require("express");
const router = Router();

const PaymentController = require("../Controllers/PaymentController");

router.post("/Payment/:id", PaymentController);

module.exports = router;
