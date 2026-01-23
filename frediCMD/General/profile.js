module.exports = async (context) => {
    const { client, m, pict } = context;

    try {
        let targetUser = m.sender;
        
        if (m.quoted) {
            targetUser = m.quoted.sender;
        } else if (m.text && m.text.includes('@')) {
            const mentionedJid = m.mentionedJid && m.mentionedJid[0];
            if (mentionedJid) {
                targetUser = mentionedJid;
            }
        } else if (m.text) {
            const phoneNumberMatch = m.text.match(/[\s\+]*(\d{10,15})/);
            if (phoneNumberMatch) {
                const rawNumber = phoneNumberMatch[1];
                const cleanNumber = rawNumber.replace(/[^\d]/g, '');
                
                if (cleanNumber.length >= 10 && cleanNumber.length <= 15) {
                    const countryCode = cleanNumber.startsWith('0') ? '62' : '';
                    const formattedNumber = countryCode + cleanNumber.replace(/^0/, '');
                    targetUser = formattedNumber + '@s.whatsapp.net';
                }
            }
        }

        const name = targetUser.split('@')[0];
        let ppUrl = pict;
        
        try {
            ppUrl = await client.profilePictureUrl(targetUser, 'image');
        } catch {
            ppUrl = pict;
        }

        await client.sendMessage(m.chat, {
            image: { url: ppUrl },
            caption: `👤 ${name}\n—\n𝙁𝙀𝙀-𝙓𝙈𝘿`,
            mentions: targetUser !== m.sender ? [targetUser] : []
        }, { quoted: m });

    } catch (error) {
        console.error('Profile error:', error);
        await m.reply('Failed to fetch profile. The user probably blocked you or their privacy settings are stricter than your intelligence.');
    }
};