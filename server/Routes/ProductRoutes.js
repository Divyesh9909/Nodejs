const Router = require("express");
const router = Router();

const Product = require("../Controllers/ProdutsControllers");

router.post("/Product", Product);

module.exports = router;
