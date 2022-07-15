const mongoose = require("mongoose");

// const profileSchema = new mongoose.Schema({
//   postedPrequest: { type: Boolean, default: false },
//   userID: { type: String },
//   serverID: { type: String },
//   hexacoins: { type: Number, default: 1000 },
//   bank: { type: Number },
//   MSKCarries: { type: Number, default: 0 },
//   STWCarries: { type: Number, default: 0 },
//   CraftRep: { type: Number, default: 0 },
//   xp: { type: Number, default: 0 },
//   level: { type: Number, default: 1 },
//   epic: { type: String },
//   pl: { type: Number },
//   playingttt: { type: Boolean, default: false },
//   muted: { type: Boolean, default: false },
// });

const profileSchema = new mongoose.Schema({
    postedPrequest: { type: Boolean, default: false },
    userID: { type: String },
    serverID: { type: String },
    hexacoins: { type: Number, default: 1000 },
    bank: { type: Number },
    MSKCarries: { type: Number, default: 0 },
    STWCarries: { type: Number, default: 0 },
    CraftRep: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    epic: { type: String },
    pl: { type: Number },
    playingttt: { type: Boolean, default: false },
    muted: { type: Boolean, default: false },
});

const model = mongoose.model("Profiles", profileSchema);
module.exports = model;
