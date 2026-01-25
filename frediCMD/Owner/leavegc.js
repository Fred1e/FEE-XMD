const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); 

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, Owner, participants, botname } = context;

        if (!botname) {
            console.error(`Botname not set, you incompetent fuck.`);
            return m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n┋❥✿ Bot’s fucked. No botname in context. Yell at your dev, dumbass.\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`);
        }

        if (!Owner) {
            console.error(`Owner not set, you brain-dead moron.`);
            return m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n┋❥✿ Bot’s broken. No owner in context. Go cry to the dev.\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`);
        }

        if (!m.isGroup) {
            return m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n┋❥✿ You think I’m bailing on your pathetic DMs? This is for groups, you idiot.\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`);
        }

        try {
            const maxMentions = 50;
            const mentions = participants.slice(0, maxMentions).map(a => a.id);
            await client.sendMessage(m.chat, { 
                text: `❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n┋❥✿ Fuck this shithole 🔥 ${botname} is OUT! Good luck rotting without me, you nobodies. ${mentions.length < participants.length ? 'Too many losers to tag, pathetic.' : ''}\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`, 
                mentions 
            }, { quoted: m });
            console.log(`[LEAVE-DEBUG] Leaving group ${m.chat}, mentioned ${mentions.length} participants`);
            await client.groupLeave(m.chat);
        } catch (error) {
            console.error(`[LEAVE-ERROR] Couldn’t ditch the group: ${error.stack}`);
            await m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n┋❥✿ Shit broke, ${m.pushName}! 😡 Can’t escape this dumpster fire: ${error.message}. Try again, loser.\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`);
        }
    });
};