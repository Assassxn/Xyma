const Discord = require("discord.js");
const profileSchema = require("../../models/profileSchema");

module.exports = {
  name: "balance",
  permissions: [],
  aliases: ["bal", "wallet"],
  description: "bal <@user>",
  run: async(client, message, args) => {
    const target = message.mentions.users.first() || message.author;
    let targetData = await profileSchema.findOne({ userID: target.id });

      const embed = new Discord.MessageEmbed()
          .setTitle(`${target.username}'s balance`)
          .setThumbnail(`${target.displayAvatarURL({ dynamic: true })}`)
          .addFields(
              {
                  name: "**Wallet**",
                  value: `${target}'s wallet balance is ${targetData.hexacoins}<:gcoin:942792218748526643>`,
              },
              {
                  name: "**Bank**",
                  value: `${target}'s bank balance is ${targetData.bank}<:gcoin:942792218748526643>`,
              }
          )
          .setColor(0x0189ff)
          .setTimestamp()
          .setFooter(`${target.username}`, target.displayAvatarURL());

      message.channel.send(embed);
    
  },
};
