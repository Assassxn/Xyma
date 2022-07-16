// const { MessageEmbed } = require("discord.js");
// const { client } = require("../index");
// const PrequestPost = require("../models/PrequestPost");
// const profileModel = require("../models/profileSchema");
// const moment = require("moment");

// client.on("messageReactionAdd", async (reaction, user) => {
//     if (reaction.message.partial) await reaction.message.fetch();
//     if (reaction.partial) await reaction.fetch();
//     if (!reaction.message.guild || user.bot) return;

//     let reqchan = reaction.message.guild.channels.cache.find((c) => c.id == "844650142627004416");
//     let sidePrequestLogs = reaction.message.guild.channels.cache.find((c) => c.id === "865001596471345162");

//     if (reaction.message.channel.id === reqchan.id) {
//         await PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
//             if (err) throw err;
//             if (data) {
//                 userGuildMember = reaction.message.guild.members.cache.get(data.pid);
//                 reqMessageID = data.requestMessageID;
//                 posterID = data.pid;
//                 carryUsername = client.users.cache.get(data.pid).username;
//                 header = `Posted by: ${client.users.cache.get(data.pid)}`;
//                 poster = client.users.cache.get(data.pid);
//                 let link = "";

//                 if (data.miniboss === true) {
//                     link = "https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png";
//                 } else if (data.survivor === true) {
//                     link = "https://cdn.discordapp.com/attachments/845954962277531648/845956429974339624/survivors.png";
//                 } else if (data.mistmonster === true) {
//                     link = "https://cdn.discordapp.com/attachments/845954962277531648/845956340320305152/mist-monster.png";
//                 } else if (data.sc === true) {
//                     link = "https://cdn.discordapp.com/attachments/845954962277531648/845956408465162250/sc.png";
//                 } else if (data.elemental === true) {
//                     link = "https://cdn.discordapp.com/attachments/845954962277531648/845956386604974110/elemental-husks.png";
//                 }

//                 await profileModel.findOne({ userID: data.pid }, async (err, data) => {
//                     if (err) throw err;
//                     if (data) {
//                         EPIC = data.epic;
//                         PL = data.pl;

//                         //CLAIMING THE POST
//                         if (reaction.emoji.name === "🔵") {
//                             await PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
//                                 if (err) throw err;
//                                 if (data) {
//                                     //If the person who is claiming the post is the poster then return
//                                     if (user.id === data.pid) {
//                                         try {
//                                             reaction.users.remove(user.id);
//                                         } catch (err) {
//                                             console.log(err);
//                                         }
//                                         return;
//                                     }
//                                     if (data.claimed === false && data.completed === false) {
//                                         //when user first claim the post
//                                         try {
//                                             reaction.users.remove(user.id);
//                                         } catch (err) {
//                                             console.log(err);
//                                         }
//                                         await PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
//                                             if (err) throw err;
//                                             if (data) {
//                                                 //If the person has the @STW Helper role
//                                                 if (reaction.message.guild.members.cache.get(user.id).roles.cache.has("839941689329319999")) {
//                                                     claimer = user;

//                                                     //Ready check validation message for the poster
//                                                     embed = new MessageEmbed()
//                                                         .setDescription(`${user} has claimed your MSK prequest post.\n\n Are you ready to be carried in the next 30 minutes?`)
//                                                         .setColor("#dd2e44")
//                                                         .setFooter("✅ Yes | 🚫 No");

//                                                     let sentSuccessfully = false;

//                                                     //sending the Ready check message
//                                                     poster
//                                                         .send(embed)
//                                                         .then(async (msg) => {
//                                                             msg.react("✅");
//                                                             msg.react("🚫");
//                                                             sentSuccessfully = true;
//                                                             let error = false;
//                                                             if (sentSuccessfully) {
//                                                                 //Ready check validation message for the claimer
//                                                                 theClaimerFirstEmbed = new MessageEmbed()
//                                                                     .setColor("#dd2e44")
//                                                                     .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
//                                                                     .setDescription(
//                                                                         `I am contacting \`${EPIC}\` to confirm if they are ready for the carry\n\nThey have 5 minutes to reply. **Do not contact them until I confirm.**`
//                                                                     );

//                                                                 await user.send(theClaimerFirstEmbed).catch(async (err) => {
//                                                                     error = true;
//                                                                     //if the claimer doesnt accept dms
//                                                                     console.error(err);
//                                                                     //unclaim the fucking user
//                                                                     errorEmbed = new MessageEmbed()
//                                                                         .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
//                                                                         .setDescription(
//                                                                             `${user}, you need to open your DMs to be able to claim posts.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
//                                                                         )
//                                                                         .setTimestamp()
//                                                                         .setColor("#e91015")
//                                                                         .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
//                                                                     msg.delete().catch((err) => console.error(err));
//                                                                     try {
//                                                                         reaction.message.channel.send(errorEmbed).then((errEmbed) => errEmbed.delete({ timeout: 10000 }));
//                                                                     } catch {
//                                                                         console.log("user doesn't accpet dms and the ticket has been deleted");
//                                                                     }
//                                                                     reaction.users.remove(user.id);

//                                                                     //clearing values in the db
//                                                                     await PrequestPost.findOneAndUpdate(
//                                                                         { requestMessageID: reaction.message.id },
//                                                                         {
//                                                                             $set: {
//                                                                                 claimerID: "",
//                                                                                 claimed: false,
//                                                                                 claimedAt: "",
//                                                                             },
//                                                                         }
//                                                                     );

//                                                                     //Editing the post back to Unclaimed stage
//                                                                     notClaimedEmbed = new MessageEmbed()
//                                                                         .setColor("#0078d7")
//                                                                         .addFields(
//                                                                             { name: "epic name", value: `${EPIC}`, inline: true },
//                                                                             { name: "power level", value: `${PL}`, inline: true },
//                                                                             { name: "Status", value: "Open" }
//                                                                         )
//                                                                         .setFooter(`🔵 claim | ❌ close`)
//                                                                         .setThumbnail(link);

//                                                                     reaction.message.edit(header, notClaimedEmbed);
//                                                                     reaction.message.react("🔵");
//                                                                     reaction.message.react("❌");

//                                                                     //sending the poster this message
//                                                                     unClaimingEmbed = new MessageEmbed()
//                                                                         .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
//                                                                         .setDescription(
//                                                                             `${user} unclaimed your post Please **Don't** contact them anymore and be patient until someone else claim your post`
//                                                                         )
//                                                                         .setColor("#1ec45c");
//                                                                     await poster.send(unClaimingEmbed).catch((err) => console.error(err));

//                                                                     return;
//                                                                 });

//                                                                 if (!error) {
//                                                                     const filter = (reaction, user) => {
//                                                                         return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === posterID;
//                                                                     };

//                                                                     //Editing the post embed into the Ready check stage
//                                                                     readyCheckEmbed = new MessageEmbed()
//                                                                         .setColor("#e98a31")
//                                                                         .addFields(
//                                                                             { name: "epic name", value: `${EPIC}`, inline: true },
//                                                                             { name: "power level", value: "135", inline: true },
//                                                                             { name: "Status", value: "Claimed" }
//                                                                         )
//                                                                         .setFooter(`Ready check`)
//                                                                         .setThumbnail(link);

//                                                                     reaction.message.edit(header + ` | Claimed by: ${user}\n`, readyCheckEmbed);
//                                                                     //Removing all the Reactions
//                                                                     reaction.message.reactions.removeAll().catch();

//                                                                     //Awaiting on Reactions to see if the poster is ready for the Carry or not
//                                                                     msg.awaitReactions(filter, { max: 1, time: 5 * 60 * 1000, errors: ["time"] })
//                                                                         .then(async (collected) => {
//                                                                             //The Reaction collected
//                                                                             result = collected.first();

//                                                                             //If the Poster is Ready for the carry
//                                                                             if (result.emoji.name === "✅") {
//                                                                                 claimedEmbed = new MessageEmbed()
//                                                                                     .setColor("#dd2e44")
//                                                                                     .addFields(
//                                                                                         { name: "epic name", value: `${EPIC}`, inline: true },
//                                                                                         { name: "power level", value: "135", inline: true },
//                                                                                         { name: "Status", value: "Claimed" }
//                                                                                     )
//                                                                                     .setFooter(`🔵 unclaim | ✅ complete`)
//                                                                                     .setThumbnail(link);

//                                                                                 reaction.message.edit(header + ` | Claimed by: ${user}\n`, claimedEmbed);
//                                                                                 reaction.message.react("🔵");
//                                                                                 reaction.message.react("✅");

//                                                                                 //Last stage of the validation; Telling the poster not to contact the claimer
//                                                                                 finalMessage_poster = new MessageEmbed()
//                                                                                     .setColor("#e98a31")
//                                                                                     .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
//                                                                                     .setDescription(
//                                                                                         `✅ Awesome! Im informing ${claimer} that you are ready.\n\n🛑 Please wait until they contact you in the next 20 minutes\n\n🛑 **DONT DM THEM** as they need to find and form a team\n\n🛑 Please be ready!`
//                                                                                     );

//                                                                                 poster.send(finalMessage_poster);
//                                                                                 //setting the claimed At time to the time right now
//                                                                                 await PrequestPost.findOneAndUpdate(
//                                                                                     { requestMessageID: reaction.message.id },
//                                                                                     { $set: { claimed: true, claimerID: user.id, claimedAt: moment().format("MMMM Do YYYY, h:mm:ss a") } }
//                                                                                 );

//                                                                                 //Last Message for the claimer
//                                                                                 finalMessage_claimer = new MessageEmbed()
//                                                                                     .setColor("#1ec45c")
//                                                                                     .setDescription(
//                                                                                         `${poster} (\`${EPIC}\`) is ready for the MSK prequest carry. Please contact them immediately. If you cannot carry them in the next 20 minutes, please unclaim them.`
//                                                                                     );
//                                                                                 claimer.send(finalMessage_claimer);
//                                                                             }

//                                                                             //If the poster is not ready for the carry
//                                                                             if (result.emoji.name === "🚫") {
//                                                                                 //Giving the poster 500 hexacoin back
//                                                                                 await profileModel.findOneAndUpdate(
//                                                                                     { userID: posterID, postedPrequest: true },
//                                                                                     { $set: { postedPrequest: false }, $inc: { hexacoins: 500 } }
//                                                                                 );
//                                                                                 //sending the poster the cancellation embed
//                                                                                 cancelationEmbed = new MessageEmbed()
//                                                                                     .setColor("#dd2e44")
//                                                                                     .setDescription(
//                                                                                         `${poster}, Your post has been deleted and you have been refunded **500** <:xytera:859531350385229825>`
//                                                                                     );
//                                                                                 poster.send(cancelationEmbed);

//                                                                                 try {
//                                                                                     //Deleting the post from the database
//                                                                                     await PrequestPost.deleteOne({ pid: posterID, requestMessageID: reqMessageID });
//                                                                                     //Deleting the post from Discord
//                                                                                     await reaction.message.delete();
//                                                                                 } catch (err) {
//                                                                                     console.log(err);
//                                                                                 }

//                                                                                 //Informing the claimer that the poster is not ready
//                                                                                 Embed = new MessageEmbed()
//                                                                                     .setColor("#dd2e44")
//                                                                                     .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
//                                                                                     .setDescription(`I deleted \`${EPIC}\` post as they are not ready for the carry!`);
//                                                                                 claimer.send(Embed);
//                                                                             }
//                                                                         })
//                                                                         //If the poster doesn't respond (He is offline or something)
//                                                                         .catch(async () => {
//                                                                             //finding the post
//                                                                             await PrequestPost.findOne({ pid: posterID, requestMessageID: reqMessageID }, async (err, data) => {
//                                                                                 if (err) throw err;
//                                                                                 if (data) {
//                                                                                     //giving the poster thier hexacoin back
//                                                                                     await profileModel.findOneAndUpdate(
//                                                                                         { userID: posterID, postedPrequest: true },
//                                                                                         { $set: { postedPrequest: false }, $inc: { hexacoins: 500 } }
//                                                                                     );
//                                                                                     //sending the poster the TimeOut Embed
//                                                                                     timeOutEmbed = new MessageEmbed()
//                                                                                         .setColor("#dd2e44")
//                                                                                         .setDescription(
//                                                                                             `${poster}, You took too long to confirm.\nYour post has been deleted and you have been refunded **500** <:xytera:859531350385229825>\n\nYou may create a new post in <#851171690586570802>`
//                                                                                         );
//                                                                                     poster.send(timeOutEmbed);

//                                                                                     //Sending the claimer that the poster didnt respond
//                                                                                     Embed = new MessageEmbed()
//                                                                                         .setColor("#dd2e44")
//                                                                                         .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
//                                                                                         .setDescription(`I received no response from \`${EPIC}\` and have deleted their post.`);
//                                                                                     claimer.send(Embed);

//                                                                                     try {
//                                                                                         //deleting the post from the database
//                                                                                         await PrequestPost.deleteOne({ pid: posterID, requestMessageID: reqMessageID });
//                                                                                         //deleting the post from Discord
//                                                                                         await reaction.message.delete();
//                                                                                     } catch (err) {
//                                                                                         console.log(err);
//                                                                                     }
//                                                                                 }
//                                                                             });
//                                                                         });
//                                                                 }
//                                                             }
//                                                         })
//                                                         .catch(async () => {
//                                                             await setTimeout(async () => {
//                                                                 if (!sentSuccessfully) {
//                                                                     claimerErrorEmbed = new MessageEmbed()
//                                                                         .setColor("#e91015")
//                                                                         .setDescription(
//                                                                             "We encounterd an error trying to claim this post, the post has been deleted, please report that to <#815929868566528020>"
//                                                                         )
//                                                                         .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
//                                                                         .setTimestamp();
//                                                                     user.send(claimerErrorEmbed).catch((err) => console.error(err));

//                                                                     //deleting the post
//                                                                     await PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
//                                                                         if (err) throw err;
//                                                                         if (data) {
//                                                                             try {
//                                                                                 await PrequestPost.deleteOne({
//                                                                                     requestMessageID: reaction.message.id,
//                                                                                 });
//                                                                                 await reaction.message.delete();
//                                                                             } catch (err) {
//                                                                                 console.log(err);
//                                                                             }
//                                                                         }
//                                                                     });
//                                                                     await profileModel.findOneAndUpdate(
//                                                                         { userID: posterID, postedPrequest: true },
//                                                                         { $set: { postedPrequest: false }, $inc: { hexacoins: 500 } }
//                                                                     );
//                                                                     //dm mods
//                                                                     infoEmbed = new MessageEmbed()
//                                                                         .setTitle("DISABLED DMS")
//                                                                         .addFields({
//                                                                             name: "Time: ",
//                                                                             value: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`,
//                                                                         })
//                                                                         .setDescription(
//                                                                             `Please inform ${poster} that he needs to enable his DMs to be able to request a MSK Prequest Carry.\nPlease use the command \`!dm-enable\` command to send the required instructions to the user`
//                                                                         )
//                                                                         .setColor("#e91015")
//                                                                         .setTimestamp()
//                                                                         .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL({ dynamic: true })}`);
//                                                                     sidePrequestLogs.send("<@&814980966107840522>", infoEmbed);
//                                                                     return;
//                                                                 }
//                                                             }, 2000);
//                                                         });
//                                                 } else {
//                                                     //If the user doesn't have @MSK Helper role send this message
//                                                     embed = new MessageEmbed().setColor("#dd2e44").setTitle(`You need the \`@STW Helper\` role to start claiming posts`);
//                                                     user.send(embed);
//                                                     try {
//                                                         reaction.users.remove(user.id);
//                                                     } catch (err) {
//                                                         console.log(err);
//                                                     }
//                                                 }
//                                             }
//                                         });
//                                         //If the post is already claimed and now the claimer want to unclaim
//                                     } else if (data.claimed === true && data.completed === false && user.id === data.claimerID) {
//                                         //clearing values in the db
//                                         await PrequestPost.findOneAndUpdate(
//                                             { requestMessageID: reaction.message.id },
//                                             {
//                                                 $set: {
//                                                     claimerID: "",
//                                                     claimed: false,
//                                                     claimedAt: "",
//                                                 },
//                                             }
//                                         );

//                                         //Editing the post back to Unclaimed stage
//                                         notClaimedEmbed = new MessageEmbed()
//                                             .setColor("#0078d7")
//                                             .addFields({ name: "epic name", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true }, { name: "Status", value: "Open" })
//                                             .setFooter(`🔵 claim | ❌ close`)
//                                             .setThumbnail(link);

//                                         try {
//                                             reaction.message.reactions.resolve("✅").users.remove(client.id);
//                                             reaction.message.react("❌");
//                                             reaction.message.edit(header, notClaimedEmbed);
//                                             reaction.users.remove(user.id);
//                                         } catch {}

//                                         //sending the poster this message
//                                         unClaimingEmbed = new MessageEmbed()
//                                             .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
//                                             .setDescription(`${user} unclaimed your post Please **Don't** contact them anymore and be patient until someone else claim your post`)
//                                             .setColor("#1ec45c");
//                                         poster.send(unClaimingEmbed);
//                                     } else if (reaction.message.guild.members.cache.get(user.id).roles.cache.has("814980966107840522" || "858975716652482581")) {
//                                         //clearing values in the db
//                                         await PrequestPost.findOneAndUpdate(
//                                             { requestMessageID: reaction.message.id },
//                                             {
//                                                 $set: {
//                                                     claimerID: "",
//                                                     claimed: false,
//                                                     claimedAt: "",
//                                                 },
//                                             }
//                                         );

//                                         //Editing the post back to Unclaimed stage
//                                         notClaimedEmbed = new MessageEmbed()
//                                             .setColor("#0078d7")
//                                             .addFields({ name: "epic name", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true }, { name: "Status", value: "Open" })
//                                             .setFooter(`🔵 claim | ❌ close`)
//                                             .setThumbnail(link);

//                                         try {
//                                             reaction.message.reactions.resolve("✅").users.remove(client.id);
//                                             reaction.message.react("❌");
//                                             reaction.message.edit(header, notClaimedEmbed);
//                                             reaction.users.remove(user.id);
//                                         } catch {}

//                                         //sending the poster this message
//                                         unClaimingEmbed = new MessageEmbed()
//                                             .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
//                                             .setDescription(`${poster} your post has been unclaimed by ${user}`)
//                                             .setColor("#1ec45c");
//                                         poster.send(unClaimingEmbed);
//                                     } else {
//                                         try {
//                                             reaction.users.remove(user.id);
//                                         } catch (err) {
//                                             console.log(err);
//                                         }
//                                     }
//                                 }
//                             });
//                         }
//                     }
//                 });
//             }
//         });
//     } else {
//         return;
//     }
// });
