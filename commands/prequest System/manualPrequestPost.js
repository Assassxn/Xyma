const PrequestPost = require("../../models/PrequestPost");
const profileModel = require("../../models/profileSchema");
const { MessageEmbed } = require("discord.js");
const blIDs = require("../../models/lfgBlacklist");
const moment = require("moment");
let minibossRequest, mist_monstersRequest, scRequest, elementalsRequest;

module.exports = {
  name: "prequestpost",
  aliases: ["pp"],
  permissions: [],
  description: "Manual Prequest Post",
  run: async (client, message, args) => {
    message.delete();
    if (!message.guild.members.cache.get(message.author.id).roles.cache.has("844316500768981045" || "814980966107840522" || "858975716652482581" || "861990065679630397")) return;
    if (!args[0] && !message.mentions.users.first) return message.channel.send("Please mention a user or type their ID").then((msg) => msg.delete({ timeout: 5000 }));
    const targetID = args[0] || message.mentions.users.first().id;

    if(!targetID) return message.channel
      .send("UnCorrect format please use: `!prequestpost @member/userID and one of the following: miniboss, mist-monsters, storm-chest, elementals, survivors`")
      .then((msg) => msg.delete({ timeout: 5000 }));
      
    const type = args[1];
    targetUserObject = client.users.cache.get(targetID);
    if (!["miniboss", "mist-monsters", "storm-chest", "elementals", "survivors"].includes(type))
      return message.channel
        .send("UnCorrect format please use: `!prequestpost @member/userID and one of the following: miniboss, mist-monsters, storm-chest, elementals, survivors`")
        .then((msg) => msg.delete({ timeout: 5000 }));

    let reqchan = message.guild.channels.cache.find((c) => c.id == "844650142627004416");

     await profileModel.findOne({ userID: targetID }, async (err, data) => {
       if (err) throw err;
       if (data) {
         if (!data.epic) {
           if (!postedFirstMessage) {
             targetUserObject.send("You need to link your fortnite account first").catch(() => {
               errorEmbed = new MessageEmbed()
                 .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                 .setDescription(
                   `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                 )
                 .setTimestamp()
                 .setColor("#e91015")
                 .setFooter(`${targetUserObject.tag}`, `${targetUserObject.displayAvatarURL({ dynamic: true })}`);
               message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
               postedFirstMessage = true;
             });
             return;
           }
         }
         if (!data.pl) {
           if (!postedFirstMessage) {
             targetUserObject.send("You need to link your fortnite account first").catch(() => {
               errorEmbed = new MessageEmbed()
                 .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                 .setDescription(
                   `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                 )
                 .setTimestamp()
                 .setColor("#e91015")
                 .setFooter(`${targetUserObject.tag}`, `${targetUserObject.displayAvatarURL({ dynamic: true })}`);
               message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
               postedFirstMessage = true;
             });
             return;
           }
         }
       }
     });

    let lfgBl;
    lfgBl = await blIDs.findOne({ guildID: message.guild.id });
    if (!lfgBl) {
      let info = await blIDs.create({
        guildID: message.guild.id,
        blIDs: [],
      });
      info.save();
    }
    if (lfgBl) {
      await blIDs.findOne({ guildID: message.guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
          await data.blIDs.map(async (i, t, r) => {
            if (i.ID === targetID) {
              Embed = new MessageEmbed()
                .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                .setColor("#dd2e44")
                .setDescription(`${message.guild.members.cache.get(targetID)} are Blacklisted from using the <#823318029542752266> You can't make a post for them!`)
                .setTimestamp();
              return message.channel.send(Embed);
            } else {
              POSTERID = targetID;
              await profileModel.findOne({ userID: targetID, postedPrequest: true }, async (err, data) => {
                if (err) throw err;
                if (data) {
                  embed = new MessageEmbed().setColor("#dd2e44").setDescription(`${message.guild.members.cache.get(targetID)} already have a post up. You can't make another post for them!`);
                  message.channel.send(embed);
                  return;
                } else {
                  await profileModel.findOne({ userID: targetID, muted: true }, async (err, data) => {
                    if (err) throw err;
                    if (data) {
                      embed = new MessageEmbed()
                        .setDescription(`${message.guild.members.cache.get(targetID)} are muted and you can't make another post for them un til they either approve/deny their previous post!`)
                        .setColor("#1ec45c")
                        .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg");
                      message.channel.send(embed);
                      return;
                    } else {
                      await profileModel.findOne({ userID: targetID }, async (err, data) => {
                        if (err) throw err;
                        if (data) {
                          EPIC = data.epic;
                          PL = data.pl;

                          if (data.hexacoins < 500) {
                            poorEmbed = new MessageEmbed().setColor("#dd2e44").setDescription(`${client.users.cache.get(targetID)}, You don't have enough xytera to purchase a carry`);
                            message.channel.send(poorEmbed);
                            return;
                          }
                          if (type === "miniboss") {
                            agreementEmbed = new MessageEmbed().setColor("#1ec45c").setTitle("PREQUEST CARRY REQUEST").setDescription("Let's complete your carry request!").addFields({
                              name: "__**AGREE TO THE RULES**__",
                              value: "💚 Tips are appreciated\n\n💚 Be patient! Help is guaranteed\n\n🛑 No help requests in DMs or Channels\n\n🛑 Do not pay for help",
                              inline: false,
                            });

                            message.channel
                              .send(agreementEmbed)
                              .then((msg) => {
                                msg.react("✅");
                                msg.react("🚫");

                                const filter = (reaction, user) => {
                                  return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === POSTERID;
                                };

                                msg
                                  .awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] })
                                  .then(async (collected) => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === "✅") {
                                      secondEmbed = new MessageEmbed()
                                        .setColor("#1ec45c")
                                        .setDescription("Awesome! Thank you for agreeing to the rules. As long as you follow the rules you'll have access to <#823318029542752266>");
                                      message.channel.send(secondEmbed);

                                      thirdEmbed = new MessageEmbed()
                                        .setColor("#1ec45c")
                                        .setTitle("MSK PREQUEST CARRY")
                                        .addFields({ name: "epicname", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true })
                                        .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png");
                                      message.channel.send(thirdEmbed);

                                      message.channel
                                        .send("Is this what you want to post?")
                                        .then((msg) => {
                                          msg.react("✅");
                                          msg.react("🚫");

                                          const filter = (reaction, user) => {
                                            return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === POSTERID;
                                          };

                                          msg.awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] }).then(async (collected) => {
                                            const reaction = collected.first();
                                            if (reaction.emoji.name === "✅") {
                                              minibossRequest = new MessageEmbed()
                                                .setTitle("MINIBOSS")
                                                .setColor("#0078d7")
                                                .addFields(
                                                  { name: "epic name", value: `${data.epic}`, inline: true },
                                                  { name: "power level", value: `${data.pl}`, inline: true },
                                                  { name: "Status", value: "Open" }
                                                )
                                                .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png")
                                                .setFooter(`🔵 claim | ❌ close`);

                                              header = `Posted by: ${message.guild.members.cache.get(targetID)}`;
                                              poster_id = targetID;

                                              request = await reqchan.send(header, minibossRequest);
                                              request.react("🔵");
                                              request.react("❌");
                                              reqID = request.id;

                                              const filter = (reaction, user) => {
                                                return ["✅", "🚫", "🔵", "❌"].includes(reaction.emoji.name) && user.id !== "814245954105507850";
                                              };

                                              request
                                                .awaitReactions(filter, { time: 3600000 })
                                                .then(async () => {
                                                  await PrequestPost.findOne({ requestMessageID: request.id }, async (err, data) => {
                                                    if (err) throw err;
                                                    if (data) {
                                                      if (data.claimed === true || data.completed === true) {
                                                        return;
                                                      } else {
                                                        await PrequestPost.deleteOne({
                                                          pid: targetID,
                                                          requestMessageID: request.id,
                                                        });

                                                        await profileModel.findOneAndUpdate({ userID: targetID, postedPrequest: true }, { $set: { postedPrequest: false }, $inc: { hexacoins: 500 } });
                                                        try {
                                                          await request.delete();
                                                        } catch {}

                                                        cancelationEmbed = new MessageEmbed()
                                                          .setColor("#1ec45c")
                                                          .setDescription(
                                                            `${message.guild.members.cache.get(
                                                              targetID
                                                            )}, Your post has expired and you have been refunded **500** <:xytera:859531350385229825>.\n You make a new post at <#851171690586570802>`
                                                          );
                                                        message.guild.members.cache.get(targetID).send(cancelationEmbed);
                                                      }
                                                    }
                                                  });
                                                })
                                                .catch();

                                              await PrequestPost.findOne({ pid: targetID }, async (err, data) => {
                                                if (err) throw err;
                                                if (data) {
                                                  return;
                                                } else {
                                                  try {
                                                    data = new PrequestPost({
                                                      claimed: false,
                                                      completed: false,
                                                      pid: targetID,
                                                      requestMessageID: reqID,
                                                      miniboss: true,
                                                      postedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
                                                      claimedAt: "",
                                                      completedAt: "",
                                                      approvedAt: "",
                                                      deniedAt: "",
                                                    });
                                                    data.save().catch(console.error);
                                                  } catch (Err) {
                                                    console.error(Err);
                                                  }
                                                }
                                              });

                                              await profileModel.findOneAndUpdate(
                                                { userID: targetID, postedPrequest: false },
                                                {
                                                  $set: {
                                                    postedPrequest: true,
                                                  },
                                                  $inc: {
                                                    hexacoins: -500,
                                                  },
                                                }
                                              );

                                              confirmationEmbed = new MessageEmbed()
                                                .setDescription(
                                                  `${message.guild.members.cache.get(
                                                    targetID
                                                  )} You have been charged **500** <:xytera:859531350385229825>\nYour post has been sent in <#844650142627004416>. \nBe sure to follow the rules above and to confirm the reputation request after you get help`
                                                )
                                                .setColor("#1ec45c");
                                              message.channel.send(confirmationEmbed);
                                            } else if (reaction.emoji.name === "🚫") {
                                              errorEmbed = new MessageEmbed().setDescription(`If there is something wrong with the post let <@535190610185945138> review it`).setColor("#1ec45c");
                                              message.channel.send(errorEmbed);
                                              return;
                                            }
                                          });
                                        })
                                        .catch((err) => {
                                          embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                          message.channel.send(embed);
                                          return;
                                        });
                                    } else {
                                      ErrorEmbed = new MessageEmbed()
                                        .setDescription(`${message.member.cache.get(targetID)}, You can't make a post if you don't agree to these rules`)
                                        .setColor("#0078d7");
                                      message.channel.send(ErrorEmbed);
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                    message.channel.send(embed);
                                    return;
                                  });
                              })
                              .catch(() => {
                                errorEmbed = new MessageEmbed()
                                  .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                  .setDescription(
                                    `${client.users.cache.get(
                                      targetID
                                    )}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                  )
                                  .setTimestamp()
                                  .setColor("#e91015")
                                  .setFooter(`${client.users.cache.get(targetID).tag}`, `${client.users.cache.get(targetID).displayAvatarURL({ dynamic: true })}`);
                                message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                              });
                          }
                          if (type === "mist-monsters") {
                            agreementEmbed = new MessageEmbed().setColor("#1ec45c").setTitle("PREQUEST CARRY REQUEST").setDescription("Let's complete your carry request!").addFields({
                              name: "__**AGREE TO THE RULES**__",
                              value: "💚 Tips are appreciated\n\n💚 Be patient! Help is guaranteed\n\n🛑 No help requests in DMs or Channels\n\n🛑 Do not pay for help",
                              inline: false,
                            });

                            message.channel
                              .send(agreementEmbed)
                              .then((msg) => {
                                msg.react("✅");
                                msg.react("🚫");

                                const filter = (reaction, user) => {
                                  return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === POSTERID;
                                };

                                msg
                                  .awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] })
                                  .then(async (collected) => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === "✅") {
                                      secondEmbed = new MessageEmbed()
                                        .setColor("#1ec45c")
                                        .setDescription("Awesome! Thank you for agreeing to the rules. As long as you follow the rules you'll have access to <#823318029542752266>");
                                      message.channel.send(secondEmbed);

                                      thirdEmbed = new MessageEmbed()
                                        .setColor("#1ec45c")
                                        .setTitle("MSK PREQUEST CARRY")
                                        .addFields({ name: "epicname", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true })
                                        .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png");
                                      message.channel.send(thirdEmbed);

                                      message.channel
                                        .send("Is this what you want to post?")
                                        .then((msg) => {
                                          msg.react("✅");
                                          msg.react("🚫");

                                          const filter = (reaction, user) => {
                                            return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === POSTERID;
                                          };

                                          msg.awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] }).then(async (collected) => {
                                            const reaction = collected.first();
                                            if (reaction.emoji.name === "✅") {
                                              minibossRequest = new MessageEmbed()
                                                .setTitle("MIST MONSTERS")
                                                .setColor("#0078d7")
                                                .addFields(
                                                  { name: "epic name", value: `${data.epic}`, inline: true },
                                                  { name: "power level", value: `${data.pl}`, inline: true },
                                                  { name: "Status", value: "Open" }
                                                )
                                                .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png")
                                                .setFooter(`🔵 claim | ❌ close`);

                                              header = `Posted by: ${message.guild.members.cache.get(targetID)}`;
                                              poster_id = targetID;

                                              request = await reqchan.send(header, minibossRequest);
                                              request.react("🔵");
                                              request.react("❌");
                                              reqID = request.id;

                                              const filter = (reaction, user) => {
                                                return ["✅", "🚫", "🔵", "❌"].includes(reaction.emoji.name) && user.id !== "814245954105507850";
                                              };

                                              request
                                                .awaitReactions(filter, { time: 3600000 })
                                                .then(async () => {
                                                  await PrequestPost.findOne({ requestMessageID: request.id }, async (err, data) => {
                                                    if (err) throw err;
                                                    if (data) {
                                                      if (data.claimed === true || data.completed === true) {
                                                        return;
                                                      } else {
                                                        await PrequestPost.deleteOne({
                                                          pid: targetID,
                                                          requestMessageID: request.id,
                                                        });

                                                        await profileModel.findOneAndUpdate({ userID: targetID, postedPrequest: true }, { $set: { postedPrequest: false }, $inc: { hexacoins: 500 } });
                                                        try {
                                                          await request.delete();
                                                        } catch {}

                                                        cancelationEmbed = new MessageEmbed()
                                                          .setColor("#1ec45c")
                                                          .setDescription(
                                                            `${message.guild.members.cache.get(
                                                              targetID
                                                            )}, Your post has expired and you have been refunded **500** <:xytera:859531350385229825>.\n You make a new post at <#851171690586570802>`
                                                          );
                                                        message.guild.members.cache.get(targetID).send(cancelationEmbed);
                                                      }
                                                    }
                                                  });
                                                })
                                                .catch();

                                              await PrequestPost.findOne({ pid: targetID }, async (err, data) => {
                                                if (err) throw err;
                                                if (data) {
                                                  return;
                                                } else {
                                                  try {
                                                    data = new PrequestPost({
                                                      claimed: false,
                                                      completed: false,
                                                      pid: targetID,
                                                      requestMessageID: reqID,
                                                      mistmonster: true,
                                                      postedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
                                                      claimedAt: "",
                                                      completedAt: "",
                                                      approvedAt: "",
                                                      deniedAt: "",
                                                    });
                                                    data.save().catch(console.error);
                                                  } catch (Err) {
                                                    console.error(Err);
                                                  }
                                                }
                                              });

                                              await profileModel.findOneAndUpdate(
                                                { userID: targetID, postedPrequest: false },
                                                {
                                                  $set: {
                                                    postedPrequest: true,
                                                  },
                                                  $inc: {
                                                    hexacoins: -500,
                                                  },
                                                }
                                              );

                                              confirmationEmbed = new MessageEmbed()
                                                .setDescription(
                                                  `${message.guild.members.cache.get(
                                                    targetID
                                                  )} You have been charged **500** <:xytera:859531350385229825>\nYour post has been sent in <#844650142627004416>. \nBe sure to follow the rules above and to confirm the reputation request after you get help`
                                                )
                                                .setColor("#1ec45c");
                                              message.channel.send(confirmationEmbed);
                                            } else if (reaction.emoji.name === "🚫") {
                                              errorEmbed = new MessageEmbed().setDescription(`If there is something wrong with the post let <@535190610185945138> review it`).setColor("#1ec45c");
                                              message.channel.send(errorEmbed);
                                              return;
                                            }
                                          });
                                        })
                                        .catch((err) => {
                                          embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                          message.channel.send(embed);
                                          return;
                                        });
                                    } else {
                                      ErrorEmbed = new MessageEmbed()
                                        .setDescription(`${message.member.cache.get(targetID)}, You can't make a post if you don't agree to these rules`)
                                        .setColor("#0078d7");
                                      message.channel.send(ErrorEmbed);
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                    message.channel.send(embed);
                                    return;
                                  });
                              })
                              .catch(() => {
                                errorEmbed = new MessageEmbed()
                                  .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                  .setDescription(
                                    `${client.users.cache.get(
                                      targetID
                                    )}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                  )
                                  .setTimestamp()
                                  .setColor("#e91015")
                                  .setFooter(`${client.users.cache.get(targetID).tag}`, `${client.users.cache.get(targetID).displayAvatarURL({ dynamic: true })}`);
                                message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                              });
                          }
                          if (type === "storm-chest") {
                            agreementEmbed = new MessageEmbed().setColor("#1ec45c").setTitle("PREQUEST CARRY REQUEST").setDescription("Let's complete your carry request!").addFields({
                              name: "__**AGREE TO THE RULES**__",
                              value: "💚 Tips are appreciated\n\n💚 Be patient! Help is guaranteed\n\n🛑 No help requests in DMs or Channels\n\n🛑 Do not pay for help",
                              inline: false,
                            });

                            message.channel
                              .send(agreementEmbed)
                              .then((msg) => {
                                msg.react("✅");
                                msg.react("🚫");

                                const filter = (reaction, user) => {
                                  return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === POSTERID;
                                };

                                msg
                                  .awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] })
                                  .then(async (collected) => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === "✅") {
                                      secondEmbed = new MessageEmbed()
                                        .setColor("#1ec45c")
                                        .setDescription("Awesome! Thank you for agreeing to the rules. As long as you follow the rules you'll have access to <#823318029542752266>");
                                      message.channel.send(secondEmbed);

                                      thirdEmbed = new MessageEmbed()
                                        .setColor("#1ec45c")
                                        .setTitle("MSK PREQUEST CARRY")
                                        .addFields({ name: "epicname", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true })
                                        .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png");
                                      message.channel.send(thirdEmbed);

                                      message.channel
                                        .send("Is this what you want to post?")
                                        .then((msg) => {
                                          msg.react("✅");
                                          msg.react("🚫");

                                          const filter = (reaction, user) => {
                                            return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === POSTERID;
                                          };

                                          msg.awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] }).then(async (collected) => {
                                            const reaction = collected.first();
                                            if (reaction.emoji.name === "✅") {
                                              minibossRequest = new MessageEmbed()
                                                .setTitle("STORM CHEST")
                                                .setColor("#0078d7")
                                                .addFields(
                                                  { name: "epic name", value: `${data.epic}`, inline: true },
                                                  { name: "power level", value: `${data.pl}`, inline: true },
                                                  { name: "Status", value: "Open" }
                                                )
                                                .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png")
                                                .setFooter(`🔵 claim | ❌ close`);

                                              header = `Posted by: ${message.guild.members.cache.get(targetID)}`;
                                              poster_id = targetID;

                                              request = await reqchan.send(header, minibossRequest);
                                              request.react("🔵");
                                              request.react("❌");
                                              reqID = request.id;

                                              const filter = (reaction, user) => {
                                                return ["✅", "🚫", "🔵", "❌"].includes(reaction.emoji.name) && user.id !== "814245954105507850";
                                              };

                                              request
                                                .awaitReactions(filter, { time: 3600000 })
                                                .then(async () => {
                                                  await PrequestPost.findOne({ requestMessageID: request.id }, async (err, data) => {
                                                    if (err) throw err;
                                                    if (data) {
                                                      if (data.claimed === true || data.completed === true) {
                                                        return;
                                                      } else {
                                                        await PrequestPost.deleteOne({
                                                          pid: targetID,
                                                          requestMessageID: request.id,
                                                        });

                                                        await profileModel.findOneAndUpdate({ userID: targetID, postedPrequest: true }, { $set: { postedPrequest: false }, $inc: { hexacoins: 500 } });
                                                        try {
                                                          await request.delete();
                                                        } catch {}

                                                        cancelationEmbed = new MessageEmbed()
                                                          .setColor("#1ec45c")
                                                          .setDescription(
                                                            `${message.guild.members.cache.get(
                                                              targetID
                                                            )}, Your post has expired and you have been refunded **500** <:xytera:859531350385229825>.\n You make a new post at <#851171690586570802>`
                                                          );
                                                        message.guild.members.cache.get(targetID).send(cancelationEmbed);
                                                      }
                                                    }
                                                  });
                                                })
                                                .catch();

                                              await PrequestPost.findOne({ pid: targetID }, async (err, data) => {
                                                if (err) throw err;
                                                if (data) {
                                                  return;
                                                } else {
                                                  try {
                                                    data = new PrequestPost({
                                                      claimed: false,
                                                      completed: false,
                                                      pid: targetID,
                                                      requestMessageID: reqID,
                                                      sc: true,
                                                      postedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
                                                      claimedAt: "",
                                                      completedAt: "",
                                                      approvedAt: "",
                                                      deniedAt: "",
                                                    });
                                                    data.save().catch(console.error);
                                                  } catch (Err) {
                                                    console.error(Err);
                                                  }
                                                }
                                              });

                                              await profileModel.findOneAndUpdate(
                                                { userID: targetID, postedPrequest: false },
                                                {
                                                  $set: {
                                                    postedPrequest: true,
                                                  },
                                                  $inc: {
                                                    hexacoins: -500,
                                                  },
                                                }
                                              );

                                              confirmationEmbed = new MessageEmbed()
                                                .setDescription(
                                                  `${message.guild.members.cache.get(
                                                    targetID
                                                  )} You have been charged **500** <:xytera:859531350385229825>\nYour post has been sent in <#844650142627004416>. \nBe sure to follow the rules above and to confirm the reputation request after you get help`
                                                )
                                                .setColor("#1ec45c");
                                              message.channel.send(confirmationEmbed);
                                            } else if (reaction.emoji.name === "🚫") {
                                              errorEmbed = new MessageEmbed().setDescription(`If there is something wrong with the post let <@535190610185945138> review it`).setColor("#1ec45c");
                                              message.channel.send(errorEmbed);
                                              return;
                                            }
                                          });
                                        })
                                        .catch((err) => {
                                          embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                          message.channel.send(embed);
                                          return;
                                        });
                                    } else {
                                      ErrorEmbed = new MessageEmbed()
                                        .setDescription(`${message.member.cache.get(targetID)}, You can't make a post if you don't agree to these rules`)
                                        .setColor("#0078d7");
                                      message.channel.send(ErrorEmbed);
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                    message.channel.send(embed);
                                    return;
                                  });
                              })
                              .catch(() => {
                                errorEmbed = new MessageEmbed()
                                  .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                  .setDescription(
                                    `${client.users.cache.get(
                                      targetID
                                    )}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                  )
                                  .setTimestamp()
                                  .setColor("#e91015")
                                  .setFooter(`${client.users.cache.get(targetID).tag}`, `${client.users.cache.get(targetID).displayAvatarURL({ dynamic: true })}`);
                                message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                              });
                          }
                          if (type === "elementals") {
                            agreementEmbed = new MessageEmbed().setColor("#1ec45c").setTitle("PREQUEST CARRY REQUEST").setDescription("Let's complete your carry request!").addFields({
                              name: "__**AGREE TO THE RULES**__",
                              value: "💚 Tips are appreciated\n\n💚 Be patient! Help is guaranteed\n\n🛑 No help requests in DMs or Channels\n\n🛑 Do not pay for help",
                              inline: false,
                            });

                            message.channel
                              .send(agreementEmbed)
                              .then((msg) => {
                                msg.react("✅");
                                msg.react("🚫");

                                const filter = (reaction, user) => {
                                  return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === POSTERID;
                                };

                                msg
                                  .awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] })
                                  .then(async (collected) => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === "✅") {
                                      secondEmbed = new MessageEmbed()
                                        .setColor("#1ec45c")
                                        .setDescription("Awesome! Thank you for agreeing to the rules. As long as you follow the rules you'll have access to <#823318029542752266>");
                                      message.channel.send(secondEmbed);

                                      thirdEmbed = new MessageEmbed()
                                        .setColor("#1ec45c")
                                        .setTitle("MSK PREQUEST CARRY")
                                        .addFields({ name: "epicname", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true })
                                        .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png");
                                      message.channel.send(thirdEmbed);

                                      message.channel
                                        .send("Is this what you want to post?")
                                        .then((msg) => {
                                          msg.react("✅");
                                          msg.react("🚫");

                                          const filter = (reaction, user) => {
                                            return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === POSTERID;
                                          };

                                          msg.awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] }).then(async (collected) => {
                                            const reaction = collected.first();
                                            if (reaction.emoji.name === "✅") {
                                              minibossRequest = new MessageEmbed()
                                                .setTitle("ELEMENTALS")
                                                .setColor("#0078d7")
                                                .addFields(
                                                  { name: "epic name", value: `${data.epic}`, inline: true },
                                                  { name: "power level", value: `${data.pl}`, inline: true },
                                                  { name: "Status", value: "Open" }
                                                )
                                                .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png")
                                                .setFooter(`🔵 claim | ❌ close`);

                                              header = `Posted by: ${message.guild.members.cache.get(targetID)}`;
                                              poster_id = targetID;

                                              request = await reqchan.send(header, minibossRequest);
                                              request.react("🔵");
                                              request.react("❌");
                                              reqID = request.id;

                                              const filter = (reaction, user) => {
                                                return ["✅", "🚫", "🔵", "❌"].includes(reaction.emoji.name) && user.id !== "814245954105507850";
                                              };

                                              request
                                                .awaitReactions(filter, { time: 3600000 })
                                                .then(async () => {
                                                  await PrequestPost.findOne({ requestMessageID: request.id }, async (err, data) => {
                                                    if (err) throw err;
                                                    if (data) {
                                                      if (data.claimed === true || data.completed === true) {
                                                        return;
                                                      } else {
                                                        await PrequestPost.deleteOne({
                                                          pid: targetID,
                                                          requestMessageID: request.id,
                                                        });

                                                        await profileModel.findOneAndUpdate({ userID: targetID, postedPrequest: true }, { $set: { postedPrequest: false }, $inc: { hexacoins: 500 } });
                                                        try {
                                                          await request.delete();
                                                        } catch {}

                                                        cancelationEmbed = new MessageEmbed()
                                                          .setColor("#1ec45c")
                                                          .setDescription(
                                                            `${message.guild.members.cache.get(
                                                              targetID
                                                            )}, Your post has expired and you have been refunded **500** <:xytera:859531350385229825>.\n You make a new post at <#851171690586570802>`
                                                          );
                                                        message.guild.members.cache.get(targetID).send(cancelationEmbed);
                                                      }
                                                    }
                                                  });
                                                })
                                                .catch();

                                              await PrequestPost.findOne({ pid: targetID }, async (err, data) => {
                                                if (err) throw err;
                                                if (data) {
                                                  return;
                                                } else {
                                                  try {
                                                    data = new PrequestPost({
                                                      claimed: false,
                                                      completed: false,
                                                      pid: targetID,
                                                      requestMessageID: reqID,
                                                      elemental: true,
                                                      postedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
                                                      claimedAt: "",
                                                      completedAt: "",
                                                      approvedAt: "",
                                                      deniedAt: "",
                                                    });
                                                    data.save().catch(console.error);
                                                  } catch (Err) {
                                                    console.error(Err);
                                                  }
                                                }
                                              });

                                              await profileModel.findOneAndUpdate(
                                                { userID: targetID, postedPrequest: false },
                                                {
                                                  $set: {
                                                    postedPrequest: true,
                                                  },
                                                  $inc: {
                                                    hexacoins: -500,
                                                  },
                                                }
                                              );

                                              confirmationEmbed = new MessageEmbed()
                                                .setDescription(
                                                  `${message.guild.members.cache.get(
                                                    targetID
                                                  )} You have been charged **500** <:xytera:859531350385229825>\nYour post has been sent in <#844650142627004416>. \nBe sure to follow the rules above and to confirm the reputation request after you get help`
                                                )
                                                .setColor("#1ec45c");
                                              message.channel.send(confirmationEmbed);
                                            } else if (reaction.emoji.name === "🚫") {
                                              errorEmbed = new MessageEmbed().setDescription(`If there is something wrong with the post let <@535190610185945138> review it`).setColor("#1ec45c");
                                              message.channel.send(errorEmbed);
                                              return;
                                            }
                                          });
                                        })
                                        .catch((err) => {
                                          embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                          message.channel.send(embed);
                                          return;
                                        });
                                    } else {
                                      ErrorEmbed = new MessageEmbed()
                                        .setDescription(`${message.member.cache.get(targetID)}, You can't make a post if you don't agree to these rules`)
                                        .setColor("#0078d7");
                                      message.channel.send(ErrorEmbed);
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                    message.channel.send(embed);
                                    return;
                                  });
                              })
                              .catch(() => {
                                errorEmbed = new MessageEmbed()
                                  .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                  .setDescription(
                                    `${client.users.cache.get(
                                      targetID
                                    )}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                  )
                                  .setTimestamp()
                                  .setColor("#e91015")
                                  .setFooter(`${client.users.cache.get(targetID).tag}`, `${client.users.cache.get(targetID).displayAvatarURL({ dynamic: true })}`);
                                message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                              });
                          }
                          if (type === "survivors") {
                            agreementEmbed = new MessageEmbed().setColor("#1ec45c").setTitle("PREQUEST CARRY REQUEST").setDescription("Let's complete your carry request!").addFields({
                              name: "__**AGREE TO THE RULES**__",
                              value: "💚 Tips are appreciated\n\n💚 Be patient! Help is guaranteed\n\n🛑 No help requests in DMs or Channels\n\n🛑 Do not pay for help",
                              inline: false,
                            });

                            message.channel
                              .send(agreementEmbed)
                              .then((msg) => {
                                msg.react("✅");
                                msg.react("🚫");

                                const filter = (reaction, user) => {
                                  return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === POSTERID;
                                };

                                msg
                                  .awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] })
                                  .then(async (collected) => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === "✅") {
                                      secondEmbed = new MessageEmbed()
                                        .setColor("#1ec45c")
                                        .setDescription("Awesome! Thank you for agreeing to the rules. As long as you follow the rules you'll have access to <#823318029542752266>");
                                      message.channel.send(secondEmbed);

                                      thirdEmbed = new MessageEmbed()
                                        .setColor("#1ec45c")
                                        .setTitle("MSK PREQUEST CARRY")
                                        .addFields({ name: "epicname", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true })
                                        .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png");
                                      message.channel.send(thirdEmbed);

                                      message.channel
                                        .send("Is this what you want to post?")
                                        .then((msg) => {
                                          msg.react("✅");
                                          msg.react("🚫");

                                          const filter = (reaction, user) => {
                                            return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === POSTERID;
                                          };

                                          msg.awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] }).then(async (collected) => {
                                            const reaction = collected.first();
                                            if (reaction.emoji.name === "✅") {
                                              minibossRequest = new MessageEmbed()
                                                .setTitle("SURVIVORS")
                                                .setColor("#0078d7")
                                                .addFields(
                                                  { name: "epic name", value: `${data.epic}`, inline: true },
                                                  { name: "power level", value: `${data.pl}`, inline: true },
                                                  { name: "Status", value: "Open" }
                                                )
                                                .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png")
                                                .setFooter(`🔵 claim | ❌ close`);

                                              header = `Posted by: ${message.guild.members.cache.get(targetID)}`;
                                              poster_id = targetID;

                                              request = await reqchan.send(header, minibossRequest);
                                              request.react("🔵");
                                              request.react("❌");
                                              reqID = request.id;

                                              const filter = (reaction, user) => {
                                                return ["✅", "🚫", "🔵", "❌"].includes(reaction.emoji.name) && user.id !== "814245954105507850";
                                              };

                                              request
                                                .awaitReactions(filter, { time: 3600000 })
                                                .then(async () => {
                                                  await PrequestPost.findOne({ requestMessageID: request.id }, async (err, data) => {
                                                    if (err) throw err;
                                                    if (data) {
                                                      if (data.claimed === true || data.completed === true) {
                                                        return;
                                                      } else {
                                                        await PrequestPost.deleteOne({
                                                          pid: targetID,
                                                          requestMessageID: request.id,
                                                        });

                                                        await profileModel.findOneAndUpdate({ userID: targetID, postedPrequest: true }, { $set: { postedPrequest: false }, $inc: { hexacoins: 500 } });
                                                        try {
                                                          await request.delete();
                                                        } catch {}

                                                        cancelationEmbed = new MessageEmbed()
                                                          .setColor("#1ec45c")
                                                          .setDescription(
                                                            `${message.guild.members.cache.get(
                                                              targetID
                                                            )}, Your post has expired and you have been refunded **500** <:xytera:859531350385229825>.\n You make a new post at <#851171690586570802>`
                                                          );
                                                        message.guild.members.cache.get(targetID).send(cancelationEmbed);
                                                      }
                                                    }
                                                  });
                                                })
                                                .catch();

                                              await PrequestPost.findOne({ pid: targetID }, async (err, data) => {
                                                if (err) throw err;
                                                if (data) {
                                                  return;
                                                } else {
                                                  try {
                                                    data = new PrequestPost({
                                                      claimed: false,
                                                      completed: false,
                                                      pid: targetID,
                                                      requestMessageID: reqID,
                                                      survivor: true,
                                                      postedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
                                                      claimedAt: "",
                                                      completedAt: "",
                                                      approvedAt: "",
                                                      deniedAt: "",
                                                    });
                                                    data.save().catch(console.error);
                                                  } catch (Err) {
                                                    console.error(Err);
                                                  }
                                                }
                                              });

                                              await profileModel.findOneAndUpdate(
                                                { userID: targetID, postedPrequest: false },
                                                {
                                                  $set: {
                                                    postedPrequest: true,
                                                  },
                                                  $inc: {
                                                    hexacoins: -500,
                                                  },
                                                }
                                              );

                                              confirmationEmbed = new MessageEmbed()
                                                .setDescription(
                                                  `${message.guild.members.cache.get(
                                                    targetID
                                                  )} You have been charged **500** <:xytera:859531350385229825>\nYour post has been sent in <#844650142627004416>. \nBe sure to follow the rules above and to confirm the reputation request after you get help`
                                                )
                                                .setColor("#1ec45c");
                                              message.channel.send(confirmationEmbed);
                                            } else if (reaction.emoji.name === "🚫") {
                                              errorEmbed = new MessageEmbed().setDescription(`If there is something wrong with the post let <@535190610185945138> review it`).setColor("#1ec45c");
                                              message.channel.send(errorEmbed);
                                              return;
                                            }
                                          });
                                        })
                                        .catch((err) => {
                                          embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                          message.channel.send(embed);
                                          return;
                                        });
                                    } else {
                                      ErrorEmbed = new MessageEmbed()
                                        .setDescription(`${message.member.cache.get(targetID)}, You can't make a post if you don't agree to these rules`)
                                        .setColor("#0078d7");
                                      message.channel.send(ErrorEmbed);
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                    message.channel.send(embed);
                                    return;
                                  });
                              })
                              .catch(() => {
                                errorEmbed = new MessageEmbed()
                                  .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                  .setDescription(
                                    `${client.users.cache.get(
                                      targetID
                                    )}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                  )
                                  .setTimestamp()
                                  .setColor("#e91015")
                                  .setFooter(`${client.users.cache.get(targetID).tag}`, `${client.users.cache.get(targetID).displayAvatarURL({ dynamic: true })}`);
                                message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                              });
                          }
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  },
};
