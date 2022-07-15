const serverConfig = require("../../models/serverConfig");

module.exports = {
  name: "setxprate",
  aliases: ["setxp"],
  description: "edits the xp rate",
  permissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    if (message.author.id !== "535190610185945138") return;
    rate = args[0];
    if(isNaN(args[0])) return;
    if (!args[0]) return;
    try {
      await serverConfig.findOneAndUpdate({ guildID: message.guild.id }, { $set: { xpRate: args[0] } });
      message.channel.send(`Successfully set xpRate to ${args[0]}`)
    } catch {}
  },
};
