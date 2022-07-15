const { client } = require("../index");
const { MessageEmbed } = require("discord.js");
const profileSchema = require("../models/profileSchema");

client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (!reaction.message.guild || user.bot) return;
    if (reaction.emoji.name === "blackcheckmark") {
        if (reaction.message.channel.id === "815009708305809418") {
            reaction.users.remove(user.id);
            let Player = reaction.message.guild.roles.cache.find((role) => role.id === "861957045052899368");
            let Rookie = reaction.message.guild.roles.cache.find((role) => role.id === "869852405708242964");
            let Announcement = reaction.message.guild.roles.cache.find((role) => role.id === "816998907803992084");
            let bell = reaction.message.guild.roles.cache.find((role) => role.id === "816999112599011339");
            let Roles = reaction.message.guild.members.cache.get(user.id).roles.cache;
            let member = reaction.message.guild.members.cache.get(user.id);

            let rolesIds = [];
            Roles.forEach((role) => rolesIds.push(role.id));

            let allRankRolesIds = [
                "861957045052899368",
                "869852405708242964",
                "869852435773022238",
                "869852428445548635",
                "869852440722292766",
                "869852443356319786",
                "869852444388126751",
                "869852445046616095",
                "856819584502071296",
            ];

            // console.log(rolesIds)

            let found = false;
            let currentRoleId = "";
            for (let i = 0; i < rolesIds.length; i++) {
                for (let j = 0; j < allRankRolesIds.length; j++) {
                    if (rolesIds[i] == allRankRolesIds[j]) {
                        currentRolesId = rolesIds[i];
                        found = true;
                    }
                }
            }

            console.log(currentRoleId)
            if (!found) {
                try {
                    await member.roles.add(Player);
                    await member.roles.add(Announcement);
                    await member.roles.add(bell);

                    welcomeEmbed = new MessageEmbed()
                        .setColor("#0f0f0f")
                        .setAuthor("Welcome to ONYX!", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                        .setDescription(
                            "Congratulations, you now have full access to the server! Here are some important channels to check out\n\n<:redarrow:858780571382448148> <#877933520964698143> - Learn about our currency system!\n\n<:redarrow:858780571382448148> <#871364695049797652> `LINK ACCOUNTS` - Unlock the Fortnite channels and **request an MSK Carry & Much More!**\n\n<:redarrow:858780571382448148> <#815929868566528020> - if you ever need help, we are here for you!\n\n<:redarrow:858780571382448148> <#814767416172085308> - We actively moderate the server and enforce the community guidelines"
                        );
                    user.send(welcomeEmbed).catch();
                } catch {}
            }

            if (found) {
                await profileSchema.findOne({ userID: user.id }, async (err, data) => {
                    if (err) throw err;
                    if (data) {
                        let currentAccount = data.hexacoins;
                        if (currentRoleId === "861957045052899368") {
                            if (currentAccount > 5000) {
                                try {
                                    await profileSchema.findOneAndUpdate({ userID: user.id }, { $inc: { hexacoins: -5000 } });
                                    await member.roles.remove(Player);
                                    await member.roles.add(Rookie);
                                    let Embed = new MessageEmbed()
                                        .setColor("#0f0f0f")
                                        .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
                                        .setDescription(`${user}, Congratulations, You have been promoted to <@&869852405708242964> Rank!`);
                                    user.send(Embed)
                                } catch {}
                            } else {
                                try {
                                    poorEmbed = new MessageEmbed().setColor(`#0f0f0f`).setDescription(`${user}, You don't have enough <:xytera:859531350385229825> to pregress to the next Rank!`);
                                    user.send(poorEmbed);
                                } catch {}
                            }
                        }
                    }
                });
            }
        }
    }
});
