import fetch from 'node-fetch';
import { sendInteractive } from '../../lib/sendInteractive.js';
  const NEXRAY_MP4 = 'https://api.nexray.web.id/downloader/ytmp4?url=';

  function extractYtId(url) {
      const m = url.match(new RegExp('(?:youtu\\.be/|youtube\\.com/(?:watch\\?v=|shorts/|embed/|v/))([A-Za-z0-9_-]{11})'));
      return m ? m[1] : null;
  }

  function fmtDuration(secs) {
      const s = parseInt(secs) || 0;
      return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
  }

  export default async (context) => {
      const { client, m, text, prefix, args } = context;
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
      if (!text) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
          return sendInteractive(client, m, `╭━ᕙ 「 YTMP4」\n│ Example: ${prefix}ytmp4 https://youtu.be/xxxx [720/1080]\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐯`);
      }
      const parts = text.trim().split(/\s+/);
      const urlPart = parts[0];
      const quality = parts[1] && /^(360|480|720|1080)$/.test(parts[1]) ? parts[1] : '720';
      const id = extractYtId(urlPart);
      if (!id) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
          return sendInteractive(client, m, '╭━ᕙ 「 YTMP4」\n│ Invalid YouTube link.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆');
      }
      await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
      await sendInteractive(client, m, `╭━ᕙ 「 YTMP4」\n│ Processing ${quality}p... This may take up to 60s.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      try {
          const fullUrl = `https://youtube.com/watch?v=${id}`;
          const apiUrl = NEXRAY_MP4 + encodeURIComponent(fullUrl) + `&resolusi=${quality}`;
          const r = await fetch(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 90000 });
          const d = await r.json();
          if (!d.status || !d.result?.url) throw new Error('API failed or no video URL');
          const { title, thumbnail, duration, url: videoUrl } = d.result;
          await client.sendMessage(m.chat, {
              video: { url: videoUrl },
              mimetype: 'video/mp4',
              caption: `╭━ᕙ 「 YouTube MP4」
│ 🎬 ${title || 'Unknown'}\n│ ⏱ ${fmtDuration(duration)}\n│ 📺 Quality: ${quality}p\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`
          });
          await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
      } catch (e) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
          sendInteractive(client, m, `╭━ᕙ 「 YTMP4」\n│ YouTube MP4 download failed.\n│ Video might be age-restricted,\n│ unavailable, or too large.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }
  };
  