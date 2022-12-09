const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Connected!"));

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
