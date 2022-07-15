const mongo = require("mongoose");

module.exports = mongo.model(
  "Leaderboard Counting",
  new mongo.Schema({
    id: String,
    Guild: String,
    Counts: Number,
  })
);
