const { json } = require("body-parser");
const express = require("express");
const router1 = express.Router();

const AccountModel = require("../account/account");

const checkUser = async (req, res, next) => {
  const { username } = req.body;
  const checkUser = await AccountModel.findOne({ username });
  if (checkUser) {
    res.json("user đã tồn tại trong hệ thống");
  } else {
    next();
  }
};

const checkNoUesr = async (req, res, next) => {
  const { username } = req.body;
  const checkUser = await AccountModel.findOne({ username });
  if (!checkUser) {
    res.json("user không tồn tại trong hệ thống");
  } else {
    next();
  }
};

router1.get("/", async (req, res, next) => {
  const { page, size } = req.query;
  if (page) {
    var userCount = await AccountModel.count("username");
    const skip = (+page - 1) * +size;
    const allAccount = await AccountModel.find({})
      .sort("username")
      .skip(skip)
      .limit(+size);

    res.json({ item: allAccount, total: userCount });
    return;
  }
  const data = await AccountModel.find({});
  if (data) {
    res.json(data);
  } else {
    res.status(500).json("lỗi server");
  }
});

router1.post("/", checkUser, async (req, res, next) => {
  const { username, password } = req.body;
  const newData = await AccountModel.create({
    username,
    password,
  });
  if (newData) {
    res.json(newData);
  } else {
    res.json("tạo user thất bại");
  }
});

router1.put("/", async (req, res, next) => {
  const { username, password } = req.body;
  const checkUser = await AccountModel.findOne({ username });
  if (!checkUser) {
    res.status(400).json("user không tồn tại trong hệ thống");
  } else {
    await AccountModel.updateOne(
      {
        username,
      },
      {
        username,
        password,
      }
    );
    res.json(await AccountModel.findOne({ username }));
  }
});

router1.delete("/", checkNoUesr, async (req, res, next) => {
  const { username } = req.body;

  const deletes = await AccountModel.deleteOne({ username });
  if (deletes) {
    res.json("xóa thành công : " + username);
  } else {
    res.status(400).json("thất bại");
  }
});

module.exports = router1;
