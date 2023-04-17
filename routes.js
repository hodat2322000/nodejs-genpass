const express = require("express");
const router = express.Router();
const generatePassword = require("./app/gen_pass");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const bodyParser = require("body-parser");
const { response } = require("express");

router.get("/", (req, res) => {
  if (req.cookies.loggedIn === "true") {
    res.sendFile(__dirname + "/index.html");
  } else {
    res.redirect("login");
  }
});

router.get("/login", (req, res) => {
  if (req.cookies.loggedIn === "true") {
    res.redirect("/");
  } else {
    res.sendFile(__dirname + "/login.html");
  }
});

router.get("/logout", (req, res) => {
  res.cookie("loggedIn", false);

  res.redirect("login");
});

router.get("/dangki", (req, res) => {
  res.sendFile(__dirname + "/dangki.html");
});

router.get("/generate-password", (req, res) => {
  const password = generatePassword.generatePassword(10);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(password);
  return res.end();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Đọc tệp users.json
  const usersRaw = fs.readFileSync("users.json");
  const users = JSON.parse(usersRaw);
    console.log(users);
  const user = users.users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.cookie("loggedIn", true);
    res.redirect("/");
  } else {
    res.render("login", { message: "Invalid username or password" });
  }
});

router.post("/dangki", (req, res) => {
  // Handle register POST request

  const { username, password } = req.body;
  // Load user data from file

  const userData = JSON.parse(fs.readFileSync("users.json"));
  // Check if username is already registered
  const isRegistered = userData.users.some(
    (user) => user.username === username
  );
  if (isRegistered) {
    res.send("Email is already registered");
    return;
  }
  // Add new user to data
  userData.users.push({
    username,
    password,
  });
  // Write new user data to file
  fs.writeFileSync("./users.json", JSON.stringify(userData));

  res.send("Registration successful");
});

module.exports = router;
