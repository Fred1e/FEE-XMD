import fetch from 'node-fetch';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default {
    name: 'boobs',
    aliases: ['tits', 'boobies'],
    description: 'Get some boobs (NSFW)',
    run: async (context) => {
        const { client, m } = context;
        const fq = getFakeQuoted(m);

        try {
            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

            const res = await fetch('https://nekobot.xyz/api/image?type=boobs');
            if (!res.ok) throw new Error(`API returned ${res.status}`);
            const data = await res.json();

            if (!data.success || !data.message) throw new Error('No image URL returned');

            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });

            await client.sendMessage(m.chat, {
                image: { url: data.message },
                caption: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ NSFW ≪━━━\n├ \n├ Here's your boobs, you horny bastard.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`
            }, { quoted: fq });

        } catch (error) {
            console.error('Boobs error:', error);
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
            await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ ERROR ≪━━━\n├ \n├ Failed to get boobs. You're so\n├ unlucky even porn hates you.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
        }
    }
};
