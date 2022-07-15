const links = require("../../models/epiclinks");
const { fnclient, communicator } = require("../../index");
const { MessageEmbed } = require("discord.js");
const epiclinks = require("../../models/epiclinks");
const moment = require("moment");
const { returnPl } = require("../../Utils/returnPl");

module.exports = {
    name: "epic",
    aliases: [],
    permissions: [],
    description: "post you epic username",
    run: async (client, message, args) => {
        if (args.length === 0 || args[0].startsWith("<")) {
            let targetID;
            if (message.mentions.users.first()) {
                targetID = message.mentions.users.first().id;
            } else {
                targetID = message.author.id;
            }

            message.delete();
            data = await links.findOne({ guildID: message.guild.id });

            let found = false;
            await data.links.forEach((linkedAcc) => {
                if (linkedAcc.discordID === targetID) {
                    message.channel.send(`${message.guild.members.cache.get(targetID)} | Epic: \`${linkedAcc.epic}\``);
                    found = true;
                    return;
                }
            });
            if (!found) {
                message.channel.send(`${message.guild.members.cache.get(targetID)}, you need to link your epic account first. To do that head over to <#871364695049797652> and react with <:epicgames:871366292232351784>`);
            }
        }
        if (args[0] === "find") {
            if (!args[1]) return message.delete();
            let member = message.guild.members.cache.get(message.author.id);
            if (!member.roles.cache.has("868876801764630528") && !member.roles.cache.has("844316500768981045") && !member.roles.cache.has("814980966107840522") && !member.roles.cache.has("868877223187329074")) return;

            await fnclient.lookup
                .lookupByUsername(args.slice(1).join(" "))
                .then(async (res) => {
                    data = await links.findOne({ guildID: message.guild.id });

                    let linked = false;
                    let linkedAccount;
                    await data.links.forEach((linkedAcc) => {
                        if (linkedAcc.epic === args[1]) {
                            linkedAccount = linkedAcc;
                            linked = true;
                            return;
                        }
                    });

                    let string;
                    let foundOne = false;
                    if (res.displayName) {
                        string = `> **Found:** \`${res.displayName}\` **(**\`${res.id}\`**)**\n`;
                        string += `> **Epic Account:** True\n`;
                        foundOne = true;
                    } else {
                        if (!foundOne) {
                            if (res.externalAuths.nintendo) {
                                foundOne = true;
                                string = `> **Found:** \`${res.externalAuths.nintendo.externalDisplayName}\` ${res.id}\n`;
                            }
                        }
                        if (!foundOne) {
                            if (res.externalAuths.psn) {
                                foundOne = true;
                                string = `> **Found:** \`${res.externalAuths.psn.externalDisplayName}\` ${res.id}\n`;
                            }
                        }
                        if (!foundOne) {
                            if (res.externalAuths.xbl) {
                                foundOne = true;
                                string = `> **Found:** \`${res.externalAuths.xbl.externalDisplayName}\` ${res.id}\n`;
                            }
                        }

                        string += `> **Epic Account:** False\n`;
                    }

                    const embed = new MessageEmbed().setColor("#0f0f0f").setTitle("Epic Find User");

                    if (res.externalAuths.nintendo) {
                        string += `> **${res.externalAuths.nintendo.type.toUpperCase()}:** \`No Display Name\`\n`;
                    }

                    if (res.externalAuths.psn) {
                        string += `> **${res.externalAuths.psn.type.toUpperCase()}:** \`${res.externalAuths.psn.externalDisplayName}\`\n`;
                    }

                    if (res.externalAuths.xbl) {
                        string += `> **${res.externalAuths.xbl.type.toUpperCase()}:** \`${res.externalAuths.xbl.externalDisplayName}\`\n`;
                    }

                    if (!linked) {
                        string += `> **Linked:** No`;
                    }
                    if (linked) {
                        string += `> **Linked to:** ${client.users.cache.get(linkedAccount.discordID)} ${linkedAccount.discordID}`;
                    }

                    embed.setDescription(string);

                    console.log(res);
                    message.channel.send(embed);
                })
                .catch((err) => {
                    console.error(err);
                    message.channel.send(new MessageEmbed().setColor("#e91015").setDescription(`**${args[1]}** Does Not Exist!`));
                });
        }
        if (args[0] === "find2") {
            if (!args[1]) return message.delete();
            let member = message.guild.members.cache.get(message.author.id);
            if (!member.roles.cache.has("868876801764630528") && !member.roles.cache.has("844316500768981045") && !member.roles.cache.has("814980966107840522") && !member.roles.cache.has("868877223187329074")) return;

            await fnclient.lookup
                .lookupByUserId(args.slice(1).join(" "))
                .then(async (res) => {
                    data = await links.findOne({ guildID: message.guild.id });

                    let linked = false;
                    let linkedAccount;
                    await data.links.forEach((linkedAcc) => {
                        if (linkedAcc.epic === args[1]) {
                            linkedAccount = linkedAcc;
                            linked = true;
                            return;
                        }
                    });

                    let string;
                    let foundOne = false;
                    if (res.displayName) {
                        string = `> **Found:** \`${res.displayName}\` **(**\`${res.id}\`**)**\n`;
                        string += `> **Epic Account:** True\n`;
                        foundOne = true;
                    } else {
                        if (!foundOne) {
                            if (res.externalAuths.nintendo) {
                                foundOne = true;
                                string = `> **Found:** \`${res.externalAuths.nintendo.externalDisplayName}\` ${res.id}\n`;
                            }
                        }
                        if (!foundOne) {
                            if (res.externalAuths.psn) {
                                foundOne = true;
                                string = `> **Found:** \`${res.externalAuths.psn.externalDisplayName}\` ${res.id}\n`;
                            }
                        }
                        if (!foundOne) {
                            if (res.externalAuths.xbl) {
                                foundOne = true;
                                string = `> **Found:** \`${res.externalAuths.xbl.externalDisplayName}\` ${res.id}\n`;
                            }
                        }

                        string += `> **Epic Account:** False\n`;
                    }

                    const embed = new MessageEmbed().setColor("#0f0f0f").setTitle("Epic Find User");

                    if (res.externalAuths.nintendo) {
                        string += `> **${res.externalAuths.nintendo.type.toUpperCase()}:** \`No Display Name\`\n`;
                    }

                    if (res.externalAuths.psn) {
                        string += `> **${res.externalAuths.psn.type.toUpperCase()}:** \`${res.externalAuths.psn.externalDisplayName}\`\n`;
                    }

                    if (res.externalAuths.xbl) {
                        string += `> **${res.externalAuths.xbl.type.toUpperCase()}:** \`${res.externalAuths.xbl.externalDisplayName}\`\n`;
                    }

                    if (!linked) {
                        string += `> **Linked:** No`;
                    }
                    if (linked) {
                        string += `> **Linked to:** ${client.users.cache.get(linkedAccount.discordID)} ${linkedAccount.discordID}`;
                    }

                    embed.setDescription(string);

                    console.log(res);
                    message.channel.send(embed);
                })
                .catch((err) => {
                    console.error(err);
                    message.channel.send(new MessageEmbed().setColor("#e91015").setDescription(`**${args[1]}** Does Not Exist!`));
                });
        }
        if (args[0] === "unlink") {
            if (!args[1]) return message.delete();
            let member = message.guild.members.cache.get(message.author.id);
            if (!member.roles.cache.has("868876801764630528") && !member.roles.cache.has("844316500768981045")) return;

            let targetID;
            if (message.mentions.users.first()) {
                targetID = message.mentions.users.first().id;
            } else {
                targetID = message.author.id;
            }

            info = await epiclinks.findOne({ guildID: message.guild.id });

            let found = false;
            let epic;
            let epicID;
            let discordID;
            await info.links.forEach((linkedAcc) => {
                if (linkedAcc.discordID === targetID) {
                    epic = linkedAcc.epic;
                    epicID = linkedAcc.accountID;
                    discordID = linkedAcc.discordID;
                    found = true;
                }
            });

            if (found) {
                embed = new MessageEmbed()
                    .setColor("0f0f0f")
                    .setTitle("Epic Unlink User")
                    .setDescription(`> **Discord:** \`${client.users.cache.get(discordID).username}\` **(**\`${discordID}\`**)**\n> **Epic: ** \`${epic}\` **(**\`${epicID}\`**)**`);
                message.channel.send(embed).then(async (msg) => {
                    await msg.react("✅");
                    await msg.react("🚫");
                    const filter = (reaction, user) => {
                        return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === "535190610185945138";
                    };

                    msg.awaitReactions(filter, { max: 1, time: 10 * 1000, errors: ["time"] })
                        .then(async (collected) => {
                            const reaction = collected.first();

                            if (reaction.emoji.name === "✅") {
                                await epiclinks.findOneAndUpdate({ guildID: message.guild.id }, { $pull: { links: { discordID: targetID } } });
                                message.guild.members.cache.get(targetID).roles.remove("818592429196181544");
                                finalEmbed = new MessageEmbed().setColor("#1ec45c").setDescription(`**${client.users.cache.get(discordID).username}** has been Unlinked`);
                                message.channel.send(finalEmbed);
                            }
                            if (reaction.emoji.name === "🚫") {
                                cancelEmbed = new MessageEmbed().setColor("#e91015").setDescription("Canceled Unlinking");
                                return message.channel.send(cancelEmbed);
                            }
                        })
                        .catch((err) => console.error(err));
                });
            }
            if (!found) {
                errEmbed = new MessageEmbed().setColor("#e91015").setDescription(`**${args.slice(1).join(" ")}** Doesn't have a linked account`);
                message.channel.send(errEmbed);
            }
        }
        if (args[0] === "link") {
            if (!args[1]) return message.delete();
            if (!args[2]) return message.delete();
            let member = message.guild.members.cache.get(message.author.id);
            if (!member.roles.cache.has("868876801764630528") && !member.roles.cache.has("844316500768981045") && !member.roles.cache.has("814980966107840522") && !member.roles.cache.has("868877223187329074")) return;

            let targetID;
            if (message.mentions.users.first()) {
                targetID = message.mentions.users.first().id;
            } else {
                targetID = client.users.cache.get(args[2]).id;
            }
            if (!targetID) return message.channel.send("Please specify a user to link").then((msg) => msg.delete({ timeout: 5000 }));

            info = await epiclinks.findOne({ guildID: message.guild.id });

            let found = false;
            let epic;
            let epicID;
            let discordID;
            let time;
            await info.links.forEach((linkedAcc) => {
                if (linkedAcc.discordID === targetID) {
                    epic = linkedAcc.epic;
                    epicID = linkedAcc.accountID;
                    discordID = linkedAcc.discordID;
                    time = linkedAcc.time;
                    found = true;
                }
            });

            if (!found) {
                await fnclient.lookup
                    .lookupByUsername(args.slice(2).join(" "))
                    .then(async (res) => {
                        let foundOne = false;
                        let string = "";
                        if (res.displayName) {
                            mainEpic = res.displayName;
                            displayName = res.displayName;
                            foundOne = true;
                        }
                        if (res.externalAuths.nintendo) {
                            foundOne = true;
                            displayName = res.externalAuths.nintendo.externalDisplayName;
                            string += ` **${res.externalAuths.nintendo.type.toUpperCase()}:** \`No Display Name\`\n`;
                        }
                        if (res.externalAuths.psn) {
                            foundOne = true;
                            displayName = res.externalAuths.psn.externalDisplayName;
                            string += ` **${res.externalAuths.psn.type.toUpperCase()}:** \`${res.externalAuths.psn.externalDisplayName}\`\n`;
                        }
                        if (res.externalAuths.xbl) {
                            foundOne = true;
                            displayName = res.externalAuths.xbl.externalDisplayName;
                            string += ` **${res.externalAuths.xbl.type.toUpperCase()}:** \`${res.externalAuths.xbl.externalDisplayName}\`\n`;
                        }

                        confirmEmbed = new MessageEmbed()
                            .setColor("#0f0f0f")
                            .setTitle("Epic Link User")
                            .setDescription(
                                `>>> **Do you want to link ${client.users.cache.get(targetID)} to this Epic Account?**\n\n**Name: ** \`${mainEpic ? mainEpic : displayName}\` **(**\`${res.id}\`**)**\n**Epic Account: ** ${foundOne}\n${string}`
                            );

                        message.channel.send(confirmEmbed).then(async (msg) => {
                            await msg.react("✅");
                            await msg.react("🚫");

                            const filter = (reaction, user) => {
                                return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === "535190610185945138";
                            };

                            msg.awaitReactions(filter, { max: 1, time: 60 * 1000, errors: ["time"] })
                                .then(async (collected) => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === "✅") {
                                        pls = await returnPl(res.id);

                                        let obj = {
                                            epicAccount: foundOne,
                                            discordID: targetID,
                                            accountID: res.id,
                                            epic: mainEpic ? mainEpic : displayName,
                                            pl: pls[0],
                                            venturePl: pls[1],
                                            time: moment().format("MMMM Do YYYY, h:mm:ss a"),
                                        };

                                        await epiclinks.findOne({ guildID: message.guild.id }, async (err, data) => {
                                            if (err) throw err;
                                            if (data) {
                                                await epiclinks.findOneAndUpdate({ guildID: message.guild.id }, { $push: { links: obj } });
                                            } else if (!data) {
                                                info = epiclinks.create({
                                                    guildID: message.guild.id,
                                                    links: obj,
                                                });
                                                info.save();
                                            }
                                        });
                                        message.guild.members.cache.get(targetID).roles.add("818592429196181544");
                                        finalEmbed = new MessageEmbed().setColor("#1ec45c").setDescription(`**${client.users.cache.get(obj.discordID).username}** has been linked`);
                                        message.channel.send(finalEmbed);
                                    }
                                    if (reaction.emoji.name === "🚫") {
                                        cancelEmbed = new MessageEmbed().setColor("#e91015").setDescription("Canceled linking");
                                        return message.channel.send(cancelEmbed);
                                    }
                                })
                                .catch((err) => console.error(err));
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        message.channel.send(new MessageEmbed().setColor("#e91015").setDescription(`**${args[2]}** Does Not Exist!`));
                    });
            }

            if (found) {
                embed = new MessageEmbed().setColor("#e91015").setDescription(`${client.users.cache.get(discordID)} is already linked to \`${epic}\`\n **Account ID: ** \`${epicID}\`\n**since: ** \`${time}\``);
                return message.channel.send(embed);
            }
        }
        if (args[0] === "link2") {
            if (!args[1]) return message.delete();
            if (!args[2]) return message.delete();
            let member = message.guild.members.cache.get(message.author.id);
            if (!member.roles.cache.has("868876801764630528") && !member.roles.cache.has("844316500768981045") && !member.roles.cache.has("814980966107840522") && !member.roles.cache.has("868877223187329074")) return;

            let targetID;
            if (message.mentions.users.first()) {
                targetID = message.mentions.users.first().id;
            } else {
                targetID = client.users.cache.get(args[2]).id;
            }
            if (!targetID) return message.channel.send("Please specify a user to link").then((msg) => msg.delete({ timeout: 5000 }));

            info = await epiclinks.findOne({ guildID: message.guild.id });

            let found = false;

            let epic;
            let epicID;
            let discordID;
            let time;
            await info.links.forEach((linkedAcc) => {
                if (linkedAcc.discordID === targetID) {
                    epic = linkedAcc.epic;
                    epicID = linkedAcc.accountID;
                    discordID = linkedAcc.discordID;
                    time = linkedAcc.time;
                    found = true;
                }
            });

            if (!found) {
                await fnclient.lookup
                    .lookupByUserId(args.slice(2).join(" "))
                    .then(async (res) => {
                        let foundOne = false;
                        let string = "";
                        if (res.displayName) {
                            mainEpic = res.displayName;
                            displayName = res.displayName;
                            foundOne = true;
                        }
                        if (res.externalAuths.nintendo) {
                            foundOne = true;
                            displayName = res.externalAuths.nintendo.externalDisplayName;
                            string += ` **${res.externalAuths.nintendo.type.toUpperCase()}:** \`No Display Name\`\n`;
                        }
                        if (res.externalAuths.psn) {
                            foundOne = true;
                            displayName = res.externalAuths.psn.externalDisplayName;
                            string += ` **${res.externalAuths.psn.type.toUpperCase()}:** \`${res.externalAuths.psn.externalDisplayName}\`\n`;
                        }
                        if (res.externalAuths.xbl) {
                            foundOne = true;
                            displayName = res.externalAuths.xbl.externalDisplayName;
                            string += ` **${res.externalAuths.xbl.type.toUpperCase()}:** \`${res.externalAuths.xbl.externalDisplayName}\`\n`;
                        }

                        confirmEmbed = new MessageEmbed()
                            .setColor("#0f0f0f")
                            .setTitle("Epic Link User")
                            .setDescription(
                                `>>> **Do you want to link ${client.users.cache.get(targetID)} to this Epic Account?**\n\n**Name: ** \`${mainEpic ? mainEpic : displayName}\` **(**\`${res.id}\`**)**\n**Epic Account: ** ${foundOne}\n${string}`
                            );

                        message.channel.send(confirmEmbed).then(async (msg) => {
                            await msg.react("✅");
                            await msg.react("🚫");

                            const filter = (reaction, user) => {
                                return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === "535190610185945138";
                            };

                            msg.awaitReactions(filter, { max: 1, time: 60 * 1000, errors: ["time"] })
                                .then(async (collected) => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === "✅") {
                                        let obj = {
                                            epicAccount: foundOne,
                                            discordID: targetID,
                                            accountID: res.id,
                                            epic: mainEpic ? mainEpic : displayName,
                                            time: moment().format("MMMM Do YYYY, h:mm:ss a"),
                                        };

                                        await epiclinks.findOne({ guildID: message.guild.id }, async (err, data) => {
                                            if (err) throw err;
                                            if (data) {
                                                await epiclinks.findOneAndUpdate({ guildID: message.guild.id }, { $push: { links: obj } });
                                            } else if (!data) {
                                                info = epiclinks.create({
                                                    guildID: message.guild.id,
                                                    links: obj,
                                                });
                                                info.save();
                                            }
                                        });
                                        message.guild.members.cache.get(targetID).roles.add("818592429196181544");
                                        finalEmbed = new MessageEmbed().setColor("#1ec45c").setDescription(`**${client.users.cache.get(obj.discordID).username}** has been linked`);
                                        message.channel.send(finalEmbed);
                                    }
                                    if (reaction.emoji.name === "🚫") {
                                        cancelEmbed = new MessageEmbed().setColor("#e91015").setDescription("Canceled linking");
                                        return message.channel.send(cancelEmbed);
                                    }
                                })
                                .catch((err) => console.error(err));
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        message.channel.send(new MessageEmbed().setColor("#e91015").setDescription(`**${args[2]}** Does Not Exist!`));
                    });
            }

            if (found) {
                embed = new MessageEmbed().setColor("#e91015").setDescription(`${client.users.cache.get(discordID)} is already linked to \`${epic}\`\n **Account ID: ** \`${epicID}\`\n**since: ** \`${time}\``);
                return message.channel.send(embed);
            }
        }
        if (args[0] === "add") {
            if (args[1]) {
                await communicator.friendship.addFriend(args[1]).then((res) => {
                    if (res == true) {
                        successEmbed = new MessageEmbed().setColor("#1ec45c").setDescription(`✅ Successfully sent a friend request to ${args[1]}`);
                        message.channel.send(successEmbed);
                    }
                    if (res == false) {
                        successEmbed = new MessageEmbed().setColor("#e91015").setDescription(`❌ Failed to send a friend request to ${args[1]}`);
                        message.channel.send(successEmbed);
                    }
                });
            } else {
                return;
            }
        }
        if (args[0] === "friends") {
            await communicator.friendship.getFriends().then((res) => {
                let embed = new MessageEmbed().setColor("#0f0f0f").setAuthor("Xyma", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024");

                if (res.length === 0) {
                    embed.setDescription("No Friends added");
                    return message.channel.send(embed);
                }
                res.forEach(async (friend) => {
                    // await communicator.friendship.removeFriend(friend.accountId);
                    embed.addField("Friend", `${friend.accountId}`, true);
                });
                // console.log(res);
                message.channel.send(embed);
            });
        }
        if (args[0] === "unfriend") {
            if (!args[1]) return message.channel.send("Please specify a friend's account Id to remove!");
            await communicator.friendship.removeFriend(args[1]).then((res) => {
                // console.log(res);
                if (res == true) {
                    return message.channel.send(new MessageEmbed().setColor("#1ec45c").setDescription(`✅ Successfully unfriended ${args[1]}`));
                } else {
                    return message.channel.send(new MessageEmbed().setColor("#e91015").setDescription(`❌ Failed to unfriend ${args[1]}`));
                }
            });
        }
        if (args[0] === "outgoing") {
            await communicator.friendship.getOutgoingFriendRequests().then((res) => {
                let embed = new MessageEmbed().setColor("#0f0f0f").setDescription("Outgoing friend requests").setAuthor("Xyma", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024");

                res.forEach(async (friend) => {
                    embed.addField("Outgoing Friend Request", `${friend.accountId}`, true);
                    // await communicator.friendship.removeFriend(friend.accountId);
                });
                message.channel.send(embed);
            });
        }
        if (args[0] === "incoming") {
            await communicator.friendship.getIncomingFriendRequests().then((res) => {
                let embed = new MessageEmbed().setColor("#0f0f0f").setDescription("Incoming friend requests").setAuthor("Xyma", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024");

                res.forEach(async (friend) => {
                    embed.addField("Incoming Friend Request", `${friend.accountId}`, true);
                    // await communicator.friendship.removeFriend(friend.accountId);
                });
                message.channel.send(embed);
            });
        }
        if (args[0] === "remove") {
            if (args[1] == "incoming") {
                await communicator.friendship.getIncomingFriendRequests().then((res) => {
                    let embed = new MessageEmbed().setColor("#0f0f0f").setDescription("Abort incoming friend requests").setAuthor("Xyma", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024");

                    res.forEach(async (friend) => {
                        await communicator.friendship.removeFriend(friend.accountId);
                        embed.addField("aborted incoming Friend Request", `${friend.accountId}`, true);
                    });
                    message.channel.send(embed);
                });
            }
            if (args[1] == "outgoing") {
                await communicator.friendship.getOutgoingFriendRequests().then((res) => {
                    let embed = new MessageEmbed().setColor("#0f0f0f").setDescription("Abort outgoing friend requests").setAuthor("Xyma", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024");

                    res.forEach(async (friend) => {
                        await communicator.friendship.removeFriend(friend.accountId);
                        embed.addField("aborted outgoing Friend Request", `${friend.accountId}`, true);
                    });
                    message.channel.send(embed);
                });
            }
        }
    },
};
