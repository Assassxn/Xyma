const {client} = require("../index");
const { Collection, MessageEmbed, Util } = require("discord.js");
const Pings = new Collection();

client.on("message", (message) => {
    if (!message.guild) return;
    if (!message.mentions.users.first()) return;
    if (message.mentions.members.first().id === message.author.id) return;
    const time = 5000;
    Pings.set(`pinged:${message.mentions.members.first().id}`, Date.now() + time);

    setTimeout(() => {
        Pings.delete(`pinged:${message.mentions.members.first().id}`);
    }, time);
});

client.on("messageDelete", async(message) => {
    if (!message.mentions.members.first()) return;

    await Util.delayFor(1000);

    const fetchedLogs = await message.guild
        .fetchAuditLogs({
            limit: 1,
            type: "MESSAGE_DELETE",
        })
        .catch(console.error);

    if (fetchedLogs.entries.first().target.id === "814245954105507850") return;// if its the bot that is deleting the message I dont want it to be a ghost ping

    if (Pings.has(`pinged:${message.mentions.members.first().id}`)) {
        const channel = client.channels.cache.get("867106774758195261");
        embed = new MessageEmbed().setTitle("Ghost Ping Detected").addField(`Author`, message.author, false).addField(`Content`, message.content, false).setColor("#e91015").setTimestamp();
        channel.send(embed);
    }
});
