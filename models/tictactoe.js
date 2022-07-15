const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    firstUser: String,
    secondUser: String,
    channelID: String,
})

module.exports = mongoose.model("tictactoe", schema)