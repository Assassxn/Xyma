const guildMemberExperience = require("../../models/xpsystem");
const serverConfig = require("../../models/serverConfig");
const canvacord = require("canvacord");
const { MessageAttachment } = require('discord.js')
let xpRate;

module.exports = {
  name: "rank",
  permissions: [],
  run: async (client, message, args) => {
    message.delete().catch()
    let targetID;
    if(message.mentions.users.first()){
      targetID = message.mentions.members.first().id
    }else if(args[0]){
      targetID = client.users.cache.get(args[0]).id;
    } else {
       targetID = message.author.id;
    }

    if(!targetID) return message.channel.send("Please use a corrent format!").then((msg) => msg.delete({ timeout: 2000 }))

    await guildMemberExperience.findOne({ memberID: targetID, guildID: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        await serverConfig.findOne({ guildID: message.guild.id }, async (err, data) => {
          if (err) throw err;
          if (data) {
            xpRate = data.xpRate;
          } else {
            let info = await serverConfig.create({
              guildID: message.guild.id,
              xpRate: 1,
            });
            info.save();
          }
        });
        const updatedXP = data.experiencePoints;

        neededXp = Math.floor(507.884210328 * (data.currentLevel + 1) * Math.pow(1.025, data.currentLevel + 1)) - Math.floor(507.884210328 * (data.currentLevel) * Math.pow(1.025, data.currentLevel));
        currentXP = updatedXP - Math.floor(507.884210328 * (data.currentLevel - 1) * Math.pow(1.025, data.currentLevel - 1));
        currentLevel = data.currentLevel

        
        await guildMemberExperience.find({ guildID: message.guild.id }, async (err, data) => {
          if (err) throw err;
          if (data) {
            const sort = data.sort((a, b) => b.experiencePoints - a.experiencePoints);
            for (let i = 0; i < sort.length; i++) {
              if (sort[i].memberID === targetID) {
                const rank = new canvacord.Rank()
                  .setRank(i + 1, "RANK", true)
                  .setAvatar(client.users.cache.get(targetID).displayAvatarURL({ dynamic: false, format: "png" }))
                  .setCurrentXP(currentXP)
                  .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/845954962277531648/868526380915245056/Final_Background.jpg")
                  .setRequiredXP(neededXp)
                  .setStatus(message.guild.members.cache.get(targetID).presence.status)
                  .setProgressBar("#E91015", "COLOR")
                  .setLevel(currentLevel)
                  .setUsername(message.guild.members.cache.get(targetID).displayName)
                  .setDiscriminator(client.users.cache.get(targetID).discriminator)
                  .renderEmojis(true);

                rank
                  .build()
                  .then((data) => {
                    const attachement = new MessageAttachment(data, "rank.png");
                    message.channel.send(attachement);
                  })
                  .catch((err) => console.error(err));
                return;
              }
            }
          }
        });
      }
    });
  },
};