module.exports = {
  name: "load-ranksAndRoles",
  aliases: ["load-rr", "rr"],
  permissions: ["ADMINISTRATOR"],
  description: "Sets up a reaction role message!",
  run: async (client, message, args) => {
    message.delete();
    await message.channel.send("https://cdn.discordapp.com/attachments/845954962277531648/877858349159440404/Final_Ranks.png");

    let Images = [
        "https://cdn.discordapp.com/attachments/845954962277531648/877808497927004180/imageedit_1_2335385693.png",
        "https://cdn.discordapp.com/attachments/845954962277531648/877808496458997780/imageedit_1_5324930077.png",
        "https://cdn.discordapp.com/attachments/845954962277531648/877808495431385138/imageedit_1_3343988271.png",
        "https://cdn.discordapp.com/attachments/845954962277531648/877808494034690068/imageedit_1_6398203521.png",
        "https://cdn.discordapp.com/attachments/845954962277531648/877808490142380072/imageedit_1_2933647691.png",
        "https://cdn.discordapp.com/attachments/845954962277531648/877808492960964608/imageedit_1_8437174135.png",
        "https://cdn.discordapp.com/attachments/845954962277531648/877808491425853440/imageedit_1_5650043728.png",
        "https://cdn.discordapp.com/attachments/845954962277531648/877808486774366238/imageedit_1_4698012943.png",
        "https://cdn.discordapp.com/attachments/845954962277531648/877808488703725579/imageedit_1_9509522686.png",
    ];
    Images.reverse()

    for(let i = 0; i<Images.length; i++){
      await message.channel.send(Images[i]).then((img) => {
        if(i == Images.length-1){
          // img.react("<a:checkmark:858747859528056872>");
          img.react("<a:blackcheckmark:877846386236854282>");
        }
      })
    }
  },
};
