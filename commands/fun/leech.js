const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "leech",
    permissions: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
        let spots = args[0];
        let description = args.slice(1).join(" ");
        let embed;
        // if(spots == 1){
        //     spaces = `Spots 1: `;
        // }else if(spots == 2){
        //     spaces = `Spot 1: \nSpot 2: `;
        // }else if(spots == 3){
        //     spaces = `Spot 1: \nSpot 2: \nSpot 3: `;
        // }

        // embed = new MessageEmbed().setColor("#0f0f0f").setTitle(description).setTimestamp();

        // message.channel.send(embed).then(async (msg) => {
        //     if (spots == 1) {
        //         await msg.react("1️⃣");
        //     }
        //     if (spots == 2) {
        //         await msg.react("1️⃣");
        //         await msg.react("2️⃣");
        //     }
        //     if (spots == 3) {
        //         await msg.react("1️⃣");
        //         await msg.react("2️⃣");
        //         await msg.react("3️⃣");
        //     }

        //     let firstUserName = "";
        //     let secondUserName = "";
        //     let thirdUserName = "";
        //     let claimedFirst = false;
        //     let claimedSecond = false;
        //     let claimedThird = false;

        //     client.on("messageReactionAdd", async(reaction, user) => {
        //         if (reaction.message.partial) await reaction.message.fetch();
        //         if (reaction.partial) await reaction.fetch();
        //         if (!reaction.message.guild || user.bot) return;
        //         userID = user.id;
        //         if(reaction.message.id == msg.id){
        //             if (reaction.emoji.name == "one") {
        //                 if (!claimedFirst) {
        //                     client.users.cache.get(userID).username;
        //                     msg.edit(embed.setDescription(`Spot 1: ${firstUserName}\nSpot 2: ${secondUserName}\nSpot 3: ${thirdUserName}`));
        //                     claimedFirst = true;
        //                     reaction.users.remove(user.id);
        //                     reaction.users.remove(client.id);
        //                 }
        //             }
        //             if (reaction.emoji.name == "two") {
        //                 if (!claimedSecond) {
        //                     client.users.cache.get(userID).username;
        //                     msg.edit(embed.setDescription(`Spot 1: ${firstUserName}\nSpot 2: ${secondUserName}\nSpot 3: ${thirdUserName}`));
        //                     claimedSecond = true;
        //                     reaction.users.remove(user.id);
        //                     reaction.users.remove(client.id);
        //                 }
        //             }
        //             if (reaction.emoji.name == "three") {
        //                 if (!claimedThird) {
        //                     client.users.cache.get(userID).username;
        //                     msg.edit(embed.setDescription(`Spot 1: ${firstUserName}\nSpot 2: ${secondUserName}\nSpot 3: ${thirdUserName}`));
        //                     claimedThird = true;
        //                     reaction.users.remove(user.id);
        //                     reaction.users.remove(client.id);
        //                 }
        //             }
        //         }
        //     })
        // });
    },
};
