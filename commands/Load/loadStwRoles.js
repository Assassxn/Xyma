const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "load-stw-roles",
  aliases: ["load-2"],
  permissions: ["ADMINISTRATOR"],
  description: "Sets up a reaction role message!",
  run: async (client, message, args) => {
    message.delete();
    await message.channel.send("https://cdn.discordapp.com/attachments/845954962277531648/860268547389390909/output-onlinepngtools_23.png")
    let firstEmbed = new MessageEmbed()
      .setColor("#202225")
      .setDescription(
        "```ROLES               ```\n" +
          `🔨 **Crafter**\n` +
          `⚡ **Endgame**\n`+
          `<:bluglo:863067037906894888> **Mission Helper**\n`
      );

    await message.channel.send(firstEmbed).then((msg) => {
      msg.react('🔨');
      msg.react('⚡');
      msg.react('<:bluglo:863067037906894888>');
    });


    let secondEmbed = new MessageEmbed()
      .setColor("#202225")
      .setDescription(
        "```NOTIFICATIONS       ```\n"+
          `🦙 - **Free Llama Alerts**\n` +
          `😈 - **MSK Helper**\n` +
          `🛸 - **Endurance Host Alerts**\n`
      );

    await message.channel.send(secondEmbed).then((msg) => {
      msg.react('🦙');
      msg.react('😈');
      msg.react('🛸');
    });

  }
};