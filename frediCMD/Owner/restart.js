const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m } = context;
        await m.reply("🔄 𝙁𝙀𝙀-𝙓𝙈𝘿 restarting... Do not spam commands.");
        const { exec } = require('child_process');
        exec('heroku restart', (error) => {
            if (error) m.reply("Restart failed. Manual restart required.");
        });
        setTimeout(() => { process.exit(0); }, 3000);
    });
};