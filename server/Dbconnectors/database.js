const mongoose = require("mongoose");

const db = () => {
  try {
    mongoose.connect(
      "mongodb://Localhost:27017/mydb",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (!err) {
          console.log("MongoDB Connection Succeeded.");
        } else {
          console.log("Error in DB connection  : ", err.message);
        }
      }
    );
  } catch (error) {
    console.log("Error in DB connnection ");
    console.log(error.message);
  }
};

db();

module.exports = mongoose;
