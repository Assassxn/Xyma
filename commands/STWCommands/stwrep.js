const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "stwrep",
    aliases: [],
    permissions: [],
    description: "check STW carries reputations",
    run : async(client, message, args) => {
        await profileModel.findOne({ userID: message.author.id}, async (err, data) => {
            message.delete();
            if (err) throw err;
            if (data) {
                message.channel.send(`${message.author}, Lifetime Rep: \`${data.STWCarries}\``)
            }
        })
    }
}