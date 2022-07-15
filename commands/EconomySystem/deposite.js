const profileSchema = require("../../models/profileSchema");
module.exports = {
  name: "deposit",
  aliases: ["dep"],
  permissions: [],
  description: "Deposit coins into your bank!",
  run : async(client, message, args) => {
    let profileData = await profileSchema.findOne({ userID: message.author.id })

    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");
    try {
      if (amount > profileData.hexacoins) return message.channel.send(`You don't have that amount of <:gcoin:942792218748526643> to deposit`);
      await profileSchema.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            hexacoins: -amount,
            bank: amount,
          },
        }
      );
      return message.channel.send(`You deposited ${amount} of <:xytera:859531350385229825> into your bank`);
    } catch (err) {
      console.log(err);
    }
  },
};