const { Util } = require("discord.js");

module.exports = {
    name: "yoink2",
    aliases: ["steal2"],
    hidden: true,
    description: "yoinks an emoji",
    permissions: [],
    usage: "!yoink2 <emoji> optional",
    run: async (client, message, args) => {
        if (message.author.id === "535190610185945138") {
            if (!args[0]) return;

            for (const rawEmoji of args) {
                const parsedEmoji = Util.parseEmoji(rawEmoji);

                if (parsedEmoji.id) {
                    const extension = parsedEmoji.animated ? ".gif" : ".png";
                    const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                    message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => message.channel.send(`Yoinked \`${emoji.url}\``));
                }
            }
        }
    },
};
