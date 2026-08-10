import fetch from 'node-fetch';
import { sendInteractive } from '../../lib/sendInteractive.js';
  const NEXRAY = 'https://api.nexray.web.id/downloader/tiktok?url=';

  export default async (context) => {
      const { client, m, text, prefix } = context;
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
      if (!text) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
          return sendInteractive(client, m, `│ Example: ${prefix}tikaudio https://vt.tiktok.com/xxx\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }
      if (!text.includes('tiktok.com')) return sendInteractive(client, m, '│ That\'s not a TikTok link.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆');
      await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
      try {
          const r = await fetch(NEXRAY + encodeURIComponent(text.trim()), { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 20000 });
          const d = await r.json();
          if (!d.status || !d.result) throw new Error('API failed');
          const { title, music_info } = d.result;
          if (!music_info?.url) throw new Error('No audio URL found');
          const dlRes = await fetch(music_info.url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 35000 });
          if (!dlRes.ok) throw new Error('Download failed: ' + dlRes.status);
          const buf = Buffer.from(await dlRes.arrayBuffer());
          await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
          await client.sendMessage(m.chat, {
              audio: buf,
              mimetype: 'audio/mpeg',
              ptt: false,
              fileName: `${music_info.title || title || 'tiktok-audio'}.mp3`
          });
          await sendInteractive(client, m, `╭━ᕙ 「 TikTok Audio」
│ 🎵 ${music_info.title || title || 'N/A'}\n│ 👤 ${music_info.author || 'N/A'}\n│ ⏱ ${music_info.duration || 'N/A'}\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      } catch (e) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
          sendInteractive(client, m, `│ Failed: ${e.message}\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }
  };
  