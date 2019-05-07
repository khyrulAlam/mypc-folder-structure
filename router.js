const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  res.render(__dirname + "/public/" + "index.html");
});

router.get("/file", async (req, res) => {
  let data = await walk("/home/aa");
  res.json(data);
});

const walk = async dir => {
  let result = [];
  let fileName = await fs.readdirSync(dir);
  fileName.map(file => {
    let realFile = file.match(/^(?![.])(?!.*[-_.]$).+/g);
    if (realFile) {
      result.push(realFile);
    }
  });
  //   str2.match(/^(?![.])(?!.*[-_.]$).+/g)
  return result;
};
module.exports = router;
