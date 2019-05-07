const express = require("express");
const app = express();
const router = require("./router");
const bodyParser = require("body-parser");
const path = require("path");

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

// Start our app!
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
