import axios from 'axios';
import { sendInteractive } from '../../lib/sendInteractive.js';

export default {
    name: 'capcut',
    alias: ['cc', 'capcutdl'],
    description: 'Download CapCut videos',
    run: async (context) => {
        const { client, m, text, prefix } = context;
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
        if (!text) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return sendInteractive(client, m, `╭━ᕙ 「 CAPCUT DL」
│ Usage: ${prefix}capcut <url>\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
        }
        if (!text.match(/capcut\.com/i)) return sendInteractive(client, m, 'That doesn\'t look like a CapCut link.');
        try {
            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
            const { data } = await axios.get(`https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(text)}`, { timeout: 15000 });
            if (!data?.data?.play) throw new Error('no data');
            const result = data.data;
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
            await client.sendMessage(m.chat, {
                video: { url: result.play },
                caption: `╭━ᕙ 「 CAPCUT VIDEO」
│ Title: ${result.title || 'Unknown'}\n│ Author: ${result.author || 'Unknown'}\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`
            });
        } catch {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
            sendInteractive(client, m, '│ Failed to download. Check the link and try again.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆');
        }
    }
};
