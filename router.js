const express = require("express");
const router = express.Router();
const fs = require("fs");
const routeDir = "/home/aa";

router.get("/", (req, res) => {
  res.render(__dirname + "/public/" + "index.html");
});

router.get("/file", async (req, res) => {
  let data = await walk("/home/aa");
  res.json(data);
});

router.get("/sub", async (req, res) => {
  let { dir } = req.query;
  try {
    let data = await walk(dir);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

const walk = async dir => {
  let result = [];
  let fileName = await fs.readdirSync(dir);
  fileName.map(file => {
    let realFile = file.match(/^(?![.])(?!.*[-_.]$).+/g);
    if (realFile) {
      let obj = {
        fileName: file,
        path: dir + "/" + file,
        isDirectory: fs.lstatSync(dir + "/" + file).isDirectory()
      };
      result.push(obj);
    }
  });
  return result;
};
module.exports = router;
