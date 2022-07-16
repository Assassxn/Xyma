const {MessageEmbed, Discord} = require('discord.js');

module.exports = {
    name: "avatar",
    timeout: 10000,
    description: "Brodcast someone's avatar",
    permissions: ["SEND_MESSAGES"],
    run : async(client, message, args, Discord) => {
        targetUser = message.mentions.users.first()?.id || args[0] || message.author.id  
        let target = client.users.cache.get(targetUser)
        let avatar = target.displayAvatarURL({size: 1024, dynamic: true})

        const embed = new MessageEmbed()
        .setTitle(`${target.username}'s avatar`)
        .setImage(avatar)
        .setColor("RED")

        message.channel.send(embed);
    }
}