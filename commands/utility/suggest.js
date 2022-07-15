const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suggest',
    aliases: ['suggestion', 'sug'],
    permissions: [],
    description: 'creates a suggestion!',
    run : async(client, message, args) => {
        const channel = message.guild.channels.cache.find((c) => c.id === "816055610427572274");
        if(message.channel.id === channel.id){
            const targetChannel = message.guild.channels.cache.find((c) => c.id === "820589776469098516");

            let messageArgs = args.join(' ');
            const embed = new MessageEmbed()
            .setTitle("Vote on a New Suggestion!")
            .setColor('#0080ff')
            .setDescription(messageArgs + `\n\nHave a suggestion?\n\`!suggest <suggestion>\``)
            .setFooter(`Suggested by ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp();

            targetChannel.send(embed).then((msg) =>{
                msg.react("<a:upvote:870720378253754388>");
                msg.react("<a:downvote:879091233836916766>");
                message.delete();
            }).catch((err)=>{
                throw err;
            });
        } else {
            message.channel.send(`use the ${channel} for this command`);
        }
    }
}


