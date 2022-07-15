// const { MessageEmbed } = require('discord.js');
// const { oneLine } = require('commom-tags');

// module.exports = (client, message) => {
//     if (channel.type === 'dm' || !message.channel.viewable || message.author.bot) return;


// let disabledCommands = client.db.settings.selectDisabledCommands.pluck().get(message.guild.id) || [];
// if (typeof(disabledCommands) === 'string') disabledCommands.split(' ');

// const prefix = client.db.settings.selectPrefix.pluck().get(message.guild.id);
// const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*`);

// if (prefixRegex.test(message.content)) {


// let modChannelIds = message.client.db.selectModChannelIds.pluck().get(message.guild.id) || [];
// if (typeof(modChannelIDs) === 'string') modChannelIds = modChannelIds.split('');

// const [, match] = message.content.match(prefixRegex);
// const args = message.content.slice(match.length).trim().split(/ +/g);
// const cmd = args.shift().toLowerCase();
// const command = client.commands.get(cmd) || client.aliases.get(cmd);
// if (command && !disabledCommands.includes(command.name)) {

//     if (modChannelIds.includes(message.channel.id)) {
//         if (
//             command.type != client.types.MOD || (command.type == client.types.MOD && message.channel.permissionsFor(message.author).missing(command.userPermissions) != 0)
//         );
//     }

// const permission = command.checkPermissions(message);
// if (permission) {
// return command.run(mesage,args);

// } else if (
//     (message.content === `<@${client.user.id}>` || message.content === `<@${client.user.id}>`) &&
//     message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS']) &&
//     !modChannelIDs.includes(message.channel.id)
// ) {
//     const embed = new MessageEmbed()
//         .setTitle('Hi, I\'m Xyma. need help?')
//         .setDescription('You can see every command i am capable of by doing \`${prefix}help\` command.')
//         .setFooter('DM Assassinツ#2020 for help')
//         .setColor(message.guild.me.displayHexColor)
//         message.channel.send(embed);
// }}}
// }

const { Collection, MessageAttachment } = require("discord.js");
require("dotenv").config();
const { client } = require("../index");
const Timeout = new Collection();
const prefix = process.env.PREFIX;
const ms = require("ms");
const blacklist = require("../models/blacklist");
const cmdDB = require("../models/command");
const guildMemberExperience = require("../models/xpsystem");
const serverConfig = require("../models/serverConfig");
const canvacord = require("canvacord");
let xpRate;

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content.startsWith(prefix)) {
        blacklist.findOne({ id: message.author.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                if (!message.guild) return;
                if (!message.member) message.member = await message.guild.fetchMember(message);
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                const cmd = args.shift().toLowerCase();
                if (cmd.length == 0) return;
                let command = client.commands.get(cmd);
                if (!command) command = client.commands.get(client.aliases.get(cmd));
                if (!command) return;
                const validPermissions = [
                    "CREATE_INSTANT_INVITE",
                    "KICK_MEMBERS",
                    "BAN_MEMBERS",
                    "ADMINISTRATOR",
                    "MANAGE_CHANNELS",
                    "MANAGE_GUILD",
                    "ADD_REACTIONS",
                    "VIEW_AUDIT_LOG",
                    "PRIORITY_SPEAKER",
                    "STREAM",
                    "VIEW_CHANNEL",
                    "SEND_MESSAGES",
                    "SEND_TTS_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "USE_EXTERNAL_EMOJIS",
                    "VIEW_GUILD_INSIGHTS",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "MOVE_MEMBERS",
                    "USE_VAD",
                    "CHANGE_NICKNAME",
                    "MANAGE_NICKNAMES",
                    "MANAGE_ROLES",
                    "MANAGE_WEBHOOKS",
                    "MANAGE_EMOJIS",
                ];

                if (command.permissions.length) {
                    let invalidPerms = [];
                    for (const perm of command.permissions) {
                        if (!validPermissions.includes(perm)) {
                            return console.log(`Invalid Permissions ${perm}`);
                        }
                        if (!message.member.hasPermission(perm)) {
                            invalidPerms.push(perm);
                        }
                    }
                    if (invalidPerms.length) {
                        return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
                    }
                }
                if (command) {
                    if (command.timeout) {
                        if (Timeout.has(`${command.name}${message.author.id}`))
                            return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown.`).then((msg) => {
                                msg.delete({ timeout: 5000 });
                            });

                        const check = await cmdDB.findOne({ GuildID: message.guild.id });
                        if (check) {
                            if (check.Cmds.includes(command.name))
                                return message.channel.send(`\`${command.name}\` is disabled!`).then((msg) => {
                                    msg.delete({ timeout: 5000 });
                                });
                            command.run(client, message, args);

                            // const channel = client.channels.cache.get("867101724858908692");
                            // channel.send(`**${message.author.tag}** has used **${command.name}** command in **${message.channel.name}**`);
                        } else {
                            command.run(client, message, args);

                            // const channel = client.channels.cache.get("867101724858908692");
                            // channel.send(`**${message.author.tag}** has used **${command.name}** command in **${message.channel.name}**`);
                        }

                        Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout);
                        setTimeout(() => {
                            Timeout.delete(`${command.name}${message.author.id}`);
                        }, command.timeout);
                    } else {
                        const check = await cmdDB.findOne({ GuildID: message.guild.id });
                        if (check) {
                            if (check.Cmds.includes(command.name))
                                return message.channel.send(`\`${command.name}\` is disabled!`).then((msg) => {
                                    msg.delete({ timeout: 5000 });
                                });
                            command.run(client, message, args);

                            // const channel = client.channels.cache.get("867101724858908692");
                            // channel.send(`**${message.author.tag}** has used **${command.name}** command in **${message.channel.name}**`);
                        } else {
                            command.run(client, message, args);

                            // const channel = client.channels.cache.get("867101724858908692");
                            // channel.send(`**${message.author.tag}** has used **${command.name}** command in **${message.channel.name}**`);
                        }
                    }
                }
            } else {
                message.author.send("You Are Blacklisted from using this command");
            }
        });
    } else {
        await guildMemberExperience.findOne({ memberID: message.author.id, guildID: message.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await serverConfig.findOne({ guildID: message.guild.id }, async (err, data) => {
                    if (err) throw err;
                    if (data) {
                        xpRate = data.xpRate;
                    } else {
                        let info = await serverConfig.create({
                            guildID: message.guild.id,
                            xpRate: 1,
                        });
                        info.save();
                    }
                });

                const xp = parseInt(Math.floor(generateExp(15, 25) * xpRate));
                const updatedXP = parseInt(data.experiencePoints + xp);
                const newLevel = parseInt(checkExperience(updatedXP, data.currentLevel));
                await guildMemberExperience
                    .findOneAndUpdate(
                        { memberID: message.author.id, guildID: message.guild.id },
                        {
                            $set: {
                                currentLevel: newLevel,
                                experiencePoints: updatedXP,
                            },
                        }
                    )
                    .catch((err) => console.error(err));

                if (data.currentLevel !== newLevel) {
                    neededXp = Math.floor(507.884210328 * (newLevel + 1) * Math.pow(1.025, newLevel + 1)) - Math.floor(507.884210328 * newLevel * Math.pow(1.025, newLevel));
                    currentXpForNextLevel = updatedXP - Math.floor(507.884210328 * (newLevel - 1) * Math.pow(1.025, newLevel - 1));
                    currentLevel = data.currentLevel;

                    await guildMemberExperience.find({ guildID: message.guild.id }, async (err, DATA) => {
                        if (err) throw err;
                        if (DATA) {
                            const sort = DATA.sort((a, b) => b.experiencePoints - a.experiencePoints);
                            for (let i = 0; i < sort.length; i++) {
                                if (sort[i].memberID === message.author.id) {
                                    const rank = new canvacord.Rank()
                                        .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: "png" }))
                                        .setCurrentXP(currentXpForNextLevel)
                                        .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/845954962277531648/868526380915245056/Final_Background.jpg")
                                        .setRequiredXP(neededXp)
                                        .setStatus(message.member.presence.status)
                                        .setProgressBar("#E91015", "COLOR")
                                        .setLevel(currentLevel)
                                        .setUsername(message.member.displayName)
                                        .setDiscriminator(message.author.discriminator)
                                        .setRank(i + 1, "RANK", true)
                                        .renderEmojis(true);

                                    rank.build()
                                        .then((data) => {
                                            const attachement = new MessageAttachment(data, "rank.png");
                                            message.channel.send(attachement);
                                        })
                                        .catch((err) => console.error(err));
                                }
                            }
                        }
                    });
                }
            } else {
                let data = await guildMemberExperience.create({ memberID: message.author.id, guildID: message.guild.id, experiencePoints: 1, currentLevel: 1 });
                data.save();
            }
        });
    }
});

//i can tell, il write new below it incase u wanan switch to a more proficant one
// give me a second I will make a copy of this project then we can do wha
function generateExp(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

function checkExperience(experience, level) {
    const y = Math.floor(507.884210328 * level * Math.pow(1.025, level));
    return experience >= y ? ++level : level;
}
