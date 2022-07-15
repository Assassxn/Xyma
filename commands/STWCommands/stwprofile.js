const { fnclient } = require("../../index");
const fs = require("fs");
var axios = require("axios");
var data = JSON.stringify({});
const { MessageEmbed } = require("discord.js");

const {
    returnSchematics,
    checkMythicLaunchers,
    checkMythicPistols,
    checkMythicScourge,
    checkMythicRavager,
    checkMythicFury,
    returnHeroLoadoutCount,
    returnHeroCount,
    returnDefenderCount,
    returnSurvivorCount,
    returnSchematicsCount,
} = require("../../Utils/stwFunctions");

module.exports = {
    name: "stwprofile",
    aliases: [],
    description: "hehe",
    hidden: true,
    permissions: [],

    run: async (client, message, args) => {
        message.delete().catch();
        if (!args[0]) return message.channel.send("Please specify an account ID to look for");

        var config = {
            method: "post",
            url: `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${args[0]}/public/QueryPublicProfile?profileId=campaign`,
            headers: {
                Authorization: `Bearer ${fnclient.authenticator.accessToken}`,
                "Content-Type": "application/json",
                Cookie: "EPIC_DEVICE=7ebd42f71cb44af5b2e8a25e51e8b417",
            },
            data: data,
        };

        axios(config)
            .then(async(response) => {
                fs.writeFileSync("./test.json", JSON.stringify(response.data.profileChanges[0], null, 4));
                let stats = response.data.profileChanges[0].profile.stats;
                let items = response.data.profileChanges[0].profile.items;
                let allSchematics = returnSchematics(items);

                await fnclient.lookup.lookupByUserId(response.data.profileChanges[0].profile.accountId).then(async (res) => {

                    let name;
                    let foundOne = false;
                    if (res.displayName) {
                        name = res.displayName;
                        foundOne = true;
                    } else {
                        if (!foundOne) {
                            if (res.externalAuths.psn) {
                                foundOne = true;
                                name = res.externalAuths.psn.externalDisplayName
                            }
                        }
                        if (!foundOne) {
                            if (res.externalAuths.xbl) {
                                foundOne = true;
                                name = res.externalAuths.xbl.externalDisplayName
                            }
                        }
                        if (!foundOne) {
                            if (res.externalAuths.nintendo) {
                                foundOne = true;
                                name = `No Display Name`
                            }
                        }
                    }


                    mythicLaunchers = checkMythicLaunchers(allSchematics);
                    mythicPistols = checkMythicPistols(allSchematics);
                    mythicScourge = checkMythicScourge(allSchematics);
                    mythicRavager = checkMythicRavager(allSchematics);
                    mythicFury = checkMythicFury(allSchematics);
                    loadoutCount = returnHeroLoadoutCount(items);
                    heroCount = returnHeroCount(items, 25);
                    defenderCount = returnDefenderCount(items, 25);
                    survivorCount = returnSurvivorCount(items, 25);
                    schematicsCount = returnSchematicsCount(allSchematics, 50);

                    let CommanderLevel = stats.attributes.rewards_claimed_post_max_level + stats.attributes.level;

                    const embed = new MessageEmbed()
                        .setColor("#f1c40f")
                        .setDescription(
                            `**Epic Username: **\`${name}\`\n\n**Commander Level: **${CommanderLevel}\n\n**Logged in Days [${stats.attributes.daily_rewards.totalDaysLoggedIn} Days]**\n\n__**Research Lab**__\n<:Fortitude:878766104858755103> **${stats.attributes.research_levels.fortitude}** <:Offense:878766104800022558> **${stats.attributes.research_levels.offense}** <:Resistance:878767078771933184> **${stats.attributes.research_levels.resistance}** <:Tech:878766104925855774> **${stats.attributes.research_levels.technology}**\n\n__**Collection Book**__\n**Level: **${stats.attributes.collection_book.maxBookXpLevelAchieved}\n**Unslot Cost: **${stats.attributes.unslot_mtx_spend} <:Vbuck:878957836049195008>\n\n__**Summary**__\n**Hero Loadouts: **${loadoutCount}\n**Heroes: **${heroCount} [69 > 144⚡]\n**Defenders: **${defenderCount} [69 > 130⚡]\n**Survivor: **${survivorCount} [69 > 144⚡]\n**Schematics: **${schematicsCount} [130 > 144⚡]\n${mythicLaunchers}x <:StormKingsWrath:878619752623407104> ${mythicFury}x <:StormKingsFury:878619751004385280> ${mythicRavager}x <:StormKingsRavanger:878619751147012116> ${mythicScourge}x <:StormKingsScourge:878619752069759017> ${mythicPistols}x <:StormKingsOnslaught:878619752573054986>`
                        )
                        .setTimestamp();

                    message.channel.send(embed);
                });
            })
            .catch(err => console.error(err));
    },
};



// let str = `Collection Book Level: **${stats.collection_book.maxBookXpLevelAchieved}**\n${stats.gameplay_stats[0].statName}: **${stats.gameplay_stats[0].statValue}**\nUnslot Cost: **${stats.unslot_mtx_spend}**\nOffence: **${stats.research_levels.offense}**\nTechnology: **${stats.research_levels.technology}**\nResistance: **${stats.research_levels.resistance}**\nFortitude: **${stats.research_levels.fortitude}**\nLevel: **${stats.level}**\nXP Overflow: **${stats.xp_overflow}**\nMatches Played: **${stats.matches_played}**\nDays Logged In: **${stats.daily_rewards.totalDaysLoggedIn}**`
