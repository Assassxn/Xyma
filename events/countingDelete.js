const Discord = require("discord.js");
const { client } = require("../index");
const db = require("../models/Guild");
const profileModel = require("../models/profileSchema");
const user = require("../models/Users");

client.on("messageDelete", async (messageDelete) => {
    if (messageDelete.channel.id !== "863820147419512832") return;
    const data = await db.findOne({ id: messageDelete.guild.id });
    if (!data) return;
    currentNumber = data.Current;
    if (isNaN(messageDelete.content)) return;

    await Discord.Util.delayFor(900);
    const fetchedLogs = await messageDelete.guild
        .fetchAuditLogs({
            limit: 1,
            type: "MESSAGE_DELETE",
        })
        .catch(() => ({
            entries: [],
        }));

    let executerID;

    auditEntry = fetchedLogs.entries.find((a) => {
        executerID = a.executor.id;
        return a.executor.id !== "814245954105507850" && a.extra.channel.id === data.Channel && Date.now() - a.createdTimestamp < 20000;
    });

    await profileModel.findOneAndUpdate({ userID: executerID }, { hexacoins: -20 });

    //leaderboard Counts
    await user.findOne({ id: executerID, Guild: messageDelete.guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.Counts--;
        } else {
            data = new user({
                id: executorID,
                Guild: messageDelete.guild.id,
                Counts: -1,
            });
        }
        data.save();
    });

    if (data.Current === parseInt(messageDelete.content)) {
        await db.findOneAndUpdate({ id: messageDelete.guild.id }, { $inc: { Current: -1 } });
    }

    const info = await profileModel.findOne({ userID: executerID });
    Embed = new Discord.MessageEmbed()
        .setColor("#e91015")
        .setDescription(
            `${client.users.cache.get(executerID)}, you lost 20 <:xytera:859531350385229825> for deleting your message in <#863820147419512832> \n| Balance: ${info.hexacoins} | Bank: ${info.bank}`
        );
    client.users.cache.get(executerID).send(Embed);
});
