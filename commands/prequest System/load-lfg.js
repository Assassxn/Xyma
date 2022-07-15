const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "load-lfg",
  aliases: ["lfg"],
  permissions: ["ADMINISTRATOR"],
  description: "Load up ",
  run : async(client, message, args) => {
    message.delete();

    //prequest Main Message
    const miniboss = client.emojis.cache.get("862262665199747073"); 
    const survivors = client.emojis.cache.get("862961564969205770");
    const mist_monsters = client.emojis.cache.get("862961701384224808");
    const sc = client.emojis.cache.get("862962011611332608");
    const elementals = client.emojis.cache.get("862962169880772618");
    let PrequestEmbed = new MessageEmbed()
      .setTitle("__**PREQUEST CARRY REQUEST**__\n\n")
      .setColor("#9b59b6")
      .setThumbnail("https://cdn.discordapp.com/emojis/657360895499829258.png")
      .setDescription(
        `Price: \`500\`<:xytera:859531350385229825>\n\n` +
        `${miniboss.toString()} Mini Bosses\n\n` +
          `${survivors.toString()} Survivors\n\n` +
          `${mist_monsters.toString()} Mist Monsters\n\n` +
          `${sc.toString()} Storm Chest\n\n` +
          `${elementals.toString()} Elemental Husks\n\n`
      );

    await message.channel.send(PrequestEmbed).then((msg) => {
      msg.react(miniboss);
      msg.react(survivors);
      msg.react(mist_monsters);
      msg.react(sc);
      msg.react(elementals);
    });
  }
};
