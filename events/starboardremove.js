const { MessageEmbed } = require("discord.js");
const { client } = require("../index");

client.on("messageReactionRemove", async (reaction, user) => {
  const handleStarboard = async () => {
    const starboard = client.channels.cache.find((channel) => channel.id == "868423937778933790");
    const msgs = await starboard.messages.fetch({ limit: 100 });
    const existingMsg = msgs.find((msg) => (msg.embeds.length === 1 ? (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false));
    if (existingMsg) {
        const embed = new MessageEmbed()
          .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
          .setDescription(`Content: **${reaction.message.content}**\n\n**[Jump To The Message](${reaction.message.url})**`)
          .setFooter(reaction.message.id)
          .setColor("#f1c40f");

      if (reaction.count === 0) existingMsg.delete({ timeout: 2500 })
      else existingMsg.edit(`**${reaction.count}** ⭐ in <#${reaction.message.channel.id}>`, embed);
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
