const express = require("express");
const app = express();
const port = 3000;
const router1 = require("./controller/router1");

app.use("/api1", router1);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
