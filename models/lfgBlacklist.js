const mongoose = require("mongoose");

module.exports = new mongoose.model(
  "Blacklisted LFG User IDs",
  new mongoose.Schema({
    guildID: String,
    blIDs: Array,
  })
);