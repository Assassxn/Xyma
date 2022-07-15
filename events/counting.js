const { client } = require("../index");
const db = require("../models/Guild");
const user = require("../models/Users");
const profileModel = require("../models/profileSchema");
const { MessageEmbed } = require("discord.js");

client.on("message", async (message) => {
    const data = await db.findOne({ id: "807213094743965696" });
    if (!data) return;

    if (message.channel.id !== data.Channel) return;
    if (parseInt(message.content) === data.Current + 1) {
        await user.findOne({ id: message.author.id, Guild: message.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                data.Counts++;
            } else {
                data = new user({
                    id: message.author.id,
                    Guild: message.guild.id,
                    Counts: 1,
                });
            }
            data.save();
        });

        await profileModel.findOneAndUpdate(
            { userID: message.author.id },
            {
                $inc: {
                    hexacoins: 20,
                },
            }
        );
        const info = await profileModel.findOne({ userID: message.author.id });
        Embed = new MessageEmbed()
            .setColor("#1ec45c")
            .setDescription(`${message.author.username}, you earned 20 <:xytera:859531350385229825> for <#863820147419512832> | Balance: ${info.hexacoins} | Bank: ${info.bank}`);

        message.author.send(Embed);
        data.Current = parseInt(message.content);
        data.save();
    } else message.delete();
});
