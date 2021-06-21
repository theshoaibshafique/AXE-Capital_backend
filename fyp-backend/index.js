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

//set up routes

app.use("/companies", require("./routes/companyRouter"));
app.use("/users", require("./routes/userRouter"));
app.use("/watchlists", require("./routes/watchlistRouter"));
