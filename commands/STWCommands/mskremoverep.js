const profileSchema = require("../../models/profileSchema");

module.exports = {
  name: "mskremoverep",
  aliases: [],
  hidden: true,
  permissions: [],
  description: "removes MSK rep to players",
  run: async (client, message, args) => {
    message.delete();
    mod = message.guild.roles.cache.find((role) => role.name === "Moderator");
    Assassin = message.guild.roles.cache.find((role) => role.name === "Assassin");
    if (!message.guild.members.cache.get(message.author.id).roles.cache.has(mod.id || Assassin.id)) return;
    let target = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    await profileSchema.findOneAndUpdate(
      { userID: target.id },
      {
        $inc: {
          MSKCarries: -1,
        },
      }
    );

    await profileSchema.findOne({ userID: target.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        message.channel.send(`${client.users.cache.get(data.userID).username} - Lifetime: ${data.MSKCarries}`);
      }
    });
  },
};
