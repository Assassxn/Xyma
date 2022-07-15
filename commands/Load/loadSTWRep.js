const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "load-stw-rep",
    aliases: ["loadstwrep", "loadrep"],
    permissions: ["ADMINISTRATOR"],
    hidden: true,
    description: "Sets up a reaction role message!",
    run: async (client, message, args) => {
        message.delete();
        await message.channel.send("https://cdn.discordapp.com/attachments/845954962277531648/869675895626018826/Reputation.png");

        reputationEmbed = new MessageEmbed()
            .setColor("0f0f0f")
            .setDescription(
                `**REPUTATION LEVELS**\n> \`Level 0\`⚪⚪⚪⚪⚪ = 1 reputation\n> \`Level 1\`🔴⚪⚪⚪⚪ = 25 reputation\n> \`Level 2\`🔴🔴⚪⚪⚪ = 100 reputation\n> \`Level 3\`🔴🔴🔴⚪⚪ = 250 reputaion\n> \`Level 4\`🔴🔴🔴🔴⚪ = 500 reputation\n> \`Level 5\`🔴🔴🔴🔴🔴 = 1000 reputation\n\n**REWARDS**\n> <:redarrow:858780571382448148> Reputation Roles displayed in your profile\n> <:redarrow:858780571382448148> Earn **Xytera** at each Level! Amount = Rep x 100 <:xytera:859531350385229825>`
            )
            .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png")
            .setFooter("Reputation Types: Crafting, Mission Helper, MSK Carrier, Endurance");

        await message.channel.send(reputationEmbed);
        await message.channel.send("https://cdn.discordapp.com/attachments/845954962277531648/869994094968049704/Crafter.png");

        crafterEmbed = new MessageEmbed()
            .setColor("0f0f0f")
            .setDescription(
                `**REPUTATION INFO**\n> Anyone can register as a crafter in <#857706982718963764> - you must\n> have at least one 130+ schematic with all legendary perks.\n> Crafting at \`ONYX\` is always free, you are not allowed to charge.\n> Requestors provide the crafting material\n\n**HOW DO I EARN CRAFTING REP?**\n> After registering as a <@&857712152167972887> claim requests in <#869996817230733322>\n> by reacting to posts with 🔵 in <#869996817230733322>. After completing\n> the crafting request react with <:red_check_mark:870189174555312148> to the post to recieve your\n> reputation\n\n**NOTE**\n> <:redarrow:858780571382448148> Crafting rep is **one** rep per requestor per **day**!`
            )
            .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png");

        await message.channel.send(crafterEmbed);
        await message.channel.send("https://cdn.discordapp.com/attachments/845954962277531648/870387276537024522/Mission_Helper.png");

        missionEmbed = new MessageEmbed()
            .setColor("0f0f0f")
            .setDescription(
                `**REPUTATION INFO**\n> You are encouraged to help others with missions and taxis, and\n> you earn reputation everytime you help\n\n**HOW DO I EARN STW REP**\n> Self assign <@&839941689329319999> role in <#857706982718963764>, claim\n> requests by reacting with 🔵 to posts in <#844650142627004416>,\n> <#870388989020995594> or <#870389214678749225>. After Completing the\n> mission, request reputation by reacting with <:red_check_mark:870189174555312148>`
            )
            .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png");

        await message.channel.send(missionEmbed)
        await message.channel.send("https://cdn.discordapp.com/attachments/845954962277531648/870391717126373396/MSK_Carrier.png");

        mskEmbed = new MessageEmbed()
            .setColor("0f0f0f")
            .setDescription(
                `**WHAT IS AN MSK CARRIER**\n> <@&816053943654154260> players who make this an incredible community by\n> helping others defeat the Mythic Storm King to earn Mythic\n> Schematics!\n\n**HOW DO I EARN MSK CARRY REP?**\n> Attain the <@&816053943654154260> role then claim request by reacting with\n> 🔵 to posts in <#823322273703526430> or <#823316825835569222>. After\n> completing the carry, request reputation by reacting with <:red_check_mark:870189174555312148> to\n> the post and tagging the teammate that helped you!`
            )
            .setImage("https://cdn.discordapp.com/attachments/845954962277531648/858740195095216138/HEHE.png");

        await message.channel.send(mskEmbed);
    },
};
