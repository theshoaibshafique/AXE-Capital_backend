require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

var app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Started at : ${PORT}`));

app.get("/timeseries", function (req, res) {
  var spawn = require("child_process").spawn;
  var process = spawn("python", [
    "./getdata.py",
    req.query.ticker, // for example ~ TSLA
  ]);
  process.stdout.on("data", function (data) {
    res.send(data);
  });
});

//set up routes

app.use("/companies", require("./routes/companyRouter"));
app.use("/users", require("./routes/userRouter"));
app.use("/watchlists", require("./routes/watchlistRouter"));
