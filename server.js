const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
const AccountModel = require("./model/account.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const checkValidate = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    next();
  } else {
    res.send("vui lòng điền đủ thông tin");
  }
};

const checkRegistor = async (req, res, next) => {
  const { username, password } = req.body;
  const isCheck = await AccountModel.findOne({ username });


  if (isCheck) {
    res.send("Tài khoản đã tồn tại");
  } else {
    next();
  }
};

app.post("/registor", checkValidate, checkRegistor, async (req, res) => {
  const { username, password } = req.body;
  const iscreate = await AccountModel.create({ username, password });
  if (iscreate) {
    res.json({
      status: "tạo thành công",
      username,
      password,
    });
  } else {
    res.json("thất bại");
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
