// const jwt = require("jsonwebtoken");
// const configForUser = require("userToPagalhaibhai");
// const configForAdmin = require("adminisking");

const middlewarefunc = (req, res, next) => {
  //Get token from header
  const token = req.header("token");

  //check if not token
  if (!token) {
    return res.json({
      msg: "Hey , No token,authorization denied, sorry but you are now allowed to go further, just pass VAlid credientials",
    });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, configForUser);
    req.username = decoded.username; //decoded.user because we have set user in payload
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
// const AdminAuth = (req, res, next) => {
//   //Get token from header
//   const token = req.header("token");

//   //check if not token
//   if (!token) {
//     return res.json({
//       msg: "Hey , No token, means authorization denied, sorry but you are now allowed to go further, just pass VAlid credientials",
//     });
//   }
//   //verify token
//   try {
//     const decoded = jwt.verify(token, configForAdmin);
//     req.username = decoded.username; //decoded.user because we have set user in payload
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };
module.exports = middlewarefunc;
// module.exports = AdminAuth;
