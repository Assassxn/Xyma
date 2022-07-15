const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "pay",
  aliases: ["give"],
  permissions: ["ADMINISTRATOR"],
  hidden: true,
  description: "pay a player some hexacoins",
  run: async (client, message, args) => {
    if (message.member.id != "535190610185945138") return message.channel.send(`Sorry only **Assassinツ** can run this command 😔`);
    if (!args.length) return message.channel.send("You need to mention a player to give them <:xytera:859531350385229825>");
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send("That user does not exist");

    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send(`This user doens't exist in the db`);

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            hexacoins: amount,
          },
        }
      );

      return message.channel.send(`Successfully granted ${target} ${amount} <:xytera:859531350385229825>`);
    } catch (err) {
      console.log(err);
    }
  },
};