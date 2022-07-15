const db = require('../../models/warns')
const {Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: "warn",
  hidden: true,
  permissions: ["ADMINISTRATOR"],
  /**
   * @param {Message} message
   * @param {Client} client
   */
  run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(`${user} has not been warned before`);
    const reason = args.slice(1).join(" ");
    await db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
      if (err) throw err;
      if (!data) {
        data = new db({
          guildid: message.guild.id,
          user: user.user.id,
          content: [
            {
              moderator: message.author.id,
              reason: reason,
            },
          ],
        });
      } else {
        const obj = {
          moderator: message.author.id,
          reason: reason,
        };
        data.content.push(obj);
      }
      await data.save();
    });
    user.send(new MessageEmbed().setDescription(`You have been warned for ${reason}`).setColor("RED"));
    message.channel.send(new MessageEmbed().setDescription(`Warned ${user} for ${reason}`).setColor("BLUE"));
  },
};