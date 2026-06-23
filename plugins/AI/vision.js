import fetch from 'node-fetch';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';


export default async (context) => {
    const { client, m, text } = context;
    const fq = getFakeQuoted(m);

    try {
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

        if (!m.quoted) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ Quote an image first, genius.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
        }

        const q = m.quoted || m;
        const mime = (q.msg || q).mimetype || '';

        if (!mime.startsWith('image/')) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ That's not an image, you donkey.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
        }

        let _km = {};
        try { _km = await import('../../keys.js'); } catch {}
        const _groqKeys = _km.GROQ_API_KEYS?.length ? _km.GROQ_API_KEYS : [_km.GROQ_API_KEY || process.env.GROQ_KEY_1 || process.env.GROQ_API_KEY || ''].filter(Boolean);
        if (!_groqKeys.length) throw new Error('No GROQ key set');
        const _callGroq = async (payload) => {
            const tried = new Set();
            for (let i = 0; i < _groqKeys.length; i++) {
                const k = (_km.getNextGroqKey?.()) || _groqKeys[i];
                if (!k || tried.has(k)) continue;
                tried.add(k);
                const r = await fetch('https://api.groq.com/openai/v1/chat/completions', { method: 'POST', headers: { 'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                if ((r.status === 429 || r.status === 401 || r.status === 403) && _groqKeys.length > 1) { _km.markKeyFailed?.(k); continue; }
                return r;
            }
            throw new Error('All GROQ keys exhausted');
        };

        const mediaBuffer = await q.download();
        const base64Image = mediaBuffer.toString('base64');
        const mimeType = mime || 'image/jpeg';

        const prompt = text ? text.trim() : 'Describe this image in detail. Be thorough but concise.';

        const res = await _callGroq({
                model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'image_url',
                                image_url: { url: `data:${mimeType};base64,${base64Image}` }
                            },
                            {
                                type: 'text',
                                text: prompt
                            }
                        ]
                    }
                ],
                max_tokens: 1024,
                temperature: 0.7
            });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Groq API error ${res.status}: ${errText}`);
        }

        const data = await res.json();
        const result = data.choices?.[0]?.message?.content?.trim();

        if (!result) throw new Error('Empty response from vision model');

        await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });

        await client.sendMessage(
            m.chat,
            {
                text: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Iᴍᴀɢᴇ Aɴᴀʟʏsɪs ≪━━━\n├ \n${result.split('\n').map(l => `├ ${l}`).join('\n')}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`,
            },
            { quoted: fq }
        );

    } catch (err) {
        console.error('vision error:', err);
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
        await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Fᴀɪʟᴇᴅ ≪━━━\n├ \n├ Vision analysis failed.\n├ ${err.message}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
    }
};
