require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

var companyRoutes = require("./controllers/companyController");

var app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Started at : ${PORT}`));

//set up routes

app.use("/companies", companyRoutes);
app.use("/users", require("./routes/userRouter"));
