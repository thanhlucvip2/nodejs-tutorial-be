const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router1 = require("./router/account-router");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const port = 3000;
app.use("/api/v1/", router1);
app.get("/", (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
