import fetch from 'node-fetch';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

  import { getConversationHistory, addConversationMessage, clearConversationHistory } from '../../database/config.js';

  export default async (context) => {
      const { client, m, text, prefix } = context;
      const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
      const num = m.sender;

      if (!text) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
          return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ Give me something to work with.\n├ Chats are stored for context.\n├ To clear history: ${prefix}chat --reset\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }

      if (text.toLowerCase().includes('--reset')) {
          await clearConversationHistory(num);
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
          return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Cʜᴀᴛ Rᴇsᴇᴛ ≪━━━\n├ \n├ Conversation history cleared.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }

      let _km = {};
      try { _km = await import('../../keys.js'); } catch {}
      const _groqKeys = _km.GROQ_API_KEYS?.length ? _km.GROQ_API_KEYS : [_km.GROQ_API_KEY || process.env.GROQ_KEY_1 || process.env.GROQ_API_KEY || ''].filter(Boolean);
      if (!_groqKeys.length) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
          return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ No GROQ key set. Add GROQ_KEY_1 to env vars.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }
      const _callGroq = async (payload) => {
          const tried = new Set();
          for (let i = 0; i < _groqKeys.length; i++) {
            const k = (_km.getNextGroqKey?.()) || _groqKeys[i];
            if (!k || tried.has(k)) continue;
            tried.add(k);
            const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if ((r.status === 429 || r.status === 401 || r.status === 403) && _groqKeys.length > 1) {
                _km.markKeyFailed?.(k);
                continue;
            }
            return r;
          }
          throw new Error('All GROQ keys exhausted');
      };

      try {
          await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

          const history = await getConversationHistory(num);
          const messages = [
              { role: 'system', content: 'You are a highly intelligent AI assistant with memory. Be helpful, accurate, and conversational.' },
              ...history.slice(-10).map(h => ({ role: h.role, content: h.content })),
              { role: 'user', content: text }
          ];

          const res = await _callGroq({ model: 'llama-3.3-70b-versatile', messages, max_tokens: 1024, temperature: 0.7 });

          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content?.trim();
          if (!reply) throw new Error('Empty response.');

          await addConversationMessage(num, 'user', text);
          await addConversationMessage(num, 'assistant', reply);

          await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
          await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Cʜᴀᴛ ≪━━━\n├ \n├ ${reply}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      } catch (error) {
          console.error('chat error:', error);
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
          m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ ${error.message}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }
  };
  