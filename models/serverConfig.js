const mongoose = require("mongoose");

const serverConfig = new mongoose.Schema({
  guildID: { type: String },
  xpRate: { type: Number },
});

const model = mongoose.model("serverConfig", serverConfig);
module.exports = model;
