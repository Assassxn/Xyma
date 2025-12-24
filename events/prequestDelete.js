const { MessageEmbed } = require("discord.js");
const { client } = require("../index");
const PrequestPost = require("../models/PrequestPost");
const profileModel = require("../models/profileSchema");

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild || user.bot) return;

  let reqchan = reaction.message.guild.channels.cache.find((c) => c.id == "844650142627004416");

  if (reaction.message.channel.id === reqchan.id) {
    await PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
      if(err) throw err;
      if(data){
        userGuildMember = reaction.message.guild.members.cache.get(data.pid);
        reqMessageID = data.requestMessageID;
        posterID = data.pid;
        carryUsername = client.users.cache.get(data.pid).username;
        header = `Posted by: ${client.users.cache.get(data.pid)}`;
        poster = client.users.cache.get(data.pid);

        await profileModel.findOne({ userID: data.pid }, async (err, data) => {
          if (err) throw err;
          if (data) {
            EPIC = data.epic;
            PL = data.pl;

            //DELETING THE POST
            if (reaction.emoji.name === "❌") {
              await PrequestPost.findOne({ pid: user.id, requestMessageID: reaction.message.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                  if (data.claimed === false && data.completed === false) {
                    await PrequestPost.findOne({ pid: user.id, requestMessageID: reaction.message.id }, async (err, data) => {
                      if (err) throw err;
                      if (data) {
                        try {
                          await PrequestPost.deleteOne({
                            pid: user.id,
                            requestMessageID: reaction.message.id,
                          });
                          await reaction.message.delete().catch();
                          return;
                        } catch (err) {
                          console.log(err);
                        }
                      } else {
                        try {
                          reaction.users.remove(user.id);
                        } catch (err) {
                          console.log(err);
                        }
                      }
                    });
                    await profileModel.findOneAndUpdate({ userID: user.id, postedPrequest: true }, { $set: { postedPrequest: false }, $inc: { hexacoins: 500 } });
                    cancelationEmbed = new MessageEmbed()
                      .setColor("#1ec45c")
                      .setDescription(`${user}, Your post has been successfully deleted and you have been refunded **500** <:xytera:859531350385229825>`);
                    user.send(cancelationEmbed);
                  } else {
                    try {
                      reaction.users.remove(user.id);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                }
              });

              if (reaction.message.guild.members.cache.get(user.id).roles.cache.has("814980966107840522" || "858975716652482581") && user.id !== posterID) {
                await PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
                  if (err) throw err;
                  if (data) {
                    if (data.claimed === false && data.completed === false) {
                      await PrequestPost.findOne({ requestMessageID: reaction.message.id }, async (err, data) => {
                        if (err) throw err;
                        if (data) {
                          // if(data.pid === user.id) return;//experimental
                          try {
                            await PrequestPost.deleteOne({
                              requestMessageID: reaction.message.id,
                            });
                            await reaction.message.delete().catch();
                          } catch (err) {
                            console.log(err);
                          }
                        } else {
                          try {
                            reaction.users.remove(user.id);
                          } catch (err) {
                            console.log(err);
                          }
                        }
                      });
                      await profileModel.findOneAndUpdate({ userID: data.pid, postedPrequest: true }, { $set: { postedPrequest: false }, $inc: { hexacoins: 500 } });
                      cancelationEmbed = new MessageEmbed()
                        .setColor("#1ec45c")
                        .setDescription(`${reaction.message.guild.members.cache.get(data.pid)}, Your post has been deleted by ${user} and you have been refunded **500** <:xytera:859531350385229825>`);
                      reaction.message.guild.members.cache.get(data.pid).send(cancelationEmbed);
                    } else {
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
          }
        });
      }
    });
  }else{
    return
  }
});
