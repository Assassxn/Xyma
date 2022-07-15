const { client } = require("../index");
client.on("message", async (message) => {
    if (message.channel.parentID !== "830917202302468147") return;
    client.ticketTranscript.findOne({ Channel: message.channel.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.Content.push(`${message.author.tag} : ${message.content}`);
        } else {
            data = new client.ticketTranscript({ Channel: message.channel.id, Content: `${message.author.tag} : ${message.content}` });
        }
        await data.save().catch((err) => console.log(err));
    });
});
