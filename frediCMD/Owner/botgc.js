const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, text, Owner } = context;

  try {

      let getGroupzs = await client.groupFetchAllParticipating();
      let groupzs = Object.entries(getGroupzs)
          .slice(0)
          .map((entry) => entry[1]);
      let anaa = groupzs.map((v) => v.id);
      let jackhuh = `Bot groups:-\n\n`
      await m.reply(`Bot is in ${anaa.length} groups, fetching and sending their jids!`)
      const promises = anaa.map((i) => {
        return new Promise((resolve) => {
          client.groupMetadata(i).then((metadat) => {
            setTimeout(() => {
              jackhuh += `Subject:- ${metadat.subject}\n`
              jackhuh += `Members: ${metadat.participants.length}\n`
              jackhuh += `Jid:- ${i}\n\n`
              resolve()
            }, 500);
          })
        })
      })
      await Promise.all(promises)
      m.reply(jackhuh);

  } catch (e) {
    m.reply("Error occured while accessing bot groups.\n\n" + e)
  }

  });
}