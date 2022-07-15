const mongoose = require("mongoose");

module.exports = new mongoose.model(
  "userIDs",
  new mongoose.Schema({
    guildID: String,
    IDs: Array,
  })
);
