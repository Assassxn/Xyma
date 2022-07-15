const profileSchema = require("../../models/profileSchema");

module.exports = {
  name: "mskaddrep",
  hidden: true,
  aliases: [],
  permissions: [],
  description: "adds MSK rep to players",
  run: async (client, message, args) => {
    message.delete();
    Admin = message.guild.roles.cache.find((role) => role.name === "Admin");
    Assassin = message.guild.roles.cache.find((role) => role.name === "Assassin");
    if (!message.guild.members.cache.get(message.author.id).roles.cache.has(Admin.id || Assassin.id)) return;
    let target = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    await profileSchema.findOneAndUpdate(
      { userID: target.id },
      {
        $inc: {
          MSKCarries: 1,
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
