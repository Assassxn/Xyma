const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  name: "ban",
  permissions: ["BAN_MEMBERS"],
  description: "This command bans a member!",
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    if (!member) {
      message.channel.send(`Please mention a member to ban`).then((msg) => {
        setTimeout(() => msg.delete(), 2000);
      });
    }
    if (message.member.roles.highest.position <= member.roles.highest.position) {
      message.reply(`Unable to ban ${member} either because you share the same role or you have a lower role than them`).then((msg) => {
        setTimeout(() => msg.delete(), 2000);
      });
      return
    }
    const rsn = args.slice(1).join(" ") || "No Reason Provided";
    member.ban({ reason: rsn });
    message.channel.send(`Banned ${member} for: \`${rsn}\``);
  },
};
