import axios from 'axios';
import { sendInteractive } from '../../lib/sendInteractive.js';
  
  const GCSE_KEY = 'AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI';
  const GCSE_CX  = 'baf9bdb0c631236e5';

  export default {
      name: 'image',
      aliases: ['img', 'pic', 'searchimage'],
      description: 'Search and send images',
      run: async (context) => {
          const { client, m, prefix } = context;
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

          const query = m.body.replace(new RegExp(`^${prefix}(image|img|pic|searchimage)\\s*`, 'i'), '').trim();
          if (!query) {
              await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
              return sendInteractive(client, m, `│ Give me something to search, genius.\n│ Example: ${prefix}img cats\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
          }

          try {
              const { data } = await axios.get('https://www.googleapis.com/customsearch/v1', {
                  params: { q: query, key: GCSE_KEY, cx: GCSE_CX, searchType: 'image', num: 5, safe: 'off' },
                  timeout: 15000
              });

              if (!data.items || data.items.length === 0) {
                  await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
                  return sendInteractive(client, m, `│ No images found for "${query}".\n│ Your search is terrible.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
              }

              await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });

              for (let i = 0; i < data.items.length; i++) {
                  const item = data.items[i];
                  try {
                      await client.sendMessage(m.chat, {
                          image: { url: item.link },
                          caption: `╭━ᕙ 「 IMAGE ${i + 1}/${data.items.length}」
│ ${(item.title || query).slice(0, 80)}\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`
                      });
                      if (i < data.items.length - 1) await new Promise(r => setTimeout(r, 1200));
                  } catch (imgErr) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
                      console.warn(`Image ${i + 1} skipped: ${imgErr.message}`);
                  }
              }

          } catch (error) {
              console.error('Image search error:', error.message);
              await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
              await sendInteractive(client, m, `│ Image search failed. Try again later.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
          }
      }
  };
  