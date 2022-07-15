const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  GuildID: String,
  Cmds: Array,
});

module.exports = mongoose.model("Commands", Schema);
