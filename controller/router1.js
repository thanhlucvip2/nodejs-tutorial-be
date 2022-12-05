const express = require("express");
const router1 = express.Router();
const app = express();
const data = [
  { id: 1, name: "iphone" },
  { id: 2, name: "samsung" },
  { id: 3, name: "nokia" },
  { id: 4, name: "oppo" },
];

var checkDangNhap = (req, res, next) => {
  console.log(req.query);
  if (req.query.authen === "thanhlucvip") {
    next();
  } else {
    next("ban chua đăng nhập");
  }
};
var checkAdmin = (req, res, next) => {
  console.log(req.query);
  if (req.query.role === "admin") {
    next();
  } else {
    next("ban khong phai admin");
  }
};

// khi hàm môt trong những hàm next của middleware có truyền dữ liệu thì sẽ chạy xuống hàm xulyloi
var hamXulyLoi = (err, req, res, next) => {
  console.log(err);
  res.send(err);
};
// ví dụ về middleware xác thực phân quyền

// đầu tiên chạy vào router1 để check
// nếu xác thực thành công thì next
// ngược lại báo lỗi

router1.get(
  "/detail",
  checkDangNhap, // check middleware đăng nhập trước
  checkAdmin, // check middleware admin
  hamXulyLoi,
  (req, res, next) => {
    console.log("md 1"); // hàm chạy middleware 1
    next(); // nếu không dùng hàm next thì hàm chạy middleware 1 sau đó dừng lại và treo
    // nếu next ở md1 thì sẽ chạy đến middleware 2
    res.json(data);
  },
  (req, res, next) => {
    console.log("md 2");
  },
  (req, res, next) => {
    console.log("md 3");
  }
);
router1.get(
  "/:id",
  checkDangNhap, // check middleware đăng nhập trước
  checkAdmin, // check middleware admin
  (req, res) => {
    res.json(data.find((item) => item.id === +req.params.id));
  }
);

module.exports = router1;
