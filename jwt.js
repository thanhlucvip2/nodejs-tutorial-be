const jwt = require("jsonwebtoken");

// const data = { username: "thanhlucvip" };
// const token = jwt.sign(data, "passw", { expiresIn: 60 });
// console.log(token);

try {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoYW5obHVjdmlwIiwiaWF0IjoxNjcwOTA3MzI0LCJleHAiOjE2NzA5MDczMzR9.n6KqH9YRWE6BegP9mbymANnLVw-ITMUstfHn5sfCTGA";
  const check = jwt.verify(token, "passw");
  console.log(check);
} catch (error) {
  console.log(error);
}
