const { fnclient } = require("../index");
var axios = require("axios");
var data = JSON.stringify({});
const { calcVentureResearchForts, calcResearchForts, leadBonus, srvBonus, returnWorkerItems, returnSurvivorPl } = require("./powerLevelFunctions");
const { CubicSolve } = require("./splinePolynomialInterpolation");

module.exports = { returnPl };
/**
 * @param {String} accountId
 */
async function returnPl(accountId) {
    
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

    let validSlns = [];
    let ventureValidSln = [];

    // let valToTest;

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
            //formatting the survivors into separate squads
            await returnWorkerItems(response.data.profileChanges[0].profile.items).then((allSurvivors) => {
                allSurvivors.forEach((survivor) => {
                    for (let i = 0; i < mainArray.length; i++) {
                        if (mainArray[i][0] == survivor.attributes.squad_id.split("_")[3]) {
                            mainArray[i][1].push(survivor);
                        }
                    }
                });
            });

            let totalFortitude = 0;
            let totalResistance = 0;
            let totalTechnology = 0;
            let totalOffence = 0;

            //computing bonuses and pl for each squad
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

                            // console.log("Lead Bonus: " + parseInt(leadBonus(srv)) + ` with a power level of: ` + parseInt(returnSurvivorPl(srv)));
                        }
                    });

                    //looping through each survivor
                    mainArray[i][1].forEach((srv) => {
                        if (srv.attributes.squad_slot_idx !== 0) {
                            // console.log("Survivor Bonus: " + parseInt(srvBonus(leadItem, srv)) + ` with a power level of: ` + parseInt(returnSurvivorPl(srv)));
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

            // console.log(totalFortitude, totalResistance, totalTechnology, totalOffence);
            // console.log(researchFortStats);

            // console.log(
            //     `Total Fortitude: ${totalFortitude + researchFortStats[1]}, Total Offence: ${totalOffence + researchFortStats[4]}, Total Technology: ${totalTechnology + researchFortStats[3]}, Total Resistance: ${
            //         totalResistance + researchFortStats[2]
            //     } which all adds up to: ${myval} and Ventures Fort: ${venturesFort}`
            // );

            for (let i = 1; i < energyTable.length; i++) {
                if (myval >= energyTable[i][1] && energyTable[i + 1][1] >= myval) {
                    // console.log(myval);

                    let resultFunction;

                    functions.forEach((func) => {
                        if (func.range.xmin <= energyTable[i][0]) {
                            // && func.range.xmax >= energyTable[i + 1][0]
                            resultFunction = func;
                        }
                    });

                    // console.log(resultFunction);
                    solutions = await CubicSolve(resultFunction.a, resultFunction.b, resultFunction.c, resultFunction.d - myval);
                    //picking one of the three solutions
                    // console.log(solutions);
                    solutions.forEach((sln) => {
                        if (sln.i !== 0) return;
                        if (sln.real < resultFunction.range.xmin) return;
                        if (sln.real > resultFunction.range.xmax) return;
                        validSlns.push(sln.real);
                    });
                }
            }
            for (let i = 1; i < energyTable.length; i++) {
                if (venturesFort >= energyTable[i][1] && energyTable[i + 1][1] >= venturesFort) {
                    // console.log(venturesFort);

                    let resultFunction;

                    functions.forEach((func) => {
                        if (func.range.xmin <= energyTable[i][0]) {
                            // && func.range.xmax >= energyTable[i + 1][0]
                            resultFunction = func;
                        }
                    });

                    solutions = await CubicSolve(resultFunction.a, resultFunction.b, resultFunction.c, resultFunction.d - venturesFort);

                    //picking one of the three solutions
                    solutions.forEach((sln) => {
                        if (sln.i !== 0) return;
                        if (sln.real < resultFunction.range.xmin) return;
                        if (sln.real > resultFunction.range.xmax) return;
                        ventureValidSln.push(sln.real);
                    });
                }
            }

        })
        .catch(function (error) {
            console.log(error, "Error is here");
            return -2;
        });
    return [validSlns[0], ventureValidSln[0]];
    // return [valToTest, valToTest];
}

let functions = [
    {
        a: 1.5892546545857245,
        b: -4.767763963757173,
        c: 21.92850930917145,
        d: -18.75,
        range: { xmin: 1, xmax: 2 },
    },
    {
        a: -4.1962732729286225,
        b: 29.945403601328906,
        c: -47.49782582100071,
        d: 27.534223420114774,
        range: { xmin: 2, xmax: 3 },
    },
    {
        a: 8.945838437128764,
        b: -88.33360178918757,
        c: 307.33919035054873,
        d: -327.30279275143465,
        range: { xmin: 3, xmax: 4 },
    },
    {
        a: -11.587080475586435,
        b: 158.0614251633948,
        c: -678.2409174597808,
        d: 986.8040176623381,
        range: { xmin: 4, xmax: 5 },
    },
    {
        a: 14.902483465216974,
        b: -239.28203394865633,
        c: 1308.476378100475,
        d: -2324.391474938088,
        range: { xmin: 5, xmax: 6 },
    },
    {
        a: -11.772853385281463,
        b: 240.87402936031555,
        c: -1572.4600017533564,
        d: 3437.4812847695744,
        range: { xmin: 6, xmax: 7 },
    },
    {
        a: -2.8110699240911226,
        b: 52.67657667531841,
        c: -255.07783295837635,
        d: 363.5895575812877,
        range: { xmin: 7, xmax: 8 },
    },
    {
        a: 2.001333639338855,
        b: -62.821108847001064,
        c: 668.9036512201794,
        d: -2100.361066894861,
        range: { xmin: 8, xmax: 11 },
    },
    {
        a: -0.38843579193031746,
        b: 16.041282384881637,
        c: -198.5826523305303,
        d: 1080.4220461244079,
        range: { xmin: 11, xmax: 15 },
    },
    {
        a: 1.5855546399622382,
        b: -72.78828705028337,
        c: 1133.860889196945,
        d: -5581.795661512968,
        range: { xmin: 15, xmax: 18 },
    },
    {
        a: -2.1074981113484976,
        b: 126.63656152049637,
        c: -2455.7863850770905,
        d: 15956.087984131245,
        range: { xmin: 18, xmax: 20 },
    },
    {
        a: -1.044172950935005,
        b: 62.83705189568681,
        c: -1179.7961925808993,
        d: 7449.486700823303,
        range: { xmin: 20, xmax: 22 },
    },
    {
        a: 4.877939915088518,
        b: -328.0223972618657,
        c: 7419.111688885256,
        d: -55609.17109659517,
        range: { xmin: 22, xmax: 24 },
    },
    {
        a: 9.943929786831317,
        b: -692.7736680273473,
        c: 16173.142187256813,
        d: -125641.41508356763,
        range: { xmin: 24, xmax: 25 },
    },
    {
        a: -36.09820218317176,
        b: 2760.3862297228834,
        c: -70155.85525649895,
        d: 593766.8969477303,
        range: { xmin: 25, xmax: 26 },
    },
    {
        a: 7.684736304616648,
        b: -654.6829723246123,
        c: 18635.943996735936,
        d: -175762.0299136386,
        range: { xmin: 26, xmax: 29 },
    },
    {
        a: -1.9913211467407541,
        b: 187.13402594348173,
        c: -5776.748953038792,
        d: 60227.33526751709,
        range: { xmin: 29, xmax: 32 },
    },
    {
        a: 0.3838170011300833,
        b: -40.87923625211868,
        c: 1519.6754372204211,
        d: -17601.191561914515,
        range: { xmin: 32, xmax: 36 },
    },
    {
        a: -0.2606370724516604,
        b: 28.72180369470964,
        c: -985.9620008653984,
        d: 12466.45769511532,
        range: { xmin: 36, xmax: 41 },
    },
    {
        a: 0.9839854142861756,
        b: -124.36676217404418,
        c: 5290.669199753508,
        d: -73314.16871334308,
        range: { xmin: 41, xmax: 46 },
    },
    {
        a: -3.328092365455181,
        b: 470.699971430263,
        c: -22082.400546044624,
        d: 346406.2340555616,
        range: { xmin: 46, xmax: 49 },
    },
    {
        a: 4.307567463694383,
        b: -651.7420234547229,
        c: 32917.257203319685,
        d: -551921.5091840555,
        range: { xmin: 49, xmax: 53 },
    },
    {
        a: -9.384936944309938,
        b: 1525.366177417964,
        c: -82469.47744293272,
        d: 1486577.469566404,
        range: { xmin: 53, xmax: 54 },
    },
    {
        a: -8.147721823818339,
        b: 1324.937327898325,
        c: -71646.31956887222,
        d: 1291760.6278333147,
        range: { xmin: 54, xmax: 55 },
    },
    {
        a: 3.4781493178210274,
        b: -593.3314104721703,
        c: 33858.46104150503,
        d: -642493.6833569348,
        range: { xmin: 55, xmax: 57 },
    },
    {
        a: 0.14836846983230043,
        b: -23.938885466098025,
        c: 1403.0871161589093,
        d: -25841.578775358554,
        range: { xmin: 57, xmax: 60 },
    },
    {
        a: -0.863257599311734,
        b: 158.15380697982818,
        c: -9522.474430596661,
        d: 192669.65215975288,
        range: { xmin: 60, xmax: 63 },
    },
    {
        a: 0.19171779044025264,
        b: -41.236541683297304,
        c: 3039.117535180242,
        d: -71123.77912156213,
        range: { xmin: 63, xmax: 73 },
    },
    {
        a: 0.05707850789019549,
        b: -11.750538804834786,
        c: 886.6393250524786,
        d: -18746.80934178654,
        range: { xmin: 73, xmax: 78 },
    },
    {
        a: 0.25892292949858087,
        b: -58.98213346119696,
        c: 4570.703708248729,
        d: -114532.48330488903,
        range: { xmin: 78, xmax: 81 },
    },
    {
        a: -2.4577619343994686,
        b: 601.172288466029,
        c: -48901.80446785658,
        d: 1329225.2374499543,
        range: { xmin: 81, xmax: 84 },
    },
    {
        a: 12.564267734230818,
        b: -3184.379188028803,
        c: 269084.51955770934,
        d: -7574391.835265892,
        range: { xmin: 84, xmax: 86 },
    },
    {
        a: -23.223591271320362,
        b: 6048.888435403401,
        c: -524976.4960574602,
        d: 15188690.61236897,
        range: { xmin: 86, xmax: 87 },
    },
    {
        a: 0.7332669905798136,
        b: -203.85157095254453,
        c: 19011.88449550703,
        d: -586972.423667081,
        range: { xmin: 87, xmax: 89 },
    },
    {
        a: 1.4514859230453248,
        b: -395.616025920836,
        c: 36078.92098768497,
        d: -1093294.50626836,
        range: { xmin: 89, xmax: 93 },
    },
    {
        a: -2.76937609180835,
        b: 782.0044762233393,
        c: -73439.78571172334,
        d: 2301785.4014132973,
        range: { xmin: 93, xmax: 96 },
    },
    {
        a: 1.3613377536365292,
        b: -407.641111264786,
        c: 40766.190687136695,
        d: -1352805.8433502235,
        range: { xmin: 96, xmax: 102 },
    },
    {
        a: -1.284766494546522,
        b: 402.06678867922767,
        c: -41824.0151071527,
        d: 1455261.153655616,
        range: { xmin: 102, xmax: 107 },
    },
    {
        a: 1.5274996594981938,
        b: -500.67064676912605,
        c: 54768.89048582115,
        d: -1989885.8124937848,
        range: { xmin: 107, xmax: 113 },
    },
    {
        a: -4.93062805165772,
        b: 1688.634647312729,
        c: -192622.60774542845,
        d: 7328527.28754995,
        range: { xmin: 113, xmax: 116 },
    },
    {
        a: 6.56536980317827,
        b: -2311.972606170196,
        c: 271447.8336585908,
        d: -10615529.780072128,
        range: { xmin: 116, xmax: 120 },
    },
    {
        a: -46.194198019054504,
        b: 16681.4718098336,
        c: -2007765.4962618651,
        d: 80553003.41674611,
        range: { xmin: 120, xmax: 121 },
    },
    {
        a: 14.59994414730979,
        b: -5386.801796556636,
        c: 662495.6101113538,
        d: -27147527.87364039,
        range: { xmin: 121, xmax: 122 },
    },
    {
        a: 100.04442142981534,
        b: -36659.480481953666,
        c: 4477762.409729792,
        d: -182301711.05812353,
        range: { xmin: 122, xmax: 123 },
    },
    {
        a: -138.27762986657117,
        b: 51281.35644641295,
        c: -6338960.532459303,
        d: 261183929.57162935,
        range: { xmin: 123, xmax: 124 },
    },
    {
        a: 43.71574049699739,
        b: -16420.17732883455,
        c: 2056029.655671388,
        d: -85808998.2044392,
        range: { xmin: 124, xmax: 126 },
    },
    {
        a: -68.87977510340276,
        b: 26140.92756811671,
        c: -3306669.561344471,
        d: 139424368.91022688,
        range: { xmin: 126, xmax: 127 },
    },
    {
        a: 54.4037174560856,
        b: -20830.08309704836,
        c: 2658648.7931314926,
        d: -113107441.42925559,
        range: { xmin: 127, xmax: 128 },
    },
    {
        a: -19.294875202363066,
        b: 7470.17648379593,
        c: -963784.4332165762,
        d: 41449709.56159535,
        range: { xmin: 128, xmax: 130 },
    },
    {
        a: -0.20496543245494714,
        b: 25.11167353176361,
        c: 4073.992117765402,
        d: -490822.2028927884,
        range: { xmin: 130, xmax: 131 },
    },
    {
        a: 16.997314709159223,
        b: -6735.384422122605,
        c: 889698.9806484877,
        d: -39163113.36873433,
        range: { xmin: 131, xmax: 133 },
    },
    {
        a: -29.768181659137284,
        b: 11924.0486288277,
        c: -1592005.615127903,
        d: 70859123.71068566,
        range: { xmin: 133, xmax: 134 },
    },
    {
        a: 14.159503194331021,
        b: -5734.880682266557,
        c: 774290.9125587277,
        d: -34835454.52598384,
        range: { xmin: 134, xmax: 136 },
    },
    {
        a: -28.076850284172924,
        b: 11497.551536963052,
        c: -1569319.8692564992,
        d: 71408234.24963978,
        range: { xmin: 136, xmax: 137 },
    },
    {
        a: 14.037484802971598,
        b: -5811.440183853347,
        c: 802011.9964953474,
        d: -36882587.61969455,
        range: { xmin: 137, xmax: 139 },
    },
    {
        a: -28.54799774554306,
        b: 11946.706038877266,
        c: -1666370.3284642077,
        d: 77485793.43676484,
        range: { xmin: 139, xmax: 140 },
    },
    {
        a: 14.827761251728756,
        b: -6271.112739976897,
        c: 884124.300575375,
        d: -41537289.251749024,
        range: { xmin: 140, xmax: 142 },
    },
    {
        a: -25.9796147717445,
        b: 11112.82944602271,
        c: -1584395.4898365692,
        d: 75305980.82774967,
        range: { xmin: 142, xmax: 143 },
    },
    {
        a: 5.63656459882412,
        b: -2450.511503951228,
        c: 355162.2660097039,
        d: -17146272.200922687,
        range: { xmin: 143, xmax: 145 },
    },
    {
        a: -0.005808735571934976,
        b: 3.920896511056109,
        c: -730.4320573272406,
        d: 55208.20565048547,
        range: { xmin: 145, xmax: 225 },
    },
];

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
    [122, 11058], //Added manually
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
// let energyTable = [
//     [1, 0],
//     [2, 75],
//     [3, 165],
//     [4, 245],
//     [5, 395],
//     [6, 525],
//     [7, 780],
//     [8, 1020],
//     [11, 1280],
//     [15, 1600],
//     [18, 1965],
//     [20, 2540],
//     [22, 3155],
//     [24, 3765],
//     [25, 4310],
//     [26, 5095],
//     [29, 6060],
//     [32, 6980],
//     [36, 8140],
//     [41, 9440],
//     [46, 10695],
//     [49, 11890],
//     [53, 12990],
//     [54, 13615],
//     [55, 14285],
//     [57, 15335],
//     [60, 16845],
//     [63, 18445],
//     [73, 22255],
//     [78, 24030],
//     [81, 25260],
//     [84, 26480],
//     [86, 27145],
//     [87, 27870],
//     [89, 29230],
//     [93, 31500],
//     [96, 33410],
//     [102, 35640],
//     [107, 37840],
//     [113, 39840],
//     [116, 41500],
//     [120, 43055],
//     [121, 43870],
//     [123, 44590],
//     [124, 46050],
//     [126, 47685],
//     [127, 48780],
//     [128, 49550],
//     [130, 51500],
//     [131, 52125],
//     [133, 52590],
//     [134, 52990],
//     [136, 53455],
//     [137, 53855],
//     [139, 54320],
//     [140, 54720],
//     [142, 55180],
//     [143, 55615],
//     [145, 56095],
//     [225, 92765],
// ];
// for (let i = 1; i < energyTable.length; i++) {
//     if (myval > energyTable[i][1] && energyTable[i + 1][1] > myval) {
//         diff = energyTable[i][1] - myval;
//         delta = energyTable[i][1] - energyTable[i + 1][1]
//         toAdd = diff/delta;
//         valToTest = energyTable[i][0] + toAdd;
//     }
// }

// let higher = energyTable.find((v) => v > myval);
// let lower = energyTable[energyTable.indexOf(higher) - 1];

// const delta = higher - lower;
// progress = myval - lower;
// diff = progress / delta;
// valToTest = energyTable.indexOf(lower) + diff;
// console.log(valToTest);
