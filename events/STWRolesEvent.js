const channel = "857706982718963764";
const { client } = require("../index");
const profileModel = require("../models/profileSchema");
const freellamaEmoji = "🦙";
const mskhelperEmoji = "😈";
const endurancehostEmoji = "🛸";
const crafterEmoji = "🔨";
const endGameEmoji = "⚡";

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  theMember = reaction.message.guild.members.cache.get(user.id);
  roleCache = reaction.message.guild.roles.cache;

  const freellama = roleCache.find((role) => role.name === "🦙");
  const stwHelper = roleCache.find((role) => role.name === "STW Helper");
  const mskhelper = roleCache.find((role) => role.name === "MSK Helper");
  const crafter = roleCache.find((role) => role.name === "Crafter");
  const endgame = roleCache.find((role) => role.name === "End Game");
  const endurancehost = roleCache.find((role) => role.name === "🛸");

  if (reaction.message.channel.id == channel) {
    if (!theMember.roles.cache.has("822954238169972746")) {
      theMember.roles.add("822954238169972746");
    }
    if (reaction.emoji.name === freellamaEmoji && !theMember.roles.cache.has("817000186294829057")) {
      await theMember.roles.add(freellama);
      await user.send(`${user}, you added the \`@${freellama.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
    if (reaction.emoji.name === "bluglo" && !theMember.roles.cache.has("839941689329319999")) {
      await theMember.roles.add(stwHelper);

      let data = await profileModel.findOne({ userID: user.id });
      if (data.STWCarries) {
        if (data.STWCarries >= 0 && data.STWCarries < 25) {
          await theMember.roles.add("862085968861200394");
        }
        if (data.STWCarries >= 25 && data.STWCarries < 50) {
          await theMember.roles.add("862086114088058910");
        }
        if (data.STWCarries > 50 && data.STWCarries <= 100) {
          await theMember.roles.add("862086197114306562");
        }
        if (data.STWCarries > 100 && data.STWCarries <= 250) {
          await theMember.roles.add("862086346759864371");
        }
        if (data.STWCarries > 250 && data.STWCarries <= 500) {
          await theMember.roles.add("862086473392848906");
        }
        if (data.STWCarries > 500 && data.STWCarries <= 1000) {
          await theMember.roles.add("862086564212506644");
        }

        if (!theMember.roles.cache.has("869323107008131102")) {
            theMember.roles.add("869323107008131102");
        }
      } else {
        await profileModel.findOneAndUpdate({ userID: user.id }, { STWCarries: 0 });
        await theMember.roles.add("862085968861200394");

        if (!theMember.roles.cache.has("869323107008131102")) {
            theMember.roles.add("869323107008131102");
        }
      }
      
      await user.send(`${user}, you added the \`@${stwHelper.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
    if (reaction.emoji.name === mskhelperEmoji && !theMember.roles.cache.has("817001281083801630")) {
      await theMember.roles.add(mskhelper);

      let data = await profileModel.findOne({ userID: user.id });
      if (data.MSKCarries) {
        if (data.MSKCarries >= 0 && data.MSKCarries < 25) {
          await theMember.roles.add("862083654092324935");
        }
        if (data.MSKCarries >= 25 && data.MSKCarries < 50) {
          await theMember.roles.add("862084007674773554");
        }
        if (data.MSKCarries > 50 && data.MSKCarries <= 100) {
          await theMember.roles.add("862084101539364924");
        }
        if (data.MSKCarries > 100 && data.MSKCarries <= 250) {
          await theMember.roles.add("862084360991670272");
        }
        if (data.MSKCarries > 250 && data.MSKCarries <= 500) {
          await theMember.roles.add("862084444822306827");
        }
        if (data.MSKCarries > 500 && data.MSKCarries <= 1000) {
          await theMember.roles.add("862084566184362024");
        }

        if(!theMember.roles.cache.has('869323107008131102')) {
          theMember.roles.add("869323107008131102");
        }

      } else {
        await profileModel.findOneAndUpdate({ userID: user.id }, { MSKCarries: 0 });
        await theMember.roles.add("862083654092324935");
        if (!theMember.roles.cache.has("869323107008131102")) {
            theMember.roles.add("869323107008131102");
        }
      }

      await user.send(`${user}, you added the \`@${mskhelper.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
    if (reaction.emoji.name === endurancehostEmoji && !theMember.roles.cache.has("817000460585140224")) {
      await theMember.roles.add(endurancehost);
      await user.send(`${user}, you added the \`@${endurancehost.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
    if (reaction.emoji.name === crafterEmoji && !theMember.roles.cache.has("857712152167972887")) {
      await theMember.roles.add(crafter);

      let data = await profileModel.findOne({ userID: user.id });
      if (data.CraftRep) {
        if (data.CraftRep >= 0 && data.CraftRep < 25) {
          await theMember.roles.add("862268394072703006");
        }
        if (data.CraftRep >= 25 && data.CraftRep < 50) {
          await theMember.roles.add("862268563623641088");
        }
        if (data.CraftRep > 50 && data.CraftRep <= 100) {
          await theMember.roles.add("862268755127042089");
        }
        if (data.CraftRep > 100 && data.CraftRep <= 250) {
          await theMember.roles.add("862268846210285609");
        }
        if (data.CraftRep > 250 && data.CraftRep <= 500) {
          await theMember.roles.add("862268935726170152");
        }
        if (data.CraftRep > 500 && data.CraftRep <= 1000) {
          await theMember.roles.add("862269056404815872");
        }

        if (!theMember.roles.cache.has("869323107008131102")) {
            theMember.roles.add("869323107008131102");
        }
      } else {
        await profileModel.findOneAndUpdate({ userID: user.id }, { CraftRep: 0 });
        await theMember.roles.add("862268394072703006");

        if (!theMember.roles.cache.has("869323107008131102")) {
            theMember.roles.add("869323107008131102");
        }
      }

      await theMember.roles.add("862268394072703006");
      await user.send(`${user}, you added the \`@${crafter.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
    if (reaction.emoji.name === endGameEmoji && !theMember.roles.cache.has("816053943654154260")) {
      await theMember.roles.add(endgame);
      await user.send(`${user}, you added the \`@${endgame.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }

    //REMOVE

    if (reaction.emoji.name === freellamaEmoji && theMember.roles.cache.has("817000186294829057")) {
      await theMember.roles.remove(freellama);
      await user.send(`${user}, you removed the \`@${freellama.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
    if (reaction.emoji.name === "bluglo" && theMember.roles.cache.has("839941689329319999")) {
      await theMember.roles.remove(stwHelper);

      if (theMember.roles.cache.has("862085968861200394")) {
        await theMember.roles.remove("862085968861200394");
      }
      if (theMember.roles.cache.has("862086114088058910")) {
        await theMember.roles.remove("862086114088058910");
      }
      if (theMember.roles.cache.has("862086197114306562")) {
        await theMember.roles.remove("862086197114306562");
      }
      if (theMember.roles.cache.has("862086346759864371")) {
        await theMember.roles.remove("862086346759864371");
      }
      if (theMember.roles.cache.has("862086473392848906")) {
        await theMember.roles.remove("862086473392848906");
      }
      if (theMember.roles.cache.has("862086564212506644")) {
        await theMember.roles.remove("862086564212506644");
      }

      if (
          theMember.roles.cache.has("869323107008131102") &&
          !theMember.roles.cache.has("817001281083801630") &&
          !theMember.roles.cache.has("839941689329319999") &&
          !theMember.roles.cache.has("857712152167972887")
      ) {
          theMember.roles.remove("869323107008131102");
          theMember.roles.remove("822954238169972746");
      }

      await user.send(`${user}, you removed the \`@${stwHelper.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
    if (reaction.emoji.name === mskhelperEmoji && theMember.roles.cache.has("817001281083801630")) {
      await theMember.roles.remove(mskhelper);

      if (theMember.roles.cache.has("862083654092324935")) {
        await theMember.roles.remove("862083654092324935");
      }
      if (theMember.roles.cache.has("862084007674773554")) {
        await theMember.roles.remove("862084007674773554");
      }
      if (theMember.roles.cache.has("862084101539364924")) {
        await theMember.roles.remove("862084101539364924");
      }
      if (theMember.roles.cache.has("862084360991670272")) {
        await theMember.roles.remove("862084360991670272");
      }
      if (theMember.roles.cache.has("862084444822306827")) {
        await theMember.roles.remove("862084444822306827");
      }
      if (theMember.roles.cache.has("862084566184362024")) {
        await theMember.roles.remove("862084566184362024");
      }

      if (
          theMember.roles.cache.has("869323107008131102") &&
          !theMember.roles.cache.has("817001281083801630") &&
          !theMember.roles.cache.has("839941689329319999") &&
          !theMember.roles.cache.has("857712152167972887")
      ) {
          theMember.roles.remove("869323107008131102");
          theMember.roles.remove("822954238169972746");
      }

      await user.send(`${user}, you removed the \`@${mskhelper.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
    if (reaction.emoji.name === endurancehostEmoji && theMember.roles.cache.has("817000460585140224")) {
      await theMember.roles.remove(endurancehost);
      await user.send(`${user}, you removed the \`@${endurancehost.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
    if (reaction.emoji.name === crafterEmoji && theMember.roles.cache.has("857712152167972887")) {
      await theMember.roles.remove(crafter);

      if (theMember.roles.cache.has("862268394072703006")) {
        await theMember.roles.remove("862268394072703006");
      }
      if (theMember.roles.cache.has("862268563623641088")) {
        await theMember.roles.remove("862268563623641088");
      }
      if (theMember.roles.cache.has("862268755127042089")) {
        await theMember.roles.remove("862268755127042089");
      }
      if (theMember.roles.cache.has("862268846210285609")) {
        await theMember.roles.remove("862268846210285609");
      }
      if (theMember.roles.cache.has("862268935726170152")) {
        await theMember.roles.remove("862268935726170152");
      }
      if (theMember.roles.cache.has("862269056404815872")) {
        await theMember.roles.remove("862269056404815872");
      }

      if (
          theMember.roles.cache.has("869323107008131102") &&
          !theMember.roles.cache.has("817001281083801630") &&
          !theMember.roles.cache.has("839941689329319999") &&
          !theMember.roles.cache.has("857712152167972887")
      ) {
          theMember.roles.remove("869323107008131102");
          theMember.roles.remove("822954238169972746");
      }

      await user.send(`${user}, you removed the \`@${crafter.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
    if (reaction.emoji.name === endGameEmoji && theMember.roles.cache.has("816053943654154260")) {
      await theMember.roles.remove(endgame);
      await user.send(`${user}, you removed the \`@${endgame.name}\` role`);
      reaction.users.remove(user.id);
      return;
    }
  } else {
    return;
  }
});
