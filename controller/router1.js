const express = require("express");
const router1 = express.Router();

const data = [
  { id: 1, name: "iphone" },
  { id: 2, name: "samsung" },
  { id: 3, name: "nokia" },
  { id: 4, name: "oppo" },
];

router1.get("/detail", (req, res) => {
  res.json(data);
});
router1.get("/:id", (req, res) => {
  res.json(data.find((item) => item.id === +req.params.id));
});

module.exports = router1;
