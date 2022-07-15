const { client } = require("../index");
const { MessageEmbed } = require("discord.js");

client.on("messageUpdate", function (oldMessage, newMessage) {
    if (oldMessage.author.bot) return;

    if (oldMessage.channel.type !== "text") return;
    if (newMessage.channel.type !== "text") return;

    if (oldMessage.content === newMessage.content) return;

    editLogChan = client.channels.cache.get("888159133918974014");

    editLogChan.send(
        new MessageEmbed().setColor("#0f0f0f").setDescription(`
**Author : ** <@${newMessage.member.user.id}> - *${newMessage.member.user.tag}*
**Date : ** ${newMessage.createdAt}
**Channel : ** <#${newMessage.channel.id}> - *${newMessage.channel.name}*
**Orignal Message : **
\`\`\`
${oldMessage.content.replace(/`/g, "'")}
\`\`\`
**Updated Message : **
\`\`\`
${newMessage.content.replace(/`/g, "'")}
\`\`\``)
    );
});
