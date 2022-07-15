const mongo = require("mongoose");

module.exports = mongo.model(
    "temporary Links",
    new mongo.Schema({
        tempLinks: Array,
    })
);
