import fetch from 'node-fetch';
import { sendInteractive } from '../../lib/sendInteractive.js';
  const NEXRAY = 'https://api.nexray.web.id/downloader/v2/instagram?url=';

  export default async (context) => {
      const { client, m, text } = context;
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
      if (!text) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
          return sendInteractive(client, m, '╭━ᕙ 「 IGDL」\n│ Give me an Instagram link.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆');
      }
      if (!text.includes('instagram.com')) return sendInteractive(client, m, '╭━ᕙ 「 IGDL」\n│ That\'s not an Instagram link.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆');
      await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
      try {
          const r = await fetch(NEXRAY + encodeURIComponent(text.trim()), { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 20000 });
          const d = await r.json();
          if (!d.status || !d.result) throw new Error('API failed');
          const { title, likes, comment, username, media } = d.result;
          if (!media || !media.length) throw new Error('No media found');
          await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
          for (const item of media.slice(0, 5)) {
              try {
                  const dlRes = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.instagram.com/' }, timeout: 35000 });
                  if (!dlRes.ok) continue;
                  const buf = Buffer.from(await dlRes.arrayBuffer());
                  const cap = `╭━ᕙ 「 Instagram DL」
│ ${title || 'Instagram Post'}\n│ 👤 @${username || 'unknown'}\n│ ❤️ ${likes ? likes.toLocaleString() : 'N/A'} likes | 💬 ${comment ? comment.toLocaleString() : 'N/A'} comments\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`;
                  if (item.type === 'mp4') {
                      await client.sendMessage(m.chat, { video: buf, caption: cap, mimetype: 'video/mp4' });
                  } else {
                      await client.sendMessage(m.chat, { image: buf, caption: cap });
                  }
              } catch {}
          }
      } catch (e) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
          sendInteractive(client, m, `│ Failed: ${e.message}\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }
  };
  