const { MessageEmbed } = require("discord.js");
const weather = require('weather-js')
module.exports = {
    name: "weather",
    aliases: [],
    description: "Get the weather of a city!",
    permissions: [],
    run: async (client, message, args) => {
        message.delete().catch()
        let city = args.join(" ");
        if(!city) {
            return message.channel.send("Please provide some city to check the weather for!")
        }

        weather.find({ search: city, degreeType: "C"}, (error, result) => {
            if(error) return message.channel.send("Something went worng!")
            else if(result.length === 0){
                return message.channel.send("Your city provided is not found!")
            }

            let data = result[0]
            let time = `${data.current.date}, ${data.current.observationtime}`
            const embed = new MessageEmbed()
                .setAuthor("Weather Forecast", data.current.imageUrl)
                .setColor("#0f0f0f")
                .setThumbnail(data.current.imageUrl)
                .addField("City", data.location.name, true)
                .addField("Sky Condition", data.current.skytext, true)
                .addField("Temperature", `${data.current.temperature} °C`, true)
                .addField("Wind Speed", data.current.windspeed, true)
                .addField("Timezone", data.location.timezone, true)
                .addField("Day", data.current.day, true)
                .setFooter(time);

            return message.channel.send(embed)
        })
    },
};
