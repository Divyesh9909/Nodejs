var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
const morgan = require("morgan");

var bodyParser = require("body-parser");
var validator = require("email-validator");

const Login = require("./server/Routes/LoginRoutes");
const ProductRoutes = require("./server/Routes/ProductRoutes");
const CartRoutes = require("./server/Routes/CartRoutes");
const StripeRoutes = require("./server/Routes/StripeRoutes");

const app = express();

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan("dev"));
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

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});
app.post("/sign_up", (req, res) => {
  console.log("User Data", req.body);
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var password = req.body.password;

  var data = {
    name,
    email,
    phno,
    password,
  };

  if (name && email && phno && password) {
    if (name.length >= 3) {
      if (validator.validate(email)) {
        if (phno.length === 10) {
          if (password.length >= 6) {
            let hash = bcrypt.hashSync(password, saltRounds);
            console.log("hash", hash);
            data.password = hash;

            db.collection("users").insertOne(data, (err, collection) => {
              if (err) {
                return res.status(200).json({
                  success: false,
                  message: err.message,
                });
              } else {
                return res.status(200).json({
                  success: true,
                  message: "registered successfully ",
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
        message: "Name should be grether than 3 Char",
      });
    }
  } else {
    return res.status(400).json({
      sucess: false,
      message: "All Data is Compulsory",
    });
  }
});
app.use("/login", Login);
app.use("/product", ProductRoutes);
app.use("/cart", CartRoutes);
app.use("/pay", StripeRoutes);

app.get("*", function (req, res) {
  res.status(404).json({
    success: true,
    message: "route not found",
  });
});

app.listen(4000);

console.log("Server is Responding on Port 4000");
