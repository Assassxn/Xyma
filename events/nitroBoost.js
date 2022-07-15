const { MessageEmbed, MessageAttachment } = require("discord.js");
const { client } = require("../index");
const Canvas = require("canvas");
const boosts = require('../models/boosts');

var welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1000, 350);
welcomeCanvas.context = welcomeCanvas.create.getContext("2d");

Canvas.loadImage("./assets/boost.png").then(async (img) => {
    welcomeCanvas.context.drawImage(img, 0, 0, 1000, 350);
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    const channel = client.channels.cache.get("816061919780667432");
    const dumpChannel = client.channels.cache.get("845954962277531648");

    // console.log(oldMember.premiumSince, newMember.premiumSince)
    // if(newMember.premiumSince === null) return client.channels.cache.get("875330855185289287").send("Not a booster");

    if (oldMember.premiumSince !== newMember.premiumSince) {
        avatar = newMember.user.displayAvatarURL({ size: 1024, dynamic: false, format: "png" });

        let canvas = welcomeCanvas;
        await Canvas.loadImage(newMember.user.displayAvatarURL({ format: "png", size: 1024 })).then((img) => {
            canvas.context.beginPath();
            canvas.context.arc(819, 175, 119, 0, Math.PI * 2, true);
            canvas.context.closePath();
            canvas.context.clip();
            canvas.context.drawImage(img, 700, 56, 238, 238);
        });
        let file = new MessageAttachment(canvas.create.toBuffer(), `boost.png`);

        dumpChannel.send(file).then(async (msg) => {
            try {
                const embed = new MessageEmbed()
                    .setColor("#ef0022")
                    .setDescription(
                        `<a:boost:862068709770526770> ${newMember} just boosted the server!\n<a:party:874637569130917888> Thank you so much for the boost!\n<a:serverBoosting:874381415784005633> We now have **${newMember.guild.premiumSubscriptionCount}** boosts and we are level **${newMember.guild.premiumTier}** Boost`
                    )
                    .setImage(msg.attachments.first().url);
                await channel.send(embed).then(async(msg) => {
                    msg.react("<:xytera:859531350385229825>");
                    toSave = await boosts.create({
                        messageId: msg.id,
                        userIds: [],
                    });
                    toSave.save();
                });
                msg.delete().catch();
            } catch (error) {
                console.log(error);
            }
        });
    }
});
//#ef0022
//#ff39f8

//874299338791219201


//    if (oldMember.premiumSince !== newMember.premiumSince) {