const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m } = context;
        await m.reply("𝙁𝙀𝙀-𝙓𝙈𝘿 shutting down... Bot will be offline.");
        const { exec } = require('child_process');
        exec('heroku ps:scale web=0', (error) => {
            if (error) m.reply("Shutdown failed. Manual scale required.");
        });
        setTimeout(() => { process.exit(1); }, 3000);
    });
};