const { client } = require("../index");
const { MessageEmbed } = require("discord.js");
const boosts = require("../models/boosts");
const profileSchema = require("../models/profileSchema");
const moment = require("moment");
const ms = require("ms");

client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (!reaction.message.guild || user.bot) return;
    if (reaction.emoji.name === "xytera") {
        if (reaction.message.channel.id === "816061919780667432") {
            if (moment(Date.now()) - moment(reaction.message.createdTimestamp) > ms("10s")) {
                await boosts.deleteOne({ messageId: reaction.message.id });
                return;
            }
            await boosts.findOne({ messageId: reaction.message.id, userIds: user.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    return;
                }
                if (!data) {
                    await boosts.findOneAndUpdate({ messageId: reaction.message.id }, { $push: { userIds: user.id } });
                    let amount = 100;
                    await profileSchema.findOneAndUpdate(
                        {
                            userID: user.id,
                        },
                        {
                            $inc: {
                                hexacoins: amount,
                            },
                        }
                    );
                    const embed = new MessageEmbed().setColor("#f1c40f").setDescription(`You have been paid **${amount}** <:xytera:859531350385229825> for reacting to recent post!`);
                    user.send(embed);
                }
            });
        }
    }
});
