const OWNER_NUMBER = "255752593977";
const OWNER_JID = `${OWNER_NUMBER}@s.whatsapp.net`;

// Normalize phone number (keep existing)
const normalizeNumber = (number) => {
  return number.replace(/[^0-9]/g, '').replace(/^0+/, '').replace(/^\+255/, '255') || number;
};

// Retry function (keep existing)
const retryPromote = async (client, groupId, participant, maxRetries = 5, baseDelay = 1500) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await client.groupParticipantsUpdate(groupId, [participant], "promote");
      return true;
    } catch (e) {
      if (attempt === maxRetries) throw e;
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Modified to use context.isBotAdmin instead of manual check
module.exports = {
  name: 'powner',
  aliases: ['promoteowner', 'makeowneradmin'],
  description: 'Promotes the owner to admin',
  run: async (context) => {
    const { client, m, isBotAdmin, isAdmin } = context;

    // Check if it's a group chat
    if (!m.isGroup) {
      return m.reply(`This command only works in groups`);
    }

    // Check if user is owner (keep existing logic)
    const normalizedAuteur = normalizeNumber(m.sender.split('@')[0]);
    const normalizedOwner = normalizeNumber(OWNER_NUMBER);
    const isOwner = m.sender === OWNER_JID || normalizedAuteur === normalizedOwner;

    if (!isOwner) {
      return m.reply(`Only the owner can use this command`);
    }

    // Use middleware's admin check instead of manual metadata fetch
    if (!isBotAdmin) {
      await client.sendMessage(m.chat, {
        text: `I need admin privileges to perform this action`
      });
      return;
    }

    // Check if owner is in group (simplified)
    try {
      const groupMetadata = await client.groupMetadata(m.chat);
      const ownerInGroup = groupMetadata.participants.some(
        member => member.id === OWNER_JID || normalizeNumber(member.id.split('@')[0]) === normalizedOwner
      );

      if (!ownerInGroup) {
        return m.reply(`Owner is not in this group`);
      }

      // Check if already admin
      const ownerMember = groupMetadata.participants.find(
        member => member.id === OWNER_JID || normalizeNumber(member.id.split('@')[0]) === normalizedOwner
      );
      
      if (ownerMember?.admin) {
        return m.reply(`Owner is already an admin`);
      }

      // Perform promotion
      await retryPromote(client, m.chat, OWNER_JID);
      return m.reply(`✅ Owner has been promoted to admin`);

    } catch (error) {
      console.error('Promotion error:', error);
      return m.reply(`Failed to promote: ${error.message}`);
    }
  }
};