const { fnclient } = require("../../index");
const fs = require("fs");

module.exports = {
    name: "pve",
    aliases: [],
    description: "hehe",
    hidden: true,
    permissions: [],

    run: async (client, message, args) => {
        message.delete().catch();
        // fnclient.getPVEInfo().then((res) => {
        // console.log(res);
        // fs.writeFileSync("./pve.json", JSON.stringify(res, null, 4));
        // });

        // fnclient.stats.getV2Stats("081825b3693b43579cdcd10c1ef1c2d3").then((res) => {
        //     fs.writeFileSync("./V2Stats.json", JSON.stringify(res, null, 4));
        // });

        // fnclient.getBRStore().then((res) => {
        //     fs.writeFileSync("./BRStore.json", JSON.stringify(res, null, 4));
        // });

        // fnclient.getBRNews('en').then((res) => {
        //     fs.writeFileSync("./getBRNews.json", JSON.stringify(res, null, 4));
        // });

        // fnclient.getBREventFlags().then((res) => {
        //     fs.writeFileSync("./getBREventFlags.json", JSON.stringify(res, null, 4));
        // });

        // fnclient.getServerStatus().then((res) => {
        //     fs.writeFileSync("./serverStatus.json", JSON.stringify(res, null, 4));
        // });
    },
};
