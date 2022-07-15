const { MessageEmbed } = require("discord.js");
const { client } = require("../index");
const profileModel = require("../models/profileSchema");

client.on("message", async (message) => {
    if (message.channel.id !== "858105604249878546") return;
    if (message.content.toLowerCase() === "agree") {
        message.delete();
        let ROLES = message.guild.roles.cache.find((role) => role.id === "820764416294649866");
        member = message.guild.members.cache.get(message.author.id);
        embed = new MessageEmbed()
            .setColor("#E91015")
            .setDescription("**Thanks for accepting the <#858105604249878546>**\n\nYou unlocked the **<#814855688193835059>** category!! Go there to learn about Ranks and Roles!\n\n**When you're ready, click the <a:checkmark:858747859528056872> on the `MEMBER RANKS` message to join the server!**")
            .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png");
        thing = await message.channel.send(`Hi ${client.users.cache.get(message.author.id)}`, embed);
        setTimeout(() => {
            try {
                thing.delete();
            } catch {}
        }, 10000);

        setTimeout(() => {
            try {
                member.roles.add(ROLES);
                member.roles.add(Player);
            } catch {}
        }, 10000);

        let profileData;
        try {
            profileData = await profileModel.findOne({ userID: message.author.id });
            if (!profileData) {
                let profile = await profileModel.create({
                    userID: message.author.id,
                    xytera: 0,
                    bank: 0,
                    muted: false,
                });
                profile.save();
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (!message.author.bot) {
            message.delete();
        }
    }
});
