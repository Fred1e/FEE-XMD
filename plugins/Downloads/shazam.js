import acrcloud from 'acrcloud';
import { sendInteractive } from '../../lib/sendInteractive.js';

export default async (context) => {
    const { client, m } = context;
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

    try {
        const acr = new acrcloud({
            host: 'identify-ap-southeast-1.acrcloud.com',
            access_key: '26afd4eec96b0f5e5ab16a7e6e05ab37',
            access_secret: 'wXOZIqdMNZmaHJP1YDWVyeQLg579uK2CfY6hWMN8'
        });

        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

        if (!m.quoted) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return sendInteractive(client, m, `╭━ᕙ 「 SHAZAM 」
│ Quote an audio/video message, you deaf imbecile.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
        }

        const p = m.quoted ? m.quoted : m;
        const buffer = await p.download();

        const { status, metadata } = await acr.identify(buffer);
        if (status.code !== 0) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
            return sendInteractive(client, m, `╭━ᕙ 「 SHAZAM 」
│ Song not recognized.\n│ Your audio is as indecipherable as your life choices.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
        }

        const { title, artists, album, genres, release_date } = metadata.music[0];
        let txt = `╭━ᕙ 「 SHAZAM」
`;
        txt += `╭━ᕙ 「 SHAZAM 」
│ Title: ${title}\n`;
        if (artists) txt += `╭━ᕙ 「 SHAZAM 」
│ Artists: ${artists.map(v => v.name).join(', ')}\n`;
        if (album) txt += `╭━ᕙ 「 SHAZAM 」
│ Album: ${album.name}\n`;
        if (genres) txt += `╭━ᕙ 「 SHAZAM 」
│ Genres: ${genres.map(v => v.name).join(', ')}\n`;
        if (release_date) txt += `╭━ᕙ 「 SHAZAM 」
│ Release: ${release_date}\n`;
        txt += `╭━ᕙ 「 SHAZAM 」
╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`;

        await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
        await sendInteractive(client, m, txt);

    } catch (error) {
        console.error('Music recognition error:', error);
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
        await sendInteractive(client, m, `╭━ᕙ 「 SHAZAM ERROR」
│ Music recognition failed. Your audio is garbage.\n│ ${error.message}\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
    }
};
