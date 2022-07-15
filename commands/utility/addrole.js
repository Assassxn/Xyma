module.exports = {
  name: "addrole",
  aliases: ["giverole", "assignrole", "promote"],
  permissions: ["MANAGE_ROLES"],
  description: "This command assigns a role!",
  hidden: true,
  run: async (client, message, args) => {
    const target = message.mentions.members.first(); 
    if (!target) return message.channel.send("No member specified").then((msg) => msg.delete({ timeout: 2000 }));
    const role = message.mentions.roles.first(); // roles = mentions
    if (!role) return message.channel.send("No role specified").then((msg) => msg.delete({ timeout: 2000 }));
    await target.roles.add(role); // adding the role to the user
    message.channel.send(`**${target.user.username}** got promoted to \`${role.name}\``);
  },
};
