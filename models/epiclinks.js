const mongo = require("mongoose");

module.exports = mongo.model(
    "epic links",
    new mongo.Schema({
        guildID: String,
        links: Array
    })
);
