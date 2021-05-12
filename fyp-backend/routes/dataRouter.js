var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  var spawn = require("child_process").spawn;
  var process = spawn("python", [
    "./getdata.py",
    req.query.ticker, // for example ~ TSLA
  ]);
  process.stdout.on("data", function (data) {
    console.log("Why");
    res.send(data);
  });
});

module.exports = router;
