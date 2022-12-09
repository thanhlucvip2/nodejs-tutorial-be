const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router1 = require("./router/account-router");
const path = require("path");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(
  "/publicFile",
  express.static(path.join(__dirname, "/public")) // dường dẩn public file
);
const port = 3000;
app.use("/api/v1/", router1);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "hello.html")); // gửi file html cho phía client
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
