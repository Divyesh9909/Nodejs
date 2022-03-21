const Router = require("express");
const router = Router();

const Product = require("../Controllers/ProdutsControllers");

router.get("/Product", Product.findAll);

router.get("/Product/:productId", Product.findById);

module.exports = router;
