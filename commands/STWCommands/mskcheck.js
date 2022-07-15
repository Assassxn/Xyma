const { fnclient } = require("../../index");
const fs = require("fs");
var axios = require("axios");
var data = JSON.stringify({});
const { MessageEmbed } = require("discord.js");
const epiclinks = require("../../models/epiclinks");
epicLinks = require("../../models/epiclinks");
const { returnMSKItems, returnSchematics, checkMythicLaunchers, checkMythicPistols, checkMythicScourge, checkMythicRavager, checkMythicFury } = require("../../Utils/stwFunctions");

module.exports = {
    name: "mskcheck",
    aliases: [],
    description: "checks whether the person has a MSK quest",
    hidden: true,
    permissions: [],

    run: async (client, message, args) => {
        message.delete().catch();
        let target;
        if (message.mentions.users.first()) {
            target = message.mentions.users.first().id;
        }
        if (args[0]) {
            try {
                target = client.users.cache.get(args[0]).id;
            } catch {}
        }
        if (!target) {
            return message.channel.send("Command Usage `!mskcheck @member/discordId`").then((msg) => msg.delete({ timeout: 5000 }));
        }

        linksData = await epiclinks.findOne({ guildID: message.guild.id });
        let found = false;
        await linksData.links.forEach((linkedAcc, index) => {
            if (linkedAcc.discordID === target) {
                found = true;
                var config = {
                    method: "post",
                    url: `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${linkedAcc.accountID}/public/QueryPublicProfile?profileId=campaign`,
                    headers: {
                        Authorization: `Bearer ${fnclient.authenticator.accessToken}`,
                        "Content-Type": "application/json",
                        Cookie: "EPIC_DEVICE=7ebd42f71cb44af5b2e8a25e51e8b417",
                    },
                    data: data,
                };

                axios(config)
                    .then(async (response) => {
                        items = response.data.profileChanges[0].profile.items;

                        dataToCheck = returnMSKItems(items);
                        // fs.writeFileSync("./msk.json", JSON.stringify(dataToCheck, null, 4));

                        let allSchematics = returnSchematics(items);
                        //Twine SSD 5 Not Completed
                        if (dataToCheck.length == 0) {
                            let str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                            const ssdEmbed = new MessageEmbed()
                                .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                .setColor("#0f0f0f")
                                .setTitle("Twine Peaks Stormshield")
                                .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/878341990973075466/Storm_Kings_Domain_2019.png")
                                .setDescription(
                                    `**Complete Twine Peaks Stormshield Defense 5: (**0/1**)**\n${str}\n<:StormKingsWrath:878619752623407104> ${checkMythicLaunchers(
                                        allSchematics
                                    )}\n<:StormKingsFury:878619751004385280> ${checkMythicFury(allSchematics)}\n<:StormKingsRavanger:878619751147012116> ${checkMythicRavager(
                                        allSchematics
                                    )}\n <:StormKingsScourge:878619752069759017> ${checkMythicScourge(allSchematics)}\n <:StormKingsOnslaught:878619752573054986> ${checkMythicPistols(allSchematics)}`
                                )
                                .setTimestamp();
                            message.channel.send(ssdEmbed);
                            return;
                        }
                        //No Active Quests at all
                        let counter = 0;
                        let foundActive = false;
                        await dataToCheck.forEach((item) => {
                            if (item.attributes.quest_state === "Active") {
                                foundActive = true;
                            }
                            counter++;
                            if (counter === dataToCheck.length && foundActive == false) {
                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle(`This player has no Mythic Storm King quest right now.`)
                                    .setDescription(
                                        `\n**Owned Schematics:**\n<:StormKingsWrath:878619752623407104> **${checkMythicLaunchers(
                                            allSchematics
                                        )}**<:StormKingsFury:878619751004385280> **${checkMythicFury(allSchematics)}** <:StormKingsRavanger:878619751147012116> **${checkMythicRavager(
                                            allSchematics
                                        )}** <:StormKingsScourge:878619752069759017> **${checkMythicScourge(allSchematics)}** <:StormKingsOnslaught:878619752573054986> **${checkMythicPistols(
                                            allSchematics
                                        )}**`
                                    )
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                            }
                        });
                        //King ME aka First Prequest to eliminate 2 minibosses
                        await dataToCheck.forEach((item) => {
                            if (item.templateId.startsWith("Quest:stw_stormkinghard_kingme") && item.attributes.quest_state === "Active") {
                                let str;
                                if (item.attributes.completion_stw_stormkinghard_kingme == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (item.attributes.completion_stw_stormkinghard_kingme == 1) {
                                    str = `🟥🟥🟥🟥🟥⬛⬛⬛⬛⬛`;
                                }
                                if (item.attributes.completion_stw_stormkinghard_kingme == 2) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("King Me")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/878605278461980672/storm_king.png")
                                    .setDescription(
                                        `**Eliminate 2 Epic Mini-Bosses in a 140+ zone: (**${
                                            item.attributes.completion_stw_stormkinghard_kingme
                                        }/2**)**\n${str}\n\n**Owned Schematics:**\n<:StormKingsWrath:878619752623407104> **${checkMythicLaunchers(
                                            allSchematics
                                        )}** <:StormKingsFury:878619751004385280> **${checkMythicFury(allSchematics)}** <:StormKingsRavanger:878619751147012116> **${checkMythicRavager(
                                            allSchematics
                                        )}** <:StormKingsScourge:878619752069759017> **${checkMythicScourge(allSchematics)}** <:StormKingsOnslaught:878619752573054986> **${checkMythicPistols(
                                            allSchematics
                                        )}**`
                                    )
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                        });
                        //Regicide aka First Mythic
                        await dataToCheck.forEach((item) => {
                            if (item.templateId.startsWith("Quest:stw_stormkinghard_firsttakedown") && item.attributes.quest_state === "Active") {
                                let str;
                                if (item.attributes.completion_stw_stormkinghard_firsttakedown == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (item.attributes.completion_stw_stormkinghard_firsttakedown == 1) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("Regicide")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/878341990973075466/Storm_Kings_Domain_2019.png")
                                    .setDescription(
                                        `**Eliminate the Mythic Storm King: (**${
                                            item.attributes.completion_stw_stormkinghard_kingme
                                        }/1**)**\n${str}\n\n**Owned Schematics:**\n<:StormKingsWrath:878619752623407104> **${checkMythicLaunchers(
                                            allSchematics
                                        )}**<:StormKingsFury:878619751004385280> **${checkMythicFury(allSchematics)}** <:StormKingsRavanger:878619751147012116> **${checkMythicRavager(
                                            allSchematics
                                        )}** <:StormKingsScourge:878619752069759017> **${checkMythicScourge(allSchematics)}** <:StormKingsOnslaught:878619752573054986> **${checkMythicPistols(
                                            allSchematics
                                        )}**`
                                    )
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                        });

                        //Weekly MSK Quest
                        await dataToCheck.forEach((item) => {
                            if (item.templateId.startsWith("Quest:stw_stormkinghard_weekly_showdown") && item.attributes.quest_state === "Active") {
                                let str;
                                if (item.attributes.completion_stw_stormkinghard_weekly_showdown == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (item.attributes.completion_stw_stormkinghard_weekly_showdown == 1) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("(Weekly)Defeat the Mythic Storm King!")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/878341990973075466/Storm_Kings_Domain_2019.png")
                                    .setDescription(
                                        `**Eliminate the Mythic Storm King: (**${
                                            item.attributes.completion_stw_stormkinghard_weekly_showdown
                                        }/1**)**\n${str}\n\n**Owned Schematics:**\n<:StormKingsWrath:878619752623407104> **${checkMythicLaunchers(
                                            allSchematics
                                        )}** <:StormKingsFury:878619751004385280> **${checkMythicFury(allSchematics)}** <:StormKingsRavanger:878619751147012116> **${checkMythicRavager(
                                            allSchematics
                                        )}** <:StormKingsScourge:878619752069759017> **${checkMythicScourge(allSchematics)}** <:StormKingsOnslaught:878619752573054986> **${checkMythicPistols(
                                            allSchematics
                                        )}**`
                                    )
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                        });

                        //Strom Chest
                        await dataToCheck.forEach((item) => {
                            if (item.templateId.startsWith("Quest:stw_stormkinghard_weekly_002") && item.attributes.quest_state === "Active") {
                                let str;
                                if (item.attributes.completion_stw_stormkinghard_weekly_002 == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (item.attributes.completion_stw_stormkinghard_weekly_002 == 1) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("(Weekly) Scions of the Storm King: Storm Chests")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956408465162250/sc.png")
                                    .setDescription(
                                        `Complete a Storm Chest Successful Missions in 140+ Zones: **(**${
                                            item.attributes.completion_stw_stormkinghard_weekly_002
                                        }/1**)**\n${str}\n\n**Owned Schematics:**\n<:StormKingsWrath:878619752623407104> **${checkMythicLaunchers(
                                            allSchematics
                                        )}** <:StormKingsFury:878619751004385280> **${checkMythicFury(allSchematics)}** <:StormKingsRavanger:878619751147012116> **${checkMythicRavager(
                                            allSchematics
                                        )}** <:StormKingsScourge:878619752069759017> **${checkMythicScourge(allSchematics)}** <:StormKingsOnslaught:878619752573054986> **${checkMythicPistols(
                                            allSchematics
                                        )}**`
                                    )
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                        });

                        //Minibosses
                        await dataToCheck.forEach((item) => {
                            if (item.templateId.startsWith("Quest:stw_stormkinghard_weekly_003") && item.attributes.quest_state === "Active") {
                                let str;
                                if (item.attributes.completion_stw_stormkinghard_weekly_003 == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (item.attributes.completion_stw_stormkinghard_weekly_003 == 1) {
                                    str = `🟥🟥🟥⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (item.attributes.completion_stw_stormkinghard_weekly_003 == 2) {
                                    str = `🟥🟥🟥🟥🟥🟥⬛⬛⬛⬛`;
                                }
                                if (item.attributes.completion_stw_stormkinghard_weekly_003 == 3) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("(Weekly) Scions of the Storm King: Minibosses")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png")
                                    .setDescription(
                                        `Defeat 3 Minibosses in Successful Missions in 140+ Zones: **(**${
                                            item.attributes.completion_stw_stormkinghard_weekly_003
                                        }/3**)**\n${str}\n\n**Owned Schematics:**\n<:StormKingsWrath:878619752623407104> **${checkMythicLaunchers(
                                            allSchematics
                                        )}** <:StormKingsFury:878619751004385280> **${checkMythicFury(allSchematics)}** <:StormKingsRavanger:878619751147012116> **${checkMythicRavager(
                                            allSchematics
                                        )}** <:StormKingsScourge:878619752069759017> **${checkMythicScourge(allSchematics)}** <:StormKingsOnslaught:878619752573054986> **${checkMythicPistols(
                                            allSchematics
                                        )}**`
                                    )
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                        });

                        //Mist Monsters
                        await dataToCheck.forEach((item) => {
                            if (item.templateId.startsWith("Quest:stw_stormkinghard_weekly_004") && item.attributes.quest_state === "Active") {
                                let str;
                                let num = item.attributes.completion_stw_stormkinghard_weekly_004;
                                if (num == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num == 2 || num == 1) {
                                    str = `🟥⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num == 4 || num == 3) {
                                    str = `🟥🟥⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num == 6 || num == 5) {
                                    str = `🟥🟥🟥⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num == 8 || num == 7) {
                                    str = `🟥🟥🟥🟥⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num == 10 || num == 9) {
                                    str = `🟥🟥🟥🟥🟥⬛⬛⬛⬛⬛`;
                                }
                                if (num == 12 || num == 11) {
                                    str = `🟥🟥🟥🟥🟥🟥⬛⬛⬛⬛`;
                                }
                                if (num == 14 || num == 13) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥⬛⬛⬛`;
                                }
                                if (num == 16 || num == 15) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥⬛⬛`;
                                }
                                if (num == 18 || num == 17) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛`;
                                }
                                if (num == 20 || num == 19) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("(Weekly) Scions of the Storm King: Mist Monsters")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956340320305152/mist-monster.png")
                                    .setDescription(
                                        `Eliminate 20 Mist Monsters in Successful Missions in 140+ Zones: **(**${
                                            item.attributes.completion_stw_stormkinghard_weekly_004
                                        }/20**)**\n${str}\n\n**Owned Schematics:**\n<:StormKingsWrath:878619752623407104> **${checkMythicLaunchers(
                                            allSchematics
                                        )}** <:StormKingsFury:878619751004385280> **${checkMythicFury(allSchematics)}** <:StormKingsRavanger:878619751147012116> **${checkMythicRavager(
                                            allSchematics
                                        )}** <:StormKingsScourge:878619752069759017> **${checkMythicScourge(allSchematics)}** <:StormKingsOnslaught:878619752573054986> **${checkMythicPistols(
                                            allSchematics
                                        )}**`
                                    )
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                        });

                        //survivors
                        await dataToCheck.forEach((item) => {
                            if (item.templateId.startsWith("Quest:stw_stormkinghard_weekly_005") && item.attributes.quest_state === "Active") {
                                let str;
                                let num = item.attributes.completion_stw_stormkinghard_weekly_005;
                                if (num == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num == 1) {
                                    str = `🟥⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num == 2) {
                                    str = `🟥🟥⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num == 3) {
                                    str = `🟥🟥🟥⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num == 4) {
                                    str = `🟥🟥🟥🟥⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num == 5) {
                                    str = `🟥🟥🟥🟥🟥⬛⬛⬛⬛⬛`;
                                }
                                if (num == 6) {
                                    str = `🟥🟥🟥🟥🟥🟥⬛⬛⬛⬛`;
                                }
                                if (num == 7) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥⬛⬛⬛`;
                                }
                                if (num == 8) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥⬛⬛`;
                                }
                                if (num == 9) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛`;
                                }
                                if (num == 10) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("(Weekly) Scions of the Storm King: Survivors")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956429974339624/survivors.png")
                                    .setDescription(
                                        `Rescue 10 Survivors in Successful Missions in 140+ Zones: **(**${
                                            item.attributes.completion_stw_stormkinghard_weekly_005
                                        }/10**)**\n${str}\n\n**Owned Schematics:**\n<:StormKingsWrath:878619752623407104> **${checkMythicLaunchers(
                                            allSchematics
                                        )}** <:StormKingsFury:878619751004385280> **${checkMythicFury(allSchematics)}** <:StormKingsRavanger:878619751147012116> **${checkMythicRavager(
                                            allSchematics
                                        )}** <:StormKingsScourge:878619752069759017> **${checkMythicScourge(allSchematics)}** <:StormKingsOnslaught:878619752573054986> **${checkMythicPistols(
                                            allSchematics
                                        )}**`
                                    )
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                        });

                        //elementals
                        await dataToCheck.forEach((item) => {
                            if (item.templateId.startsWith("Quest:stw_stormkinghard_weekly_007") && item.attributes.quest_state === "Active") {
                                let str;
                                let num = item.attributes.completion_stw_stormkinghard_weekly_007;
                                if (num < 30) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num < 60 && num >= 30) {
                                    str = `🟥⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num < 90 && num >= 60) {
                                    str = `🟥🟥⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num < 120 && num >= 90) {
                                    str = `🟥🟥🟥⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num < 150 && num >= 120) {
                                    str = `🟥🟥🟥🟥⬛⬛⬛⬛⬛⬛`;
                                }
                                if (num < 180 && num >= 150) {
                                    str = `🟥🟥🟥🟥🟥⬛⬛⬛⬛⬛`;
                                }
                                if (num < 210 && num >= 180) {
                                    str = `🟥🟥🟥🟥🟥🟥⬛⬛⬛⬛`;
                                }
                                if (num < 240 && num >= 210) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥⬛⬛⬛`;
                                }
                                if (num < 270 && num >= 240) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥⬛⬛`;
                                }
                                if (num < 300 && num >= 270) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛`;
                                }
                                if (num == 300) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("(Weekly) Scions of the Storm King: Elemental Husks")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956386604974110/elemental-husks.png")
                                    .setDescription(
                                        `Eliminate 300 Elementals in successful missions in 140+ Zones: **(**${
                                            item.attributes.completion_stw_stormkinghard_weekly_007
                                        }/300**)**\n${str}\n\n**Owned Schematics:**\n<:StormKingsWrath:878619752623407104> **${checkMythicLaunchers(
                                            allSchematics
                                        )}** <:StormKingsFury:878619751004385280> **${checkMythicFury(allSchematics)}** <:StormKingsRavanger:878619751147012116> **${checkMythicRavager(
                                            allSchematics
                                        )}** <:StormKingsScourge:878619752069759017> **${checkMythicScourge(allSchematics)}** <:StormKingsOnslaught:878619752573054986> **${checkMythicPistols(
                                            allSchematics
                                        )}**`
                                    )
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                        });

                        fs.writeFileSync("./test.json", JSON.stringify(dataToCheck, null, 4));
                    })
                    .catch((err) => console.error(err));
            }
            if (index + 1 === linksData.links.length && found === false) {
                return message.channel.send(
                    `${client.users.cache.get(
                        target
                    )}, You need to go to <#871364695049797652> to link your Account then go to <#851171690586570802> and react with <:MythicSchematicCache:878609026294886420> to get your Free MSK Carry!`
                );
            }
        });
    },
};