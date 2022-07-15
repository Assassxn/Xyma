const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    guildid: String,
    user: String,
    content: Array,
})

module.exports = mongoose.model("warns", schema)