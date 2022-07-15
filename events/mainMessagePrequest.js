const PrequestPost = require("../models/PrequestPost");
const profileModel = require("../models/profileSchema");
const lfgActive = require("../models/lfg-active");
const { MessageEmbed } = require("discord.js");
const { client } = require("../index");
const blIDs = require("../models/lfgBlacklist");
const moment = require("moment");
let minibossRequest, mist_monstersRequest, scRequest, elementalsRequest;
let postedFirstMessage;
let userIsBlacklisted;
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild || user.bot) return;
  let reqchan = reaction.message.guild.channels.cache.find((c) => c.id == "844650142627004416");
  let lfgchan = reaction.message.guild.channels.cache.find((c) => c.id == "851171690586570802");
  if (reaction.message.channel.id !== lfgchan.id) return;
  guildid = reaction.message.guild.id;

  await lfgActive.findOne({ guildID: reaction.message.guild.id }, async (err, data) => {
    if (err) throw err;
    if (!data) {
      data = new lfgActive({
        guildID: reaction.message.guild.id,
        IDs: [],
      });
    }
    await data.save();
  });

  await lfgActive.findOne({ guildID: reaction.message.guild.id, IDs: user.id }, async (err, data) => {
    if (err) throw err;
    if (!data) {
      await lfgActive.findOneAndUpdate({ guildID: reaction.message.guild.id }, { $push: { IDs: user.id } });
      await profileModel.findOne({ userID: user.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
          if (!data.epic) {
            if (!postedFirstMessage) {
              console.log("here1");
              user.send("You need to link your fortnite account first").catch(() => {
                errorEmbed = new MessageEmbed()
                  .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                  .setDescription(
                    `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                  )
                  .setTimestamp()
                  .setColor("#e91015")
                  .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                postedFirstMessage = true;
              });
              return;
            }
          }
          if (!data.pl) {
            if (!postedFirstMessage) {
              console.log("here2");
              user.send("You need to link your fortnite account first").catch(() => {
                errorEmbed = new MessageEmbed()
                  .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                  .setDescription(
                    `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                  )
                  .setTimestamp()
                  .setColor("#e91015")
                  .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                postedFirstMessage = true;
              });
              return;
            }
          }
        }
      });

      let lfgBl;
      lfgBl = await blIDs.findOne({ guildID: reaction.message.guild.id });
      if (!lfgBl) {
        let info = await blIDs.create({
          guildID: reaction.message.guild.id,
          blIDs: [],
        });
        info.save();
      }

      if (lfgBl) {
        await blIDs.findOne({ guildID: reaction.message.guild.id }, async (err, data) => {
          if (err) throw err;
          if (data) {
            await data.blIDs.map(async (i, t, r) => {
              if (i.ID === user.id) {
                userIsBlacklisted = true;
                Embed = new MessageEmbed()
                  .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                  .setColor("#dd2e44")
                  .setDescription(`You are Blacklisted from using the <#823318029542752266> open a ticket at\n <#815929868566528020> to learn why has that happened!`)
                  .setTimestamp();
                reaction.users.remove(user.id);
                user.send(Embed).catch(() => {
                  errorEmbed = new MessageEmbed()
                    .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                    .setDescription(
                      `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                    )
                    .setTimestamp()
                    .setColor("#e91015")
                    .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                  reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                });
                await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                return;
              } else {
                POSTERID = user.id;
                await profileModel.findOne({ userID: user.id, postedPrequest: true }, async (err, data) => {
                  if (err) throw err;
                  if (data) {
                    reaction.users.remove(user.id);
                    embed = new MessageEmbed().setColor("#dd2e44").setDescription(`You already have a post up. Please be patient and wait until someone claim it.`);
                    user.send(embed).catch(() => {
                      errorEmbed = new MessageEmbed()
                        .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                        .setDescription(
                          `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                        )
                        .setTimestamp()
                        .setColor("#e91015")
                        .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                      reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                    });
                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                    return;
                  } else {
                    if (!userIsBlacklisted) {
                      await profileModel.findOne({ userID: user.id, muted: true }, async (err, data) => {
                        if (err) throw err;
                        if (data) {
                          embed = new MessageEmbed()
                            .setDescription(`You are muted and you can't make another post either approve/deny your previous post or open a ticket at <#815929868566528020>`)
                            .setColor("#1ec45c")
                            .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg");
                          reaction.users.remove(user.id);
                          user.send(embed).catch(() => {
                            errorEmbed = new MessageEmbed()
                              .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                              .setDescription(
                                `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                              )
                              .setTimestamp()
                              .setColor("#e91015")
                              .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                            reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                          });
                          await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                          return;
                        } else {
                          await profileModel.findOne({ userID: user.id }, async (err, data) => {
                            if (err) throw err;
                            if (data) {
                              EPIC = data.epic;
                              PL = data.pl;

                              if (data.hexacoins < 500) {
                                poorEmbed = new MessageEmbed().setColor("#dd2e44").setDescription(`${user}, You don't have enough xytera to purchase a carry`);
                                reaction.users.remove(user.id);
                                user.send(poorEmbed).catch(() => {
                                  errorEmbed = new MessageEmbed()
                                    .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                    .setDescription(
                                      `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                    )
                                    .setTimestamp()
                                    .setColor("#e91015")
                                    .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                                  reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                                });
                                await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                return;
                              }
                              //everything starts here
                              if (reaction.emoji.id == "862262665199747073") {
                                reaction.users.remove(user.id);
                                agreementEmbed = new MessageEmbed().setColor("#1ec45c").setTitle("PREQUEST CARRY REQUEST").setDescription("Let's complete your carry request!").addFields({
                                  name: "__**AGREE TO THE RULES**__",
                                  value: "💚 Tips are appreciated\n\n💚 Be patient! Help is guaranteed\n\n🛑 No help requests in DMs or Channels\n\n🛑 Do not pay for help",
                                  inline: false,
                                });

                                let sentSuccessfully = false;
                                let MSG;

                                user
                                  .send(agreementEmbed)
                                  .then((msg) => {
                                    MSG = msg.id;
                                    msg.react("✅");
                                    msg.react("🚫");
                                    sentSuccessfully = true;
                                    if (sentSuccessfully) {
                                      user.createDM().then(async (chan) => {
                                        await chan.messages.fetch(MSG).then((msg) => {
                                          initialEmbed = new MessageEmbed().setDescription(`**${user.username}**, open your DM from <@814245954105507850> to create your request`).setColor("#1ec45c");
                                          initialMessage = reaction.message.channel.send(initialEmbed).then((msg) => {
                                            try {
                                              msg.delete({ timeout: 3000 });
                                            } catch {}
                                          });

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
                                                user.send(secondEmbed);

                                                thirdEmbed = new MessageEmbed()
                                                  .setColor("#1ec45c")
                                                  .setTitle("MSK PREQUEST CARRY")
                                                  .addFields({ name: "epicname", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true })
                                                  .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png");
                                                user.send(thirdEmbed);

                                                user
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

                                                        header = `Posted by: ${user}`;
                                                        poster_id = user.id;

                                                        request = await reqchan.send(header, minibossRequest);
                                                        request.react("🔵");
                                                        request.react("❌");
                                                        reqID = request.id;

                                                        const filter = (reaction, user) => {
                                                          return ["✅", "🚫", "🔵", "❌"].includes(reaction.emoji.name) && user.id !== "814245954105507850";
                                                        };

                                                        request
                                                          .awaitReactions(filter, { time: 3600000 })
                                                          .then(async (collected) => {
                                                            await PrequestPost.findOne({ requestMessageID: request.id }, async (err, data) => {
                                                              if (err) throw err;
                                                              if (data) {
                                                                if (data.claimed === true || data.completed === true) {
                                                                  return;
                                                                } else {
                                                                  await PrequestPost.deleteOne({
                                                                    pid: user.id,
                                                                    requestMessageID: request.id,
                                                                  });

                                                                  await profileModel.findOneAndUpdate(
                                                                    { userID: user.id, postedPrequest: true },
                                                                    { $set: { postedPrequest: false }, $inc: { xyteras: 500 } }
                                                                  );
                                                                  try {
                                                                    await request.delete();
                                                                  } catch {}

                                                                  cancelationEmbed = new MessageEmbed()
                                                                    .setColor("#1ec45c")
                                                                    .setDescription(
                                                                      `${user}, Your post has expired and you have been refunded **500** <:xytera:859531350385229825>.\n You make a new post at <#851171690586570802>`
                                                                    );
                                                                  user.send(cancelationEmbed);
                                                                }
                                                              }
                                                            });
                                                          })
                                                          .catch();

                                                        await PrequestPost.findOne({ pid: user.id, requestMessageID: reaction.message.id }, async (err, data) => {
                                                          if (err) throw err;
                                                          if (data) {
                                                            return;
                                                          } else {
                                                            try {
                                                              data = new PrequestPost({
                                                                claimed: false,
                                                                completed: false,
                                                                pid: user.id,
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
                                                          { userID: user.id, postedPrequest: false },
                                                          {
                                                            $set: {
                                                              postedPrequest: true,
                                                            },
                                                            $inc: {
                                                              xyteras: -500,
                                                            },
                                                          }
                                                        );

                                                        confirmationEmbed = new MessageEmbed()
                                                          .setDescription(
                                                            `${user} You have been charged **500** <:xytera:859531350385229825>\nYour post has been sent in <#844650142627004416>. \nBe sure to follow the rules above and to confirm the reputation request after you get help`
                                                          )
                                                          .setColor("#1ec45c");
                                                        user.send(confirmationEmbed);
                                                        await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                      } else if (reaction.emoji.name === "🚫") {
                                                        errorEmbed = new MessageEmbed()
                                                          .setDescription(`If there is something wrong with the post open a ticket at <#815929868566528020>`)
                                                          .setColor("#1ec45c");
                                                        user.send(errorEmbed);
                                                        await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                        return;
                                                      }
                                                    });
                                                  })
                                                  .catch(async () => {
                                                    embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                                    user.send(embed);
                                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                    return;
                                                  });
                                              } else {
                                                ErrorEmbed = new MessageEmbed().setDescription(`${user}, You can't make a post if you don't agree to these rules`).setColor("#0078d7");
                                                user.send(ErrorEmbed);
                                                await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                return;
                                              }
                                            })
                                            .catch(async () => {
                                              embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                              user.send(embed);
                                              await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                              return;
                                            });
                                        });
                                      });
                                    }
                                  })
                                  .catch(async () => {
                                    try {
                                      initialMessage.delete();
                                    } catch {}
                                    errorEmbed = new MessageEmbed()
                                      .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                      .setDescription(
                                        `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                      )
                                      .setTimestamp()
                                      .setColor("#e91015")
                                      .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                    return reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                                  });
                              }

                              if (reaction.emoji.id == "862961701384224808") {
                                reaction.users.remove(user.id);
                                agreementEmbed = new MessageEmbed().setColor("#1ec45c").setTitle("PREQUEST CARRY REQUEST").setDescription("Let's complete your carry request!").addFields({
                                  name: "__**AGREE TO THE RULES**__",
                                  value: "💚 Tips are appreciated\n\n💚 Be patient! Help is guaranteed\n\n🛑 No help requests in DMs or Channels\n\n🛑 Do not pay for help",
                                  inline: false,
                                });

                                let sentSuccessfully = false;
                                let MSG;

                                user
                                  .send(agreementEmbed)
                                  .then((msg) => {
                                    MSG = msg.id;
                                    msg.react("✅");
                                    msg.react("🚫");
                                    sentSuccessfully = true;
                                    if (sentSuccessfully) {
                                      user.createDM().then(async (chan) => {
                                        await chan.messages.fetch(MSG).then((msg) => {
                                          initialEmbed = new MessageEmbed().setDescription(`**${user.username}**, open your DM from <@814245954105507850> to create your request`).setColor("#1ec45c");
                                          initialMessage = reaction.message.channel.send(initialEmbed).then((msg) => {
                                            try {
                                              msg.delete({ timeout: 3000 });
                                            } catch {}
                                          });

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
                                                user.send(secondEmbed);

                                                thirdEmbed = new MessageEmbed()
                                                  .setColor("#1ec45c")
                                                  .setTitle("MSK PREQUEST CARRY")
                                                  .addFields({ name: "epicname", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true })
                                                  .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956340320305152/mist-monster.png");
                                                user.send(thirdEmbed);

                                                user
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
                                                          .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956340320305152/mist-monster.png")
                                                          .setFooter(`🔵 claim | ❌ close`);

                                                        header = `Posted by: ${user}`;
                                                        poster_id = user.id;

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
                                                                    pid: user.id,
                                                                    requestMessageID: request.id,
                                                                  });

                                                                  await profileModel.findOneAndUpdate(
                                                                    { userID: user.id, postedPrequest: true },
                                                                    { $set: { postedPrequest: false }, $inc: { xyteras: 500 } }
                                                                  );
                                                                  try {
                                                                    await request.delete();
                                                                  } catch {}

                                                                  cancelationEmbed = new MessageEmbed()
                                                                    .setColor("#1ec45c")
                                                                    .setDescription(
                                                                      `${user}, Your post has expired and you have been refunded **500** <:xytera:859531350385229825>.\n You make a new post at <#851171690586570802>`
                                                                    );
                                                                  user.send(cancelationEmbed);
                                                                }
                                                              }
                                                            });
                                                          })
                                                          .catch();

                                                        await PrequestPost.findOne({ pid: user.id, requestMessageID: reaction.message.id }, async (err, data) => {
                                                          if (err) throw err;
                                                          if (data) {
                                                            return;
                                                          } else {
                                                            try {
                                                              data = new PrequestPost({
                                                                claimed: false,
                                                                completed: false,
                                                                pid: user.id,
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
                                                          { userID: user.id, postedPrequest: false },
                                                          {
                                                            $set: {
                                                              postedPrequest: true,
                                                            },
                                                            $inc: {
                                                              xyteras: -500,
                                                            },
                                                          }
                                                        );

                                                        confirmationEmbed = new MessageEmbed()
                                                          .setDescription(
                                                            `${user} You have been charged **500** <:xytera:859531350385229825>\nYour post has been sent in <#844650142627004416>. \nBe sure to follow the rules above and to confirm the reputation request after you get help`
                                                          )
                                                          .setColor("#1ec45c");
                                                        user.send(confirmationEmbed);
                                                        await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                      } else if (reaction.emoji.name === "🚫") {
                                                        errorEmbed = new MessageEmbed()
                                                          .setDescription(`If there is something wrong with the post open a ticket at <#815929868566528020>`)
                                                          .setColor("#1ec45c");
                                                        user.send(errorEmbed);
                                                        await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                        return;
                                                      }
                                                    });
                                                  })
                                                  .catch(async () => {
                                                    embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                                    user.send(embed);
                                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                    return;
                                                  });
                                              } else {
                                                ErrorEmbed = new MessageEmbed().setDescription(`${user}, You can't make a post if you don't agree to these rules`).setColor("#0078d7");
                                                user.send(ErrorEmbed);
                                                await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                return;
                                              }
                                            })
                                            .catch(async () => {
                                              embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                              user.send(embed);
                                              await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                              return;
                                            });
                                        });
                                      });
                                    }
                                  })
                                  .catch(async () => {
                                    try {
                                      initialMessage.delete();
                                    } catch {}
                                    errorEmbed = new MessageEmbed()
                                      .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                      .setDescription(
                                        `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                      )
                                      .setTimestamp()
                                      .setColor("#e91015")
                                      .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                    return reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                                  });
                              }

                              if (reaction.emoji.id == "862962011611332608") {
                                initialEmbed = new MessageEmbed().setDescription(`**${user.username}**, open your DM from <@814245954105507850> to create your request`).setColor("#1ec45c");
                                initialMessage = reaction.message.channel.send(initialEmbed).then((msg) => {
                                  try {
                                    msg.delete({ timeout: 3000 });
                                  } catch {}
                                });

                                reaction.users.remove(user.id);
                                agreementEmbed = new MessageEmbed().setColor("#1ec45c").setTitle("PREQUEST CARRY REQUEST").setDescription("Let's complete your carry request!").addFields({
                                  name: "__**AGREE TO THE RULES**__",
                                  value: "💚 Tips are appreciated\n\n💚 Be patient! Help is guaranteed\n\n🛑 No help requests in DMs or Channels\n\n🛑 Do not pay for help",
                                  inline: false,
                                });

                                user
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
                                            .setDescription("Awesome! Thank you for agreeing to the rules. As long as you follow the rules you'll have access to <#845701737171124235>");

                                          user.send(secondEmbed);

                                          thirdEmbed = new MessageEmbed()
                                            .setColor("#1ec45c")
                                            .setTitle("MSK PREQUEST CARRY")
                                            .addFields({ name: "epicname", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true })
                                            .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956408465162250/sc.png");

                                          user.send(thirdEmbed);

                                          finalConfirmation = user
                                            .send("Is this what you want to post?")
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
                                                    scRequest = new MessageEmbed()
                                                      .setTitle("STORM CHEST")
                                                      .setColor("#0078d7")
                                                      .addFields(
                                                        { name: "epic name", value: `${data.epic}`, inline: true },
                                                        { name: "power level", value: `${data.pl}`, inline: true },
                                                        { name: "Status", value: "Open" }
                                                      )
                                                      .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956408465162250/sc.png")
                                                      .setFooter(`🔵 claim | ❌ close`);

                                                    header = `Posted by: ${user}`;
                                                    poster_id = user.id;
                                                    msg = await reqchan.send(header, scRequest);
                                                    msg.react("🔵");
                                                    msg.react("❌");
                                                    reqID = msg.id;

                                                    const filter = (reaction, user) => {
                                                      return ["✅", "🚫", "🔵", "❌"].includes(reaction.emoji.name) && user.id !== "814245954105507850";
                                                    };

                                                    request
                                                      .awaitReactions(filter, { time: 3600000 })
                                                      .then(async (collected) => {
                                                        await PrequestPost.findOne({ requestMessageID: request.id }, async (err, data) => {
                                                          if (err) throw err;
                                                          if (data) {
                                                            if (data.claimed === true || data.completed === true) {
                                                              return;
                                                            } else {
                                                              await PrequestPost.deleteOne({
                                                                pid: user.id,
                                                                requestMessageID: request.id,
                                                              });

                                                              await profileModel.findOneAndUpdate(
                                                                { userID: user.id, postedPrequest: true },
                                                                { $set: { postedPrequest: false }, $inc: { xyteras: 500 } }
                                                              );
                                                              try {
                                                                await request.delete();
                                                              } catch {}

                                                              cancelationEmbed = new MessageEmbed()
                                                                .setColor("#1ec45c")
                                                                .setDescription(
                                                                  `${user}, Your post has expired and you have been refunded **500** <:xytera:859531350385229825>.\n You make a new post at <#851171690586570802>`
                                                                );
                                                              user.send(cancelationEmbed);
                                                            }
                                                          }
                                                        });
                                                      })
                                                      .catch();

                                                    await PrequestPost.findOne({ pid: user.id, requestMessageID: reaction.message.id }, async (err, data) => {
                                                      if (err) throw err;
                                                      if (data) {
                                                        console.log(`Found data`);
                                                        return;
                                                      } else {
                                                        try {
                                                          data = new PrequestPost({
                                                            claimed: false,
                                                            completed: false,
                                                            pid: user.id,
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
                                                      { userID: user.id, postedPrequest: false },
                                                      {
                                                        $set: { postedPrequest: true },
                                                        $inc: {
                                                          xyteras: -500,
                                                        },
                                                      }
                                                    );

                                                    confirmationEmbed = new MessageEmbed()
                                                      .setDescription(
                                                        `${user} You have been charged **500** <:xytera:859531350385229825>\nYour post has been sent in <#844650142627004416>. \nBe sure to follow the rules above and to confirm the reputation request after you get help`
                                                      )
                                                      .setColor("#1ec45c");
                                                    user.send(confirmationEmbed);
                                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                  } else {
                                                    errorEmbed = new MessageEmbed()
                                                      .setDescription(`If there is something wrong with the post open a ticket at <#815929868566528020>`)
                                                      .setColor("#1ec45c");
                                                    user.send(errorEmbed);
                                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                    return;
                                                  }
                                                })
                                                .catch(async () => {
                                                  embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                                  user.send(embed);
                                                  await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                });
                                            })
                                            .catch(async () => {
                                              embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                              user.send(embed);
                                              await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                              return;
                                            });
                                        } else {
                                          ErrorEmbed = new MessageEmbed().setDescription(`${user}, You can't make a post if you don't agree to these rules`).setColor("#0078d7");
                                          user.send(ErrorEmbed);
                                          await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                        }
                                      })
                                      .catch(async () => {
                                        embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                        user.send(embed);
                                        await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                        return;
                                      });
                                  })
                                  .catch(async () => {
                                    try {
                                      initialMessage.delete();
                                    } catch {}
                                    errorEmbed = new MessageEmbed()
                                      .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                      .setDescription(
                                        `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                      )
                                      .setTimestamp()
                                      .setColor("#e91015")
                                      .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                                    reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                  });
                              }
                              if (reaction.emoji.id == "862962169880772618") {
                                initialEmbed = new MessageEmbed().setDescription(`**${user.username}**, open your DM from <@814245954105507850> to create your request`).setColor("#1ec45c");
                                initialMessage = reaction.message.channel.send(initialEmbed).then((msg) => {
                                  try {
                                    msg.delete({ timeout: 3000 });
                                  } catch {}
                                });

                                reaction.users.remove(user.id);
                                agreementEmbed = new MessageEmbed().setColor("#1ec45c").setTitle("PREQUEST CARRY REQUEST").setDescription("Let's complete your carry request!").addFields({
                                  name: "__**AGREE TO THE RULES**__",
                                  value: "💚 Tips are appreciated\n\n💚 Be patient! Help is guaranteed\n\n🛑 No help requests in DMs or Channels\n\n🛑 Do not pay for help",
                                  inline: false,
                                });

                                user
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
                                            .setDescription("Awesome! Thank you for agreeing to the rules. As long as you follow the rules you'll have access to <#845701737171124235>");

                                          user.send(secondEmbed);

                                          thirdEmbed = new MessageEmbed()
                                            .setColor("#1ec45c")
                                            .setTitle("MSK PREQUEST CARRY")
                                            .addFields({ name: "epicname", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true })
                                            .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956386604974110/elemental-husks.png");

                                          user.send(thirdEmbed);

                                          finalConfirmation = user
                                            .send("Is this what you want to post?")
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
                                                    elementalsRequest = new MessageEmbed()
                                                      .setTitle("ELEMENTALS")
                                                      .setColor("#0078d7")
                                                      .addFields(
                                                        { name: "epic name", value: `${data.epic}`, inline: true },
                                                        { name: "power level", value: `${data.pl}`, inline: true },
                                                        { name: "Status", value: "Open" }
                                                      )
                                                      .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956386604974110/elemental-husks.png")
                                                      .setFooter(`🔵 claim | ❌ close`);

                                                    header = `Posted by: ${user}`;
                                                    poster_id = user.id;
                                                    msg = await reqchan.send(header, elementalsRequest);
                                                    msg.react("🔵");
                                                    msg.react("❌");
                                                    reqID = msg.id;

                                                    const filter = (reaction, user) => {
                                                      return ["✅", "🚫", "🔵", "❌"].includes(reaction.emoji.name) && user.id !== "814245954105507850";
                                                    };

                                                    request
                                                      .awaitReactions(filter, { time: 3600000 })
                                                      .then(async (collected) => {
                                                        await PrequestPost.findOne({ requestMessageID: request.id }, async (err, data) => {
                                                          if (err) throw err;
                                                          if (data) {
                                                            if (data.claimed === true || data.completed === true) {
                                                              return;
                                                            } else {
                                                              await PrequestPost.deleteOne({
                                                                pid: user.id,
                                                                requestMessageID: request.id,
                                                              });

                                                              await profileModel.findOneAndUpdate(
                                                                { userID: user.id, postedPrequest: true },
                                                                { $set: { postedPrequest: false }, $inc: { xyteras: 500 } }
                                                              );
                                                              try {
                                                                await request.delete();
                                                              } catch {}

                                                              cancelationEmbed = new MessageEmbed()
                                                                .setColor("#1ec45c")
                                                                .setDescription(
                                                                  `${user}, Your post has expired and you have been refunded **500** <:xytera:859531350385229825>.\n You make a new post at <#851171690586570802>`
                                                                );
                                                              user.send(cancelationEmbed);
                                                            }
                                                          }
                                                        });
                                                      })
                                                      .catch();

                                                    await PrequestPost.findOne({ pid: user.id, requestMessageID: reaction.message.id }, async (err, data) => {
                                                      if (err) throw err;
                                                      if (data) {
                                                        console.log(`Found data`);
                                                        return;
                                                      } else {
                                                        try {
                                                          data = new PrequestPost({
                                                            claimed: false,
                                                            completed: false,
                                                            pid: user.id,
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
                                                      { userID: user.id, postedPrequest: false },
                                                      {
                                                        $set: { postedPrequest: true },
                                                        $inc: {
                                                          xyteras: -500,
                                                        },
                                                      }
                                                    );

                                                    confirmationEmbed = new MessageEmbed()
                                                      .setDescription(
                                                        `${user} You have been charged **500** <:xytera:859531350385229825>\nYour post has been sent in <#844650142627004416>. \nBe sure to follow the rules above and to confirm the reputation request after you get help`
                                                      )
                                                      .setColor("#1ec45c");
                                                    user.send(confirmationEmbed);
                                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                  } else {
                                                    errorEmbed = new MessageEmbed()
                                                      .setDescription(`If there is something wrong with the post open a ticket at <#815929868566528020>`)
                                                      .setColor("#1ec45c");
                                                    user.send(errorEmbed);
                                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                    return;
                                                  }
                                                })
                                                .catch(async (err) => {
                                                  embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                                  user.send(embed);
                                                  console.log("ERror here", err);
                                                  await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                  return;
                                                });
                                            })
                                            .catch(async (err) => {
                                              embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                              user.send(embed);
                                              await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                            });
                                        } else {
                                          ErrorEmbed = new MessageEmbed().setDescription(`${user}, You can't make a post if you don't agree to these rules`).setColor("#0078d7");
                                          user.send(ErrorEmbed);
                                          await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                        }
                                      })
                                      .catch(async (err) => {
                                        embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                        user.send(embed);
                                        console.log("ERror here", err);
                                        await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                        return;
                                      });
                                  })
                                  .catch(async () => {
                                    try {
                                      initialMessage.delete();
                                    } catch {}
                                    errorEmbed = new MessageEmbed()
                                      .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                      .setDescription(
                                        `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                      )
                                      .setColor("#e91015")
                                      .setTimestamp()
                                      .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                                    reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                  });
                              }

                              if (reaction.emoji.id == "862961564969205770") {
                                reaction.users.remove(user.id);
                                agreementEmbed = new MessageEmbed().setColor("#1ec45c").setTitle("PREQUEST CARRY REQUEST").setDescription("Let's complete your carry request!").addFields({
                                  name: "__**AGREE TO THE RULES**__",
                                  value: "💚 Tips are appreciated\n\n💚 Be patient! Help is guaranteed\n\n🛑 No help requests in DMs or Channels\n\n🛑 Do not pay for help",
                                  inline: false,
                                });

                                let sentSuccessfully = false;
                                let MSG;

                                user
                                  .send(agreementEmbed)
                                  .then((msg) => {
                                    MSG = msg.id;
                                    msg.react("✅");
                                    msg.react("🚫");
                                    sentSuccessfully = true;
                                    if (sentSuccessfully) {
                                      user.createDM().then(async (chan) => {
                                        await chan.messages.fetch(MSG).then((msg) => {
                                          initialEmbed = new MessageEmbed().setDescription(`**${user.username}**, open your DM from <@814245954105507850> to create your request`).setColor("#1ec45c");
                                          initialMessage = reaction.message.channel.send(initialEmbed).then((msg) => {
                                            try {
                                              msg.delete({ timeout: 3000 });
                                            } catch {}
                                          });

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
                                                user.send(secondEmbed);

                                                thirdEmbed = new MessageEmbed()
                                                  .setColor("#1ec45c")
                                                  .setTitle("MSK PREQUEST CARRY")
                                                  .addFields({ name: "epicname", value: `${EPIC}`, inline: true }, { name: "power level", value: `${PL}`, inline: true })
                                                  .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956429974339624/survivors.png");
                                                user.send(thirdEmbed);

                                                user
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
                                                          .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956429974339624/survivors.png")
                                                          .setFooter(`🔵 claim | ❌ close`);

                                                        header = `Posted by: ${user}`;
                                                        poster_id = user.id;

                                                        request = await reqchan.send(header, minibossRequest);
                                                        request.react("🔵");
                                                        request.react("❌");
                                                        reqID = request.id;

                                                        const filter = (reaction, user) => {
                                                          return ["✅", "🚫", "🔵", "❌"].includes(reaction.emoji.name) && user.id !== "814245954105507850";
                                                        };

                                                        request
                                                          .awaitReactions(filter, { time: 3600000 })
                                                          .then(async (collected) => {
                                                            await PrequestPost.findOne({ requestMessageID: request.id }, async (err, data) => {
                                                              if (err) throw err;
                                                              if (data) {
                                                                if (data.claimed === true || data.completed === true) {
                                                                  return;
                                                                } else {
                                                                  await PrequestPost.deleteOne({
                                                                    pid: user.id,
                                                                    requestMessageID: request.id,
                                                                  });

                                                                  await profileModel.findOneAndUpdate(
                                                                    { userID: user.id, postedPrequest: true },
                                                                    { $set: { postedPrequest: false }, $inc: { xyteras: 500 } }
                                                                  );
                                                                  try {
                                                                    await request.delete();
                                                                  } catch {}

                                                                  cancelationEmbed = new MessageEmbed()
                                                                    .setColor("#1ec45c")
                                                                    .setDescription(
                                                                      `${user}, Your post has expired and you have been refunded **500** <:xytera:859531350385229825>.\n You make a new post at <#851171690586570802>`
                                                                    );
                                                                  user.send(cancelationEmbed);
                                                                }
                                                              }
                                                            });
                                                          })
                                                          .catch();

                                                        await PrequestPost.findOne({ pid: user.id, requestMessageID: reaction.message.id }, async (err, data) => {
                                                          if (err) throw err;
                                                          if (data) {
                                                            return;
                                                          } else {
                                                            try {
                                                              data = new PrequestPost({
                                                                claimed: false,
                                                                completed: false,
                                                                pid: user.id,
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
                                                          { userID: user.id, postedPrequest: false },
                                                          {
                                                            $set: {
                                                              postedPrequest: true,
                                                            },
                                                            $inc: {
                                                              xyteras: -500,
                                                            },
                                                          }
                                                        );

                                                        confirmationEmbed = new MessageEmbed()
                                                          .setDescription(
                                                            `${user} You have been charged **500** <:xytera:859531350385229825>\nYour post has been sent in <#844650142627004416>. \nBe sure to follow the rules above and to confirm the reputation request after you get help`
                                                          )
                                                          .setColor("#1ec45c");
                                                        user.send(confirmationEmbed);
                                                        await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                      } else if (reaction.emoji.name === "🚫") {
                                                        errorEmbed = new MessageEmbed()
                                                          .setDescription(`If there is something wrong with the post open a ticket at <#815929868566528020>`)
                                                          .setColor("#1ec45c");
                                                        user.send(errorEmbed);
                                                        await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                        return;
                                                      }
                                                    });
                                                  })
                                                  .catch(async () => {
                                                    embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                                    user.send(embed);
                                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                    return;
                                                  });
                                              } else {
                                                ErrorEmbed = new MessageEmbed().setDescription(`${user}, You can't make a post if you don't agree to these rules`).setColor("#0078d7");
                                                user.send(ErrorEmbed);
                                                await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                                return;
                                              }
                                            })
                                            .catch(async () => {
                                              embed = new MessageEmbed().setColor("#dd2e44").setDescription("You took too long to respond");
                                              user.send(embed);
                                              await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                              return;
                                            });
                                        });
                                      });
                                    }
                                  })
                                  .catch(async () => {
                                    try {
                                      initialMessage.delete();
                                    } catch {}
                                    errorEmbed = new MessageEmbed()
                                      .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                                      .setDescription(
                                        `${user}, you need to open your DMs to create a post.\n\n**HOW TO ENABLE DMS**\n> Right click on the server icon for \`ONYX\`\n> Open \`privacy settings\`\n> Enable \`Allow direct messages from server members\``
                                      )
                                      .setTimestamp()
                                      .setColor("#e91015")
                                      .setFooter(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`);
                                    await lfgActive.findOneAndUpdate({ guildID: guildid }, { $pull: { IDs: user.id } });
                                    return reaction.message.channel.send(errorEmbed).then((msg) => msg.delete({ timeout: 10000 }));
                                  });
                              }
                            }
                          });
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        });
      }
    }
    if (data) {
      reaction.users.remove(user.id);
      return reaction.message.channel
        .send(`🛑**DO NOT SPAM REACTIONS**🛑\n> ${user}, you already have a DM from <@814245954105507850>\n*If you believe this is an error, please open a ticket at <#815929868566528020>*`)
        .then((msg) => msg.delete({ timeout: 5000 }));
    }
  });
});
