const profileModel = require("../../models/profileSchema");
const { returnPl2 } = require("../../Utils/returnPl2");
const links = require("../../models/epiclinks");

module.exports = {
    name: "pl",
    aliases: ["powerlevel"],
    permissions: [],
    description: "sends your stw power level or someone else's power level",
    run: async (client, message, args) => {
        if (args.length === 0 || args[0].startsWith("<")) {
            let targetID;
            if (message.mentions.users.first()) {
                targetID = message.mentions.users.first().id;
            } else {
                targetID = message.author.id;
            }

            message.delete();
            data = await links.findOne({ guildID: message.guild.id });

            let found = false;
            await data.links.forEach(async (linkedAcc, index) => {
                if (linkedAcc.discordID === targetID) {
                    found = true;
                    await returnPl2(linkedAcc.accountID).then(async (pls) => {
                        await message.channel.send(`${message.guild.members.cache.get(targetID)} | PowerLevel: \`${pls[0]}\` | Ventures: \`${pls[1]}\``);
                        return;
                    });
                }

                if (!found && index === data.links.length - 1) {
                    message.channel.send(`${message.guild.members.cache.get(targetID)}, you need to link your epic account first. To do that head over to <#871364695049797652> and react with <:epicgames:871366292232351784>`);
                }
            });
        }
    },
};
