const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "mskrep",
    aliases: ["mrep"],
    permissions: [],
    description: "check MSK rep",
    run : async(client, message, args) => {
        message.delete();
        await profileModel.findOne({ userID: message.author.id}, async (err, data) => {
            if (err) throw err;
            if (data) {
                message.channel.send(`${message.author}, Lifetime Rep: \`${data.MSKCarries}\``)
            }
        })
    }
}