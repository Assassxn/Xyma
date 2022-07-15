const { MessageEmbed } = require("discord.js");
const data = require("../../models/xpsystem");
module.exports = {
  name: "check-rank",
  permissions: [],
  run: async (client, message, args) => {
    await data.find({ guildID: message.guild.id}, async (err, data) => {
        if(err) throw err;
        if(data){
            const sort = data.sort((a, b) => b.experiencePoints - a.experiencePoints)
            for(let i = 0; i < sort.length; i++){
                if (sort[i].memberID === message.author.id) {
                  let embed = new MessageEmbed().setTitle(`Your rank is \`#${i + 1}\``);
                  message.channel.send(embed);
                  break;
                }
            }
        }
      }
    );
  },
};
