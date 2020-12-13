const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/fypDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) console.log("Mongodb connection established");
    else
      console.log(
        "Error while connecting MongoDB: " + JSON.stringify(err, undefined, 2)
      );
  }
);
