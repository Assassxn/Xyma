const { MessageEmbed } = require("discord.js");
const { ReactionPages } = require("reconlx");
const data = require("../../models/xpsystem");
module.exports = {
  name: "rank-leaderboard",
  aliases: ["rl"],
  hidden: true,
  permissions: ['ADMINISTRATOR'],
  run: async (client, message, args) => {
    data.find({ guildID: message.guild.id }, async (err, data) => {
      const sort = data.sort((a, b) => b.experiencePoints - a.experiencePoints);
      let i = 1;

      if (data.length > 10) {
        const chunks = twochunk(sort, 10);
        const arry = [];

        for (chunk of chunks) {
          const chunking = chunk.map((v) => `\`#${i++}\` **<@${v.memberID}>** with Level \`${v.currentLevel}\` and (${v.experiencePoints} xp)`).join("\n\n");
          arry.push(
            new MessageEmbed()
              .setTitle("Leaderboard in " + message.guild.name)
              .setColor("#e91015")
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
              .setDescription(chunking)
          );
        }
        ReactionPages(message, arry, true);
      } else {
        const mapping = sort.map((v) => `\`#${i++}\` **<@${v.memberID}>** with Level \`${v.currentLevel}\` and (${v.experiencePoints} xp)`).join("\n\n");
        message.channel.send(
          new MessageEmbed()
            .setTitle("Leaderboard in " + message.guild.name)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor("#e91015")
            .setDescription(mapping)
        );
      }
    });
  },
};

function twochunk(arr, size) {
  var array = [];
  for (var i = 0; i < arr.length; i += size) {
    array.push(arr.slice(i, i + size));
  }
  return array;
}
