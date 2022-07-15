const mongo = require('mongoose');

const schema = new mongo.Schema({
    guildID: String,
    activeLinks: Array,
});

module.exports = mongo.model("Active Links", schema);