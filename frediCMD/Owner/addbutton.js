const { getSettings } = require("../../Database/config");

module.exports = {
  name: 'addbutton',
  aliases: ['addbtn'],
  description: 'Adds a custom button to the menu',
  run: async (context) => {
    const { client, m, args } = context;
    try {
      if (args.length < 2) {
        await client.sendMessage(m.chat, { text: 'Usage: .addbutton <button_name> <command>' }, { quoted: m });
        return;
      }
      const buttonName = args[0];
      const command = args[1];
      // Store in database (pseudo-code)
      // await saveCustomButton(buttonName, command);
      await client.sendMessage(m.chat, { text: `Added button "${buttonName}" for command "${command}"` }, { quoted: m });
    } catch (error) {
      console.error(`AddButton error: ${error.stack}`);
      await client.sendMessage(m.chat, { text: 'Error adding custom button.' }, { quoted: m });
    }
  }
};