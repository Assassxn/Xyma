const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "load-ua",
  aliases: ["ua"],
  permissions: ["ADMINISTRATOR"],
  description: "Sets up a reaction role message!",
  run: async (client, message, args) => {
    message.delete();
    useragreement = message.guild.channels.cache.find((c) => c.id == "858105604249878546");
    await useragreement.send("https://cdn.discordapp.com/attachments/845954962277531648/858751081328279562/output-onlinepngtools_3.png");
    firstEmbed = new MessageEmbed().setColor('0f0f0f').setDescription('**Our goal at ONYX is to create a supportive community where members can enjoy chatting and gaming together. We want to be supportive of each other while becoming better gamers and people.\n\nOur Community is built on the following guidlines**').setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png")
    await useragreement.send(firstEmbed)
    await useragreement.send('https://cdn.discordapp.com/attachments/845954962277531648/858776616830369882/output-onlinepngtools_12.png')
    secondEmbed = new MessageEmbed().setColor('#0f0f0f').setDescription('❤️ **We are a diverse community that appreciates each member\n\n❤️ Differences of opinion are ok but personal attacks are not ok\n\n❤️ Follow the rules & comply wuth ONYX Leadership**').setImage('https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png')
    await useragreement.send(secondEmbed);
    await useragreement.send("https://cdn.discordapp.com/attachments/845954962277531648/858776965779292180/output-onlinepngtools_14.png");
    thirdEmbed = new MessageEmbed().setColor('#0f0f0f').setDescription("❤️ Promote positive vibes\n\n❤️ It's ok to feel down sometimes; we are here for you\n\n❤️ When you need help, just ask or open a help desk ticket!").setImage('https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png')
    await useragreement.send(thirdEmbed)
    await useragreement.send("https://cdn.discordapp.com/attachments/845954962277531648/858776801920155648/output-onlinepngtools_13.png")
    fourthEmbed = new MessageEmbed().setColor('#0f0f0f').setDescription("❤️ Join discussions and play mini-games\n\n❤️ Earn hexacoins to unlock ranks & new colors!\n\n❤️ Encourage others to follow the rules, but do not 'mini-mod'").setImage('https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png')
    await useragreement.send(fourthEmbed)
    await useragreement.send("https://cdn.discordapp.com/attachments/845954962277531648/858776111672459264/output-onlinepngtools_10.png")
    await useragreement.send("https://cdn.discordapp.com/attachments/845954962277531648/858776285579837460/output-onlinepngtools_11.png")
    fifthEmbed = new MessageEmbed().setColor('#0f0f0f').setTitle("__HOW TO ACCEPT THE USER AGREEMENT__").setDescription("> **Scroll to the top**\n\n> **Read each message**\n\n> Then type `agree`").setImage('https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png').setFooter("The above values are not intended to be an all inclusive list of rules. Discord ToS, Discord Community Guidlines, and common sense rules apply.")
    await useragreement.send(fifthEmbed);
  },
};