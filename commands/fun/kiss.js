const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "kiss",
    description: "KISS GO BRRRRRRRRR",
    permissions: [],

    run: async (client, message, args) => {
        message.delete();
        const data = await fetch('https://nekos.life/api/v2/img/kiss') //you can change it in reddit or other
        .then(res => res.json())
        .then(json => json);
        const url = data.url;
            var user = message.mentions.members.first()
            if(user.id === message.author.id) return message.channel.send("You can't kiss your self");
            if(!user){
                message.reply(`You've to mention user you want to kiss.`)
            }
            const kissembed = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`<a:anime_kiss:861920539370848287> ${message.author} **is kissing** ${user}`)
                .setImage(url);
            message.channel.send(kissembed)
        }
}