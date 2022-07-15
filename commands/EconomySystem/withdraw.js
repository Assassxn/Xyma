const profileSchema = require("../../models/profileSchema");
module.exports = {
    name: "withdraw",
    aliases: ["wd"],
    permissions: [],
    description: "withdraw coins from your bank",
    run: async (client, message, args) => {
        let profileData = await profileSchema.findOne({ userID: message.author.id });
        const amount = args[0];
        if (amount % 1 != 0 || amount <= 0) return message.channel.send("Withdrawn amount must be a whole number");

        try {
            if (amount > profileData.bank) return message.channel.send(`You don't have that amount of <:xytera:859531350385229825> to withdraw`);

            await profileSchema.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        hexacoins: amount,
                        bank: -amount,
                    },
                }
            );
            return message.channel.send(`You withdrew ${amount} of <:xytera:859531350385229825> into your wallet`);
        } catch (err) {
            console.log(err);
        }
    },
};
