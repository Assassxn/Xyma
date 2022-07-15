const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "load-get-roles",
    aliases: ["load-gr", "gr"],
    permissions: ["ADMINISTRATOR"],
    description: "Sets up a reaction role message!",
    run: async (client, message, args) => {
        message.delete();
        await message.channel.send("https://cdn.discordapp.com/attachments/845954962277531648/860268547389390909/output-onlinepngtools_23.png");

        const ASIAEmoji = "<:ASIA:863064095459639336>";
        const BRZEmoji = "<:BRZ:863064355498098728>";
        const EUEmoji = "<:EU:863063958877503509>";
        const MEEmoji = "<:ME:863064530976505887>";
        const NAEEmoji = "<:NAE:863064663646142525>";
        const NAWEmoji = "<:NAW:863064768709001286>";
        const OCEEmoji = "<:OCE:863064886539714570>";

        const announcementsEmoji = "📢";
        const twitchandyoutubeEmoji = "🔔";
        const giveawaysEmoji = "🎁";
        const minigamesEmoji = "🧩";

        const PCEmoji = "🖥️";
        const XBOXEmoji = "<:xbox:863066136505876540>";
        const PlaystationEmoji = "<:playstation:863066351428829234>";
        const mobileEmoji = "📱";
        const switchEmoji = "<:switch:863066489015238726>";

        let firstEmbed = new MessageEmbed()
            .setColor("#202225")
            .setDescription(
                "**GENERAL NOTIFICATIONS**\n>>> " +
                    `${announcementsEmoji} - Announcements\n` +
                    `${twitchandyoutubeEmoji} - Twitch & Youtube\n` +
                    `${giveawaysEmoji} - Giveaways\n` +
                    `${minigamesEmoji} - Minigames\n`
            );
        await message.channel.send(firstEmbed).then((msg) => {
            msg.react(announcementsEmoji);
            msg.react(twitchandyoutubeEmoji);
            msg.react(giveawaysEmoji);
            msg.react(minigamesEmoji);
        });

        let secondEmbed = new MessageEmbed().setColor("#202225").setDescription("**PRIMARY PLATFORM**");
        await message.channel.send(secondEmbed).then((msg) => {
            msg.react(PCEmoji);
            msg.react(XBOXEmoji);
            msg.react(PlaystationEmoji);
            msg.react(mobileEmoji);
            msg.react(switchEmoji);
        });

        let thirdEmbed = new MessageEmbed().setColor("#202225").setDescription("**PRIMARY REGION**");
        await message.channel.send(thirdEmbed).then((msg) => {
            msg.react(ASIAEmoji);
            msg.react(BRZEmoji);
            msg.react(EUEmoji);
            msg.react(MEEmoji);
            msg.react(NAEEmoji);
            msg.react(NAWEmoji);
            msg.react(OCEEmoji);
        });
    },
};
