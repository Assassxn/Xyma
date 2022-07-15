const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
    messageId: String,
    userIds: Array,
});

module.exports = mongoose.model("Boost Messages", Schema);
