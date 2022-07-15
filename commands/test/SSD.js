const { fnclient } = require("../../index");
var axios = require("axios");
const { returnSSDs } = require("../../Utils/stwFunctions");
const { MessageEmbed } = require("discord.js");
var data = JSON.stringify({});

module.exports = {
    name: "ssd",
    aliases: [],
    permissions: [],
    run: async (client, message, args) => {
        message.delete().catch();

        if (!args[0]) return message.channel.send("Please provide an epic username!");


        await fnclient.lookup.lookupByUsername(args[0]).then((res) => {
            console.log(res);
            let foundOne = false;
            let displayName;
            if (res.displayName) {
                displayName = res.displayName;
                foundOne = true;
            } else {
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
                if (!foundOne) {
                    if (res.externalAuths.nintendo) {
                        foundOne = true;
                        displayName = res.externalAuths.nintendo.externalDisplayName;
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
                .then(async (response) => {
                    const data = returnSSDs(response.data.profileChanges[0].profile.items);

                    let embed = new MessageEmbed()
                        .setColor("#0f0f0f")
                        .setTitle("STORM SHIELD DEFENCES")
                        .setDescription(`__**Display Name:**__ \`${displayName}\``)
                        .addFields(
                            {
                                name: `<:Homebase:880186079817392149> **Stonewood (**${data[0]}/10**)**`,
                                value: `${returnProgressBar(data[0])}`,
                            },
                            {
                                name: `<:Homebase:880186079817392149> **Plankerton (**${data[1]}/10**)**`,
                                value: `${returnProgressBar(data[1])}`,
                            },
                            {
                                name: `<:Homebase:880186079817392149> **Canny Valley (**${data[2]}/10**)**`,
                                value: `${returnProgressBar(data[2])}`,
                            },
                            {
                                name: `<:Homebase:880186079817392149> **Twine Peaks (**${data[3]}/10**)**`,
                                value: `${returnProgressBar(data[3])}`,
                            }
                        )
                        .setTimestamp();
                    message.channel.send(embed);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
};

function returnProgressBar(data) {
    let redsquares = "";
    let blacksquares = "";
    for (let i = 0; i < data; i++) {
        redsquares += `🟥`;
    }
    for (let i = 0; i < 10 - data; i++) {
        blacksquares += `⬛`;
    }
    finalProgress = redsquares + blacksquares;
    return finalProgress;
}
