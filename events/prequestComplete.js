const { MessageAttachment, MessageEmbed } = require("discord.js");
const { client } = require("../index");
const blIDs = require("../models/lfgBlacklist");
const PrequestPost = require("../models/PrequestPost");
const profileModel = require("../models/profileSchema");
const fs = require("fs");
const moment = require("moment");
let IDs = [];

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild || user.bot) return;

  let reqchan = reaction.message.guild.channels.cache.find((c) => c.id == "844650142627004416");
  let prequestTranscript = reaction.message.guild.channels.cache.find((c) => c.id == "852636347521040405");
  let prequestLogs = reaction.message.guild.channels.cache.find((c) => c.id == "839151192004231228");

  if (reaction.message.channel.id === reqchan.id) {
    PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        userGuildMember = reaction.message.guild.members.cache.get(data.pid);
        reqMessageID = data.requestMessageID;
        posterID = data.pid;
        carryUsername = client.users.cache.get(data.pid).username;
        header = `Posted by: ${client.users.cache.get(data.pid)}`;
        poster = client.users.cache.get(data.pid);
        let link = "";

        if (data.miniboss === true) {
          link = "https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png";
        } else if (data.survivor === true) {
          link = "https://cdn.discordapp.com/attachments/845954962277531648/845956429974339624/survivors.png";
        } else if (data.mistmonster === true) {
          link = "https://cdn.discordapp.com/attachments/845954962277531648/845956340320305152/mist-monster.png";
        } else if (data.sc === true) {
          link = "https://cdn.discordapp.com/attachments/845954962277531648/845956408465162250/sc.png";
        } else if (data.elemental === true) {
          link = "https://cdn.discordapp.com/attachments/845954962277531648/845956386604974110/elemental-husks.png";
        }

        await profileModel.findOne({ userID: data.pid }, async (err, data) => {
          if (err) throw err;
          if (data) {
            EPIC = data.epic;
            PL = data.pl;
            //COMPLETING THE POST AS USUAL
            if (reaction.emoji.name === "✅") {
              //finding the post
              await PrequestPost.findOne({ claimerID: user.id, requestMessageID: reaction.message.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                  //if the post is claimed and not completed yet
                  if (data.claimed === true && data.completed === false) {
                    try {
                      reaction.users.remove(user.id);
                    } catch (err) {
                      console.log(err);
                    }
                    await PrequestPost.findOne({ claimerID: user.id, requestMessageID: reaction.message.id }, async (err, data) => {
                      if (err) throw err;
                      if (data) {
                        claimerID = data.claimerID;
                        //first filter to see the mentions making sure it is a message from claimer
                        const filter = (response) => {
                          return response.author.id === claimerID;
                        };
                        //sending an exaplainatory message
                        const firstMSG = await reqchan.send(`${user}, you're awesome! **In one message** tag teammates who assisted you or say \`none\``);
                        reqchan
                          .awaitMessages(filter, { max: 1, time: 15 * 1000, errors: ["time"] })
                          .then(async (collected) => {
                            //This part is for coolecting IDs of carriers and editing the header and updating the profileModel and PrequestPost
                            IDs[0] = user.id;
                            //Inserting the IDs or the carriers into this array of ids (IDs)
                            collected.first().mentions.users.forEach(async (user) => {
                              IDs.push(user.id);
                            });

                            content = collected.first().content.toLowerCase();

                            if (content === "none") {
                              IDs[0] = user.id;
                            }

                            //deleting the Message that the claimer sent
                            await reqchan.messages.fetch(collected.first().id).then((msg) => msg.delete());

                            //if there is two carriers
                            if (IDs.length === 2) {
                              if (IDs[1] === posterID || IDs[1] === claimerID) {
                                IDs = [];
                                firstMSG.delete();
                                msg = reaction.message.channel.send("You can't mention the carry or yourself").then((msg) => {
                                  setTimeout(() => {
                                    msg.delete();
                                  }, 2000);
                                });
                                return;
                              }
                            }

                            //If there is three carriers
                            if (IDs.length === 3) {
                              //Validation for not mentioning the carry or the poster
                              if (IDs[1] === posterID || IDs[2] === posterID || IDs[1] === claimerID || IDs[2] === claimerID) {
                                IDs = [];
                                firstMSG.delete();
                                msg = reaction.message.channel.send("You can't mention the carry or yourself").then((msg) => {
                                  setTimeout(() => {
                                    msg.delete();
                                  }, 2000);
                                });
                                return;
                              }
                              //validation for not mentioning the same user twice
                              if (IDs[1] === IDs[2]) {
                                IDs = [];
                                firstMSG.delete();
                                msg = reaction.message.channel.send("You can't mention the same user twice").then((msg) => {
                                  setTimeout(() => {
                                    msg.delete();
                                  }, 2000);
                                });
                                return;
                              }
                            } else if (IDs.length > 3) {
                              IDs = [];
                              firstMSG.delete();
                              msg = reaction.message.channel.send("You can mention maximum of two users at a time").then((msg) => {
                                setTimeout(() => {
                                  msg.delete();
                                }, 2000);
                              });
                              return;
                            }

                            try {
                              //Deleting the exaplainatory message
                              firstMSG.delete();
                              reaction.message.reactions.resolve("✅").users.remove(client.id);
                              reaction.message.reactions.resolve("🔵").users.remove(client.id);
                              reaction.users.remove(user.id);
                            } catch (err) {
                              console.log(err, "line 410");
                            }

                            //change the post Embed for the completed stage
                            edited = new MessageEmbed()
                              .setColor("#1ec45c")
                              .addFields({ name: "epic name", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true }, { name: "Status", value: "Completed" })
                              .setFooter("✅ approve |🚫 deny")
                              .setThumbnail(link);

                            //Finding the appropriate Header for the Embed depending on how many carriers were involved
                            if (IDs.length === 1) {
                              user1 = client.users.cache.get(IDs[0]);
                              reaction.message.edit(header + ` | Completed by: ${user1}\n`, edited);
                            }
                            if (IDs.length === 2) {
                              user1 = client.users.cache.get(IDs[0]);
                              user2 = client.users.cache.get(IDs[1]);
                              reaction.message.edit(header + ` | Completed by: ${user1} ${user2}\n`, edited);
                            }
                            if (IDs.length === 3) {
                              user1 = client.users.cache.get(IDs[0]);
                              user2 = client.users.cache.get(IDs[1]);
                              user3 = client.users.cache.get(IDs[2]);
                              reaction.message.edit(header + ` | Completed by: ${user1} ${user2} ${user3}\n`, edited);
                            }

                            //updating information that the post is completed and at what time
                            await PrequestPost.findOneAndUpdate({ requestMessageID: reqMessageID }, { $set: { completed: true, completedAt: moment().format("MMMM Do YYYY, h:mm:ss a") } });

                            let confirmEmbed;
                            let appreciationEmbed;

                            if (IDs.length === 1) {
                              user1 = await client.users.cache.get(IDs[0]);
                              // user1Data = await profileModel.findOne({ userID: user1.id });
                              // epic1 = user1Data.epic;
                              confirmEmbed = new MessageEmbed()
                                .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                .setColor("#0f0f0f")
                                .setTitle("MSK PREQUEST CARRY")
                                .setDescription(`Hi **${poster.username}**, did **${user1}** Help you to do your MSK Prequest?`);
                              appreciationEmbed = new MessageEmbed()
                                .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                .setColor("#1ec45c")
                                .setTitle("💐 APPRECIATION 💐")
                                .setDescription(`Congratualtions on doing your MSK Prequest! Be sure to show some <#862468531747815434> to **${user1}** for the help!`);
                            }
                            if (IDs.length === 2) {
                              user1 = await client.users.cache.get(IDs[0]);
                              user2 = await client.users.cache.get(IDs[1]);
                              // user1Data = await profileModel.findOne({ userID: user1.id });
                              // user1Data = await profileModel.findOne({ userID: user2.id });
                              // epic1 = user1Data.epic;
                              // epic2 = user2Data.epic;

                              // console.log(epic1,epic2)
                              confirmEmbed = new MessageEmbed()
                                .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                .setColor("#0f0f0f")
                                .setTitle("MSK PREQUEST CARRY")
                                .setDescription(`Hi **${poster.username}**, did **${user1}** and **${user2}** Help you to do your MSK Prequest?`);
                              appreciationEmbed = new MessageEmbed()
                                .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                .setColor("#1ec45c")
                                .setTitle("💐 APPRECIATION 💐")
                                .setDescription(
                                  `Congratualtions on doing your MSK Prequest! Be sure to show some <#862468531747815434> to **${user1.username}** and **${user2.username}** for the help!`
                                );
                            }
                            if (IDs.length === 3) {
                              user1 = await client.users.cache.get(IDs[0]);
                              user2 = await client.users.cache.get(IDs[1]);
                              user3 = await client.users.cache.get(IDs[2]);
                              // user1Data = await profileModel.findOne({ userID: user1.id })
                              // user1Data = await profileModel.findOne({ userID: user2.id })
                              // user1Data = await profileModel.findOne({ userID: user3.id })
                              // epic1 = user1Data.epic
                              // epic2 = user2Data.epic
                              // epic3 = user3Data.epic
                              confirmEmbed = new MessageEmbed()
                                .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                .setColor("#0f0f0f")
                                .setTitle("MSK PREQUEST CARRY")
                                .setDescription(`Hi ${poster.username}, did **${user1}**, **${user2}** and **${user3}** Help you to do your MSK Prequest?`);
                              appreciationEmbed = new MessageEmbed()
                                .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                .setColor("#1ec45c")
                                .setTitle("💐 APPRECIATION 💐")
                                .setDescription(
                                  `Congratualtions on doing your MSK Prequest! Be sure to show some <#862468531747815434> to **${user1.username}**, **${user2.username}** and **${user3.username}** for the help!`
                                );
                            }
                            await poster
                              .send(confirmEmbed)
                              .catch((err) => {
                                console.error(err);
                                console.log(err);
                              })
                              .then(async (msg) => {
                                msg.react("✅");
                                msg.react("🚫");

                                //A filter to check and wait for a Reaction from the Poster which last 5 minutes
                                const filter = (reaction, user) => {
                                  return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === posterID;
                                };

                                msg
                                  .awaitReactions(filter, { max: 1, time: 5 * 60 * 1000 , errors: ["time"] })
                                  .then(async (collected) => {
                                    const result = collected.first();
                                    //The ID of the person who is reacting to the message
                                    const theUserID = collected.first().users.cache.last().id;
                                    //if the person responded within 5 minutes with the check mark
                                    if (result.emoji.name === "✅") {
                                      //finding the post
                                      try {
                                        msg.delete().catch((err) => console.error(err, "line 524"));
                                      } catch {}

                                      await poster.send(appreciationEmbed).catch((err) => console.error(err));

                                      await PrequestPost.findOne({ pid: theUserID, requestMessageID: reqMessageID }, async (err, data) => {
                                        if (err) throw err;
                                        if (data) {
                                          //checking that the person who is reacting with the check mark is the poster
                                          if (data.completed === true && data.claimed === true) {
                                            await PrequestPost.findOne({ pid: theUserID, requestMessageID: reqMessageID }, async (err, data) => {
                                              if (err) throw err;
                                              if (data) {
                                                //looping through each carrier
                                                for (let i = 0; i < IDs.length; i++) {
                                                  //adding rep for each helper
                                                  await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { STWCarries: 1 } });

                                                  await profileModel.findOne({ userID: IDs[i] }, async (err, data) => {
                                                    if (err) throw err;
                                                    if (data) {
                                                      if (data.STWCarries === 25) {
                                                        reaction.message.guild.members.cache.get(IDs[i]).roles.remove("862085968861200394");
                                                        reaction.message.guild.members.cache.get(IDs[i]).roles.add("862086114088058910");
                                                        target = client.users.cache.get(IDs[i]);
                                                        await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { hexacoins: 2500 } });
                                                        data = await profileModel.findOne({ userID: IDs[i] });
                                                        Embed = new MessageEmbed()
                                                          .setTitle(`🎉Congratulation on \`25\` STW Carries🎉`)
                                                          .setDescription("You have been paid `2500` <:xytera:859531350385229825> for STW Rep Level 1")
                                                          .setColor("#f1c40f")
                                                          .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
                                                          .addFields(
                                                            {
                                                              name: "Balance",
                                                              value: `${data.hexacoins} <:xytera:859531350385229825>`,
                                                            },
                                                            {
                                                              name: "Bank",
                                                              value: `${data.bank} <:xytera:859531350385229825>`,
                                                            }
                                                          )
                                                          .setTimestamp()
                                                          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
                                                        target.send(Embed);
                                                      }
                                                      if (data.STWCarries === 100) {
                                                        reaction.message.guild.members.cache.get(IDs[i]).roles.remove("862086114088058910");
                                                        reaction.message.guild.members.cache.get(IDs[i]).roles.add("862084101539364924");
                                                        target = client.users.cache.get(IDs[i]);
                                                        await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { hexacoins: 10000 } });
                                                        data = await profileModel.findOne({ userID: IDs[i] });
                                                        Embed = new MessageEmbed()
                                                          .setTitle(`🎉Congratulation on \`100\` STW Carries🎉`)
                                                          .setDescription("You have been paid `10000` <:xytera:859531350385229825> for STW Rep Level 2")
                                                          .setColor("#f1c40f")
                                                          .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
                                                          .addFields(
                                                            {
                                                              name: "Balance",
                                                              value: `${data.hexacoins} <:xytera:859531350385229825>`,
                                                            },
                                                            {
                                                              name: "Bank",
                                                              value: `${data.bank} <:xytera:859531350385229825>`,
                                                            }
                                                          )
                                                          .setTimestamp()
                                                          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
                                                        target.send(Embed);
                                                      }
                                                      if (data.STWCarries === 250) {
                                                        reaction.message.guild.members.cache.get(IDs[i]).roles.remove("862084101539364924");
                                                        reaction.message.guild.members.cache.get(IDs[i]).roles.add("862086346759864371");
                                                        target = client.users.cache.get(IDs[i]);
                                                        await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { hexacoins: 25000 } });
                                                        data = await profileModel.findOne({ userID: IDs[i] });
                                                        Embed = new MessageEmbed()
                                                          .setTitle(`🎉Congratulation on \`250\` STW Carries🎉`)
                                                          .setDescription("You have been paid `25000` <:xytera:859531350385229825> for STW Rep Level 3")
                                                          .setColor("#f1c40f")
                                                          .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
                                                          .addFields(
                                                            {
                                                              name: "Balance",
                                                              value: `${data.hexacoins} <:xytera:859531350385229825>`,
                                                            },
                                                            {
                                                              name: "Bank",
                                                              value: `${data.bank} <:xytera:859531350385229825>`,
                                                            }
                                                          )
                                                          .setTimestamp()
                                                          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
                                                        target.send(Embed);
                                                      }
                                                      if (data.STWCarries === 500) {
                                                        reaction.message.guild.members.cache.get(IDs[i]).roles.remove("862086346759864371");
                                                        reaction.message.guild.members.cache.get(IDs[i]).roles.add("862086473392848906");
                                                        target = client.users.cache.get(IDs[i]);
                                                        await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { hexacoins: 50000 } });
                                                        data = await profileModel.findOne({ userID: IDs[i] });
                                                        Embed = new MessageEmbed()
                                                          .setTitle(`🎉Congratulation on \`500\` STW Carries🎉`)
                                                          .setDescription("You have been paid `50000` <:xytera:859531350385229825> for STW Rep Level 4")
                                                          .setColor("#f1c40f")
                                                          .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
                                                          .addFields(
                                                            {
                                                              name: "Balance",
                                                              value: `${data.hexacoins} <:xytera:859531350385229825>`,
                                                            },
                                                            {
                                                              name: "Bank",
                                                              value: `${data.bank} <:xytera:859531350385229825>`,
                                                            }
                                                          )
                                                          .setTimestamp()
                                                          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
                                                        target.send(Embed);
                                                      }
                                                      if (data.STWCarries === 1000) {
                                                        reaction.message.guild.members.cache.get(IDs[i]).roles.remove("862086473392848906");
                                                        reaction.message.guild.members.cache.get(IDs[i]).roles.add("862086564212506644");
                                                        target = client.users.cache.get(IDs[i]);
                                                        await profileModel.findOneAndUpdate({ userID: IDs[i] }, { $inc: { hexacoins: 100000 } });
                                                        data = await profileModel.findOne({ userID: IDs[i] });
                                                        Embed = new MessageEmbed()
                                                          .setTitle(`🎉Congratulation on \`1000\` STW Carries🎉`)
                                                          .setDescription("You have been paid `100000` <:xytera:859531350385229825> for STW Rep Level 5")
                                                          .setColor("#f1c40f")
                                                          .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
                                                          .addFields(
                                                            {
                                                              name: "Balance",
                                                              value: `${data.hexacoins} <:xytera:859531350385229825>`,
                                                            },
                                                            {
                                                              name: "Bank",
                                                              value: `${data.bank} <:xytera:859531350385229825>`,
                                                            }
                                                          )
                                                          .setTimestamp()
                                                          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
                                                        target.send(Embed);
                                                      }
                                                    }
                                                  });

                                                  //sending greeting message for each carrier
                                                  await profileModel.findOne({ userID: IDs[i] }, async (err, data) => {
                                                    if (err) throw err;
                                                    if (data) {
                                                      carriesCount = data.STWCarries;
                                                      client.users
                                                        .fetch(IDs[i])
                                                        .then(async (user) => {
                                                          embed = new MessageEmbed()
                                                            .setColor("#1ec45c")
                                                            .setDescription(`You received reputation for helping **${carryUsername}** doing their MSK prequest | Lifetime: **${carriesCount}**`);
                                                          await user.send(embed).catch();
                                                        })
                                                        .catch((err) => console.log(err));
                                                    }
                                                  });
                                                }

                                                //updating Time of APPROVED AT
                                                await PrequestPost.findOneAndUpdate(
                                                  { pid: theUserID, requestMessageID: reqMessageID },
                                                  { $set: { approvedAt: moment().format("MMMM Do YYYY, h:mm:ss a") } },
                                                  { $set: { muted: false } }
                                                );

                                                //getting the name/ (user objects) of the carrier that helped and storing them in a string
                                                let finalString;
                                                if (IDs.length === 3) {
                                                  finalString = `${client.users.cache.get(IDs[0])} ${client.users.cache.get(IDs[1])} ${client.users.cache.get(IDs[2])}`;
                                                } else if (IDs.length === 2) {
                                                  finalString = `${client.users.cache.get(IDs[0])} ${client.users.cache.get(IDs[1])}`;
                                                } else {
                                                  finalString = `${client.users.cache.get(IDs[0])}`;
                                                }
                                                //Sending the final Information as an Embed
                                                finalInfoEmbed = new MessageEmbed()
                                                  .setTitle("COMPLETION OF A PREQUEST CARRY")
                                                  .setColor("#1ec45c")
                                                  .addFields(
                                                    { name: "The Carry:", value: `${client.users.cache.get(posterID)}`, inline: false },
                                                    { name: "Carriers", value: `${finalString}`, inline: false },
                                                    { name: "Posted At:", value: `${data.postedAt}`, inline: false },
                                                    { name: "Claimed At:", value: `${data.claimedAt}`, inline: false },
                                                    { name: "Completed At:", value: `${data.completedAt}`, inline: false },
                                                    { name: "Approved At:", value: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`, inline: false }
                                                  )
                                                  .setThumbnail(link);
                                                prequestLogs.send(finalInfoEmbed);

                                                //getting the usernames of the carrier that helped and storing them in a string
                                                let finalTranscriptString;
                                                if (IDs.length === 3) {
                                                  finalTranscriptString = `${client.users.cache.get(IDs[0]).username} ${client.users.cache.get(IDs[1]).username} ${
                                                    client.users.cache.get(IDs[2]).username
                                                  }`;
                                                } else if (IDs.length === 2) {
                                                  finalTranscriptString = `${client.users.cache.get(IDs[0]).username} ${client.users.cache.get(IDs[1]).username}`;
                                                } else {
                                                  finalTranscriptString = `${client.users.cache.get(IDs[0]).username}`;
                                                }

                                                //sending the final Information as a transcript
                                                fs.writeFileSync(
                                                  `../${poster.username}.txt`,
                                                  `COMPLETION OF A PREQUEST CARRY\n\nThe Carry: ${client.users.cache.get(data.pid).username}\n\nCarriers: ${finalTranscriptString}\n\nPosted At: ${
                                                    data.postedAt
                                                  }\n\nClaimed At: ${data.claimedAt}\n\nCompleted At: ${data.completedAt}\n\nApproved At: ${moment().format("MMMM Do YYYY, h:mm:ss a")}\n\n${link}`,
                                                  function (err) {
                                                    return console.log(err);
                                                  }
                                                );
                                                await prequestTranscript.send(new MessageAttachment(fs.createReadStream(`../${poster.username}.txt`)));

                                                try {
                                                  //deleting the post from the db
                                                  await PrequestPost.deleteOne({ pid: theUserID, requestMessageID: reqMessageID });
                                                  //setting postedPrequest to false so the person can post again
                                                  await profileModel.findOneAndUpdate({ userID: theUserID, postedPrequest: true }, { $set: { postedPrequest: false } }, { $set: { muted: false } });
                                                } catch {}

                                                //deleting the post's Message from Discord
                                                reqchan.messages
                                                  .fetch(reqMessageID)
                                                  .then((msg) => {
                                                    try {
                                                      msg.delete();
                                                    } catch {}
                                                  })
                                                  .catch((err) => console.log("error here", err));
                                              } else {
                                                //if the person reacting isnt the poster
                                                try {
                                                  reaction.users.remove(user.id);
                                                } catch {}
                                              }
                                            });
                                          } else {
                                            //if the post isnt completed or claimed
                                            try {
                                              reaction.users.remove(user.id);
                                            } catch {}
                                          }
                                        } else {
                                          //if the person reacting isn ot the poster
                                          try {
                                            reaction.users.remove(user.id);
                                          } catch {}
                                        }
                                      });
                                    }

                                    //if the person responded within 5 minutes with the deny mark
                                    if (result.emoji.name === "🚫") {
                                      //finsing the post
                                      await PrequestPost.findOne({ pid: theUserID, requestMessageID: reqMessageID }, async (err, data) => {
                                        if (err) throw err;
                                        if (data) {
                                          // if the post is completed and ready to approve
                                          if (data.completed === true && data.claimed === true) {
                                            carryUsername = client.users.fetch(data.pid).username;
                                            poster = client.users.cache.get(posterID);
                                            //Dm the user and await a message
                                            EMBED = new MessageEmbed().setDescription(`Are you sure you want to deny that carry?`).setColor("#dd2e44").setFooter(`✅ Confirm | 🚫 Cancel`);

                                            poster.send(EMBED).then(async (msg) => {
                                              msg.react("✅");
                                              msg.react("🚫");

                                              const filter = (reaction, user) => {
                                                return ["✅", "🚫"].includes(reaction.emoji.name) && user.id === posterID;
                                              };

                                              msg
                                                .awaitReactions(filter, { max: 1, time: 60 * 1000, errors: ["time"] })
                                                .then(async (collected) => {
                                                  const reaction = collected.first();

                                                  //If the poster is denying the carry
                                                  if (reaction.emoji.name === "✅") {
                                                    lastMsg = poster.send(`${user}, please in **One** message tell us why are you denying this carry`).then((MESSAGE) => {
                                                      //Filter
                                                      const filter = (m) => m.author.id === posterID;
                                                      MESSAGE.channel
                                                        .awaitMessages(filter, { max: 1, time: 60 * 1000, errors: ["time"] })
                                                        .then(async (collected) => {
                                                          //The collected message
                                                          content = collected.first().content;
                                                          //looping through each carrier
                                                          for (i = 0; i < IDs.length; i++) {
                                                            await client.users
                                                              .fetch(IDs[i])
                                                              .then(async (user) => {
                                                                //dm each helper and tell them ${user} has denied the carry if there is something wrong please open a ticket at ${help Desk}
                                                                carryUsername = client.users.cache.get(data.pid).username;
                                                                embed = new MessageEmbed()
                                                                  .setColor("#1ec45c")
                                                                  .setDescription(
                                                                    `${carryUsername} denied the prequest carry, if there is something wrong or you disagree please open a ticket at <#815929868566528020>`
                                                                  );
                                                                user.send(embed);
                                                              })
                                                              .catch();
                                                          }
                                                          //Updating the Denied AT time in the db
                                                          await PrequestPost.findOneAndUpdate({ pid: theUserID }, { $set: { deniedAt: moment().format("MMMM Do YYYY, h:mm:ss a") } });

                                                          //Final String for The Embed of the user Object of the carriers
                                                          let finalString;
                                                          if (IDs.length === 3) {
                                                            finalString = `${client.users.cache.get(IDs[0])} ${client.users.cache.get(IDs[1])} ${client.users.cache.get(IDs[2])}`;
                                                          } else if (IDs.length === 2) {
                                                            finalString = `${client.users.cache.get(IDs[0])} ${client.users.cache.get(IDs[1])}`;
                                                          } else {
                                                            finalString = `${client.users.cache.get(IDs[0])}`;
                                                          }

                                                          //sending the logs as an Embed
                                                          embed = new MessageEmbed()
                                                            .setTitle("A denial of a prequest carry")
                                                            .setColor("#dd2e44")
                                                            .setThumbnail(link)
                                                            .setDescription(`**The carry:** ${client.users.cache.get(data.pid)}\n**Reason:** ${content}`)
                                                            .addFields(
                                                              { name: "Carriers", value: `${finalString}` },
                                                              { name: "Posted At:", value: `${data.postedAt}`, inline: false },
                                                              { name: "Claimed At:", value: `${data.claimedAt}`, inline: false },
                                                              { name: "Completed At:", value: `${data.completedAt}`, inline: false },
                                                              { name: "Denied At:", value: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`, inline: false }
                                                            );
                                                          prequestLogs.send(embed);

                                                          //getting the usernames of the carrier that helped and storing them in a string for the Transcript
                                                          let finalTranscriptString;
                                                          if (IDs.length === 3) {
                                                            finalTranscriptString = `${client.users.cache.get(IDs[0]).username} ${client.users.cache.get(IDs[1]).username} ${
                                                              client.users.cache.get(IDs[2]).username
                                                            }`;
                                                          } else if (IDs.length === 2) {
                                                            finalTranscriptString = `${client.users.cache.get(IDs[0]).username} ${client.users.cache.get(IDs[1]).username}`;
                                                          } else {
                                                            finalTranscriptString = `${client.users.cache.get(IDs[0]).username}`;
                                                          }

                                                          //sending the Transcript to the Transcript channel
                                                          fs.writeFileSync(
                                                            `../${poster.username}.txt`,
                                                            `A denial of a prequest carry\n\nThe Carry: ${
                                                              client.users.cache.get(data.pid).username
                                                            }\n\nCarriers: ${finalTranscriptString}\n\nPosted At: ${data.postedAt}\n\nClaimed At: ${data.claimedAt}\n\nCompleted At: ${
                                                              data.completedAt
                                                            }\n\nDenied At: ${moment().format("MMMM Do YYYY, h:mm:ss a")}\n\n${link}`,
                                                            function (err) {
                                                              return console.log(err);
                                                            }
                                                          );
                                                          await prequestTranscript.send(new MessageAttachment(fs.createReadStream(`../${poster.username}.txt`)));

                                                          //Thanking Embed for the poster
                                                          lastEmbed = new MessageEmbed().setDescription(`Thankyou for your feedback!`).setColor("#1ec45c");
                                                          poster.send(lastEmbed);

                                                          //deleting the post from the db
                                                          await PrequestPost.deleteOne({ requestMessageID: reqMessageID });

                                                          //deleting the post from Discord
                                                          reqchan.messages
                                                            .fetch(reqMessageID)
                                                            .then(async (msg) => {
                                                              await msg.delete();
                                                            })
                                                            .catch((err) => {
                                                              console.log(err);
                                                            });

                                                          //Updating the profile, so that the user can make another post
                                                          await profileModel.findOneAndUpdate(
                                                            { userID: theUserID, postedPrequest: true },
                                                            { $set: { postedPrequest: false } },
                                                            { $set: { muted: false } }
                                                          );
                                                        })
                                                        .catch((err) => {
                                                          //if the user doesn't respond within the 5 minutes
                                                          embed = new MessageEmbed().setDescription("You took too long to send the message").setColor("#0078d7");
                                                          user.send(embed);
                                                          console.log("TimeOut", err);
                                                        });
                                                    });
                                                  }
                                                  //If the user isn't denying it anymore
                                                  if (reaction.emoji.name === "🚫") {
                                                    embed = new MessageEmbed()
                                                      .setColor("#1ec45c")
                                                      .setDescription(`${user}, successfully cancelled the denial of the carry\nPlease head over to <#844650142627004416> to approve your post!`);
                                                    user.send(embed);
                                                    return;
                                                  }
                                                })
                                                .catch((err) => {
                                                  console.log(err);
                                                  msg = new MessageEmbed().setDescription(`${user}, you took **too long** to respond!`).setColor("#1ec45c");
                                                  user.send(msg);
                                                });
                                            });
                                          }
                                        }
                                      });
                                    }
                                  })
                                  .catch(async (err) => {
                                    console.error(err);
                                    //Add the Mute role
                                    userGuildMember.roles.add("858624854050734101");
                                    //setting muted to true in the db
                                    await profileModel.findOneAndUpdate({ userID: posterID }, { $set: { muted: true } });

                                    reqchan.messages
                                      .fetch(reqMessageID)
                                      .then((msg) => {
                                        msg.react("✅");
                                        msg.react("🚫");
                                      })
                                      .catch((err) => console.log("error here", err));

                                    //make sure not to mute everyone that react to the msg
                                    embed = new MessageEmbed()
                                      .setDescription(
                                        "You took too long to confirm the post and now you have been muted. To get unmuted either confirm/deny the post or open a ticket at <#815929868566528020>"
                                      )
                                      .setColor("#1ec45c");
                                    client.users.cache.get(posterID).send(embed);
                                  });
                              })
                              .catch((err) => console.error(err));
                          })
                          .catch((err) => {
                            console.error(err, "line 973");
                            msg = `${client.users.cache.get(data.claimerID)}, you took **too long** to respond!`;
                            try {
                              firstMSG.delete();
                            } catch (err) {
                              console.log(err, "line 994");
                            }
                            reqchan.send(msg).then((msg) => {
                              msg.delete({ timeout: 5000 });
                            });
                            return;
                          });
                      } else {
                        //If someone is reacting to the post but he is not the claimer
                        try {
                          reaction.users.remove(user.id);
                        } catch (err) {
                          console.log(err);
                        }
                      }
                    });
                  } else {
                    //if the post is not claimed or it is completed
                    try {
                      reaction.users.remove(user.id);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                }
              });
            }
          }
        });
      }
    });
  } else{
    return;
  }
});
