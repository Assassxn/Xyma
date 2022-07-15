const { fnclient } = require("../../index");
// const fs = require("fs");
var axios = require("axios");
var data = JSON.stringify({});
const { MessageEmbed } = require("discord.js");
const { returnMSKItems, returnMSKStatus, checkMythicLaunchers, checkMythicPistols, checkMythicScourge, checkMythicRavager, checkMythicFury, returnSchematics } = require("../../Utils/stwFunctions");

module.exports = {
    name: "mskcheck2",
    aliases: [],
    description: "checks whether the person has a MSK quest",
    hidden: true,
    permissions: [],

    run: async (client, message, args) => {
        // message.delete().catch();
        if (!args[0]) return message.channel.send("Please specify someone to check MSK quest for!").then((msg) => msg.delete({ timeout: 5000 }));

        await fnclient.lookup
            .lookupByUsername(args.slice(0).join(" "))
            .then(async (res) => {
                var config = {
                    method: "post",
                    url: `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${
                        res.id ? res.id : res.externalAuths.xbl.accountId ? res.externalAuths.psn.accountId : res.externalAuths.psn.accountId
                    }/public/QueryPublicProfile?profileId=campaign`,
                    headers: {
                        Authorization: `Bearer ${fnclient.authenticator.accessToken}`,
                        "Content-Type": "application/json",
                        Cookie: "EPIC_DEVICE=7ebd42f71cb44af5b2e8a25e51e8b417",
                    },
                    data: data,
                };

                axios(config)
                    .then(async (response) => {
                        try {
                            allSchematics = returnSchematics(response.data.profileChanges[0].profile.items);
                            status = returnMSKStatus(returnMSKItems(response.data.profileChanges[0].profile.items));
                            let weaponsString = `<:StormKingsWrath:878619752623407104> ${checkMythicLaunchers(allSchematics)} <:StormKingsFury:878619751004385280> ${checkMythicFury(
                                allSchematics
                            )} <:StormKingsRavanger:878619751147012116> ${checkMythicRavager(allSchematics)} <:StormKingsScourge:878619752069759017> ${checkMythicScourge(allSchematics)} <:StormKingsOnslaught:878619752573054986> ${checkMythicPistols(
                                allSchematics
                            )}`;
                            //Twine SSD 5 Not Completed
                            if (status[0] == 0) {
                                let str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("Twine Peaks Stormshield")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/878341990973075466/Storm_Kings_Domain_2019.png")
                                    .setDescription(`**Complete Twine Peaks Stormshield Defense 5: (**0/1**)**\n${str}\n\n${weaponsString}`)
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                            //No Active Quests at all
                            if (status[0] == 1) {
                                const embed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle(`This player has no Mythic Storm King quest right now.\n\n`)
                                    .setDescription(`${weaponsString}`)
                                    .setTimestamp();
                                message.channel.send(embed);
                            }
                            //King ME aka First Prequest to eliminate 2 minibosses
                            if (status[0] == 2) {
                                let str;
                                if (status[1] == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (status[1] == 1) {
                                    str = `🟥🟥🟥🟥🟥⬛⬛⬛⬛⬛`;
                                }
                                if (status[1] == 2) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("King Me")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/878605278461980672/storm_king.png")
                                    .setDescription(`**Eliminate 2 Epic Mini-Bosses in a 140+ zone: (**${status[1]}/2**)**\n${str}\n\n${weaponsString}`)
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                            //Regicide aka First Mythic
                            if (status[0] == 3) {
                                let str;
                                if (status[1] == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (status[1] == 1) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("Regicide")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/878341990973075466/Storm_Kings_Domain_2019.png")
                                    .setDescription(`**Eliminate the Mythic Storm King: (**${status[1]}/1**)**\n${str}\n\n${weaponsString}`)
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                            //Weekly MSK Quest
                            if (status[0] == 4) {
                                let str;
                                if (status[1] == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (status[1] == 1) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("(Weekly)Defeat the Mythic Storm King!")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/878341990973075466/Storm_Kings_Domain_2019.png")
                                    .setDescription(`**Eliminate the Mythic Storm King: (**${status[1]}/1**)**\n${str}\n\n${weaponsString}`)
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                            //Strom Chest
                            if (status[0] == 5) {
                                let str;
                                if (status[1] == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (status[1] == 1) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("(Weekly) Scions of the Storm King: Storm Chests")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956408465162250/sc.png")
                                    .setDescription(`Complete a Storm Chest Successful Missions in 140+ Zones: **(**${status[1]}/1**)**\n${str}\n\n${weaponsString}`)
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                            //Minibosses
                            if (status[0] == 6) {
                                let str;
                                if (status[1] == 0) {
                                    str = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (status[1] == 1) {
                                    str = `🟥🟥🟥⬛⬛⬛⬛⬛⬛⬛`;
                                }
                                if (status[1] == 2) {
                                    str = `🟥🟥🟥🟥🟥🟥⬛⬛⬛⬛`;
                                }
                                if (status[1] == 3) {
                                    str = `🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`;
                                }

                                const ssdEmbed = new MessageEmbed()
                                    .setAuthor("Onyxious", "https://cdn.discordapp.com/avatars/814245954105507850/a2e822e8024d3ad7342807b80253721f.webp?size=1024")
                                    .setColor("#0f0f0f")
                                    .setTitle("(Weekly) Scions of the Storm King: Minibosses")
                                    .setThumbnail("https://cdn.discordapp.com/attachments/845954962277531648/845956281995231252/miniboss.png")
                                    .setDescription(`Defeat 3 Minibosses in Successful Missions in 140+ Zones: **(**${status[1]}/3**)**\n${str}\n\n${weaponsString}`)
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                            //Mist Monsters
                            if (status[0] == 7) {
                                let str;
                                let num = status[1];
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
                                    .setDescription(`Eliminate 20 Mist Monsters in Successful Missions in 140+ Zones: **(**${status[1]}/20**)**\n${str}\n\n${weaponsString}`)
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                            //survivors
                            if (status[0] == 8) {
                                let str;
                                let num = status[1];
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
                                    .setDescription(`Rescue 10 Survivors in Successful Missions in 140+ Zones: **(**${status[1]}/10**)**\n${str}\n\n${weaponsString}`)
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                            //elementals
                            if (status[0] == 9) {
                                let str;
                                let num = status[1];
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
                                    .setDescription(`Eliminate 300 Elementals in successful missions in 140+ Zones: **(**${status[1]}/300**)**\n${str}\n\n${weaponsString}`)
                                    .setTimestamp();
                                message.channel.send(ssdEmbed);
                                return;
                            }
                        } catch (err) {
                            console.error(err);
                        }
                        // fs.writeFileSync("./msk.json", JSON.stringify(dataToCheck, null, 4));
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => {
                console.error(err);
                message.channel.send(new MessageEmbed().setColor("#e91015").setDescription(`**${args[1]}** Does Not Exist!`));
            });
    },
};
