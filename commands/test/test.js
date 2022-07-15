const { fnclient } = require("../../index");
const fs = require("fs");
var axios = require("axios");
var data = JSON.stringify({});

module.exports = {
    name: "test",
    aliases: ["t"],
    permissions: [],

    run: async (client, message, args) => {
        message.delete().catch();

        obj = [
            0, 5, 8, 27, 58, 75, 93, 107, 120, 131, 142, 167, 193, 219, 245, 311, 378, 429, 480, 583, 685, 748, 810, 904, 998, 1066, 1134, 1202, 1225, 1248, 1272, 1314, 1357, 1399, 1423, 1447, 1470,
            1570, 1670, 1770, 1930, 2089, 2248, 2320, 2391, 2463, 2539, 2615, 2692, 2790, 2889, 2988, 3043, 3099, 3154, 3247, 3339, 3432, 3522, 3613, 3703, 3811, 3920, 4028, 4098, 4168, 4238, 4357,
            4475, 4593, 4704, 4816, 4927, 5022, 5117, 5212, 5307, 5402, 5497, 5609, 5721, 5833, 5992, 6151, 6310, 6470, 6633, 6788, 6973, 7154, 7331, 7484, 7633, 7782, 7920, 8058, 8196, 8431, 8667,
            8902, 9078, 9253, 9428, 9597, 9669, 9728, 9802, 9868, 9971, 10082, 10189, 10296, 10411, 10503, 10678, 10702, 10925, 11000, 11140, 11266, 11466, 11649, 11864, 12046, 12176, 12320, 12465,
            12606, 12724, 12838.5, 12959, 13055, 13248, 13419, 13589, 13760, 13897, 14035, 14173, 14315,
        ];

        let arr = [];
        obj.forEach((val, index) => {
            arr.push([index + 1, val * 4]);
        });

        // console.log(arr);
        fs.writeFileSync("./energyTableFTNPower.json", JSON.stringify(arr, null, 4));
        // if (!args[0]) return message.channel.send("Please provide an accountId!");

        // var config = {
        //     method: "post",
        //     url: `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/081825b3693b43579cdcd10c1ef1c2d3/public/QueryPublicProfile?profileId=campaign`,
        //     headers: {
        //         Authorization: `Bearer ${fnclient.authenticator.accessToken}`,
        //         "Content-Type": "application/json",
        //         Cookie: "EPIC_DEVICE=7ebd42f71cb44af5b2e8a25e51e8b417",
        //     },
        //     data: data,
        // };

        // axios(config)
        //     .then(function (response) {
        //         fs.writeFileSync("./QueryPublicProfile.json", JSON.stringify(response.data, null, 4));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        // let table = [
        //   {
        //     "KeyTime": 0.0,
        //     "KeyValue": 1.0
        //   },
        //   {
        //     "KeyTime": 75.0,
        //     "KeyValue": 2.0
        //   },
        //   {
        //     "KeyTime": 165.0,
        //     "KeyValue": 3.0
        //   },
        //   {
        //     "KeyTime": 245.0,
        //     "KeyValue": 4.0
        //   },
        //   {
        //     "KeyTime": 395.0,
        //     "KeyValue": 5.0
        //   },
        //   {
        //     "KeyTime": 525.0,
        //     "KeyValue": 6.0
        //   },
        //   {
        //     "KeyTime": 780.0,
        //     "KeyValue": 7.0
        //   },
        //   {
        //     "KeyTime": 1020.0,
        //     "KeyValue": 8.0
        //   },
        //   {
        //     "KeyTime": 1280.0,
        //     "KeyValue": 11.0
        //   },
        //   {
        //     "KeyTime": 1600.0,
        //     "KeyValue": 15.0
        //   },
        //   {
        //     "KeyTime": 1965.0,
        //     "KeyValue": 18.0
        //   },
        //   {
        //     "KeyTime": 2540.0,
        //     "KeyValue": 20.0
        //   },
        //   {
        //     "KeyTime": 3155.0,
        //     "KeyValue": 22.0
        //   },
        //   {
        //     "KeyTime": 3765.0,
        //     "KeyValue": 24.0
        //   },
        //   {
        //     "KeyTime": 4310.0,
        //     "KeyValue": 25.0
        //   },
        //   {
        //     "KeyTime": 5095.0,
        //     "KeyValue": 26.0
        //   },
        //   {
        //     "KeyTime": 6060.0,
        //     "KeyValue": 29.0
        //   },
        //   {
        //     "KeyTime": 6980.0,
        //     "KeyValue": 32.0
        //   },
        //   {
        //     "KeyTime": 8140.0,
        //     "KeyValue": 36.0
        //   },
        //   {
        //     "KeyTime": 9440.0,
        //     "KeyValue": 41.0
        //   },
        //   {
        //     "KeyTime": 10695.0,
        //     "KeyValue": 46.0
        //   },
        //   {
        //     "KeyTime": 11890.0,
        //     "KeyValue": 49.0
        //   },
        //   {
        //     "KeyTime": 12990.0,
        //     "KeyValue": 53.0
        //   },
        //   {
        //     "KeyTime": 13615.0,
        //     "KeyValue": 54.0
        //   },
        //   {
        //     "KeyTime": 14285.0,
        //     "KeyValue": 55.0
        //   },
        //   {
        //     "KeyTime": 15335.0,
        //     "KeyValue": 57.0
        //   },
        //   {
        //     "KeyTime": 16845.0,
        //     "KeyValue": 60.0
        //   },
        //   {
        //     "KeyTime": 18445.0,
        //     "KeyValue": 63.0
        //   },
        //   {
        //     "KeyTime": 22255.0,
        //     "KeyValue": 73.0
        //   },
        //   {
        //     "KeyTime": 24030.0,
        //     "KeyValue": 78.0
        //   },
        //   {
        //     "KeyTime": 25260.0,
        //     "KeyValue": 81.0
        //   },
        //   {
        //     "KeyTime": 26480.0,
        //     "KeyValue": 84.0
        //   },
        //   {
        //     "KeyTime": 27145.0,
        //     "KeyValue": 86.0
        //   },
        //   {
        //     "KeyTime": 27870.0,
        //     "KeyValue": 87.0
        //   },
        //   {
        //     "KeyTime": 29230.0,
        //     "KeyValue": 89.0
        //   },
        //   {
        //     "KeyTime": 31500.0,
        //     "KeyValue": 93.0
        //   },
        //   {
        //     "KeyTime": 33410.0,
        //     "KeyValue": 96.0
        //   },
        //   {
        //     "KeyTime": 35640.0,
        //     "KeyValue": 102.0
        //   },
        //   {
        //     "KeyTime": 37840.0,
        //     "KeyValue": 107.0
        //   },
        //   {
        //     "KeyTime": 39840.0,
        //     "KeyValue": 113.0
        //   },
        //   {
        //     "KeyTime": 41500.0,
        //     "KeyValue": 116.0
        //   },
        //   {
        //     "KeyTime": 43055.0,
        //     "KeyValue": 120.0
        //   },
        //   {
        //     "KeyTime": 43870.0,
        //     "KeyValue": 121.0
        //   },
        //   {
        //     "KeyTime": 44590.0,
        //     "KeyValue": 123.0
        //   },
        //   {
        //     "KeyTime": 46050.0,
        //     "KeyValue": 124.0
        //   },
        //   {
        //     "KeyTime": 47685.0,
        //     "KeyValue": 126.0
        //   },
        //   {
        //     "KeyTime": 48780.0,
        //     "KeyValue": 127.0
        //   },
        //   {
        //     "KeyTime": 49550.0,
        //     "KeyValue": 128.0
        //   },
        //   {
        //     "KeyTime": 51500.0,
        //     "KeyValue": 130.0
        //   },
        //   {
        //     "KeyTime": 52125.0,
        //     "KeyValue": 131.0
        //   },
        //   {
        //     "KeyTime": 52590.0,
        //     "KeyValue": 133.0
        //   },
        //   {
        //     "KeyTime": 52990.0,
        //     "KeyValue": 134.0
        //   },
        //   {
        //     "KeyTime": 53455.0,
        //     "KeyValue": 136.0
        //   },
        //   {
        //     "KeyTime": 53855.0,
        //     "KeyValue": 137.0
        //   },
        //   {
        //     "KeyTime": 54320.0,
        //     "KeyValue": 139.0
        //   },
        //   {
        //     "KeyTime": 54720.0,
        //     "KeyValue": 140.0
        //   },
        //   {
        //     "KeyTime": 55180.0,
        //     "KeyValue": 142.0
        //   },
        //   {
        //     "KeyTime": 55615.0,
        //     "KeyValue": 143.0
        //   },
        //   {
        //     "KeyTime": 56095.0,
        //     "KeyValue": 145.0
        //   },
        //   {
        //     "KeyTime": 92765.0,
        //     "KeyValue": 225.0
        //   }
        // ];

        // let energyTable = [];
        // table.forEach((obj) => {
        //     energyTable.push([obj.KeyValue, obj.KeyTime]);
        // })
        // console.log(energyTable);
    },
};
