import { DateTime } from 'luxon';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';
import fs from 'fs';
import path from 'path';
import { getSettings } from '../../lib/fastSettings.js';
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';
import { getDeviceMode } from '../../lib/deviceMode.js';

export default {
  name: 'fullmenu',
  aliases: ['allmenu', 'commandslist', 'allcommands', 'fullcmds', 'fcmds', 'fm'],
  description: 'Displays the full bot command menu by category',
  run: async (context) => {
    const { client, m, totalCommands, mode, pict, fakeQuoted } = context;
    const fq = getFakeQuoted(m);
    await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
    const botname = 'Fee-Xmd';

    const settings = await getSettings();
    const effectivePrefix = settings.prefix || '';

    const categories = [
      { name: 'General', display: 'GEᑎEᖇᗩᒪMENU', emoji: '📜' },
      { name: 'Settings', display: 'SETTINGSMENU', emoji: '🛠️' },
      { name: 'Owner', display: 'OWNERMENU', emoji: '👑' },
      { name: 'Heroku', display: 'HEROKUMENU', emoji: '☁️' },
      { name: 'Privacy', display: 'PRIVACYMENU', emoji: '🔒' },
      { name: 'Groups', display: 'GROUPMENU', emoji: '👥' },
      { name: 'AI', display: 'AIMENU', emoji: '🧠' },
      { name: 'Downloads', display: 'DOWNLOADMENU', emoji: '🎬' },
      { name: 'Editing', display: 'EDITING', emoji: '✂️' },
      { name: 'Effects', display: 'EFFECTSMENU', emoji: '🎨' },
      { name: 'Anime', display: 'ANIMEMENU', emoji: '🎌' },
      { name: 'NSFW', display: '+18MENU', emoji: '🔞' },
      { name: 'Utils', display: 'UTILSMENU', emoji: '🔧' },
      { name: 'Reactions', display: 'REACTIONSMENU', emoji: '🎭' }
    ];

    const getGreeting = () => {
      const currentHour = DateTime.now().setZone('Africa/Nairobi').hour;
      if (currentHour >= 5 && currentHour < 12) return 'Good Morning';
      if (currentHour >= 12 && currentHour < 18) return 'Good Afternoon';
      if (currentHour >= 18 && currentHour < 22) return 'Good Evening';
      return 'Good Night';
    };

    const getCurrentTimeInNairobi = () => {
      return DateTime.now().setZone('Africa/Nairobi').toLocaleString(DateTime.TIME_SIMPLE);
    };

    const toFancyFont = (text, isUpperCase = false) => {
      const fonts = {
        'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝙿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈',
        'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕',
        'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢',
        'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯'
      };
      return (isUpperCase ? text.toUpperCase() : text.toLowerCase())
        .split('')
        .map(char => fonts[char] || char)
        .join('');
    };

    let menuText = `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Fᴜʟʟ Mᴇɴᴜ ≪━━━\n├ \n├ Greetings, @${m.sender.split('@')[0].split(':')[0]}\n├ \n├ Bot: ${botname}\n├ Total Commands: ${totalCommands}\n├ Time: ${getCurrentTimeInNairobi()}\n├ Prefix: ${effectivePrefix || 'None'}\n├ Mode: ${mode}\n├ Library: Baileys\n╰━━━━━━━━━━━━━━━━ᕗ\n\n`;

    for (const category of categories) {
      let commandFiles;
      try {
        commandFiles = fs.readdirSync(`./plugins/${category.name}`).filter(file => file.endsWith('.js') && file !== 'links.js');
      } catch (e) { continue; }

      if (commandFiles.length === 0 && category.name !== 'NSFW') continue;

      menuText += `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ ${category.display} ≪━━━\n├ \n`;

      if (category.name === 'NSFW') {
        const plus18Commands = ['xvideo'];
        for (const cmd of plus18Commands) {
          menuText += `├ *${toFancyFont(cmd)}*\n`;
        }
      }

      for (const file of commandFiles) {
        let displayName = file.replace('.js', '');
        try {
          const { pathToFileURL } = await import('url');
          const modUrl = pathToFileURL(path.join(process.cwd(), 'plugins', category.name, file)).href;
          const modRaw = await import(modUrl);
          const mod = modRaw.default !== undefined ? modRaw.default : modRaw;
          if (Array.isArray(mod)) {
            for (const cmd of mod) {
              if (cmd && cmd.name) menuText += `├ *${toFancyFont(cmd.name)}*\n`;
            }
            continue;
          }
          if (mod && typeof mod === 'object' && mod.name && typeof mod.name === 'string') {
            displayName = mod.name;
          }
        } catch (e) {}
        menuText += `├ *${toFancyFont(displayName)}*\n`;
      }

      menuText += `╰━━━━━━━━━━━━━━━━ᕗ\n\n`;
    }

    menuText += `> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`;

    await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
    await client.sendMessage(m.chat, {
      text: menuText,
      contextInfo: { mentionedJid: [m.sender] }
    }, { quoted: fq });

    const sections = categories
      .filter(cat => {
        try { return fs.readdirSync(`./plugins/${cat.name}`).filter(f => f.endsWith('.js')).length > 0; } catch { return false; }
      })
      .map(cat => ({
        title: `${cat.emoji} ${cat.display}`,
        rows: [{ title: `${cat.emoji} ${cat.display}`, description: `View ${cat.name} commands`, id: `${effectivePrefix}${cat.name.toLowerCase()}menu` }]
      }));

    const device = await getDeviceMode();

    if (device === 'ios') {
      try {
        await client.sendMessage(m.chat, {
          listMessage: {
            title: 'Browse Categories',
            description: 'Select a category to view its commands.',
            buttonText: 'Browse Categories',
            listType: 1,
            sections: sections.map(s => ({
              title: s.title,
              rows: s.rows.map(r => ({ title: r.title, description: r.description, rowId: r.id }))
            })),
            footer: '©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆',
          },
        }, { quoted: fq });
      } catch {}
      await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
      return;
    }

    try {
      const interactiveMsg = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
        interactiveMessage: {
          body: { text: 'Browse Categories' },
          footer: { text: '©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆' },
          header: { hasMediaAttachment: false },
          nativeFlowMessage: {
            messageVersion: 1,
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'Browse Categories',
                  sections: sections
                })
              }
            ]
          }
        }
      }), { quoted: fq, userJid: client.user.id });
      await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
      await client.relayMessage(m.chat, interactiveMsg.message, { messageId: interactiveMsg.key.id });
    } catch (e) {
    }
  }
};