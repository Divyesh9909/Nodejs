const jwt = require("jsonwebtoken");

const middlewarefunc = (req, res, next) => {
  //Get token from header
  const token = req.header("token");

  console.log("userMeraDost token ", token);
  //check if not token
  if (!token) {
    return res.json({
      message: "Un Authorised, Please Login First",
    });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, "userMeraDost");

    // console.log("decoded ", decoded);
    req.username = decoded.username; //decoded.user because we have set user in payload
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = middlewarefunc;
