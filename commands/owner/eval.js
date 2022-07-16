const { inspect } = require("util");
const profileSchema = require("../../models/profileSchema");

module.exports = {
    name: "evaluate",
    aliases: ["eval"],
    description: "evaluate JavaScript Command",
    permissions: [],
    run: async (client, message, args) => {
        // message.delete()
        if (message.author.id !== "818214157152944169") return;
        const code = args.join(" ");
        if (!code) return message.reply("Please provide some code to evaluate");

        try {
            const result = await eval(code).catch((err) => console.error(err));
            let output = result;
            if (typeof (result !== "string")) {
                output = inspect(result);
            }

            message.channel.send(output, { code: "js" }).catch((err) => console.error(err));
        } catch (err) {
            console.log(err);
            message.channel.send("Evaluated content is too long to display!");
        }
    },
};
