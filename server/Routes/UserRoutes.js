const Router = require("express");
const router = Router();

const { Register, Login } = require("../Controllers/UserControllers");

router.post("/signup", Register);
router.post("/login", Login);

module.exports = router;
