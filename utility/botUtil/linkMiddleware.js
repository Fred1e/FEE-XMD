module.exports = async (context, next) => {
    const { m, isBotAdmin } = context;

    if (!m.isGroup) {
        return m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤
┋✿ This command only works in groups! 
┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`);
    }
    
    if (!isBotAdmin) {
        return m.reply(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤
┋✿ I need admin rights to get the group link! 
┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`);
    }

    await next(); // Proceed to the next function (main handler)
};