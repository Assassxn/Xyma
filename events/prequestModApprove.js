// const { MessageAttachment, MessageEmbed } = require("discord.js");
// const { client } = require("../index");
// const blIDs = require("../models/lfgBlacklist");
// const PrequestPost = require("../models/PrequestPost");
// const profileModel = require("../models/profileSchema");
// const fs = require("fs");
// const moment = require("moment");
// let IDs = [];

// client.on("messageReactionAdd", async (reaction, user) => {
//   if (reaction.message.partial) await reaction.message.fetch();
//   if (reaction.partial) await reaction.fetch();
//   if (!reaction.message.guild || user.bot) return;

//   let reqchan = reaction.message.guild.channels.cache.find((c) => c.id == "844650142627004416");
//   let prequestTranscript = reaction.message.guild.channels.cache.find((c) => c.id == "852636347521040405");
//   let prequestLogs = reaction.message.guild.channels.cache.find((c) => c.id == "839151192004231228");

//   if (reaction.message.channel.id === reqchan.id) {
//     PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
//       if (err) throw err;
//       if (data) {
//         userGuildMember = reaction.message.guild.members.cache.get(data.pid);
//         reqMessageID = data.requestMessageID;
//         posterID = data.pid;
//         carryUsername = client.users.cache.get(data.pid).username;
//         header = `Posted by: ${client.users.cache.get(data.pid)}`;
//         poster = client.users.cache.get(data.pid);
//         let link = "";

//         if (data.miniboss === true) {
//           link = "https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png";
//         } else if (data.survivor === true) {
//           link = "https://cdn.discordapp.com/attachments/845954962277531648/845956429974339624/survivors.png";
//         } else if (data.mistmonster === true) {
//           link = "https://cdn.discordapp.com/attachments/845954962277531648/845956340320305152/mist-monster.png";
//         } else if (data.sc === true) {
//           link = "https://cdn.discordapp.com/attachments/845954962277531648/845956408465162250/sc.png";
//         } else if (data.elemental === true) {
//           link = "https://cdn.discordapp.com/attachments/845954962277531648/845956386604974110/elemental-husks.png";
//         }

//         await profileModel.findOne({ userID: data.pid }, async (err, data) => {
//           if (err) throw err;
//           if (data) {
//             EPIC = data.epic;
//             PL = data.pl;
//             //finishing the post by the owner or moderator
//             await PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
//               if (err) throw err;
//               if (data) {
//                 if (data.completed === true) {
//                   if (reaction.message.guild.members.cache.get(user.id).roles.cache.has("814980966107840522" || "844316500768981045")) {
//                     //APPROVING THE POST by the owner or moderator
//                     if (reaction.emoji.name === "✅") {
//                       await PrequestPost.findOne({ pid: posterID, requestMessageID: reaction.message.id }, async (err, data) => {
//                         if (err) throw err;
//                         if (data) {
//                           if (data.completed === true && data.claimed === true) {
//                             await PrequestPost.findOne({ pid: posterID, requestMessageID: reaction.message.id }, async (err, data) => {
//                               if (err) throw err;
//                               if (data) {
//                                 carryUsername = user.username;
//                                 //looping through each carrier
//                                 for (let i = 0; i < IDs.length; i++) {
//                                   //adding rep for each helper
//                                   await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { STWCarries: 1 } });

//                                   await profileModel.findOne({ userID: IDs[i] }, async (err, data) => {
//                                     if (err) throw err;
//                                     if (data) {
//                                       if (data.STWCarries === 25) {
//                                         reaction.message.guild.members.cache.get(IDs[i]).roles.remove("862085968861200394");
//                                         reaction.message.guild.members.cache.get(IDs[i]).roles.add("862086114088058910");
//                                         target = client.users.cache.get(IDs[i]);
//                                         await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { hexacoins: 2500 } });
//                                         data = await profileModel.findOne({ userID: IDs[i] });
//                                         Embed = new MessageEmbed()
//                                           .setTitle(`🎉Congratulation on \`25\` STW Carries🎉`)
//                                           .setDescription("You have been paid `2500` <:xytera:859531350385229825> for STW Rep Level 1")
//                                           .setColor("#f1c40f")
//                                           .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
//                                           .addFields(
//                                             {
//                                               name: "Balance",
//                                               value: `${data.hexacoins} <:xytera:859531350385229825>`,
//                                             },
//                                             {
//                                               name: "Bank",
//                                               value: `${data.bank} <:xytera:859531350385229825>`,
//                                             }
//                                           )
//                                           .setTimestamp()
//                                           .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
//                                         target.send(Embed);
//                                       }
//                                       if (data.STWCarries === 100) {
//                                         reaction.message.guild.members.cache.get(IDs[i]).roles.remove("862086114088058910");
//                                         reaction.message.guild.members.cache.get(IDs[i]).roles.add("862084101539364924");
//                                         target = client.users.cache.get(IDs[i]);
//                                         await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { hexacoins: 10000 } });
//                                         data = await profileModel.findOne({ userID: IDs[i] });
//                                         Embed = new MessageEmbed()
//                                           .setTitle(`🎉Congratulation on \`100\` STW Carries🎉`)
//                                           .setDescription("You have been paid `10000` <:xytera:859531350385229825> for STW Rep Level 2")
//                                           .setColor("#f1c40f")
//                                           .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
//                                           .addFields(
//                                             {
//                                               name: "Balance",
//                                               value: `${data.hexacoins} <:xytera:859531350385229825>`,
//                                             },
//                                             {
//                                               name: "Bank",
//                                               value: `${data.bank} <:xytera:859531350385229825>`,
//                                             }
//                                           )
//                                           .setTimestamp()
//                                           .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
//                                         target.send(Embed);
//                                       }
//                                       if (data.STWCarries === 250) {
//                                         reaction.message.guild.members.cache.get(IDs[i]).roles.remove("862084101539364924");
//                                         reaction.message.guild.members.cache.get(IDs[i]).roles.add("862086346759864371");
//                                         target = client.users.cache.get(IDs[i]);
//                                         await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { hexacoins: 25000 } });
//                                         data = await profileModel.findOne({ userID: IDs[i] });
//                                         Embed = new MessageEmbed()
//                                           .setTitle(`🎉Congratulation on \`250\` STW Carries🎉`)
//                                           .setDescription("You have been paid `25000` <:xytera:859531350385229825> for STW Rep Level 3")
//                                           .setColor("#f1c40f")
//                                           .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
//                                           .addFields(
//                                             {
//                                               name: "Balance",
//                                               value: `${data.hexacoins} <:xytera:859531350385229825>`,
//                                             },
//                                             {
//                                               name: "Bank",
//                                               value: `${data.bank} <:xytera:859531350385229825>`,
//                                             }
//                                           )
//                                           .setTimestamp()
//                                           .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
//                                         target.send(Embed);
//                                       }
//                                       if (data.STWCarries === 500) {
//                                         reaction.message.guild.members.cache.get(IDs[i]).roles.remove("862086346759864371");
//                                         reaction.message.guild.members.cache.get(IDs[i]).roles.add("862086473392848906");
//                                         target = client.users.cache.get(IDs[i]);
//                                         await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { hexacoins: 50000 } });
//                                         data = await profileModel.findOne({ userID: IDs[i] });
//                                         Embed = new MessageEmbed()
//                                           .setTitle(`🎉Congratulation on \`500\` STW Carries🎉`)
//                                           .setDescription("You have been paid `50000` <:xytera:859531350385229825> for STW Rep Level 4")
//                                           .setColor("#f1c40f")
//                                           .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
//                                           .addFields(
//                                             {
//                                               name: "Balance",
//                                               value: `${data.hexacoins} <:xytera:859531350385229825>`,
//                                             },
//                                             {
//                                               name: "Bank",
//                                               value: `${data.bank} <:xytera:859531350385229825>`,
//                                             }
//                                           )
//                                           .setTimestamp()
//                                           .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
//                                         target.send(Embed);
//                                       }
//                                       if (data.STWCarries === 1000) {
//                                         reaction.message.guild.members.cache.get(IDs[i]).roles.remove("862086473392848906");
//                                         reaction.message.guild.members.cache.get(IDs[i]).roles.add("862086564212506644");
//                                         target = client.users.cache.get(IDs[i]);
//                                         await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { hexacoins: 100000 } });
//                                         data = await profileModel.findOne({ userID: IDs[i] });
//                                         Embed = new MessageEmbed()
//                                           .setTitle(`🎉Congratulation on \`1000\` STW Carries🎉`)
//                                           .setDescription("You have been paid `100000` <:xytera:859531350385229825> for STW Rep Level 5")
//                                           .setColor("#f1c40f")
//                                           .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
//                                           .addFields(
//                                             {
//                                               name: "Balance",
//                                               value: `${data.hexacoins} <:xytera:859531350385229825>`,
//                                             },
//                                             {
//                                               name: "Bank",
//                                               value: `${data.bank} <:xytera:859531350385229825>`,
//                                             }
//                                           )
//                                           .setTimestamp()
//                                           .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
//                                         target.send(Embed);
//                                       }
//                                     }
//                                   });

//                                   //sending greeting message for each carrier
//                                   await profileModel.findOne({ userID: IDs[i] }, async (err, data) => {
//                                     if (err) throw err;
//                                     if (data) {
//                                       carriesCount = data.STWCarries;
//                                       client.users
//                                         .fetch(IDs[i])
//                                         .then(async (user) => {
//                                           embed = new MessageEmbed()
//                                             .setColor("#1ec45c")
//                                             .setDescription(`You received reputation for helping **${carryUsername}** doing their MSK prequest | Lifetime: **${carriesCount}**`);
//                                           await user.send(embed);
//                                         })
//                                         .catch((err) => console.log("error there", err));
//                                     } else {
//                                       console.log("can't find that user that helped in the carry");
//                                     }
//                                   });
//                                 }

//                                 //updating Time of APPROVED AT
//                                 await PrequestPost.findOneAndUpdate({ pid: posterID, requestMessageID: reaction.message.id }, { $set: { approvedAt: moment().format("MMMM Do YYYY, h:mm:ss a") } });

//                                 let finalString;
//                                 if (IDs.length === 3) {
//                                   finalString = `${client.users.cache.get(IDs[0])} ${client.users.cache.get(IDs[1])} ${client.users.cache.get(IDs[2])}`;
//                                 } else if (IDs.length === 2) {
//                                   finalString = `${client.users.cache.get(IDs[0])} ${client.users.cache.get(IDs[1])}`;
//                                 } else {
//                                   finalString = `${client.users.cache.get(IDs[0])}`;
//                                 }

//                                 await PrequestPost.findOne({ pid: posterID, requestMessageID: reaction.message.id }, async (err, data) => {
//                                   if (err) throw err;
//                                   if (data) {
//                                     //SEND THE FINAL INFO
//                                     finalInfoEmbed = new MessageEmbed()
//                                       .setTitle("COMPLETION OF A PREQUEST CARRY BY A MODERATOR")
//                                       .setColor("#1ec45c")
//                                       .addFields(
//                                         { name: `Moderator:`, value: `${user}` },
//                                         { name: "The Carry:", value: `${client.users.cache.get(data.pid)}`, inline: false },
//                                         { name: "Carriers:", value: `${finalString}`, inline: false },
//                                         { name: "Posted At:", value: `${data.postedAt}`, inline: false },
//                                         { name: "Claimed At:", value: `${data.claimedAt}`, inline: false },
//                                         { name: "Completed At:", value: `${data.completedAt}`, inline: false },
//                                         { name: "Approved At:", value: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`, inline: false }
//                                       )
//                                       .setThumbnail(link);

//                                     prequestLogs.send(finalInfoEmbed);

//                                     fs.writeFileSync(
//                                       `../${poster.username}.txt`,
//                                       `COMPLETION OF A PREQUEST CARRY BY A MODERATOR\n\n\Moderator: ${user}\n\n The Carry: ${client.users.cache.get(
//                                         data.pid
//                                       )}\n\nCarriers: ${finalString}\n\nPosted At: ${data.postedAt}\n\nClaimed At: ${data.claimedAt}\n\nCompleted At: ${
//                                         data.completedAt
//                                       }\n\nApproved At: ${moment().format("MMMM Do YYYY, h:mm:ss a")}\n\n${link}`,
//                                       function (err) {
//                                         return console.log(err);
//                                       }
//                                     );

//                                     await prequestTranscript.send(new MessageAttachment(fs.createReadStream(`../${poster.username}.txt`)));

//                                     //delete record
//                                     try {
//                                       await PrequestPost.deleteOne({
//                                         pid: posterID,
//                                       });
//                                     } catch (err) {
//                                       console.log(err);
//                                     }
//                                     //setting postedPrequest to false so the person can post again
//                                     await profileModel.findOneAndUpdate({ userID: posterID, postedPrequest: true }, { $set: { postedPrequest: false } }, { $set: { muted: true } });

//                                     let carriers;
//                                     if (IDs.length === 3) {
//                                       carriers = `${client.users.cache.get(IDs[0]).username}, ${client.users.cache.get(IDs[1]).username} and\n${client.users.cache.get(IDs[2]).username}`;
//                                     } else if (IDs.length === 2) {
//                                       carriers = `${client.users.cache.get(IDs[0]).username} and ${client.users.cache.get(IDs[1]).username}`;
//                                     } else {
//                                       carriers = `${client.users.cache.get(IDs[0]).username}`;
//                                     }

//                                     //BLACKLIST

//                                     let lfgBl = await blIDs.findOne({ guildID: reaction.message.guild.id });

//                                     let obj = {
//                                       ID: posterID,
//                                       time: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`,
//                                       reason: `No reply to MSK Prequest reputaion\nrequest from ${carriers}`,
//                                     };
//                                     if (lfgBl) {
//                                       await blIDs.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $push: { blIDs: obj } });
//                                     }

//                                     if (!lfgBl) {
//                                       let obj = {
//                                         ID: posterID,
//                                         time: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`,
//                                         reason: `No reply to MSK Prequest reputaion\nrequest from ${carriers}`,
//                                       };
//                                       let info = await blIDs.create({
//                                         guildID: reaction.message.guild.id,
//                                         blIDs: obj,
//                                       });
//                                       info.save();
//                                     }

//                                     await reqchan.messages
//                                       .fetch(reqMessageID)
//                                       .then((msg) => {
//                                         try {
//                                           msg.delete();
//                                         } catch {}
//                                       })
//                                       .catch((err) => console.log("error here", err));
//                                   } else {
//                                     console.log("some error here");
//                                   }
//                                 });
//                               } else {
//                                 try {
//                                   reaction.users.remove(user.id);
//                                 } catch (err) {
//                                   console.log(err);
//                                 }
//                               }
//                             });
//                           } else {
//                             try {
//                               reaction.users.remove(user.id);
//                             } catch (err) {
//                               console.log(err);
//                             }
//                           }
//                         }
//                       });
//                     }

//                     //disproving the post by the owner or moderator
//                     if (reaction.emoji.name === "🚫") {
//                       await PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
//                         if (err) throw err;
//                         if (data) {
//                           if (data.completed === true && data.claimed === true) {
//                             poster = client.users.cache.get(posterID);
//                             //GIVE THE HEXACOIN BACK
//                             //Dm the user and await a message
//                             EMBED = new MessageEmbed().setDescription(`${user} has denied the carry for you and you have been refunded **500** <:xytera:859531350385229825>`).setColor("#dd2e44");
//                             poster.send(EMBED);

//                             user.send(`${user}, please in **One** message tell us why are you denying this carry for ${carryUsername}`).then((MESSAGE) => {
//                               const filter = (m) => m.author.id === user.id;
//                               MESSAGE.channel
//                                 .awaitMessages(filter, { max: 1, time: 60 * 1000, errors: ["time"] })
//                                 .then(async (collected) => {
//                                   content = collected.first().content;
//                                   for (i = 0; i < IDs.length; i++) {
//                                     await client.users
//                                       .fetch(IDs[i])
//                                       .then(async (user) => {
//                                         //dm each helper and tell them ${user} has denied the carry if there is something wrong please open a ticket at ${help Desk}
//                                         embed = new MessageEmbed()
//                                           .setColor("#ed8526")
//                                           .setDescription(`${user} denied the prequest carry, if there is something wrong or you disagree please open a ticket at\n<#815929868566528020>`);
//                                         user.send(embed);
//                                       })
//                                       .catch((err) => {
//                                         console.log("error there 420", err);
//                                       });
//                                   }

//                                   await PrequestPost.findOneAndUpdate({ pid: posterID }, { $set: { deniedAt: moment().format("MMMM Do YYYY, h:mm:ss a") } });

//                                   await PrequestPost.findOne({ pid: posterID }, async (err, data) => {
//                                     if (err) throw err;
//                                     if (data) {
//                                       let finalString;
//                                       if (IDs.length === 3) {
//                                         finalString = `${client.users.cache.get(IDs[0])} ${client.users.cache.get(IDs[1])} ${client.users.cache.get(IDs[2])}`;
//                                       } else if (IDs.length === 2) {
//                                         finalString = `${client.users.cache.get(IDs[0])} ${client.users.cache.get(IDs[1])}`;
//                                       } else {
//                                         finalString = `${client.users.cache.get(IDs[0])}`;
//                                       }

//                                       embed = new MessageEmbed()
//                                         .setTitle("A denial of a prequest carry by a Moderator")
//                                         .setColor("#dd2e44")
//                                         .setThumbnail(link)
//                                         .addFields(
//                                           { name: `Moderator:`, value: `${user}` },
//                                           { name: `Reason:`, value: `${content}` },
//                                           { name: `The Carry:`, value: `${client.users.cache.get(data.pid)}` },
//                                           { name: "Carriers:", value: `${finalString}` },
//                                           { name: "Posted At:", value: `${data.postedAt}`, inline: false },
//                                           { name: "Claimed At:", value: `${data.claimedAt}`, inline: false },
//                                           { name: "Completed At:", value: `${data.completedAt}`, inline: false },
//                                           { name: "Denied At:", value: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`, inline: false }
//                                         );
//                                       prequestLogs.send(embed);

//                                       fs.writeFileSync(
//                                         `../${poster.username}.txt`,
//                                         `A denial of a prequest carry by a Moderator\n\n\ Moderator: ${user}\n\nReason: ${content}\n\nThe Carry: ${client.users.cache.get(
//                                           data.pid
//                                         )}\n\nCarriers: ${finalString}\n\nPosted At: ${data.postedAt}\n\nClaimed At: ${data.claimedAt}\n\nCompleted At: ${
//                                           data.completedAt
//                                         }\n\nDenied At: ${moment().format("MMMM Do YYYY, h:mm:ss a")}\n\n${link}`,
//                                         function (err) {
//                                           return console.log(err);
//                                         }
//                                       );

//                                       await prequestTranscript.send(new MessageAttachment(fs.createReadStream(`../${poster.username}.txt`)));
//                                     }
//                                   });

//                                   lastEmbed = new MessageEmbed().setDescription(`Thankyou for your feedback!`).setColor("#1ec45c");
//                                   user.send(lastEmbed);

//                                   try {
//                                     await PrequestPost.deleteOne({
//                                       pid: posterID,
//                                     });
//                                   } catch (err) {
//                                     console.log(err);
//                                   }

//                                   reqchan.messages
//                                     .fetch(reqMessageID)
//                                     .then(async (msg) => {
//                                       await msg.delete();
//                                     })
//                                     .catch((err) => {
//                                       console.log(err);
//                                     });
//                                   await profileModel.findOneAndUpdate({ userID: posterID, postedPrequest: true }, { $set: { postedPrequest: false } }, { $set: { muted: true } });

//                                   //BLACKLIST
//                                   let carriers;
//                                   if (IDs.length === 3) {
//                                     carriers = `${client.users.cache.get(IDs[0]).user.username}, ${client.users.cache.get(IDs[1]).user.username} and\n${client.users.cache.get(IDs[2]).user.username}`;
//                                   } else if (IDs.length === 2) {
//                                     carriers = `${client.users.cache.get(IDs[0])} and ${client.users.cache.get(IDs[1])}`;
//                                   } else {
//                                     carriers = `${client.users.cache.get(IDs[0])}`;
//                                   }

//                                   let lfgBl = await blIDs.findOne({ guildID: reaction.message.guild.id });

//                                   let obj = {
//                                     ID: posterID,
//                                     time: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`,
//                                     reason: `No reply to MSK Prequest reputaion\nrequest from ${carriers}`,
//                                   };
//                                   if (lfgBl) {
//                                     await blIDs.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $push: { blIDs: obj } });
//                                   }

//                                   if (!lfgBl) {
//                                     let obj = {
//                                       ID: posterID,
//                                       time: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`,
//                                       reason: `No reply to MSK Prequest reputaion\nrequest from ${carriers}`,
//                                     };
//                                     let info = await blIDs.create({
//                                       guildID: reaction.message.guild.id,
//                                       blIDs: obj,
//                                     });
//                                     info.save();
//                                   }
//                                 })
//                                 .catch((err) => {
//                                   embed = new MessageEmbed().setDescription("You took too long to send the message").setColor("#0078d7");
//                                   user.send(embed);
//                                   console.log("TimeOut", err);
//                                 });
//                             });
//                           }
//                         }
//                       });
//                     }
//                   }
//                 }
//               }
//             });
//           }
//         });
//       }
//     });
//   }else {
//     return
//   }
// });
