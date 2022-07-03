const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/./config.env` });
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DB.replace("<password>", process.env.PASSWORD);

mongoose.connect(
  DB,
  () => {
    console.log("DB connected");
  },
  (e) => {
    console.log(`Error on DB: ${e.message}`);
  }
);

app.listen(8000, () => {
  console.log("server works good on http://localhost:8000");
});
