const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "load-htj",
  aliases: ["htj"],
  permissions: ["ADMINISTRATOR"],
  description: "Sets up a reaction role message!",
  run: async (client, message, args) => {
    message.delete();
    htjchan = message.guild.channels.cache.find((c) => c.id == "820188993940881440");
    await htjchan.send("https://cdn.discordapp.com/attachments/845954962277531648/858738912657932309/output-onlinepngtools.png");
    await htjchan.send("https://cdn.discordapp.com/attachments/845954962277531648/858738963559612436/output-onlinepngtools_1.png");
    const firstEmbed = new MessageEmbed()
      .setColor("#0f0f0f")
      .setDescription("**Find the `#user-agreement` text channel in the `CHANNEL LIST`** (swipe right on mobile)")
      .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png");
    await htjchan.send(firstEmbed);
    await htjchan.send("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png");
    await htjchan.send("https://cdn.discordapp.com/attachments/845954962277531648/858742949977391155/output-onlinepngtools_2.png");
    const secondEmbed = new MessageEmbed()
        .setColor("#0f0f0f")
        .setDescription(
            "**After Step 1, a new channel will appear at the top of the `CHANNEL LIST`: #ranks and roles**\n\nGo there and **click the** <a:blackcheckmark:877846386236854282> on the `MEMBER RANKS` message to join the server!"
        )
        .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png");
    await htjchan.send(secondEmbed);
  },
};
