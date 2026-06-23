import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default {
    name: 'iqc',
    aliases: ['iphonechat', 'fakechat', 'chatmock'],
    description: 'Generates a fake iPhone chat screenshot',
    run: async (context) => {
        const { client, m, prefix } = context;
        const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

        let text = m.body.replace(new RegExp(`^${prefix}(iqc|iphonechat|fakechat|chatmock)\\s*`, 'i'), '').trim();

        if (!text) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
            return m.reply('╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ IQC ≪━━━\n├ \n├ What am i, a mind reader?\n├ @' + m.sender.split('@')[0] + '! you forgot the text, genius.\n├ Example: ' + prefix + 'iqc Hello Fred\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆', { mentions: [m.sender] });
        }

        try {
            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const apiUrl = `https://api.deline.web.id/maker/iqc?text=${encodeURIComponent(text)}&chatTime=${encodeURIComponent(currentTime)}&statusBarTime=${encodeURIComponent(currentTime)}`;
            
            const imageResponse = await axios.get(apiUrl, {
                responseType: 'arraybuffer',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
                    'Accept': 'image/webp,image/png,image/*,*/*',
                    'Referer': 'https://api.deline.web.id/'
                }
            });

            if (!imageResponse.data || imageResponse.data.length < 1000) {
                throw new Error('API returned empty image');
            }

            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });

            await client.sendMessage(m.chat, {
                image: imageResponse.data,
                caption: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ IPHONE CHAT ≪━━━\n├ \n├ There's your fake chat screenshot.\n├ Now you can pretend someone actually\n├ talks to you.\n├ \n├ Text: "${text}"\n├ Time: ${currentTime}\n├ \n├ _Don't use this to catfish people,\n├ you weirdo._\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`
            }, { quoted: fq });

        } catch (error) {
            console.error('IQC command error:', error);

            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });

            let errorMessage = 'your fake chat failed. shocking.';

            if (error.message.includes('status')) {
                errorMessage = 'API died from cringe. Try again when your text is less stupid.';
            } else if (error.message.includes('Network')) {
                errorMessage = 'Your internet is as weak as your personality.';
            } else if (error.message.includes('empty')) {
                errorMessage = 'API returned empty image. Your text was too cringe even for the API.';
            } else {
                errorMessage = 'Failed to process. Try again later.';
            }

            await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ FAILED ≪━━━\n├ \n├ iPhone chat generation failed.\n├ ${errorMessage}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
        }
    }
};