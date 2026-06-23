import fetch from 'node-fetch';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';


  export default async (context) => {
      const { client, m, text, prefix } = context;
      const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

      if (!text) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
          return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ Give me something to work with.\n├ Example: ${prefix}gemini What is AI?\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
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
          const res = await _callGroq({
                  model: 'llama-3.3-70b-versatile',
                  messages: [
                      { role: 'system', content: 'You are Gemini, Google\'s most advanced AI. Be thorough, accurate, and slightly sophisticated in your answers.' },
                      { role: 'user', content: text }
                  ],
                  max_tokens: 1024, temperature: 0.7
              });
          if (!res.ok)
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content?.trim();
          if (!reply) throw new Error('Empty AI response.');
          await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
          await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Gᴇᴍɪɴɪ Rᴇsᴘᴏɴsᴇ ≪━━━\n├ \n├ ${reply}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      } catch (error) {
          console.error('Gemini command error:', error);
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
          return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ Gemini crashed. ${error.message}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }
  };
  