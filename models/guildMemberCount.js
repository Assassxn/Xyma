const mongoose = require("mongoose");

module.exports = new mongoose.model(
  "guildMemberCount",
  new mongoose.Schema({
    guildID: String,
    memberCount: Number,
  })
);
