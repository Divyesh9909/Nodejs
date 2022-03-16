var express = require("express");
var cors = require("cors");
const morgan = require("morgan");
require("./server/Dbconnectors/database");

var bodyParser = require("body-parser");

// const middlewarefunc = require("./server/Middleware/auth");

const HomeRoute = require("./server/Routes/HomeRoutes");
const ProductRoutes = require("./server/Routes/ProductRoutes");
const CartRoutes = require("./server/Routes/CartRoutes");
const RazorPayRoutes = require("./server/Routes/RazorPayRoutes");
const RazorPay = require("./server/Routes/RazorPayRoutes");
const UserRoute = require("./server/Routes/UserRoutes");
const PaymentRoutes = require("./server/Routes/PaymentRoutes");

const NotFound = require("./server/Routes/NotFound");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

// ------------------------Imported Routes In Use--------------------------|

app.get("/", HomeRoute);

// because login and signup itself generate a new token so no need to pass a middleware to check if there is any Token exist or not
app.use("/", UserRoute);

// because user must be logged in so we are checking for a authorization token {so passed a function as a middleware }
app.get("/product", ProductRoutes);
app.use("/", CartRoutes);
app.use("/", RazorPay);
app.use("/", PaymentRoutes);
app.use("*", NotFound);

app.listen(4000);

console.log("Server is Responding on Port 4000");
