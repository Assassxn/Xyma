require("dotenv").config();
const { client, fnclient, communicator, FriendStatus } = require("../index");
const { MessageEmbed } = require("discord.js");
const epiclinks = require("../models/epiclinks");
const linkActive = require("../models/linkActives");
const moment = require("moment");
// const fs = require('fs')
const { returnPl } = require('../Utils/returnPl')
const tempLinksSchema = require("../models/tempLinks");

let epicID;

client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (!reaction.message.guild || user.bot) return;
    if (reaction.emoji.name === "epicgames") {
        if (reaction.message.channel.id === "871364695049797652") {
            reaction.users.remove(user.id);

            await linkActive.findOne({ guildID: reaction.message.guild.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    let foundOnActiveLinks = false;
                    await data.activeLinks.forEach(async (ID) => {
                        if (ID === user.id) {
                            reaction.message.channel.send("Stop Spaming Reactions!").then((msg) => msg.delete({ timeout: 5000 }));
                            foundOnActiveLinks = true;
                            return;
                        }
                    });
                    if (!foundOnActiveLinks) {
                        await linkActive.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $push: { activeLinks: user.id } });
                        epicLinksData = await epiclinks.findOne({ guildID: reaction.message.guild.id });

                        let foundEpic = false;
                        await epicLinksData.links.forEach(async (linkedAcc) => {
                            if (linkedAcc.discordID === user.id) {
                                embed = new MessageEmbed()
                                    .setColor("#e91015")
                                    .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                    .setDescription(`${client.users.cache.get(linkedAcc.discordID)}, Your account is already linked: \`${linkedAcc.epic}\``);
                                user.send(embed);
                                foundEpic = true;
                                await linkActive.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $pull: { activeLinks: user.id } });
                                return;
                            }
                        });
                        if (!foundEpic) {
                            MainEmbed = new MessageEmbed()
                                .setColor("0f0f0f")
                                .setDescription(
                                    `To link your Epic Account, please follow these steps:\n\n> :one: Send an Epic Friend request to \`Xyma2021\`\n\n> :two: Find your whispers from \`Xyma2021\`\n\n> :three: Send the registration code here\n\n⚠️ Your code expires after 5 minutes. To get a new code react to the main Message again.\n\nIf you have an issue, please open a ticket at <#815929868566528020>`
                                )
                                .setFooter("You have 5 minutes to enter your code")
                                .setTimestamp();

                            await user.send(MainEmbed).then(async (msg) => {
                                const filter = (m) => m.author.id === user.id;
                                msg.channel
                                    .awaitMessages(filter, { max: 1, time: 5 * 60 * 1000, errors: ["time"] })
                                    .then(async (res) => {
                                        data = await tempLinksSchema.findOne({});
                                        data.tempLinks.forEach(async (obj) => {
                                            if (res.first().content === obj.code) {
                                                try {
                                                    await fnclient.lookup.lookupByUserId(obj.epicID)
                                                    .then(async (res) => {
                                                        console.log(res);

                                                        let accountID = res.id;
                                                        let foundOne = false;
                                                        let displayName;

                                                        if (res.displayName) {
                                                            displayName = res.displayName;
                                                            foundOne = true;
                                                        } else {
                                                            if (!foundOne) {
                                                                if (res.externalAuths.psn) {
                                                                    foundOne = true;
                                                                    displayName = res.externalAuths.psn.externalDisplayName;
                                                                }
                                                            }
                                                            if (!foundOne) {
                                                                if (res.externalAuths.xbl) {
                                                                    foundOne = true;
                                                                    displayName = res.externalAuths.xbl.externalDisplayName;
                                                                }
                                                            }
                                                            if (!foundOne) {
                                                                if (res.externalAuths.nintendo) {
                                                                    foundOne = true;
                                                                    displayName = res.externalAuths.nintendo.externalDisplayName;
                                                                }
                                                            }
                                                        }

                                                        pls = await returnPl(accountID);

                                                        let obj = {
                                                            epicAccount: foundOne,
                                                            discordID: user.id,
                                                            accountID: accountID,
                                                            epic: displayName,
                                                            pl: pls[0],
                                                            venturePl: pls[1],
                                                            time: moment().format("MMMM Do YYYY, h:mm:ss a"),
                                                        };

                                                        await epiclinks.findOne({ guildID: reaction.message.guild.id }, async (err, data) => {
                                                            if (err) throw err;
                                                            if (data) {
                                                                await epiclinks.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $push: { links: obj } });
                                                            } else if (!data) {
                                                                info = await epiclinks.create({
                                                                    guildID: reaction.message.guild.id,
                                                                    links: obj,
                                                                });
                                                                info.save();
                                                            }
                                                        });

                                                        await communicator.friendship.removeFriend(accountID);
                                                        await linkActive.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $pull: { activeLinks: user.id } });
                                                        await tempLinksSchema.findOneAndUpdate({}, { $pull: { tempLinks: { epicID: accountID } } });
                                                        user.send(`Your account has been linked to \`${obj.epic}\` successfully!`);
                                                        reaction.message.guild.members.cache.get(user.id).roles.add("818592429196181544");
                                                    });
                                                } catch (err) {
                                                    console.error("Error is here", err);
                                                }
                                            } else {
                                                user.send("Incorrect code!\nif you want to try again repeat the same process!");
                                                await communicator.friendship.removeFriend(epicID);
                                                await linkActive.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $pull: { activeLinks: user.id } });
                                                await tempLinksSchema.findOneAndUpdate({}, { $pull: { tempLinks: { epicID: epicID } } });
                                            }
                                        });
                                    })
                                    .catch(async (err) => {
                                        console.error(err);
                                        await linkActive.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $pull: { activeLinks: user.id } });
                                        await communicator.friendship.removeFriend(epicID);
                                        await tempLinksSchema.findOneAndUpdate({}, { $pull: { tempLinks: { epicID: epicID } } });
                                        user.send("You took too long to respond!");
                                    });
                            });

                            //checking that there is data in the linkActives before accepting the friend request!
                            communicator.events.on("friend:request", async (friendrequest) => {
                                if (friendrequest.friendStatus === FriendStatus.INCOMING) {
                                    dataToCheck = await epiclinks.findOne({ guildID: reaction.message.guild.id });

                                    let alreadyLinked = false;
                                    await dataToCheck.links.forEach(async (linkedAcc) => {
                                        if (linkedAcc.accountID === friendrequest.accountId) {
                                            await communicator.friendship.removeFriend(friendrequest.accountId);
                                            await linkActive.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $pull: { activeLinks: user.id } });
                                            await tempLinksSchema.findOneAndUpdate({}, { $pull: { tempLinks: { epicID: friendrequest.accountId } } });
                                            errEmbed = new MessageEmbed()
                                                .setColor("#0f0f0f")
                                                .setDescription(`${linkedAcc.epic} is already liked to **${client.users.cache.get(linkedAcc.discordID).username}**`);
                                            alreadyLinked = true;
                                            user.send(errEmbed);
                                            return;
                                        }
                                    });

                                    if (!alreadyLinked) {
                                        await linkActive.findOne({ guildID: reaction.message.guild.id }, async (err, data) => {
                                            if (err) throw err;
                                            if (data) {
                                                info = await tempLinksSchema.findOne({ "tempLinks.epicID": friendrequest.accountId });

                                                Code = await genCode();
                                                console.log("Code: ", Code);

                                                if (!info) {
                                                    let obj = {
                                                        code: Code,
                                                        epicID: friendrequest.accountId,
                                                    };
                                                    toSave = await tempLinksSchema.findOneAndUpdate({}, { $push: { tempLinks: obj } });
                                                    // toSave = await tempLinksSchema.findOneAndUpdate({ _id: "61110ef25247962b38fbec61" }, { $push: { tempLinks: obj } });
                                                    toSave.save();

                                                    await friendrequest.accept();
                                                    return;
                                                }
                                                if (info) {
                                                    await friendrequest.remove();
                                                }
                                            }
                                            if (!data) {
                                                info = await linkActive.create({
                                                    guildID: reaction.message.guild.id,
                                                    activeLinks: [],
                                                });
                                                info.save();
                                            }
                                        });
                                    }
                                }
                            });

                            communicator.events.on("friend:added", async (friend) => {
                                dataToCheck = await epiclinks.findOne({ guildID: reaction.message.guild.id });

                                await dataToCheck.links.forEach(async (linkedAcc) => {
                                    if (linkedAcc.accountID === friend.accountId) {
                                        await friend.sendMessage(`This account is already linked to: ${linkedAcc.epic}`);
                                        await communicator.friendship.removeFriend(friend.accountId);
                                        await linkActive.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $pull: { activeLinks: user.id } });
                                        await tempLinksSchema.findOneAndUpdate({}, { $pull: { tempLinks: { epicID: friend.accountId } } });
                                    }
                                });

                                data = await tempLinksSchema.findOne({});

                                data.tempLinks.forEach(async (obj) => {
                                    if (obj.epicID === friend.accountId) {
                                        await friend.sendMessage(`Hi, Your Activation code is: ${obj.code} | Please send that to the bot in DMs within 5 minutes!`);
                                        return;
                                    }
                                });
                                setTimeout(async () => {
                                    await tempLinksSchema.findOne({ "tempLinks.epicID": friend.accountId }, async (err, data) => {
                                        if (err) throw err;
                                        if (data) {
                                            await communicator.friendship.removeFriend(friend.accountId);
                                            await linkActive.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $pull: { activeLinks: user.id } });
                                            await tempLinksSchema.findOneAndUpdate({}, { $pull: { tempLinks: { epicID: friend.accountId } } });
                                        }
                                        if (!data) {
                                            //not Timeout
                                        }
                                    });
                                }, 5 * 60 * 1000);
                            });

                            communicator.events.on("reconnect", async (failure) => {
                                if (failure) {
                                    console.log(failure); // reason to why it failed, currently only if token update failed
                                }
                            });

                            communicator.events.on("friend:reject", async (friend) => {
                                console.log(`You rejected the friend request by: ${friend.accountId}`);
                            });

                            communicator.events.on("friend:removed", async (friend) => {
                                console.log(`You're now unfriended with: ${friend.accountId}`);
                            });

                            communicator.events.on("friend:abort", async (friend) => {
                                console.log(`Friendrequest aborted with: ${friend.accountId}`);
                            });

                            communicator.events.on("friend:message", async (res) => {
                                // console.log(await friend.getStatus());
                                // console.log("message", await friend.sendMessage("Hello itsAngel!"));
                                console.log(res.message);
                            });
                        }
                    }
                }
                if (!data) {
                    toSave = await linkActive.create({
                        guildID: reaction.message.guild.id,
                        activeLinks: [],
                    });
                    toSave.save();
                }
            });
        } else {
            return;
        }
    } else {
        return;
    }
});

function genCode() {
    var length = 6,
        charset = "abcdefghijklmnopqrstuvwxyz0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
