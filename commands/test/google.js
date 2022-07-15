const googleIt = require("google-it");
const { MessageEmbed } = require(`discord.js`);

module.exports = {
    name: "google",
    aliases: ["googleit"],
    permissions: [],
    description: "googling google!",
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setTitle("Google Search Results").setColor(3426654).setTimestamp();

        googleIt({ query: args.join(" ") })
            .then((results) => {
                results.forEach(function (item, index) {
                    embed.addField(index + 1 + ": " + item.title, "<" + item.link + ">");
                });
                message.channel.send(embed);
            })
            .catch((e) => {
                // any possible errors that might have occurred (like no Internet connection)
            });
    },
}