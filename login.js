var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var validator = require("email-validator");
var cors = require("cors");
const app = express();

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://Localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopoLogy: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("Error in connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/log_in", (req, res) => {
  console.log("User Data", req.body);
  var email = req.body.email;
  var password = req.body.password;

  var data = {
    email: email,
    password: password,
  };
  if (email && password) {
    if (validator.validate(email)) {
      if (password.length >= 6) {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          data.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({ message: "user not " });
        }

        db.collection("users").insertOne(data, (err, collection) => {
          if (err) {
            return res.status(200).json({
              success: false,
              message: err.message,
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Login successfully ",
              data: collection,
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
        message: "Email should be valid",
      });
    }
  } else {
    return res.status(400).json({
      sucess: false,
      message: "All Data is Compulsory",
    });
  }

  res.status(200).send({
    id: data._id,
    name: data.name,
    email: data.email,
  });
});
app.listen(4000);

console.log("Server is Responding on Port 4000");
