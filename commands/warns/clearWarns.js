const db = require('../../models/warns')

module.exports = {
  name: "remove-all-warns",
  permissions: ["ADMINISTRATOR"],
  hidden: true,
  aliases: ["ral", "clear-warns"],
  run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("User not found.");
    await db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        await db.findOneAndDelete({ user: user.user.id, guildid: message.guild.id });
        message.channel.send(`Cleared ${user.user.tag}'s warns`);
      } else {
        message.channel.send("This user does not have any warns in this server!");
      }
    });
  },
};