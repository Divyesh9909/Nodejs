const Router = require("express");
const middlewarefunc = require("../Middleware/auth");
// const Login = require("../../login");
// const login = require("../../login");

const router = Router();

//  ------------ All Routes -------------- |
router.get("/", middlewarefunc);

module.exports = Router;
