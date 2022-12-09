const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/thanhlucvip")
  .then((data) => console.log("connect success"));

const AccountSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "Account",
  }
);

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;
