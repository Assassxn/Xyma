const { client } = require("../index");
const profileModel = require("../models/profileSchema");
const { MessageEmbed } = require("discord.js");
const { tictactoe } = require("reconlx");

let mentioned;
let firstUser;
client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.channel.name !== "🎲｜tictactoe") return;
    if (user.id === "814245954105507850") return;
    if (reaction.emoji.name !== "🎲") return;

    await profileModel.findOne({ userID: user.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            if (data.playingttt === true) {
                reaction.users.remove(user.id);
                return;
            }
            if (data.playingttt === false) {
                await profileModel.findOneAndUpdate({ userID: user.id }, { $set: { playingttt: true } });
                if (!mentioned) {
                    firstUser = user;
                    reaction.message.channel.send("<@&816999386030145537>").then((msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 1000);
                    });
                    mentioned = true;
                }
                const Embed = new MessageEmbed()
                    .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                    .setColor("#DD2E44")
                    .setTitle("TicTacToe")
                    .setDescription(`**Players:** ${firstUser}\n\n Waiting for another player to join\nreact with 🎲 to join the game`)
                    .setTimestamp()
                    .setFooter("Last winner: ");
                reaction.users.remove(user.id);
                msg = reaction.message.edit(Embed);

                const filter = (reaction, user) => {
                    return reaction.emoji.name === "🎲" && user.id !== "814245954105507850";
                };

                reaction.message
                    .awaitReactions(filter, { max: 1, time: 10000 })
                    .then(async (collected) => {
                        // const member = await reaction.message.guild.members.cache.get(collected.first().users.cache.last().id);
                        const member = collected.first().users.cache.last();

                        new tictactoe({
                            player_two: member,
                            reaction: reaction,
                            user: firstUser,
                        });

                        mentioned = false;

                        const Embed = new MessageEmbed()
                            .setAuthor("Manager", "https://cdn.discordapp.com/attachments/845954962277531648/851231612519055420/logo.jpg")
                            .setColor("#DD2E44")
                            .setTitle("TicTacToe")
                            .setDescription(`**Players: ${firstUser},${member}**\n Waiting for another player to join\nreact with 🎲 to join the game`)
                            .setTimestamp()
                            .setFooter("Last winner: ");
                        reaction.message.edit(Embed);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    });
});
