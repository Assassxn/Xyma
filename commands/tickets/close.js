const { Message, Client, MessageAttachment} = require('discord.js')
const fs = require('fs')

module.exports = {
    name : 'close',
    permissions: [],
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
        if(message.channel.parentID !== '830917202302468147') return message.channel.send('You can only use this command in a ticket!');
        const transcriptChannel = message.guild.channels.cache.get('855182153431777310')
        message.channel.send('Deleting ticket in 5 seconds.....')
        setTimeout(() => {
            message.channel.delete().then(async ch=> {
                client.ticketTranscript.findOne({ Channel : ch.id }, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        fs.writeFileSync(`../${ch.id}.txt`, data.Content.join("\n\n"))
                        transcriptChannel.send(`${message.guild.members.cache.get(ch.name).user.username}'s ticket have been closed.`)
                        await transcriptChannel.send(new MessageAttachment(fs.createReadStream(`../${ch.id}.txt`)));
                        client.ticketTranscript.findOneAndDelete({ Channel : ch.id })
                    }
                })
            })
        }, 5000)
    }
}