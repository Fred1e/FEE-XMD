const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, participants, isBotAdmin } = context;

        if (!m.isGroup) return m.reply("This command is meant for groups.");
        if (!isBotAdmin) return m.reply("I need admin privileges.");

        const botJid = client.decodeJid(client.user.id);
        const usersToKick = participants.filter(v => v.id !== botJid && v.id !== m.sender);

        await client.sendMessage(m.chat, { react: { text: '⚠️', key: m.key } });
        await m.reply(`⚠️ *GROUP TERMINATION INITIATED*\n\nThis will remove all ${usersToKick.length} participants. The group will be renamed.\n\nTHIS PROCESS CANNOT BE STOPPED.`);

        await client.groupUpdateSubject(m.chat, "Proven Useless🦄🚮");
        await client.groupUpdateDescription(m.chat, "Terminated by 𝙁𝙀𝙀-𝙓𝙈𝘿\n\nA collection of digital disappointments. Your contributions were as valuable as your existence—negligible.");
        await client.groupRevokeInvite(m.chat);
        await client.groupSettingUpdate(m.chat, 'announcement');

        await client.groupParticipantsUpdate(m.chat, usersToKick.map(v => v.id), 'remove');

        await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        await m.reply("✅ *TERMINATION COMPLETE*\n\nAll participants removed. Group secured.\n—\n𝙁𝙀𝙀-𝙓𝙈𝘿");
    });
};