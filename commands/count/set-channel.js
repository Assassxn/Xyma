const { Client, Message, MessageEmbed } = require("discord.js");
const Guild = require("../../models/Guild");
module.exports = {
  name: "set-counting",
  permissions: ['ADMINISTRATOR'],
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first();
    if (!channel) return message.reply("no channel");
    Guild.findOne(
      {
        id: message.guild.id,
      },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          data.Channel = channel.id;
        } else {
          data = new Guild({
            id: message.guild.id,
            Current: -1,
            Channel: channel.id,
          });
        }
        data.save();
        message.channel.send("has been binded to " + channel.toString());
      }
    );
  },
};
