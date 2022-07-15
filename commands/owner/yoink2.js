const { Util } = require("discord.js");

module.exports = {
    name: "yoink",
    aliases: ["steal"],
    hidden: true,
    description: "yoinks an emoji by a link",
    permissions: [],
    usage: "!yoink URL Name",
    run: async (client, message, args) => {
        if(!args[0]) return;
        if(!args[1]) return;
        if (message.author.id === "535190610185945138") {
            try {
                message.guild.emojis.create(args[0], args[1]).then((emoji) => {
                    message.channel.send(`Yoinked ${emoji}`)
                })
            } catch {}
        }
    },
};
