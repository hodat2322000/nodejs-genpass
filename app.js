const express = require("express");
const app = express()
const router = require("./routes")
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", "./views")

app.use("/", router);


app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
})