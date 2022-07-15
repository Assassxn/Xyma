const db = require('../../models/warns')

module.exports = {
  name: "remove-warn",
  hidden: true,
  permissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("User not found.");
    await db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        let number = parseInt(args[1]) - 1;
        data.content.splice(number, 1);
        message.channel.send("deleted the warn");
        data.save();
      } else {
        message.channel.send("This user does not have any warns in this server!");
      }
    });
  },
};