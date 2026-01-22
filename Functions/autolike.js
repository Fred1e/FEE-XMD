const chalk = require("chalk");

async function autolike(client, message) {
  try {
    const { key, message: msg } = message;
    const remoteJid = key.remoteJid;

    // Skip non-status messages and protocol messages
    if (remoteJid !== "status@broadcast" || !key.id || msg.protocolMessage) {
      return;
    }

    // Log status processing
    console.log(chalk.blue(`Processing status ${key.id}, Key:`, JSON.stringify(key, null, 2)));

    // React with 🩷
    const reactionResult = await client.sendMessage(remoteJid, {
      react: { key, text: "🩷" },
    });
    console.log(chalk.blue(`Reacted with 🩷 to status ${key.id}, Result:`, JSON.stringify(reactionResult, null, 2)));

    // View status (mark as read)
    await client.readMessages([key]);
    console.log(chalk.blue(`Viewed status ${key.id}`));
  } catch (error) {
    console.error(chalk.red(`Error in autolike for status ${message.key.id}:`, error));
    // Fallback reaction method
    try {
      await client.sendMessage(message.key.remoteJid, {
        reactionMessage: { key: message.key, text: "🩷" },
      });
      console.log(chalk.blue(`Fallback reaction sent to status ${message.key.id}`));
    } catch (fallbackError) {
      console.error(chalk.red(`Fallback reaction failed for status ${message.key.id}:`, fallbackError));
    }
  }
}

module.exports = autolike;