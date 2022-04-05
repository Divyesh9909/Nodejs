// @ts-nocheck
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require("email-validator");
const UserModel = require("../Models/UserModels");

//====================>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<=================\\

const Register = (req, res, next) => {
  const saltRounds = 10;

  console.log("User Data", req.body);
  var name = req.body.data.name;
  var email = req.body.data.email;
  var phno = req.body.data.phno;
  var password = req.body.data.password;

  var UserData = new UserModel({
    username: name,
    email,
    phno,
    password,
  });

  if (name && email && phno && password) {
    if (name.length >= 3) {
      if (validator.validate(email)) {
        if (phno.length === 10) {
          if (password.length >= 6) {
            let hash = bcrypt.hashSync(password, saltRounds);
            UserData.password = hash;

            UserData.save()
              .then((collection) => {
                if (collection) {
                  return res.status(200).json({
                    success: true,
                    message: "registered successfully ",
                    data: collection,
                  });
                }
              })
              .catch((err) => {
                const someError = { ...err };
                // console.log(
                //   "catch, line 41, signUpRoutes.js ",
                //   someError
                // );

                if (someError.keyPattern.email > 0) {
                  return res.status(200).json({
                    success: false,
                    message: `Email '${someError.keyValue.email}' already exist , you just need to log in  `,
                    server_err: err.message,
                  });
                }
              });
          } else {
            return res.status(400).json({
              sucess: false,
              message: "Password should be Minimum 6 Digit",
            });
          }
        } else {
          return res.status(400).json({
            sucess: false,
            message: "Phno should be 10 Digit",
          });
        }
      } else {
        return res.status(400).json({
          sucess: false,
          message: "Email should be valid ",
        });
      }
    } else {
      return res.status(400).json({
        sucess: false,
        message: "Name should be greater than 3 Char",
      });
    }
  } else {
    return res.status(400).json({
      sucess: false,
      message: "All Data is Compulsory",
    });
  }
};

const Login = (req, res, next) => {
  console.log("User Data", req.body);
  var email = req.body.data.email;
  var password = req.body.data.password;

  if (!email && !password) {
    res.json({
      error: "Invaild Credientials",
    });
  } else {
    UserModel.findOne({ email: email })
      .exec()
      .then((user) => {
        if (!user) {
          return res.json({
            error: "Auth Failed",
          });
        } else {
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              return res.json({
                error: "Auth Failed",
              });
            } else if (result) {
              const token = jwt.sign(
                {
                  username: user.username,
                  email: user.email,
                  userid: user._id,
                },
                "userMeraDost",
                {
                  expiresIn: "24h",
                }
              );
              return res.status(201).json({
                success:
                  "SuccessFully LOGGED in For 24 HOUR  , congratulations",
                token: token,
              });
            } else {
              return res.json({
                error: "Auth Failed",
              });
            }
          });
        }
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  }
};

module.exports = { Login, Register };

//====================>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<=================\\
