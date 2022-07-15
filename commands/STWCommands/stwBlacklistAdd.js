const blIDs = require("../../models/lfgBlacklist");
const moment = require("moment");

module.exports = {
  name: "lfgbladd",
  aliases: ["lfgblacklistadd", "bladd"],
  timeout: 10000,
  hidden: true,
  description: "stw lfg blacklist adding!",
  permissions: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    let targetUser = message.guild.members.cache.get(args[0]) || message.guild.member(message.mentions.users.first());
    if (!args[0] && !message.mentions.users.first()) return message.channel.send("Please use this format `!blacklistcheck @member/UserID reason`");
    reason = args.slice(1).join(" ");
    if (!reason) return message.channel.send("Please specify a reason");

    let lfgBl = await blIDs.findOne({ guildID: message.guild.id });

    let obj = {
      ID: targetUser.id,
      time: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`,
      reason: reason,
    };

    if (lfgBl) {
      await blIDs.findOneAndUpdate({ guildID: message.guild.id }, { $push: { blIDs: obj } });
      message.channel.send(`Added \`${targetUser.user.username}\` to STW Blacklist with reason: \`${reason}\``);
    }
    if (!lfgBl) {
      let obj = {
        ID: targetUser.id,
        time: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`,
        reason: reason,
      };
      let info = await blIDs.create({
        guildID: reaction.message.guild.id,
        blIDs: obj,
      });
      info.save();
    }
  },
};
