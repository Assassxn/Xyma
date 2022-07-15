const { fnclient } = require("../../index");
const fs = require("fs");
var axios = require("axios");
const { MessageEmbed } = require("discord.js");
const pagination = require("discord.js-pagination");
var data = JSON.stringify({});
const { leadBonus, srvBonus, returnSurvivorPl } = require("../../Utils/powerLevelFunctions");

module.exports = {
    name: "survivors",
    aliases: ["survivorsquads", "squad", "squads"],
    description: "hehe",
    hidden: true,
    permissions: [],

    run: async (client, message, args) => {
        // message.delete().catch();
        if (!args[0]) return message.channel.send("Please provide an epic username to fetch the data for!");

        let displayName;

        await fnclient.lookup.lookupByUsername(args[0]).then(async (res) => {
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
                url: `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${res.id}/public/QueryPublicProfile?profileId=campaign`, // HOMEBASE NAME
                headers: {
                    Authorization: `Bearer ${fnclient.authenticator.accessToken}`,
                    "Content-Type": "application/json",
                    Cookie: "EPIC_DEVICE=7ebd42f71cb44af5b2e8a25e51e8b417",
                },
                data: data,
            };

            axios(config)
                .then(function (response) {

                    returnWorkerItems(response.data.profileChanges[0].profile.items).then((allSurvivors) => {
                        let mainArray = [
                            ["squad_attribute_medicine_trainingteam", []],
                            ["squad_attribute_arms_fireteamalpha", []],
                            ["squad_attribute_arms_closeassaultsquad", []],
                            ["squad_attribute_synthesis_thethinktank", []],
                            ["squad_attribute_medicine_emtsquad", []],
                            ["squad_attribute_synthesis_corpsofengineering", []],
                            ["squad_attribute_scavenging_scoutingparty", []],
                            ["squad_attribute_scavenging_gadgeteers", []],
                        ];

                        //filtering the survivors that are only slotted
                        allSurvivors.forEach((survivor) => {
                            for (let i = 0; i < mainArray.length; i++) {
                                if (mainArray[i][0] == survivor.attributes.squad_id) {
                                    mainArray[i][1].push(survivor);
                                }
                            }
                        });

                        // fs.writeFileSync("./survivors.json", JSON.stringify(mainArray, null, 4));
                        let pages = [];

                        //looping through each squad and making an embed for it
                        for (let i = 0; i < mainArray.length; i++) {
                            let name = returnSquadName(mainArray[i][0].split("_")[3]);
                            let thumbnail = returnSquadThumbnail(mainArray[i][0].split("_")[3]);

                            const Embed = new MessageEmbed();
                            Embed.setColor("#0f0f0f");
                            Embed.setTitle(`**${name}**`);
                            Embed.setDescription(`**Display Name:** \`${displayName}\``);
                            Embed.setThumbnail(thumbnail);

                            let leadSurvivor = [];
                            let firstSrv = [];
                            let secondSrv = [];
                            let thirdSrv = [];
                            let fourthSrv = [];
                            let fifthSrv = [];
                            let sixthSrv = [];
                            let seventhSrv = [];

                            let leadItem;
                            let totalSquadBonuses = 0;

                            mainArray[i][1].forEach((srvInSquad) => {
                                //finding the lead item
                                mainArray[i][1].forEach((srvInSquad) => {
                                    if(srvInSquad.attributes.squad_slot_idx == 0){
                                        leadItem = srvInSquad;
                                    }
                                })

                                if (srvInSquad.attributes.squad_slot_idx == 0) {
                                    leadSurvivor.push(
                                        "Lead Survivor ", //title
                                        `${
                                            srvInSquad.templateId.split(":")[1].split("_")[0] +
                                            "_" +
                                            srvInSquad.templateId.split(":")[1].split("_")[1] +
                                            "_" +
                                            srvInSquad.templateId.split(":")[1].split("_")[2]
                                        }`, //name
                                        false, //inline
                                        `${srvInSquad.templateId.split(":")[1].split("_")[1]}`, //rarity
                                        `${srvInSquad.attributes.personality.split(".")[3]}`, //personality
                                        returnSurvivorPl(srvInSquad),
                                        leadBonus(srvInSquad),
                                    );
                                }
                                if (srvInSquad.attributes.squad_slot_idx == 1) {
                                    let rarity = "";
                                    let special = false;
                                    firstSrv.push("Support Slot 1");

                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_troll")) {
                                        special = true;
                                        firstSrv.push("— Troll");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_lobber")) {
                                        special = true;
                                        firstSrv.push("— Lobber");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_leprechaun")) {
                                        special = true;
                                        firstSrv.push("— Leprechaun");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_smasher")) {
                                        special = true;
                                        firstSrv.push("— Smasher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_karolina")) {
                                        special = true;
                                        firstSrv.push("— Karolina");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_joel")) {
                                        special = true;
                                        firstSrv.push("— Joel");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husk_")) {
                                        special = true;
                                        firstSrv.push("— Husk");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husky_")) {
                                        special = true;
                                        firstSrv.push("— Husky");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_pitcher_")) {
                                        special = true;
                                        firstSrv.push("— Pitcher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (!special) {
                                        firstSrv.push("Survivor");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[1];
                                    }
                                        
                                    firstSrv.push(
                                        true,
                                        `${rarity}`,
                                        `${srvInSquad.attributes.personality.split(".")[3]}`,
                                        `${srvInSquad.attributes.set_bonus.split(".")[3]}`,
                                        returnSurvivorPl(srvInSquad),
                                        srvInSquad
                                    ); // inline, rarity, personality, bonuses
                                }
                                if (srvInSquad.attributes.squad_slot_idx == 2) {
                                    let rarity = "";
                                    let special = false;
                                    secondSrv.push("Support Slot 2");

                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_troll")) {
                                        special = true;
                                        secondSrv.push("— Troll");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_lobber")) {
                                        special = true;
                                        secondSrv.push("— Lobber");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_leprechaun")) {
                                        special = true;
                                        secondSrv.push("— Leprechaun");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_smasher")) {
                                        special = true;
                                        secondSrv.push("— Smasher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_karolina")) {
                                        special = true;
                                        secondSrv.push("— Karolina");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_joel")) {
                                        special = true;
                                        secondSrv.push("— Joel");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husk_")) {
                                        special = true;
                                        secondSrv.push("— Husk");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husky_")) {
                                        special = true;
                                        secondSrv.push("— Husky");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_pitcher_")) {
                                        special = true;
                                        secondSrv.push("— Pitcher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (!special) {
                                        secondSrv.push("Survivor");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[1];
                                    }
                                    secondSrv.push(
                                        true,
                                        `${rarity}`,
                                        `${srvInSquad.attributes.personality.split(".")[3]}`,
                                        `${srvInSquad.attributes.set_bonus.split(".")[3]}`,
                                        returnSurvivorPl(srvInSquad),
                                        srvInSquad
                                    ); // inline, rarity, personality, bonuses
                                    // Embed.addField("Survivor slot 2: ", `${srvInSquad.templateId.split(":")[1]}`, true);
                                }
                                if (srvInSquad.attributes.squad_slot_idx == 3) {
                                    let rarity = "";
                                    let special = false;
                                    thirdSrv.push("Support Slot 3");

                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_troll")) {
                                        special = true;
                                        thirdSrv.push("— Troll");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_lobber")) {
                                        special = true;
                                        thirdSrv.push("— Lobber");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_leprechaun")) {
                                        special = true;
                                        thirdSrv.push("— Leprechaun");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_smasher")) {
                                        special = true;
                                        thirdSrv.push("— Smasher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_karolina")) {
                                        special = true;
                                        thirdSrv.push("— Karolina");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_joel")) {
                                        special = true;
                                        thirdSrv.push("— Joel");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husk_")) {
                                        special = true;
                                        thirdSrv.push("— Husk");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husky_")) {
                                        special = true;
                                        thirdSrv.push("— Husky");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_pitcher_")) {
                                        special = true;
                                        thirdSrv.push("— Pitcher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (!special) {
                                        thirdSrv.push("Survivor");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[1];
                                    }
                                    thirdSrv.push(
                                        true,
                                        `${rarity}`,
                                        `${srvInSquad.attributes.personality.split(".")[3]}`,
                                        `${srvInSquad.attributes.set_bonus.split(".")[3]}`,
                                        returnSurvivorPl(srvInSquad),
                                        srvInSquad
                                    );
                                }
                                if (srvInSquad.attributes.squad_slot_idx == 4) {
                                    let rarity = "";
                                    let special = false;
                                    fourthSrv.push("Support Slot 4");

                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_troll")) {
                                        special = true;
                                        fourthSrv.push("— Troll");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_lobber")) {
                                        special = true;
                                        fourthSrv.push("— Lobber");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_leprechaun")) {
                                        special = true;
                                        fourthSrv.push("— Leprechaun");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_smasher")) {
                                        special = true;
                                        fourthSrv.push("— Smasher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_karolina")) {
                                        special = true;
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                        fourthSrv.push("— Karolina");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_joel")) {
                                        special = true;
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                        fourthSrv.push("— Joel");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husk_")) {
                                        special = true;
                                        fourthSrv.push("— Husk");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husky_")) {
                                        special = true;
                                        fourthSrv.push("— Husky");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_pitcher_")) {
                                        special = true;
                                        fourthSrv.push("— Pitcher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (!special) {
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[1];
                                        fourthSrv.push("Survivor");
                                    }
                                    fourthSrv.push(
                                        true,
                                        `${rarity}`,
                                        `${srvInSquad.attributes.personality.split(".")[3]}`,
                                        `${srvInSquad.attributes.set_bonus.split(".")[3]}`,
                                        returnSurvivorPl(srvInSquad),
                                        srvInSquad
                                    );
                                }
                                if (srvInSquad.attributes.squad_slot_idx == 5) {
                                    let rarity = "";
                                    let special = false;
                                    fifthSrv.push("Support Slot 5");

                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_troll")) {
                                        special = true;
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                        fifthSrv.push("— Troll");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_lobber")) {
                                        special = true;
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                        fifthSrv.push("— Lobber");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_leprechaun")) {
                                        special = true;
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                        fifthSrv.push("— Leprechaun");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_smasher")) {
                                        special = true;
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                        fifthSrv.push("— Smasher");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_karolina")) {
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                        special = true;
                                        fifthSrv.push("— Karolina");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_joel")) {
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];

                                        special = true;
                                        fifthSrv.push("— Joel");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husk_")) {
                                        special = true;
                                        fifthSrv.push("— Husk");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husky_")) {
                                        special = true;
                                        fifthSrv.push("— Husky");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_pitcher_")) {
                                        special = true;
                                        fifthSrv.push("— Pitcher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (!special) {
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[1];

                                        fifthSrv.push("Survivor");
                                    }
                                    fifthSrv.push(
                                        true,
                                        `${rarity}`,
                                        `${srvInSquad.attributes.personality.split(".")[3]}`,
                                        `${srvInSquad.attributes.set_bonus.split(".")[3]}`,
                                        returnSurvivorPl(srvInSquad),
                                        srvInSquad
                                    ); // inline, rarity, personality, bonuses
                                    // Embed.addField("Survivor slot 5: ", `${srvInSquad.templateId.split(":")[1]}`, true);
                                }
                                if (srvInSquad.attributes.squad_slot_idx == 6) {
                                    let rarity = "";
                                    let special = false;
                                    sixthSrv.push("Support Slot 6");

                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_troll")) {
                                        special = true;
                                        sixthSrv.push("— Troll");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_lobber")) {
                                        special = true;
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];

                                        sixthSrv.push("— Lobber");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_leprechaun")) {
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                        special = true;
                                        sixthSrv.push("— Leprechaun");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_smasher")) {
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                        special = true;
                                        sixthSrv.push("— Smasher");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_karolina")) {
                                        special = true;
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                        sixthSrv.push("— Karolina");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_joel")) {
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                        special = true;
                                        sixthSrv.push("— Joel");
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husk_")) {
                                        special = true;
                                        sixthSrv.push("— Husk");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husky_")) {
                                        special = true;
                                        sixthSrv.push("— Husky");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_pitcher_")) {
                                        special = true;
                                        sixthSrv.push("— Pitcher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (!special) {
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[1];

                                        sixthSrv.push("Survivor");
                                    }
                                    sixthSrv.push(
                                        true,
                                        `${rarity}`,
                                        `${srvInSquad.attributes.personality.split(".")[3]}`,
                                        `${srvInSquad.attributes.set_bonus.split(".")[3]}`,
                                        returnSurvivorPl(srvInSquad),
                                        srvInSquad
                                    ); // inline, rarity, personality, bonuses
                                    // Embed.addField("Survivor slot 6: ", `${srvInSquad.templateId.split(":")[1]}`, true);
                                }
                                if (srvInSquad.attributes.squad_slot_idx == 7) {
                                    let special = false;
                                    let rarity = "";
                                    seventhSrv.push("Support Slot 7"); //0

                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_troll")) {
                                        special = true;
                                        seventhSrv.push("— Troll");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_lobber")) {
                                        special = true;
                                        seventhSrv.push("— Lobber");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_leprechaun")) {
                                        special = true;
                                        seventhSrv.push("— Leprechaun");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_smasher")) {
                                        special = true;
                                        seventhSrv.push("— Smasher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_karolina")) {
                                        special = true;
                                        seventhSrv.push("— Karolina");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_joel")) {
                                        special = true;
                                        seventhSrv.push("— Joel");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[2];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husk_")) {
                                        special = true;
                                        seventhSrv.push("— Husk");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_husky_")) {
                                        special = true;
                                        seventhSrv.push("— Husky");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (srvInSquad.templateId.startsWith("Worker:worker_halloween_pitcher_")) {
                                        special = true;
                                        seventhSrv.push("— Pitcher");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[3];
                                    }
                                    if (!special) {
                                        seventhSrv.push("Survivor");
                                        rarity = srvInSquad.templateId.split(":")[1].split("_")[1];
                                    }
                                    seventhSrv.push(
                                        true,
                                        `${rarity}`,
                                        `${srvInSquad.attributes.personality.split(".")[3]}`,
                                        `${srvInSquad.attributes.set_bonus.split(".")[3]}`,
                                        returnSurvivorPl(srvInSquad),
                                        srvInSquad
                                    );
                                }
                            });

                            if (leadSurvivor.length !== 0) {
                                Embed.addField(
                                    `${leadSurvivor[0]}`,
                                    `${returnLeadSurvivorRarity(leadSurvivor[3])} ${returnSurvivorPersonality(leadSurvivor[4])} ${MythicLeadName(leadSurvivor[1])} ⚡**${leadSurvivor[5]} +(**\`${leadSurvivor[6]}\`**)**`,
                                    leadSurvivor[2]
                                );
                                totalSquadBonuses+= leadSurvivor[6];
                            }
                            if (firstSrv.length !== 0) {
                                Embed.addField(
                                    firstSrv[0],
                                    `${returnSurvivorRarity(firstSrv[3])} ${returnSurvivorPersonality(firstSrv[4])}${returnSurvivorBonuses(firstSrv[5])} ${firstSrv[1]} ⚡**${firstSrv[6]} +(**\`${srvBonus(leadItem, firstSrv[7])}\`**)**`,
                                    firstSrv[2]
                                );
                                totalSquadBonuses += srvBonus(leadItem, firstSrv[7]);
                            }
                            if (secondSrv.length !== 0) {
                                Embed.addField(
                                    secondSrv[0],
                                    `${returnSurvivorRarity(secondSrv[3])} ${returnSurvivorPersonality(secondSrv[4])}${returnSurvivorBonuses(secondSrv[5])} ${secondSrv[1]} ⚡**${secondSrv[6]} +(**\`${srvBonus(leadItem, secondSrv[7])}\`**)**`,
                                    secondSrv[2]
                                );
                                totalSquadBonuses += srvBonus(leadItem, secondSrv[7]);
                            }
                            if (thirdSrv.length !== 0) {
                                Embed.addField(
                                    thirdSrv[0],
                                    `${returnSurvivorRarity(thirdSrv[3])} ${returnSurvivorPersonality(thirdSrv[4])}${returnSurvivorBonuses(thirdSrv[5])} ${thirdSrv[1]} ⚡**${thirdSrv[6]} +(**\`${srvBonus(leadItem, thirdSrv[7])}\`**)**`,
                                    thirdSrv[2]
                                );
                                totalSquadBonuses += srvBonus(leadItem, thirdSrv[7]);
                            }
                            if (fourthSrv.length !== 0) {
                                Embed.addField(
                                    fourthSrv[0],
                                    `${returnSurvivorRarity(fourthSrv[3])} ${returnSurvivorPersonality(fourthSrv[4])}${returnSurvivorBonuses(fourthSrv[5])} ${fourthSrv[1]} ⚡**${fourthSrv[6]} +(**\`${srvBonus(leadItem, fourthSrv[7])}\`**)**`,
                                    fourthSrv[2]
                                );
                                totalSquadBonuses += srvBonus(leadItem, fourthSrv[7]);
                            }
                            if (fifthSrv.length !== 0) {
                                Embed.addField(
                                    fifthSrv[0],
                                    `${returnSurvivorRarity(fifthSrv[3])} ${returnSurvivorPersonality(fifthSrv[4])}${returnSurvivorBonuses(fifthSrv[5])} ${fifthSrv[1]} ⚡**${fifthSrv[6]} +(**\`${srvBonus(leadItem, fifthSrv[7])}\`**)**`,
                                    fifthSrv[2]
                                );
                                totalSquadBonuses += srvBonus(leadItem, fifthSrv[7]);
                            }
                            if (sixthSrv.length !== 0) {
                                Embed.addField(
                                    sixthSrv[0],
                                    `${returnSurvivorRarity(sixthSrv[3])} ${returnSurvivorPersonality(sixthSrv[4])}${returnSurvivorBonuses(sixthSrv[5])} ${sixthSrv[1]} ⚡**${sixthSrv[6]} +(**\`${srvBonus(leadItem, sixthSrv[7])}\`**)**`,
                                    sixthSrv[2]
                                );
                                totalSquadBonuses += srvBonus(leadItem, sixthSrv[7]);
                            }
                            if (seventhSrv.length !== 0) {
                                Embed.addField(
                                    seventhSrv[0],
                                    `${returnSurvivorRarity(seventhSrv[3])} ${returnSurvivorPersonality(seventhSrv[4])}${returnSurvivorBonuses(seventhSrv[5])} ${seventhSrv[1]} ⚡**${seventhSrv[6]} +(**\`${srvBonus(leadItem, seventhSrv[7])}\`**)**`,
                                    seventhSrv[2]
                                );
                                totalSquadBonuses += srvBonus(leadItem, seventhSrv[7]);
                            }

                            let totalSquadPl = leadSurvivor[5] + firstSrv[6] + secondSrv[6] + thirdSrv[6] + fourthSrv[6] + fifthSrv[6] + sixthSrv[6] + sixthSrv[6]

                            Embed.addField(`Total Fort:`, `${totalSquadPl} + **(**${totalSquadBonuses}**)**`, false);

                            if (mainArray[i][1].length !== 0) {
                                pages.push(Embed);
                                //right position needs fixing
                            }
                        }

                        pagination(message, pages, ["◀️", "▶️"], "360000");
                    });

                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
};

async function returnWorkerItems(items) {
    let arr = [];
    theArray = Object.entries(items);
    for (const [key, value] of theArray) {
        if (value.templateId.startsWith("Worker:") && value.attributes.squad_slot_idx !== -1 && value.attributes.squad_id.length !== 0) {
            arr.push(value);
        }
    }
    return arr;
}

function returnLeadSurvivorRarity(rarity) {
    return rarity == "sr"
        ? "<:mythic:881930148625121281>"
        : rarity == "vr"
        ? "<:legendary:881930234142785636>"
        : rarity == "r"
        ? "<:epic:881930316716056616>"
        : rarity == "uc"
        ? "<:rare:881932451767803904>"
        : rarity == "c"
        ? "<:uncommon:881932914948988970>"
        : null;
}

function returnSurvivorPersonality(personality) {
    return personality == "IsCurious"
        ? "<:Curious:881953947198300192>"
        : personality == "IsAdventurous"
        ? "<:Adventurous:881953947412205668>"
        : personality == "IsDreamer"
        ? "<:Dreamer:881953947437371483>"
        : personality == "IsCompetitive"
        ? "<:Competitive:881953947504484393>"
        : personality == "IsAnalytical"
        ? "<:Analytical:881953947437379634>"
        : personality == "IsPragmatic"
        ? "<:Pragmatic:881953947441578024>"
        : personality == "IsDependable"
        ? "<:Dependable:881953947068280884>"
        : personality == "IsCooperative"
        ? "<:Cooperative:881953947529658408>"
        : null;
}

function returnSurvivorRarity(rarity) {
    return rarity == "ur"
        ? "<:mythic:881930148625121281>"
        : rarity == "sr"
        ? "<:legendary:881930234142785636>"
        : rarity == "vr"
        ? "<:epic:881930316716056616>"
        : rarity == "r"
        ? "<:rare:881932451767803904>"
        : rarity == "uc"
        ? "<:uncommon:881932914948988970>"
        : rarity == "c"
        ? "<:common:881932915196457010>"
        : null;
}

function returnSurvivorBonuses(bonus) {
    return bonus == "IsTrapDamageLow"
        ? "<:TrapDamage:882235706221690890>"
        : bonus == "IsShieldRegenLow"
        ? "<:ShieldRegenBonus:882236870883442699>"
        : bonus == "IsResistanceLow"
        ? "<:resistance:882236871248318484>"
        : bonus == "IsTrapDurabilityHigh"
        ? "<:TrapDurability:882235706381074482>"
        : bonus == "IsMeleeDamageLow"
        ? "<:MeleeDamage:882235706427203645>"
        : bonus == "IsRangedDamageLow"
        ? "<:rangedDamage:882236871252512798>"
        : bonus == "IsFortitudeLow"
        ? "<:Fortitude:878766104858755103>"
        : bonus == "IsAbilityDamageLow"
        ? "<:abilityDamage:882236870925353041>"
        : null;
}

function returnSquadName(name) {
    return name == "trainingteam"
        ? "<:TIconWorkerTrainer64:881659284079906837> Training Team"
        : name == "fireteamalpha"
        ? "<:TIconWorkerMarksman64:881659284226736188> Fire team alpha"
        : name == "closeassaultsquad"
        ? "<:TIconWorkerMartialArtist64:881659284063154177> Close assault"
        : name == "thethinktank"
        ? "<:TIconWorkerInventor64:881659284268662785> The think tank"
        : name == "corpsofengineering"
        ? "<:TIconWorkerDoctor64:881659284390297610> Corps of engineering"
        : name == "scoutingparty"
        ? "<:Scouting_party_icon:881662057504706560> Scouting party"
        : name == "gadgeteers"
        ? "<:TIconWorkerGadgeteer64:881659284268654632> Gadgeteers"
        : name == "emtsquad"
        ? "<:Emt_squad_icon:881661565919715369> EMT Squad"
        : null;
}

function returnSquadThumbnail(name) {
    return name == "trainingteam"
        ? "https://cdn.discordapp.com/attachments/845954962277531648/881991969428078592/tt.png"
        : name == "fireteamalpha"
        ? "https://cdn.discordapp.com/attachments/845954962277531648/881991947915501588/fireteamalpha.png"
        : name == "closeassaultsquad"
        ? "https://cdn.discordapp.com/attachments/845954962277531648/881991925668929586/cas.png"
        : name == "thethinktank"
        ? "https://cdn.discordapp.com/attachments/845954962277531648/881991977606987796/ttt.png"
        : name == "corpsofengineering"
        ? "https://cdn.discordapp.com/attachments/845954962277531648/881991932887302184/coe.png"
        : name == "scoutingparty"
        ? "https://cdn.discordapp.com/attachments/845954962277531648/881991961219833906/sp.png"
        : name == "gadgeteers"
        ? "https://cdn.discordapp.com/attachments/845954962277531648/881991954706079774/g.png"
        : name == "emtsquad"
        ? "https://cdn.discordapp.com/attachments/845954962277531648/881991940487401522/emt.png"
        : null;
}

function MythicLeadName(name) {
    if (name.startsWith("managergadgeteer_sr_flak")) {
        return '— Kelly "Flak" Solek';
    }
    if (name.startsWith("managermartialartist_sr_samurai")) {
        return '— Mishiro "Samurai" Tofune';
    }
    if (name.startsWith("managermartialartist_sr_tiger")) {
        return '— Misha "Tiger" Yu';
    }
    if (name.startsWith("managergadgeteer_sr_zapps")) {
        return '— Ellie "Zapps" Clerk';
    }
    if (name.startsWith("managerexplorer_sr_birdie")) {
        return '— Saka "Birdie" Gale';
    }
    if (name.startsWith("managerexplorer_sr_spacebound")) {
        return '— Ned "SpaceBound" Legstrong';
    }
    if (name.startsWith("managertrainer_sr_jumpy")) {
        return '— Damon "Sprawl" Fitch';
    }
    if (name.startsWith("managerdoctor_sr_noctor")) {
        return '— Gregson "Noctor" Holmes';
    }
    if (name.startsWith("managermartialartist_sr_dragon")) {
        return '— Sie "Dragon" Lung';
    }
    if (name.startsWith("managerdoctor_sr_kingsly")) {
        return "— Marlin Kingsly";
    }
    if (name.startsWith("managerengineer_sr_sobs")) {
        return "— Jeev Sobs";
    }
    if (name.startsWith("managerengineer_sr_maths")) {
        return '— Emma "Maths" Nolen';
    }
    if (name.startsWith("managertrainer_sr_yoglattes")) {
        return '— Michelle "Yoglattes" Jillard';
    }
    if (name.startsWith("managerinventor_sr_frequency")) {
        return '— Nick "Frequency" Golub';
    }
    if (name.startsWith("managerexplorer_sr_eagle")) {
        return '— Amy "Eagle" Deerhart';
    }
    if (name.startsWith("managergadgeteer_sr_fixer")) {
        return '— Hamlet "Fixer" McKinney';
    }
    if (name.startsWith("managersoldier_sr_ramsie")) {
        return '— Joe "Ramsie" Bo';
    }
    if (name.startsWith("managersoldier_sr_malcolm")) {
        return '— Malcom'
    }
    if (name.startsWith("managersoldier_sr_princess")) {
        return '— Lacy "Princess" Luw';
    }
    if (name.startsWith("managerinventor_sr_rad")) {
        return '— Cary "Rad" Mary';
    }
    if (name.startsWith("managerdoctor_sr_treky")) {
        return '— May "Treky" Jenson';
    }
    if (name.startsWith("managertrainer_sr_raider")) {
        return '— Cara "Indiana" Loft';
    }
    if (name.startsWith("managerinventor_sr_square")) {
        return '— Alfred "Square" Winestein';
    }
    if (name.startsWith("managerengineer_sr_countess")) {
        return '— Lacey "Countess" Ads';
    }
    if (name.startsWith("managertrainer")) {
        return '— Lead Trainer';
    }
    if (name.startsWith("managersoldier")) {
        return "— Marksman";
    }
    if (name.startsWith("managermartialartist")) {
        return "— Lead Martial Artist";
    }
    if (name.startsWith("managerinventor")) {
        return "— Lead Inventor";
    }
    if (name.startsWith("managerdoctor")) {
        return "— Lead Doctor";
    }
    if (name.startsWith("managerengineer")) {
        return "— Lead Engineer";
    }
    if (name.startsWith("managerexplorer")) {
        return "— Lead Explorer";
    }
    if (name.startsWith("managergadgeteer")) {
        return "— Lead Gedgeteer";
    }
    return `Error Please report to the Owner`
}