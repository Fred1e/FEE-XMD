const fs = require('fs');
const path = require('path');

module.exports = async (context) => {
    const { client, m } = context;

    if (!m.quoted) return m.reply('Reply to a view-once image or video.');

    try {
        const quoted = m.msg?.contextInfo?.quotedMessage || m.quoted || null;
        if (!quoted) return m.reply('Could not find the quoted message.');

        const viewOnce = quoted?.viewOnceMessageV2?.message || quoted?.viewOnceMessageV2Extension?.message || quoted?.viewOnceMessage || quoted;
        const imageMsg = viewOnce?.imageMessage || viewOnce?.imageMessageV2 || viewOnce?.imageMessageV1;
        const videoMsg = viewOnce?.videoMessage || viewOnce?.videoMessageV2 || viewOnce?.videoMessageV1;

        if (!imageMsg && !videoMsg) return m.reply('This message does not contain view-once media.');

        const mediaMessage = imageMsg || videoMsg;
        const returnedPath = await client.downloadAndSaveMediaMessage(mediaMessage);
        if (!returnedPath || !fs.existsSync(returnedPath)) return m.reply('Failed to download media.');

        const buffer = fs.readFileSync(returnedPath);
        const chatId = m.chat || client.user?.id;
        
        const caption = `🥀\n—\n𝙁𝙀𝙀-𝙓𝙈𝘿`;

        if (imageMsg) {
            await client.sendMessage(chatId, { image: buffer, caption }, { quoted: m });
        } else {
            await client.sendMessage(chatId, { video: buffer, caption }, { quoted: m });
        }

        try {
            fs.unlinkSync(returnedPath);
        } catch (e) {}
    } catch (error) {
        console.error('VVX Error:', error);
        m.reply('Failed to retrieve view-once media.');
    }
};