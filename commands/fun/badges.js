const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "badges",
  permissions: ['SEND_MESSAGES'],
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const flags = user.flags.toArray();

    message.channel.send(`${user}'s badges: ${flags.join(", ")}`);
  },
};
