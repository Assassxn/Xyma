const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')

module.exports = {
    name : 'blacklist-remove',
    permissions: ['ADMINISTRATOR'],
    run : async(client, message, args) => {
        if(message.author.id !== '535190610185945138') return message.channel.send('Sorry only **Assassinツ** can run this command 😔')
        const User = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if(!User) return message.channel.send('User is not valid.')

        await blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               await blacklist.findOneAndDelete({ id : User.user.id })
                .catch(err => console.log(err))
                message.channel.send(`**${User.displayName}** has been removed from blacklist.`)
            } else {
               message.channel.send(`**${User.displayName}** is not blacklisted anymore.`)
            }
           
        })
    } 
}//do you want to see the save the world stuff?? not yet 