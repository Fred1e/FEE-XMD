import fetch from 'node-fetch';
import { sendInteractive } from '../../lib/sendInteractive.js';
  const NEXRAY = 'https://api.nexray.web.id/downloader/soundcloud?url=';

  export default {
      name: 'soundcloud',
      alias: ['scloud', 'scdl'],
      run: async (context) => {
          const { client, m, text, prefix } = context;
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
          if (!text) {
              await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
              return sendInteractive(client, m, `│ Example: ${prefix}soundcloud https://soundcloud.com/user/track\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
          }
          if (!text.includes('soundcloud.com')) return sendInteractive(client, m, '│ That\'s not a SoundCloud link.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆');
          await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
          try {
              const r = await fetch(NEXRAY + encodeURIComponent(text.trim()), { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 25000 });
              const d = await r.json();
              if (!d.status || !d.result) throw new Error('SoundCloud API failed');
              const { title, thumbnail, audio } = d.result;
              const audioUrl = audio || d.result.url || d.result.download;
              if (!audioUrl) throw new Error('No audio URL returned');
              if (thumbnail) {
                  await client.sendMessage(m.chat, { image: { url: thumbnail }, caption: `🎵 ${title || 'SoundCloud Track'}` });
              }
              const dlRes = await fetch(audioUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 35000 });
              const buf = Buffer.from(await dlRes.arrayBuffer());
              await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
              await client.sendMessage(m.chat, {
                  audio: buf, mimetype: 'audio/mpeg', ptt: false,
                  fileName: `${title || 'soundcloud-track'}.mp3`
              });
          } catch (e) {
              await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
              sendInteractive(client, m, `│ Failed: ${e.message}\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
          }
      }
  };
  