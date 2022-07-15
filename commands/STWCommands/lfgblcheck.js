const { MessageEmbed } = require("discord.js");
const blModel = require("../../models/lfgBlacklist");
module.exports = {
  name: "lfgblcheck",
  aliases: ["blacklistcheck", "blcheck"],
  hidden: true,
  timeout: 10000,
  description: "stw lfg blacklist check!",
  permissions: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    let found;
    let targetUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if (!args[0] || !message.mentions.users.first()) return message.channel.send("Please use this format `!blacklistcheck @member/UserID`");

    await blModel.findOne({ guildID: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        await data.blIDs.forEach((obj) => {
          if (obj.ID === targetUser.id) {
            foundEmbed = new MessageEmbed()
              .setTitle("BLACKLISTED")
              .setColor("#e91015")
              .addFields(
                {
                  name: "User: ",
                  value: `**${client.users.cache.get(obj.ID).username}**`,
                },
                {
                  name: `Added On: `,
                  value: `\`${obj.time}\``,
                },
                {
                  name: "Reason: ",
                  value: `\`${obj.reason}\``,
                }
              )
              .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
              .setTimestamp()
              .setFooter(`${client.users.cache.get(targetUser.id).tag}`, `${client.users.cache.get(targetUser.id).displayAvatarURL({ dynamic: true })}`);

            message.channel.send(foundEmbed);
            found = true;
            return;
          }
        });
        if (!found) {
          notFoundEmbed = new MessageEmbed()
            .setTitle("NOT BLACKLISTED")
            .setColor("#1ec45c")
            .addFields({
              name: "User: ",
              value: `**${client.users.cache.get(targetUser.id).username}**`,
            })
            .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
            .setTimestamp()
            .setFooter(`${client.users.cache.get(targetUser.id).tag}`, `${client.users.cache.get(targetUser.id).displayAvatarURL({ dynamic: true })}`);
          message.channel.send(notFoundEmbed);
        }
      }
    });
  },
};
