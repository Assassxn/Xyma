const { fnclient } = require("../index");
var axios = require("axios");
var data = JSON.stringify({});
const { calcVentureResearchForts, calcResearchForts, leadBonus, srvBonus, returnWorkerItems, returnSurvivorPl } = require("./powerLevelFunctions");

module.exports = { returnPl2 };
/**
 * @param {String} accountId
 */
async function returnPl2(accountId) {
    var config = {
        method: "post",
        url: `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${accountId}/public/QueryPublicProfile?profileId=campaign`,
        headers: {
            Authorization: `Bearer ${fnclient.authenticator.accessToken}`,
            "Content-Type": "application/json",
            Cookie: "EPIC_DEVICE=7ebd42f71cb44af5b2e8a25e51e8b417",
        },
        data: data,
    };

    let valToTest;
    let venturePL;

    let totalFortitude = 0;
    let totalResistance = 0;
    let totalTechnology = 0;
    let totalOffence = 0;

    let total = 0;
    let mainArray = [
        ["trainingteam", []],
        ["fireteamalpha", []],
        ["closeassaultsquad", []],
        ["thethinktank", []],
        ["emtsquad", []],
        ["corpsofengineering", []],
        ["scoutingparty", []],
        ["gadgeteers", []],
    ];
    await axios(config)
        .then(async (response) => {
            await returnWorkerItems(response.data.profileChanges[0].profile.items).then((allSurvivors) => {
                allSurvivors.forEach((survivor) => {
                    for (let i = 0; i < mainArray.length; i++) {
                        if (mainArray[i][0] == survivor.attributes.squad_id.split("_")[3]) {
                            mainArray[i][1].push(survivor);
                        }
                    }
                });
            });

            for (let i = 0; i < mainArray.length; i++) {
                let squadHasLeader = false;
                if (mainArray[i][1].length !== 0) {
                    let leadItem = null;
                    mainArray[i][1].forEach((srv) => {
                        if (srv.attributes.squad_slot_idx == 0) {
                            leadItem = srv;
                            squadHasLeader = true;
                            let totalSrvBonus = parseInt(leadBonus(srv)) + parseInt(returnSurvivorPl(srv));
                            total += totalSrvBonus;

                            if (srv.attributes.squad_id === "squad_attribute_medicine_trainingteam" || srv.attributes.squad_id === "squad_attribute_medicine_emtsquad") totalFortitude += totalSrvBonus;
                            if (srv.attributes.squad_id === "squad_attribute_arms_closeassaultsquad" || srv.attributes.squad_id === "squad_attribute_arms_fireteamalpha") totalOffence += totalSrvBonus;
                            if (srv.attributes.squad_id === "squad_attribute_synthesis_corpsofengineering" || srv.attributes.squad_id === "squad_attribute_synthesis_thethinktank") totalTechnology += totalSrvBonus;
                            if (srv.attributes.squad_id === "squad_attribute_scavenging_scoutingparty" || srv.attributes.squad_id === "squad_attribute_scavenging_gadgeteers") totalResistance += totalSrvBonus;
                        }
                    });

                    mainArray[i][1].forEach((srv) => {
                        if (srv.attributes.squad_slot_idx !== 0) {
                            let totalSrvBonus = 0;
                            if (squadHasLeader) {
                                totalSrvBonus = parseInt(srvBonus(leadItem, srv)) + parseInt(returnSurvivorPl(srv));
                            } else {
                                totalSrvBonus = parseInt(returnSurvivorPl(srv));
                            }

                            total += totalSrvBonus;

                            if (srv.attributes.squad_id === "squad_attribute_medicine_trainingteam" || srv.attributes.squad_id === "squad_attribute_medicine_emtsquad") totalFortitude += totalSrvBonus;
                            if (srv.attributes.squad_id === "squad_attribute_arms_closeassaultsquad" || srv.attributes.squad_id === "squad_attribute_arms_fireteamalpha") totalOffence += totalSrvBonus;
                            if (srv.attributes.squad_id === "squad_attribute_synthesis_corpsofengineering" || srv.attributes.squad_id === "squad_attribute_synthesis_thethinktank") totalTechnology += totalSrvBonus;
                            if (srv.attributes.squad_id === "squad_attribute_scavenging_scoutingparty" || srv.attributes.squad_id === "squad_attribute_scavenging_gadgeteers") totalResistance += totalSrvBonus;
                        }
                    });
                }
            }

            let researchFortStats = calcResearchForts(response.data.profileChanges[0].profile.items);
            venturesFort = calcVentureResearchForts(response.data.profileChanges[0].profile.items);
            myval = total + researchFortStats[0];

            console.log(myval, venturesFort);

            for (let i = 1; i < energyTable.length; i++) {
                if (myval >= energyTable[i][1] && energyTable[i + 1][1] >= myval) {
                    valToTest = energyTable[i][0] + ((myval - energyTable[i][1]) / (energyTable[i + 1][1] - energyTable[i][1])) * (energyTable[i + 1][0] - energyTable[i][0]);
                }
            }

            for (let i = 1; i < energyTable.length; i++) {
                if (venturesFort >= energyTable[i][1] && energyTable[i + 1][1] >= venturesFort) {
                    
                    let diff = energyTable[i + 1][1] - energyTable[i][1];
                    let delta = venturesFort - energyTable[i][1];
                    let diffInPL = energyTable[i + 1][0] - energyTable[i][0];
                    let toAdd = (delta / diff) * diffInPL;
                    venturePL = energyTable[i][0] + toAdd;

                }
            }
        })
        .catch(function (error) {
            console.log(error, "Error is here");
            return -2;
        });
    return [valToTest, venturePL];
}

let energyTable = [
    [0, 0],
    [1, 0],
    [2, 18.75],
    [3, 41.25],
    [4, 61.25],
    [5, 98.75],
    [6, 131.25],
    [7, 195],
    [8, 255],
    [11, 320],
    [15, 400],
    [18, 491.25],
    [20, 635],
    [22, 788.75],
    [24, 941.25],
    [25, 1077.5],
    [26, 1273.75],
    [29, 1515],
    [32, 1745],
    [36, 2035],
    [41, 2360],
    [46, 2673.75],
    [49, 2972.5],
    [53, 3247.5],
    [54, 3403.75],
    [55, 3571.25],
    [57, 3833.75],
    [60, 4211.25],
    [63, 4611.25],
    [73, 5563.75],
    [78, 6007.5],
    [81, 6315],
    [84, 6620],
    [86, 6786.25],
    [87, 6967.5],
    [89, 7307.5],
    [93, 7875],
    [96, 8352.5],
    [102, 8910],
    [107, 9460],
    [113, 9960],
    [116, 10375],
    [120, 10763.75],
    [121, 10967.5],
    // [122, 11058], //Added manually
    [123, 11147.5],
    [124, 11512.5],
    [126, 11921.25],
    [127, 12195],
    [128, 12387.5],
    [130, 12875],
    [131, 13031.25],
    [133, 13147.5],
    [134, 13247.5],
    [136, 13363.75],
    [137, 13463.75],
    [139, 13580],
    [140, 13680],
    [142, 13795],
    [143, 13903.75],
    [145, 14023.75],
    [225, 23191.25],
];

// let diff = energyTable[i+1][1] - energyTable[i][1];
// let delta = myval - energyTable[i][1];
// let diffInPL = energyTable[i + 1][0] - energyTable[i][0];
// let toAdd = (delta/diff) * diffInPL;
// valToTest = energyTable[i][0] + toAdd;
