const { MessageEmbed } = require("discord.js");
const { client } = require("../index");

client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (!reaction.message.guild || user.bot) return;
    let starchan = reaction.message.guild.channels.cache.find((c) => c.id == "868423937778933790");
    if (!reaction.message.channel.id === starchan.id) return;

    const handleStarboard = async () => {
      const starboard = client.channels.cache.find((channel) => channel.id == "868423937778933790");
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const existingMsg = msgs.find((msg) => (msg.embeds.length === 1 ? (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false));

      const embed = new MessageEmbed()
        .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
        .setDescription(`Content: **${reaction.message.content}**\n\n**[Jump To The Message](${reaction.message.url})**`)
        .setFooter(reaction.message.id)
        .setColor("#f1c40f");

      if (existingMsg) existingMsg.edit(`**${reaction.count}** ⭐ in <#${reaction.message.channel.id}>`, embed);
      else {
        const embed = new MessageEmbed()
          .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
          .setDescription(`Content: **${reaction.message.content}**\n\n**[Jump To The Message](${reaction.message.url})**`)
          .setFooter(reaction.message.id)
          .setColor("#f1c40f");
        if (starboard) starboard.send(`**1** ⭐ in <#${reaction.message.channel.id}>`, embed);
      }
    };
    if (reaction.emoji.name === "⭐") {
      if (reaction.message.channel.id == "868423937778933790") return;
      if (reaction.message.partial) {
        await reaction.fetch();
        await reaction.message.fetch();
        handleStarboard();
      } else handleStarboard();
    }
});