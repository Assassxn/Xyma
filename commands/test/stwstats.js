const { fnclient } = require("../../index");
var axios = require("axios");
var data = JSON.stringify({});
const { returnStats } = require("../../Utils/stwstats");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "stwstats",
    aliases: ["stats"],
    description: "hehe",
    hidden: true,
    permissions: [],

    run: async (client, message, args) => {
        message.delete().catch();

        let displayName;

        await fnclient.lookup
            .lookupByUsername(args[0])
            .then(async (res) => {
                
                if (res.displayName) {
                    displayName = res.displayName;
                    foundOne = true;
                } else {
                    if (!foundOne) {
                        if (res.externalAuths.nintendo) {
                            foundOne = true;
                            displayName = res.externalAuths.nintendo.externalDisplayName;
                        }
                    }
                    if (!foundOne) {
                        if (res.externalAuths.psn) {
                            foundOne = true;
                            displayName = res.externalAuths.psn.externalDisplayName;
                        }
                    }
                    if (!foundOne) {
                        if (res.externalAuths.xbl) {
                            foundOne = true;
                            displayName = res.externalAuths.xbl.externalDisplayName;
                        }
                    }
                }

                 var config = {
                     method: "post",
                     url: `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${res.id}/public/QueryPublicProfile?profileId=campaign`,
                     headers: {
                         Authorization: `Bearer ${fnclient.authenticator.accessToken}`,
                         "Content-Type": "application/json",
                         Cookie: "EPIC_DEVICE=7ebd42f71cb44af5b2e8a25e51e8b417",
                     },
                     data: data,
                 };

                 axios(config)
                     .then(function (response) {
                         res = returnStats(response.data.profileChanges[0].profile.items);

                         const embed = new MessageEmbed()
                             .setDescription(`__**Display Name:**__ \`${displayName}\`\n`)
                             .setColor("#0f0f0f")
                             .addFields(
                                 {
                                     name: "Perk-UP",
                                     value: `<:LegendaryPerkup:881492437837680650> **${res[10].toLocaleString()}**\n<:EpicPerkup:881492436864602143> **${res[11].toLocaleString()}**\n<:RarePerkup:881492437862846484> **${res[12].toLocaleString()}**\n<:UncommonPerkup:881492438177419314> **${res[13].toLocaleString()}**\n<:Reperk:881492438848507905> **${res[3].toLocaleString()}**\n<:CoreReperk:881490498848690216> **${res[18].toLocaleString()}**\n<:FireUp:881492439397965845> **${res[9].toLocaleString()}**\n<:FrostUp:881492439322468362> **${res[8].toLocaleString()}**\n<:AMPUp:881492438630412318> **${res[7].toLocaleString()}**`,
                                     inline: true,
                                 },
                                 {
                                     name: "Evo Mats",
                                     value: `<:PureDropOfRain:881492433832132630> **${res[14].toLocaleString()}**\n<:LightningInaBottle:881492438693318666> **${res[15].toLocaleString()}**\n<:EyeofTheStorm:881492439578345532> **${res[16].toLocaleString()}**\n<:StormShard:881492433790193674> **${res[17].toLocaleString()}**\n<:TrainingManuels:881490699583893515> **${res[19].toLocaleString()}**\n<:TrapManuels:881490699793608744> **${res[20].toLocaleString()}**\n<:WeaponManuels:881490699479056425> **${res[21].toLocaleString()}**`,
                                     inline: true,
                                 },
                                 {
                                     name: "XP",
                                     value: `<:HeroXP:881490701236465684> **${res[26].toLocaleString()}**\n<:SchematicXP:881490701295173642> **${res[24].toLocaleString()}**\n<:SurvivorXP:881490701270024212> **${res[25].toLocaleString()}**\n<:VentureXP:881490498089521183> **${res[2].toLocaleString()}**`,
                                     inline: true,
                                 },
                                 {
                                     name: "Superchargers",
                                     value: `<:HeroSupercharger:881490500371247134> **${res[28].toLocaleString()}**\n<:SurvivorSupercharger:881490500501262417> **${res[29].toLocaleString()}**\n<:TrapSupercharger:881490500211867688> **${res[31].toLocaleString()}**\n<:WeaponSupercharger:881490500278956052> **${res[30].toLocaleString()}**`,
                                     inline: true,
                                 },
                                 {
                                     name: "Llamas",
                                     value: `<:MiniLLamatoken:881490701651705896> **${res[27].toLocaleString()}**\n<:Upgrade:881531887552696330> **${res[33].toLocaleString()}**\n<:goldenllama:881534636906385459> **${res[32].toLocaleString()}**`,
                                     inline: true,
                                 },
                                 {
                                     name: "Flux",
                                     value: `<:LegendaryFlux:881492210758057994> **${res[4].toLocaleString()}**\n<:EpicFlux:881492209885671424> **${res[5].toLocaleString()}**\n<:RareFlux:881492210498031636> **${res[6].toLocaleString()}**`,
                                     inline: true,
                                 },
                                 {
                                     name: "Vouchers",
                                     value: `<:HeroVoucher:881490500086009876> **${res[23].toLocaleString()}**\n<:WeaponVoucher:881490500530634772> **${res[22].toLocaleString()}**`,
                                     inline: true,
                                 },
                                 {
                                     name: "XP Boosts",
                                     value: `<:PlayerXPBoost:881539731815555102> **${res[34].toLocaleString()}**\n<:GiftXP:881539731991703552> **${res[35].toLocaleString()}**`,
                                     inline: true,
                                 },
                                 {
                                     name: "Miscellaneous",
                                     value: `<:RoadTripTicket:881490568662888478> **${res[0].toLocaleString()}**\n<:Gold:881490699277721620> **${res[1].toLocaleString()}**\n<:XrayTicket:881490569799557160> **${res[36].toLocaleString()}**`,
                                     inline: true,
                                 }
                             );

                         message.channel.send(embed);
                     })
                     .catch(function (error) {
                         console.log(error);
                     });

            })
            .catch((err) => {
                console.error(err);
                message.channel.send(new MessageEmbed().setColor("#e91015").setDescription(`**${args[1].toLocaleString()}** Does Not Exist!`));
            });
    },
};
