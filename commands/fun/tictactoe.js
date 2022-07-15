const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'tictactoe',
    aliases: ['ttt'],
    permissions: [],
    run : async(client, message, args) => {
        message.delete();
        const Embed = new MessageEmbed()
        .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
        .setColor('#DD2E44')
        .setTitle("TicTacToe")
        .setDescription('react with 🎲 to initiate the game').setTimestamp().setFooter('Last winner: ')
        msg = message.channel.send(Embed)
        .then((msg)=> {
            msg.react('🎲')
        })
    }
}