const express = require("express");
var router = express.Router();
var ObjectID = require("mongoose").Types.ObjectId;

var { Company } = require("../models/company");

router.get("/", (req, res) => {
  Company.find((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while retrieving all records: " +
          JSON.stringify(err, undefined, 2)
      );
  });
});

router.post("/", (req, res) => {
  var newRecord = new Company({
    title: req.body.title,
    ticker: req.body.ticker,
    domain: req.body.domain,
    status: req.body.status,
  });
  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while creating new record: " + JSON.stringify(err, undefined, 2)
      );
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id :" + req.params.id);

  var updatedRecord = {
    title: req.body.title,
    ticker: req.body.ticker,
    domain: req.body.domain,
    status: req.body.status,
  };

  Company.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else
        console.log(
          "Error while updating a record: " + JSON.stringify(err, undefined, 2)
        );
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id :" + req.params.id);

  Company.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while deleting a record: " + JSON.stringify(err, undefined, 2)
      );
  });
});

module.exports = router;
