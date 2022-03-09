const Router = require("express");
const middlewarefunc = require("../Middleware/auth");
const Index = require("../Controllers/IndexControllers");

const router = Router();

//  ------------ All Routes -------------- |
router.get("/", middlewarefunc, Index);

module.exports = router;
