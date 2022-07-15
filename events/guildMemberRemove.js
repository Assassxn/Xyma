const { client } = require("../index");

client.on("guildMemberRemove", async (member) => {
    joinLeaveChan = client.channels.cache.get("878683911423668275");

    joinLeaveChan.send(`LEAVE: ${member} | ID: \`${member.id}\``);
});
