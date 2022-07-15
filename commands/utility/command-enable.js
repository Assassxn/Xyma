const schema = require("../../models/command");

module.exports = {
  name: "cmd-enable",
  permissions: ["ADMINISTRATOR"],
  hidden: true,
  run: async (client, message, args) => {
    const cmd = args[0];
    if (!cmd)
      return message.channel.send("Please specify a command").then((msg) => {
        msg.delete({ timeout: 5000 });
      });
    if (!!client.commands.get(cmd) === false)
      return message.channel.send("This command does not exist").then((msg) => {
        msg.delete({ timeout: 5000 });
      });
    await schema.findOne({ GuildID: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.Cmds.includes(cmd)) {
          let commandNumber;

          for (let i = 0; i < data.Cmds.length; i++) {
            if (data.Cmds[i] === cmd) data.Cmds.splice(i, 1);
          }

          await data.save();
          message.channel.send(`Enabled \`${cmd}\`!`);
        } else return message.channel.send(`${cmd} is not disabled!`);
      }
    });
  },
};
