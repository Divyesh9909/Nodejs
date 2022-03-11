const Router = require("express");
const router = Router();

const { RazorPayFunc } = require("../Controllers/RazorPayController");

router.get("/pay", RazorPayFunc);

module.exports = router;
