const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); 

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {


        const { client, m, args, participants, text } = context;


if (!m.isGroup) return m.reply('Command meant for groups');



client.sendMessage(m.chat, { text : text ? text : 'Attention Here' , mentions: participants.map(a => a.id)}, { quoted: m });

});

}