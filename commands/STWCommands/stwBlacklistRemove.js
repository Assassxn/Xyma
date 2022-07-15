const blIDs = require("../../models/lfgBlacklist");
const moment = require("moment");

module.exports = {
  name: "stwblremove",
  aliases: ["stwblacklistremove", "blremove"],
  timeout: 10000,
  hidden: true,
  description: "stw lfg blacklist removing!",
  permissions: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    let targetUser = message.guild.members.cache.get(args[0]) || message.guild.member(message.mentions.users.first());
    if (!args[0] && !message.mentions.users.first()) return message.channel.send("Please use this format `!blacklistcheck @member/UserID reason`");

    await blIDs.findOne({ guildID: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        data.blIDs.forEach(async (obj) => {
          if ((obj.ID = targetUser.id)) {
            await blIDs.findOneAndUpdate({ guildID: message.guild.id }, { $pull: { blIDs: { ID: obj.ID } } });
            message.channel.send(`Removed \`${targetUser.user.username}\` from STW Blacklist`);
          }
        });
      }
    });
  },
};
