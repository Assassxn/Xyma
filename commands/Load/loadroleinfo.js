const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "load-roleinfo",
  aliases: ["load-ri", "ri"],
  permissions: ["ADMINISTRATOR"],
  description: "Sets up a reaction role message!",
  run: async (client, message, args) => {
    message.delete();
    await message.channel.send("https://cdn.discordapp.com/attachments/845954962277531648/859159529308553256/output-onlinepngtools_21.png");
    await message.channel.send("https://cdn.discordapp.com/attachments/845954962277531648/859159551269273620/output-onlinepngtools_20.png");
    const owner = new MessageEmbed()
      .setDescription("<@&844316500768981045>\n> The Founder of this Awesome Server!")
      .setColor("#f1c40f")
      .addFields(
        {
          name: "OWNER",
          value: "<@535190610185945138>",
        },
        {
          name: "CO-OWNER",
          value: "TBD",
        }
      )
      .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png")
      .setFooter("Applications opening soon");
    await message.channel.send(owner)

    const mod = new MessageEmbed()
      .setDescription("<@&814980966107840522>\n> Handle escalations and infractions")
      .setColor("#e98931")
      .addFields({
        name: "MEMBERS",
        value: "<@338993781581938688>",
      })
      .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png")
      .setFooter("Applications opening soon");
    await message.channel.send(mod);
    const cs = new MessageEmbed()
      .setColor("#ffd9b2")
      .setDescription(
        "<@&858975716652482581>\n>>> Create a welcoming environment that encourages members to openly chat and game together without concerns of toxicity or judgment. Grants access to <#815929868566528020> tickets. Grants <@&816040746721345588>"
      )
      .addFields(
        {
          name: "MANAGER",
          value: "TBD",
        },

        {
          name: "MEMBERS",
          value: "TBD",
        },

        {
          name: "TRIAL MEMBERS",
          value: "TBD",
        }
      )
      .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png")
      .setFooter("Applications opening soon");
    await message.channel.send(cs);
    const shopkeeper = new MessageEmbed()
      .setColor("#00bfff")
      .setDescription("<@&816051657406152774>\n> Help with `XYTERA SHOP` and `STW GIVEAWAY`. Grants <@&816040746721345588>")
      .addFields(
        {
          name: "MANAGER",
          value: "TBD",
        },
        {
          name: "MEMBERS",
          value: "TBD",
        }
      )
      .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png")
      .setFooter("Applications opening soon");
    await message.channel.send(shopkeeper);
    await message.channel.send("https://cdn.discordapp.com/attachments/845954962277531648/859177525716713492/output-onlinepngtools_22.png");

    const nitroBooster = new MessageEmbed()
      .setColor("#f47fff")
      .setDescription(
        "<@&816040746721345588>\n>>> Access to <#816042497251475457>, eligibility for special `XYTERA SHOP` items in \n<#822960894953914398> and unlocks the name <@&816043015147749397> colour"
      )
      .addFields({
        name: "GET THIS ROLE:",
        value: "Exclusive role for <@&816043554144649256>, <@&816044641287405639>, and select members",
      })
      .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png")
      .setFooter("Applications opening soon");
    await message.channel.send(nitroBooster);


    const embed = new MessageEmbed()
      .setDescription("<@&816044641287405639>\n>>> Grants the <@&816040746721345588> role and unlocks the <@&816046227011534858> color name")
      .setColor("#f47fff")
      .addFields({
        name: "GET THIS ROLE:",
        value: "<a:boost:862068709770526770> Boost this server",
      })
      .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png");
    message.channel.send(embed);

  }
};
