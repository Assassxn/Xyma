// const Discord = require("discord.js");
// const { client } = require("../index");

// client.on("messageDelete", async (messageDelete) => {
//     try {
//         await Discord.Util.delayFor(900);
//         const fetchedLogs = await messageDelete.guild
//             .fetchAuditLogs({
//                 limit: 1,
//                 type: "MESSAGE_DELETE",
//             })
//             .catch(console.error);

//             fetchedLogs.forEach((log) => {
//                 console.log(log.executor, log.target)
//             })
//         // console.log(fetchedLogs.first().executor, fetchedLogs.first().target);

//         const executor = fetchedLogs.executor ? fetchedLogs.executor.tag : "Unknown";

//         const DeleteEmbed = new Discord.MessageEmbed()
//             .setTitle("DELETED MESSAGE")
//             .setColor("#fc3c3c")
//             // .addField("Author", messageDelete.author.tag, true)
//             .addField("Deleted By", executor, true)
//             .addField("Channel", messageDelete.channel, true)
//             // .addField("Message", messageDelete.content || "None")
//             .setFooter(`Message ID: ${messageDelete.id} `); //| Author ID: ${messageDelete.author.id}

//         client.channels.cache.find((x) => x.id == "887981272083873812").send(DeleteEmbed);
//     } catch (err) {
//         console.log(err);
//     }
// });
