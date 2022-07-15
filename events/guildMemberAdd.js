const { client } = require("../index");
const memberCount = require("../models/guildMemberCount");
const userIDs = require("../models/usersIDs");

client.on("guildMemberAdd", async (member) => {
    joinLeaveChan = client.channels.cache.get("878683911423668275");
    let data;
    let IDs;
    try {
        IDs = await userIDs.findOne({ guildID: member.guild.id });
        data = await memberCount.findOne({ guildID: member.guild.id });
        if (IDs) {
            let data = await userIDs.findOne({ guildID: member.guild.id });

            await data.IDs.forEach((userID) => {
                if (userID === member.id) return;
            });
            await userIDs.findOneAndUpdate({ guildID: member.guild.id }, { $push: { IDs: member.id } });
        }
        if (data) {
            if (data.memberCount <= 10) {
                member.roles.add("862051551382863882");
            }
            if (data.memberCount <= 50 && data.memberCount > 10) {
                member.roles.add("862051805264216074");
            }
            if (data.memberCount <= 100 && data.memberCount > 50) {
                member.roles.add("862051960919293964");
            }
            await memberCount.findOneAndUpdate({ guildID: member.guild.id }, { $inc: { memberCount: 1 } });
        }
        if (!data) {
            let info = await memberCount.create({
                guildID: member.guild.id,
                memberCount: 1,
            });
            info.save();
        }
        if (!IDs) {
            let info = await userIDs.create({
                guildID: member.guild.id,
                IDs: member.id,
            });
            info.save();
        }
        joinLeaveChan.send(`JOIN: ${member} | ID: \`${member.id}\``)
    } catch (err) {
        console.log(err);
    }
});
