module.exports = {
    name: 'kick',
    permissions: ["KICK_MEMBERS"],
    description: "This command kicks a member!",
    run : async(client, message, args) => {
            const member = message.mentions.users.first();
            if(member){
                reason = args.slice(1).join(" ");
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.kick(`reason: ${reason}`);
                message.channel.send(`Kicked ${member} for ${reason}`).then(msg => { 
                    setTimeout(() => msg.delete(), 5000)
                });
            } else {
                message.channel.send(`Please specify a member to kick`).then(msg => { 
                setTimeout(() => msg.delete(), 2000)
            })
            }
    }
}