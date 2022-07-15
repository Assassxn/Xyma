const mongoose = require("mongoose");

module.exports = new mongoose.model("prequestPosts", new mongoose.Schema({
    completed: Boolean,
    claimed: Boolean,
    claimerID: String,
    pid: String,
    requestMessageID: String,
    claimerID: String,
    miniboss: Boolean,
    survivor: Boolean,
    mistmonster: Boolean,
    sc: Boolean,
    elemental: Boolean,
    postedAt: String,
    claimedAt: String,
    completedAt: String,
    approvedAt: String,
    deniedAt: String,
}));