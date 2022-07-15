const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  name: "unban",
  permissions: ["BAN_MEMBERS"],
  description: "This command unbans a member!",
  run: async (client, message, args) => {

    const id = args[0];
    if(!id){
        message.reply('Please send an ID').then(msg => { setTimeout(() => msg.delete(), 2000)});
        return;
    }
    const bannedMembers = await message.guild.fetchBans();
    if(!bannedMembers.find((user) => user.user.id === id)){
        message.channel.send("Couldn't find that user").then(msg => { setTimeout(() => msg.delete(), 2000)})
        return
    }
    message.guild.members.unban(id);
    message.reply("Unbanned User!")
  },
};