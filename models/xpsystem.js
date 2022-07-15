const mongoose = require("mongoose");

const xpSystem = new mongoose.Schema({
  memberID: { type: String },
  guildID: { type: String },
  experiencePoints: { type: Number, default: 1 },
  currentLevel: { type: Number, default: 1 },
});

const model = mongoose.model("xpsystem", xpSystem);
module.exports = model;
