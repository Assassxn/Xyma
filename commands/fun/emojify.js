const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojify1",
  aliases: ["e1"],
  permissions: [],
  run: async (client, message, args) => {
      message.delete();
    if (!args.length) return message.reply("Please specify a text to translate.");
    const specialCodes = {
      0: ":zero:",
      1: ":one:",
      2: ":two:",
      3: ":three:",
      4: ":four:",
      5: ":five:",
      6: ":six:",
      7: ":seven:",
      8: ":eight:",
      9: ":nine:",
      "#": ":hash:",
      "*": ":asterisk:",
      "?": ":grey_question:",
      "!": ":grey_exclamation:",
      " ": "   ",
      "a": "<a:A_:864154202137034792>",
      "b": "<a:B_:864154187276615740>",
      "c": "<a:C_:864154187007918080>",
      "d": "<a:D_:864154170277232660>",
      "e": "<a:E_:864154169501417503>",
      "f": "<a:F_:864154170058997783>",
      "g": "<a:G_:864154144361283594>",
      "h": "<a:H_:864154145295171614>",
      "i": "<a:I_:864154143877758987>",
      "j": "<a:J_:864154068582662166>",
      "k": "<a:K_:864154075791753246>",
      "l": "<a:L_:864154073308463104>",
      "m": "<a:m_:864154076829057034>",
      "n": "<a:N_:864154076598108170>",
      "o": "<a:O_:864154076991062016>",
      "p": "<a:p_:864154076043542548>",
      "q": "<a:Q_:864154076505571349>",
      "r": "<a:R_:864154077189636127>",
      "s": "<a:s_:864154075871707167>",
      "t": "<a:t_:864154073551863858>",
      "u": "<a:U_:864154075977351188>",
      "v": "<a:v_:864154074933100554>",
      "w": "<a:w_:864154077494247435>",
      "x": "<a:X_:864154076090597397>",
      "y": "<a:Y_:864154074017169408>",
      "z": "<a:z_:864154076266496010>",
    };
    const text = args
      .join(" ")
      .toLowerCase()
      .split("")
      .map((letter) => {
        if (specialCodes[letter]) {
          return `${specialCodes[letter]}`;
        }
        return letter;
      })
      .join("");

    message.channel.send(text);
  },
};
