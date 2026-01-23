const fs = require('fs');
const path = require('path');
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const { getSettings } = require('../../Database/config');

module.exports = {
    name: 'menu',
    aliases: ['help', 'commands', 'list'],
    description: 'Displays the 𝙁𝙀𝙀-𝙓𝙈𝘿 command menu with interactive buttons',
    run: async (context) => {
        const { client, m, mode, pict, botname, text, prefix } = context;

        await client.sendMessage(m.chat, { react: { text: '🤖', key: m.key } });

        if (text) {  
            await client.sendMessage(  
                m.chat,  
                {  
                    text: `❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n│✿ Yo \( {m.pushName}, what's with the extra bullshit? Just say * \){prefix}menu*, moron. \n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`,  
                },  
                { quoted: m, ad: true }  
            );  
            return;  
        }  

        const settings = await getSettings();  
        const effectivePrefix = settings.prefix || '.';  

        const toFancyFont = (text, isUpperCase = false) => {  
            const fonts = {  
                A: '𝘼', B: '𝘽', C: '𝘾', D: '𝘿', E: '𝙀', F: '𝙁', G: '𝙂', H: '𝙃', I: '𝙄', J: '𝙅', K: '𝙆', L: '𝙇', M: '𝙈',  
                N: '𝙉', O: '𝙊', P: '𝙋', Q: '𝙌', R: '𝙍', S: '𝙎', T: '𝙏', U: '𝙐', V: '𝙑', W: '𝙒', X: '𝙓', Y: '𝙔', Z: '𝙕',  
                a: '𝙖', b: '𝙗', c: '𝙘', d: '𝙙', e: '𝙚', f: '𝙛', g: '𝙜', h: '𝙝', i: '𝙞', j: '𝙟', k: '𝙠', l: '𝙡', m: '𝙢',  
                n: '𝙣', o: '𝙤', p: '𝙥', q: '𝙦', r: '𝙧', s: '𝙨', t: '𝙩', u: '𝙪', v: '𝙫', w: '𝙬', x: '𝙭', y: '𝙮', z: '𝙯',  
            };  
            return (isUpperCase ? text.toUpperCase() : text.toLowerCase())  
                .split('')  
                .map((char) => fonts[char] || char)  
                .join('');  
        };  

        const menuText = `❥┈┈┈┈┈┈┈┈┈┈┈┈➤\n┋✿ *( 💬 ) - Hello, @${m.pushName}* Welcome to the bots Menu\n\n` +   
            `- 計さ Bot INFORMATION✓\n\n` +  
            `➤ *Bσƚ*: \n` +  
            `𝙁𝙀𝙀-𝙓𝙈𝘿 (bow down)\n` +  

            `➤ *Pɾҽϝιx*: \n` +  
            `${effectivePrefix} (learn it, dumbass)\n` +  

            `➤ *Mσԃҽ*: \n` +  
            `${mode} ( ! )\n` +  

            `\n❥┈┈┈┈┈┈┈┈┈┈┈┈➤\n\n` +  
            ` ( ! ) *Select a button below.* `;  

        const msg = generateWAMessageFromContent(  
            m.chat,  
            {  
                interactiveMessage: {  
                    header: {  
                        documentMessage: {  
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc?ccb=11-4&oh=01_Q5Aa2QGGiJj--6eHxoTTTTzuWtBgCrkcXBz9hN_y2s_Z1lrABA&oe=68D7901C&_nc_sid=5e03e0&mms3=true',  
                            mimetype: 'image/png',  
                            fileSha256: '+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=',  
                            fileLength: '1435',  
                            pageCount: 0,  
                            mediaKey: 'MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=',  
                            fileName: 'FEE-XMD MENU',  
                            fileEncSha256: 'ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=',  
                            directPath: '/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc?ccb=11-4&oh=01_Q5Aa2QGGiJj--6eHxoTTTTzuWtBgCrkcXBz9hN_y2s_Z1lrABA&oe=68D7901C&_nc_sid=5e03e0',  
                            mediaKeyTimestamp: '1756370084',  
                            jpegThumbnail: pict,  
                        },  
                        hasMediaAttachment: true,  
                    },  
                    body: { text: menuText },  
                    footer: { text: `𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅` },  
                    nativeFlowMessage: {  
                        buttons: [  
                            {
                                name: 'cta_url',
                                buttonParamsJson: JSON.stringify({
                                    display_text: '📢 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡 𝘾𝙝𝙖𝙣𝙣𝙚𝙡',
                                    url: 'https://whatsapp.com/channel/0029Vb6mzVF7tkj42VNPrZ3V',
                                    merchant_url: 'https://whatsapp.com/channel/0029Vb6mzVF7tkj42VNPrZ3V',
                                }),
                            },
                            {
                                name: 'cta_url',
                                buttonParamsJson: JSON.stringify({
                                    display_text: '📘 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 Support',
                                    url: 'https://facebook.com/FrediEzra',
                                    merchant_url: 'https://facebook.com/FrediEzra',
                                }),
                            },
                            {
                                name: 'cta_url',
                                buttonParamsJson: JSON.stringify({
                                    display_text: '📷 𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢 Support',
                                    url: 'https://instagram.com/frediezra',
                                    merchant_url: 'https://instagram.com/frediezra',
                                }),
                            },
                            {
                                name: 'cta_url',
                                buttonParamsJson: JSON.stringify({
                                    display_text: '🎵 𝙏𝙞𝙠𝙏𝙤𝙠 Support',
                                    url: 'https://tiktok.com/frediezra1',
                                    merchant_url: 'https://tiktok.com/frediezra1',
                                }),
                            },
                            {  
                                name: 'cta_url',  
                                buttonParamsJson: JSON.stringify({  
                                    display_text: '🐙 𝙂𝙞𝙩𝙃𝙪𝙗 𝙍𝙚𝙥𝙤',  
                                    url: 'https://github.com/Fred1e/Fee-Xmd',  
                                    merchant_url: 'https://github.com/Fred1e/Fee-Xmd',  
                                }),  
                            },  
                            {  
                                name: 'single_select',  
                                buttonParamsJson: JSON.stringify({  
                                    title: '𝐕𝐈𝐄𝐖☇ 𝐎𝐏𝐓𝐈𝐎𝐍𝐒 ☑',  
                                    sections: [  
                                        {  
                                            title: '⌜ 𝘾𝙤𝙧𝙚 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 ⌟',  
                                            highlight_label: '© 丨几匚',  
                                            rows: [  
                                                { title: '𝐏𝐢𝐧𝐠', description: 'Check bot response time', id: `${prefix}ping` },
                                                { title: '𝐑𝐞𝐩𝐨', description: 'Get bot repository link', id: `${prefix}repo` },
                                                { title: '𝐅𝐮𝐥𝐥𝐌𝐞𝐧𝐮', description: 'Display all commands', id: `${prefix}fullmenu` },  
                                                { title: '𝐃𝐞𝐯', description: "Send developer contact", id: `${prefix}dev` },  
                                            ],  
                                        },  
                                        {  
                                            title: 'ℹ 𝙄𝙣𝙛𝙤 𝘽𝙤𝙩',  
                                            highlight_label: '© 丨几匚',  
                                            rows: [  
                                                { title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬', description: 'Show bot settings', id: `${prefix}settings` },  
                                                { title: '𝐒𝐮𝐩𝐩𝐨𝐫𝐭', description: 'Get support information', id: `${prefix}support` },
                                            ],  
                                        },  
                                        {  
                                            title: '📜 𝘾𝙖𝙩𝙚𝙜𝙤𝙧𝙮 𝙈𝙚𝙣𝙪𝙨',  
                                            highlight_label: '© 丨几匚',  
                                            rows: [  
                                                { title: '𝐆𝐞𝐧𝐞𝐫𝐚𝐥𝐌𝐞𝐧𝐮', description: 'General commands', id: `${prefix}generalmenu` },  
                                                { title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬𝐌𝐞𝐧𝐮', description: 'Bot settings commands', id: `${prefix}settingsmenu` },  
                                                { title: '𝐁𝐮𝐬𝐢𝐧𝐞𝐬𝐬𝐌𝐞𝐧𝐮', description: 'Bot Currency exchange commands', id: `${prefix}businessmenu` },  
                                                { title: 'Fun Menu', description: 'Fun Commands enjoy', id: `${prefix}funmenu` },  
                                                { title: 'God 𝐌𝐞𝐧𝐮', description: 'Read Holy Bible and Quran', id: `${prefix}godmenu` },  
                                                { title: '𝐎𝐰𝐧𝐞𝐫𝐌𝐞𝐧𝐮', description: 'Owner only commands', id: `${prefix}ownermenu` },  
                                                { title: '𝐇𝐞𝐫𝐨𝐤𝐮𝐌𝐞𝐧𝐮', description: 'Heroku related commands', id: `${prefix}herokumenu` },  
                                                { title: '𝐏𝐫𝐢𝐯𝐚𝐜𝐲𝐌𝐞𝐧𝐮', description: 'Privacy commands', id: `${prefix}privacymenu` },  
                                                { title: '𝐆𝐫𝐨𝐮𝐩𝐌𝐞𝐧𝐮', description: 'Group management', id: `${prefix}groupmenu` },  
                                                { title: '𝐀𝐈𝐌𝐞𝐧𝐮', description: 'AI & chat commands', id: `${prefix}aimenu` },  
                                                { title: '𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐌𝐞𝐧𝐮', description: 'Media downloaders', id: `${prefix}downloadmenu` },  
                                                { title: '𝐄𝐝𝐢𝐭𝐢𝐧𝐠𝐌𝐞𝐧𝐮', description: 'Media editing tools', id: `${prefix}editingmenu` },  
                                                { title: '𝐋𝐨𝐠𝐨𝐌𝐞𝐧𝐮', description: 'Logo & text makers', id: `${prefix}logomenu` },  
                                                { title: '+𝟏𝟖𝐌𝐞𝐧𝐮', description: 'NSFW commands (18+)', id: `${prefix}+18menu` },  
                                                { title: '𝐔𝐭𝐢𝐥𝐬𝐌𝐞𝐧𝐮', description: 'Utility commands', id: `${prefix}utilsmenu` },  
                                            ],  
                                        },  
                                    ],  
                                }),  
                            },  
                        ],  
                        messageParamsJson: JSON.stringify({  
                            limited_time_offer: {  
                                text: 'FEE-XMD',  
                                url: 'https://github.com/Fred1e/Fee-Xmd',  
                                copy_code: 'FREDI',  
                                expiration_time: Date.now() * 1000,  
                            },  
                            bottom_sheet: {  
                                in_thread_buttons_limit: 2,  
                                divider_indices: [1, 2],  
                                list_title: 'Select Command',  
                                button_title: 'FEE-XMD MENU',  
                            },  
                        }),  
                    },  
                    contextInfo: {  
                        externalAdReply: {  
                            title: `${botname}`,  
                            body: `Yo, ${m.pushName}! Ready to fuck shit up?`,  
                            mediaType: 1,  
                            thumbnail: pict,  
                            mediaUrl: '',  
                            sourceUrl: 'https://github.com/Fred1e/Fee-Xmd',  
                            showAdAttribution: false,  
                            renderLargerThumbnail: true,  
                        },  
                    },  
                },  
            },  
            { quoted: m }  
        );  

        await client.relayMessage(m.chat, msg.message, { messageId: msg.key.id });  

        const mrFrediPaths = [
            path.join(__dirname, 'fredi_ai'),
            path.join(process.cwd(), 'fredi_ai'),
            path.join(__dirname, '..', 'fredi_ai')
        ];

        let audioFolder = null;
        for (const folderPath of mrFrediPaths) {
            if (fs.existsSync(folderPath)) {
                audioFolder = folderPath;
                break;
            }
        }

        if (!audioFolder) {
            return;
        }

        const possibleFiles = [];
        const menuFiles = [
            'menu1.mp3',
            'menu2.mp3', 
            'menu3.mp3',
            'menu4.mp3',
            'menu5.mp3',
            'menu6.mp3',
            'menu7.mp3',
            'menu8.mp3',
            'menu9.mp3',
            'menu10.mp3'
        ];

        for (const fileName of menuFiles) {
            const fullPath = path.join(audioFolder, fileName);
            if (fs.existsSync(fullPath)) {
                possibleFiles.push(fullPath);
            }
        }

        if (possibleFiles.length === 0) {
            return;
        }

        const randomFile = possibleFiles[Math.floor(Math.random() * possibleFiles.length)];

        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const audioBuffer = fs.readFileSync(randomFile);
            await client.sendMessage(
                m.chat,
                {
                    audio: audioBuffer,
                    ptt: true,
                    mimetype: 'audio/mpeg',
                    fileName: 'fee-menu.mp3',
                },
                { quoted: m }
            );
        } catch (error) {
            await client.sendMessage(
                m.chat,
                {
                    audio: { url: randomFile },
                    ptt: true,
                    mimetype: 'audio/mpeg',
                    fileName: 'fee-menu.mp3',
                },
                { quoted: m }
            );
        }
    },
};