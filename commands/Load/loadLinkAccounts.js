const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "load-la",
    aliases: ["la"],
    hidden: true,
    permissions: ["ADMINISTRATOR"],
    description: "loads link accounts!",
    run: async (client, message, args) => {
        message.delete();
        lachan = message.guild.channels.cache.find((c) => c.id == "871364695049797652");

        await lachan.send("https://cdn.discordapp.com/attachments/845954962277531648/871365562628976710/link_accounts.png");
        
        const firstEmbed = new MessageEmbed().setColor("#0f0f0f").setDescription("<:epicgames:871366292232351784> **Epic Games** - Gain access to the Fortnite Channelsㅤㅤㅤㅤ");
            // .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png");
            
        await lachan.send(firstEmbed).then((msg) => {
            msg.react("<:epicgames:871366292232351784>");
        });
        
    },
};
