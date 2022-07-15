const { client } = require("../index");

const announcementsEmoji = "📢";
const twitchandyoutubeEmoji = "🔔";
const giveawaysEmoji = "🎁";
const minigamesEmoji = "🧩";

client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    const PCEmoji = "🖥️";
    const XBOXEmoji = "xbox";
    const PlaystationEmoji = "playstation";
    const mobileEmoji = "📱";
    const switchEmoji = "switch";

    const channel = "815009708305809418";

    theCache = reaction.message.guild.roles.cache;

    const ASIA = theCache.find((role) => role.name === "ASIA");
    const BRZ = theCache.find((role) => role.name === "BRZ");
    const EU = theCache.find((role) => role.name === "EU");
    const ME = theCache.find((role) => role.name === "ME");
    const NAE = theCache.find((role) => role.name === "NAE");
    const NAW = theCache.find((role) => role.name === "NAW");
    const OCE = theCache.find((role) => role.name === "OCE");

    const PC = theCache.find((role) => role.name === "PC");
    const Xbox = theCache.find((role) => role.name === "Xbox");
    const Playstation = theCache.find((role) => role.name === "Playstation");
    const Mobile = theCache.find((role) => role.name === "Mobile");
    const Switch = theCache.find((role) => role.name === "Switch");

    const announcements = theCache.find((role) => role.name === "📢");
    const twitchandyoutube = theCache.find((role) => role.name === "🔔");
    const giveaways = theCache.find((role) => role.name === "🎁");
    const minigames = theCache.find((role) => role.name === "🧩");

    if (reaction.message.channel.id == channel) {
        theMember = reaction.message.guild.members.cache.get(user.id);
        if (!theMember.roles.cache.has("822228879237578783")) {
            theMember.roles.add("822228879237578783");
        }
        if (reaction.emoji.name === announcementsEmoji && !theMember.roles.cache.has("816998907803992084")) {
            theMember.roles.add(announcements);
            await user.send(`${user}, you added the \`@${announcements.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }
        if (reaction.emoji.name === announcementsEmoji && theMember.roles.cache.has("816998907803992084")) {
            await theMember.roles.remove(announcements);
            await user.send(`${user}, you removed the \`@${announcements.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }

        if (reaction.emoji.name === twitchandyoutubeEmoji && !theMember.roles.cache.has("816999112599011339")) {
            await theMember.roles.add(twitchandyoutube);
            await user.send(`${user}, you added the \`@${twitchandyoutube.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }
        if (reaction.emoji.name === twitchandyoutubeEmoji && theMember.roles.cache.has("816999112599011339")) {
            await theMember.roles.remove(twitchandyoutube);
            await user.send(`${user}, you removed the \`@${twitchandyoutube.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }

        if (reaction.emoji.name === giveawaysEmoji && !theMember.roles.cache.has("816999267733340180")) {
            await theMember.roles.add(giveaways);
            await user.send(`${user}, you added the \`@${giveaways.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }
        if (reaction.emoji.name === giveawaysEmoji && theMember.roles.cache.has("816999267733340180")) {
            await theMember.roles.remove(giveaways);
            await user.send(`${user}, you removed the \`@${giveaways.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }

        if (reaction.emoji.name === minigamesEmoji && !theMember.roles.cache.has("816999386030145537")) {
            await theMember.roles.add(minigames);
            await user.send(`${user}, you added the \`@${minigames.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }
        if (reaction.emoji.name === minigamesEmoji && theMember.roles.cache.has("816999386030145537")) {
            await theMember.roles.remove(minigames);
            await user.send(`${user}, you removed the \`@${minigames.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }

        if (reaction.emoji.name === PCEmoji && !theMember.roles.cache.has("819693709124960289")) {
            if (theMember.roles.cache.has("819695013323079743")) {
                theMember.roles.remove(Xbox);
            } else if (theMember.roles.cache.has("819695274393075712")) {
                theMember.roles.remove(Playstation);
            } else if (theMember.roles.cache.has("819693448998158346")) {
                theMember.roles.remove(Mobile);
            } else if (theMember.roles.cache.has("819695006818238465")) {
                theMember.roles.remove(Switch);
            }
            await theMember.roles.add(PC);
            await user.send(`${user}, you added the \`@${PC.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }
        if (reaction.emoji.name === PCEmoji && theMember.roles.cache.has("819693709124960289")) {
            await theMember.roles.remove(PC);
            await user.send(`${user}, you removed the \`@${PC.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }

        if (reaction.emoji.name === XBOXEmoji && !theMember.roles.cache.has("819695013323079743")) {
            await theMember.roles.add(Xbox);
            await user.send(`${user}, you added the \`@${Xbox.name}\` role`);
            reaction.users.remove(user.id);
            if (theMember.roles.cache.has("819693709124960289")) {
                theMember.roles.remove(PC);
            } else if (theMember.roles.cache.has("819695274393075712")) {
                theMember.roles.remove(Playstation);
            } else if (theMember.roles.cache.has("819693448998158346")) {
                theMember.roles.remove(Mobile);
            } else if (theMember.roles.cache.has("819695006818238465")) {
                theMember.roles.remove(Switch);
            }
            return;
        }
        if (reaction.emoji.name === XBOXEmoji && theMember.roles.cache.has("819695013323079743")) {
            await theMember.roles.remove(Xbox);
            await user.send(`${user}, you removed the \`@${Xbox.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }

        if (reaction.emoji.name === PlaystationEmoji && !theMember.roles.cache.has("819695274393075712")) {
            await theMember.roles.add(Playstation);
            await user.send(`${user}, you added the \`@${Playstation.name}\` role`);
            reaction.users.remove(user.id);
            if (theMember.roles.cache.has("819695013323079743")) {
                theMember.roles.remove(Xbox);
            } else if (theMember.roles.cache.has("819693709124960289")) {
                theMember.roles.remove(PC);
            } else if (theMember.roles.cache.has("819693448998158346")) {
                theMember.roles.remove(Mobile);
            } else if (theMember.roles.cache.has("819695006818238465")) {
                theMember.roles.remove(Switch);
            }
            return;
        }
        if (reaction.emoji.name === PlaystationEmoji && theMember.roles.cache.has("819695274393075712")) {
            await theMember.roles.remove(Playstation);
            await user.send(`${user}, you removed the \`@${Playstation.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }

        if (reaction.emoji.name === mobileEmoji && !theMember.roles.cache.has("819693448998158346")) {
            await theMember.roles.add(Mobile);
            await user.send(`${user}, you added the \`@${Mobile.name}\` role`);
            reaction.users.remove(user.id);
            if (theMember.roles.cache.has("819695013323079743")) {
                theMember.roles.remove(Xbox);
            } else if (theMember.roles.cache.has("819693709124960289")) {
                theMember.roles.remove(PC);
            } else if (theMember.roles.cache.has("819695274393075712")) {
                theMember.roles.remove(Playstation);
            } else if (theMember.roles.cache.has("819695006818238465")) {
                theMember.roles.remove(Switch);
            }
            return;
        }
        if (reaction.emoji.name === mobileEmoji && theMember.roles.cache.has("819693448998158346")) {
            await theMember.roles.remove(Mobile);
            await user.send(`${user}, you removed the \`@${Mobile.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }

        if (reaction.emoji.name === switchEmoji && !theMember.roles.cache.has("819695006818238465")) {
            await theMember.roles.add(Switch);
            await user.send(`${user}, you added the \`@${Switch.name}\` role`);
            reaction.users.remove(user.id);
            if (theMember.roles.cache.has("819695013323079743")) {
                theMember.roles.remove(Xbox);
            } else if (theMember.roles.cache.has("819693709124960289")) {
                theMember.roles.remove(PC);
            } else if (theMember.roles.cache.has("819695274393075712")) {
                theMember.roles.remove(Playstation);
            } else if (theMember.roles.cache.has("819693448998158346")) {
                theMember.roles.remove(Mobile);
            }
            return;
        }
        if (reaction.emoji.name === switchEmoji && theMember.roles.cache.has("819695006818238465")) {
            await theMember.roles.remove(Switch);
            await user.send(`${user}, you removed the \`@${Switch.name}\` role`);
            reaction.users.remove(user.id);
            return;
        }

        if (reaction.emoji.name === "ASIA" && !theMember.roles.cache.has("822936729962414110")) {
            if (theMember.roles.cache.has("822936797779984404")) {
                theMember.roles.remove(BRZ);
            } else if (theMember.roles.cache.has("822936859490648156")) {
                theMember.roles.remove(EU);
            } else if (theMember.roles.cache.has("822936917921497100")) {
                theMember.roles.remove(ME);
            } else if (theMember.roles.cache.has("822936946446696451")) {
                theMember.roles.remove(NAE);
            } else if (theMember.roles.cache.has("822937007902425170")) {
                theMember.roles.remove(NAW);
            } else if (theMember.roles.cache.has("822937043096567887")) {
                theMember.roles.remove(OCE);
            }

            await theMember.roles.add(ASIA);
            await user.send(`${user}, you assigned the \`@${ASIA.name}\` region`);

            reaction.users.remove(user.id);
        }
        if (reaction.emoji.name === "BRZ" && !theMember.roles.cache.has("822936797779984404")) {
            if (theMember.roles.cache.has("822936729962414110")) {
                theMember.roles.remove(ASIA);
            } else if (theMember.roles.cache.has("822936859490648156")) {
                theMember.roles.remove(EU);
            } else if (theMember.roles.cache.has("822936917921497100")) {
                theMember.roles.remove(ME);
            } else if (theMember.roles.cache.has("822936946446696451")) {
                theMember.roles.remove(NAE);
            } else if (theMember.roles.cache.has("822937007902425170")) {
                theMember.roles.remove(NAW);
            } else if (theMember.roles.cache.has("822937043096567887")) {
                theMember.roles.remove(OCE);
            }

            await theMember.roles.add(BRZ);
            await user.send(`${user}, you assigned the \`@${BRZ.name}\` region`);
            reaction.users.remove(user.id);
        }
        if (reaction.emoji.name === "EU" && !theMember.roles.cache.has("822936859490648156")) {
            if (theMember.roles.cache.has("822936729962414110")) {
                theMember.roles.remove(ASIA);
            } else if (theMember.roles.cache.has("822936797779984404")) {
                theMember.roles.remove(BRZ);
            } else if (theMember.roles.cache.has("822936917921497100")) {
                theMember.roles.remove(ME);
            } else if (theMember.roles.cache.has("822936946446696451")) {
                theMember.roles.remove(NAE);
            } else if (theMember.roles.cache.has("822937007902425170")) {
                theMember.roles.remove(NAW);
            } else if (theMember.roles.cache.has("822937043096567887")) {
                theMember.roles.remove(OCE);
            }

            await theMember.roles.add(EU);
            await user.send(`${user}, you assigned the \`@${EU.name}\` region`);

            reaction.users.remove(user.id);
        }
        if (reaction.emoji.name === "ME" && !theMember.roles.cache.has("822936917921497100")) {
            if (theMember.roles.cache.has("822936729962414110")) {
                theMember.roles.remove(ASIA);
            } else if (theMember.roles.cache.has("822936797779984404")) {
                theMember.roles.remove(BRZ);
            } else if (theMember.roles.cache.has("822936859490648156")) {
                theMember.roles.remove(EU);
            } else if (theMember.roles.cache.has("822936946446696451")) {
                theMember.roles.remove(NAE);
            } else if (theMember.roles.cache.has("822937007902425170")) {
                theMember.roles.remove(NAW);
            } else if (theMember.roles.cache.has("822937043096567887")) {
                theMember.roles.remove(OCE);
            }

            reaction.users.remove(user.id);
        }
        if (reaction.emoji.name === "NAE" && !theMember.roles.cache.has("822936946446696451")) {
            if (theMember.roles.cache.has("822936729962414110")) {
                theMember.roles.remove(ASIA);
            } else if (theMember.roles.cache.has("822936797779984404")) {
                theMember.roles.remove(BRZ);
            } else if (theMember.roles.cache.has("822936859490648156")) {
                theMember.roles.remove(EU);
            } else if (theMember.roles.cache.has("822936917921497100")) {
                theMember.roles.remove(ME);
            } else if (theMember.roles.cache.has("822937007902425170")) {
                theMember.roles.remove(NAW);
            } else if (theMember.roles.cache.has("822937043096567887")) {
                theMember.roles.remove(OCE);
            }

            await theMember.roles.add(NAE);
            await user.send(`${user}, you assigned the \`@${NAE.name}\` region`);

            reaction.users.remove(user.id);
        }
        if (reaction.emoji.name === "NAW" && !theMember.roles.cache.has("822937007902425170")) {
            if (theMember.roles.cache.has("822936729962414110")) {
                theMember.roles.remove(ASIA);
            } else if (theMember.roles.cache.has("822936797779984404")) {
                theMember.roles.remove(BRZ);
            } else if (theMember.roles.cache.has("822936859490648156")) {
                theMember.roles.remove(EU);
            } else if (theMember.roles.cache.has("822936946446696451")) {
                theMember.roles.remove(NAE);
            } else if (theMember.roles.cache.has("822936917921497100")) {
                theMember.roles.remove(ME);
            } else if (theMember.roles.cache.has("822937043096567887")) {
                theMember.roles.remove(OCE);
            }

            await theMember.roles.add(NAW);
            await user.send(`${user}, you assigned the \`@${NAW.name}\` region`);

            reaction.users.remove(user.id);
        }
        if (reaction.emoji.name === "OCE" && !theMember.roles.cache.has("822937043096567887")) {
            if (theMember.roles.cache.has("822936729962414110")) {
                theMember.roles.remove(ASIA);
            } else if (theMember.roles.cache.has("822936797779984404")) {
                theMember.roles.remove(BRZ);
            } else if (theMember.roles.cache.has("822936859490648156")) {
                theMember.roles.remove(EU);
            } else if (theMember.roles.cache.has("822936946446696451")) {
                theMember.roles.remove(NAE);
            } else if (theMember.roles.cache.has("822936917921497100")) {
                theMember.roles.remove(ME);
            } else if (theMember.roles.cache.has("822937007902425170")) {
                theMember.roles.remove(NAW);
            }

            await theMember.roles.add(OCE);
            await user.send(`${user}, you assigned the \`@${OCE.name}\` region`);

            reaction.users.remove(user.id);
        }
    } else {
        return;
    }
});
