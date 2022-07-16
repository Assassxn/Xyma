const { generateShop, getShopItems } = require("../../shop");
const { apiKey, language, watermark } = require("../../config.json");
const { MessageAttachment, MessageEmbed } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: "genshop",
    permissions: [],
    aliases: ["shop"],
    run: async(client, message, args) => {
        message.delete().catch();
        if (!message.guild.members.cache.get(message.author.id).roles.cache.has("844316500768981045")) return;

        message.channel.send(`<a:loading:867330046980259840> Rendering Image`).then(async(loadingMsg) => {
            const items = await getShopItems(apiKey, language);
            await generateShop(items, watermark);

            const attachment = new MessageAttachment("./shop.jpeg", "sample.jpeg");

            message.channel.send({ files: [attachment] }).then((msg) => {
							const embed = new MessageEmbed().setTitle("Today's Item Shop").setImage(msg.attachments.first().url).setColor("RANDOM");
							loadingMsg.delete().catch();
							message.channel.send("Today's Item Shop", embed);

							try {
								fs.unlinkSync("./shop.jpeg");
							} catch {}
						});
        });
    }
}