require("dotenv").config();
const mongoose = require("mongoose");

const DB = process.env.MONGODB_URL;

mongoose
  .connect(DB)
  .then(() => console.log("Database connect"))
  .catch((errr) => {
    console.log(errr);
  });
