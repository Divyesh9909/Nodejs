const Router = require("express");
const router = Router();

const { Register, Login } = require("../Controllers/UserControllers");

console.log("Where Is Route".Register);

router.post("/signup", Register);
router.post("/login", Login);

module.exports = router;
