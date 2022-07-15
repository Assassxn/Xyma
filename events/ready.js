const { client } = require("../index");
const got = require("got");
require("dotenv").config();
const prefix = process.env.PREFIX;
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
// const blIDs = require('../models/lfgBlacklist')
// const moment = require("moment");
// const tempLinksSchema = require("../models/tempLinks");

client.on("ready", async () => {
    // obj = {
    //   ID: "Default",
    //   time: `${moment().format("MMMM Do YYYY, h:mm:ss a")}`,
    //   reason: "Default"
    // };
    // let data = await blIDs.create({ guildID: "807213094743965696", blIDs: [] });
    // data.save();

    // await blIDs.findOneAndUpdate({ guildID: "807213094743965696"}, { $push: { blIDs: obj } });

    // toSave = await tempLinksSchema.create({
    //     tempLinks: [],
    // });
    // toSave.save();

    client.user.setActivity(`${prefix}help`);
    console.log(`${client.user.username} ✅`);

    //automeme -----------------------------------------------------
    const channel = client.channels.cache.get("865142237548642304");
    time = ms("1 hour");
    time = parseInt(time);

    setInterval(() => {
        got("https://www.reddit.com/r/memes/random/.json").then((res) => {
            let content = JSON.parse(res.body);
            channel.send(
                new MessageEmbed()
                    .setTitle(content[0].data.children[0].data.title)
                    .setImage(content[0].data.children[0].data.url)
                    .setColor("RANDOM")
                    .setFooter(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`)
            );
        });
    }, time);
});
