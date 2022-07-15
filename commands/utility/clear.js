module.exports = {
    name: "clear",
    permissions: [],
    hidden: true,
    aliases: ["purge", "c"],
    run: async (client, message, args) => {
        try {
            if (!args[0]) return message.channel.send("Please specify a number of messages to delete ranging from `1 - 99`").then((msg) => msg.delete({ timeout: 2000 }));
            if (isNaN(args[0])) return message.channel.send("Numbers are only allowed").then((msg) => msg.delete({ timeout: 2000 }));
            if (parseInt(args[0]) > 99) return message.channel.send("The max amount of messages that I can delete is `99`").then((msg) => msg.delete({ timeout: 2000 }));
            await message.channel.bulkDelete(parseInt(args[0]) + 1).catch((err) => console.log(err));
        } catch {}
    },
};
