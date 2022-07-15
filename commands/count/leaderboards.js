const { MessageEmbed } = require("discord.js");
const { ReactionPages } = require("reconlx");
const data = require("../../models/Users");
module.exports = {
  name: "counting-leaderboard",
  aliases: ["cl"],
  permissions: [],
  run: async (client, message, args) => {
    data.find({ Guild: message.guild.id }, async (err, data) => {
      const sort = data.sort((a, b) => b.Counts - a.Counts);
      let i = 1;

      if (data.length > 10) {
        const chunks = twochunk(sort, 10);
        const arry = [];

        for (chunk of chunks) {
          const chunking = chunk.map((v) => `\`#${i++}\` **<@${v.id}>** (${v.Counts} counts)`).join("\n\n");
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
        const mapping = sort.map((v) => `\`#${i++}\` **<@${v.id}>** (${v.Counts} counts)`).join("\n\n");
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