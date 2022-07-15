const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  aliases: ['pingit'],
  description: 'Get bot ping.',
  hidden: true,
  permissions: [],
  
  run : async(client, message, args) => {
    message.delete().catch();
    const messagePing = Date.now(); // start before message sent
    const msg = await message.channel.send('Loading...');
    const endMessagePing = Date.now() - messagePing; // end of message sent

    const embed = new MessageEmbed() // build message embed
      .setDescription(
        `
        🏓
        - Message ping: \`${endMessagePing}ms\`
      `
      )
      .setColor("GREEN")
      .setTimestamp();

    msg.edit({
      content: '',
      embed,
    }); // edit message content
  },
};