import { uploadToUrl } from '../../lib/toUrl.js';
  import { makeCanvas } from '../../lib/frediApi.js';
  import { getFakeQuoted } from '../../lib/fakeQuoted.js';
  import { getSettings } from '../../database/config.js';

  const CANVAS_TYPES = [
      'spotify', 'youtube', 'google', 'tiktok', 'duckduckgo', 'brave', 'applemusic',
      'soundcloud', 'pinterest', 'playstore', 'happymod', 'apkpure', 'unsplash',
      'wallpaper', 'wattpad', 'weather', 'sticker', 'lyrics', 'shazam', 'web', 'image',
  ];

  export default {
      name: 'canvas',
      aliases: ['canvascard', 'spotifycard', 'youtubecard', 'tiktokcard'],
      description: 'Generate themed canvas cards from an image',
      category: 'Editing',
      run: async (context) => {
          const { client, m } = context;
          const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
          const settings = await getSettings();
          const prefix = settings.prefix || '.';

          const quoted = m.quoted ? m.quoted : null;
          const mime = quoted?.mimetype || '';
          const args = (m.text || '').replace(/^S+s*/, '').trim();

          const typesList = CANVAS_TYPES.map(t => `├ • ${t}`).join('\n');
          const usageMsg = `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Cᴀɴᴠᴀs Cᴀʀᴅ ≪━━━\n├ \n├ Reply to an image to use this.\n├ \n├ *Usage:*\n├ ${prefix}canvas Title | type | text | watermark\n├ \n├ *Example:*\n├ ${prefix}canvas Blinding Lights | spotify | The Weeknd | ᖴᗴᗴ-᙭ᗰᗪツ\n├ ${prefix}canvas My Video | youtube | Subscribe Now | BOT\n├ \n├ *Available Types (${CANVAS_TYPES.length}):*\n${typesList}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`;

          if (!quoted || !/image/.test(mime)) {
              await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
              return client.sendMessage(m.chat, { text: usageMsg }, { quoted: fq });
          }

          const parts = args.split('|').map(s => s.trim());
          const title = parts[0] || 'Unknown Title';
          const rawType = (parts[1] || 'spotify').toLowerCase();
          const type = CANVAS_TYPES.includes(rawType) ? rawType : 'spotify';
          const text = parts[2] || '';
          const watermark = parts[3] || 'ᖴᗴᗴ-᙭ᗰᗪツ';

          if (parts[1] && !CANVAS_TYPES.includes(rawType)) {
              return client.sendMessage(m.chat, {
                  text: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ Invalid type: *${parts[1]}*\n├ \n├ Valid types:\n${typesList}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`
              }, { quoted: fq });
          }

          await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

          try {
              const media = await quoted.download();
              const imgUrl = await uploadToUrl(media);
              const cardBuf = await makeCanvas(imgUrl, title, type, text, watermark);

              await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
              await client.sendMessage(m.chat, {
                  image: cardBuf,
                  caption: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Cᴀɴᴠᴀs Cᴀʀᴅ ≪━━━\n├ \n├ *Type:* ${type}\n├ *Title:* ${title}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`
              }, { quoted: fq });
          } catch {
              await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
              await client.sendMessage(m.chat, {
                  text: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ Canvas generation failed. Try again later.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`
              }, { quoted: fq });
          }
      }
  };
  