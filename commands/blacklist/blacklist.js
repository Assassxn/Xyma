const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')

module.exports = {
    name : 'blacklist',
    permissions: ['ADMINISTRATOR'],
    run : async(client, message, args) => {
        if(message.author.id !== '535190610185945138') return message.channel.send('Sorry only **Assassinツ** can run this command 😔')
        if(!args[0]) return message.channel.send("Please add the User ID")
        const User = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if(!User) return message.channel.send('User is not valid.')

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(`**${User.displayName}** has already been blacklisted!`)
            } else {
                data = new blacklist({ id : User.user.id })
                data.save()
                .catch(err => console.log(err))
            message.channel.send(`**${User.displayName}** has been added to blacklist.`)
            }
           
        })
    }
}