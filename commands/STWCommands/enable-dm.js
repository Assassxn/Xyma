const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "dm-enable",
    permissions: [],
    hidden: true,
    aliases: ["dm"],
    run: async(client, message, args) => {
        message.delete().catch()
        if (
          !message.guild.members.cache.get(message.author.id).roles.cache.has("814980966107840522") &&
          !message.guild.members.cache.get(message.author.id).roles.cache.has("844316500768981045")
        )
          return;
        user = client.users.cache.get(args[0]) || message.mentions.users.first();
        if(!user) return;
        embed = new MessageEmbed()
          .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
          .setDescription(
            `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
          )
          .setTimestamp()
          .setColor("#e91015")
          .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`);
          message.channel.send(embed)
    }
}