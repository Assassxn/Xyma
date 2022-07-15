const mongo = require("mongoose");

module.exports = mongo.model(
  "Current Number Counting",
  new mongo.Schema({
    id: String,
    Current: Number,
    Channel: String,
  })
);