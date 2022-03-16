const Router = require("express");
const router = Router();

const Product = require("../Controllers/ProdutsControllers");

router.get("/Product", Product);

module.exports = router;
