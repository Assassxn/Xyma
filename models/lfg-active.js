const mongoose = require("mongoose");

module.exports = new mongoose.model(
  "lfg-active",
  new mongoose.Schema({
    guildID: String,
    IDs: Array,
  })
);