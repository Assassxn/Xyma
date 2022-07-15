const schema = require('../../models/command')

module.exports = {
  name: "cmd-disable",
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
        if (data.Cmds.includes(cmd))
          return message.channel.send("This command has already been disabled!").then((msg) => {
            msg.delete({ timeout: 5000 });
          });
        data.Cmds.push(cmd);
      } else {
        data = new schema({
          GuildID: message.guild.id,
          Cmds: cmd,
        });
      }
      await data.save();
      message.channel.send(`Command: \`${cmd}\` has been disabled!`);
    });
  },
};