import { uploadToUrl } from '../../lib/toUrl.js';
  import { enhanceImage } from '../../lib/frediApi.js';
  import { getFakeQuoted } from '../../lib/fakeQuoted.js';

  export default async (context) => {
      const { client, m } = context;
      const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

      const quoted = m.quoted ? m.quoted : m;
      const mime = quoted.mimetype || m.mimetype || '';

      if (!/image/.test(mime)) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
          return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Mɪssɪɴɢ Iᴍᴀɢᴇ ≪━━━\n├ \n├ Give me an image you dumbass\n├ Reply to an image first\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }

      await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

      try {
          const media = await quoted.download();
          const imgUrl = await uploadToUrl(media);
          const resultUrl = await enhanceImage(imgUrl);

          await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
          await client.sendMessage(m.chat, {
              image: { url: resultUrl },
              caption: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eɴʜᴀɴᴄᴇᴅ Iᴍᴀɢᴇ ≪━━━\n├ \n├ Your shitty image is now HD.\n├ Still looks like garbage though.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`
          }, { quoted: fq });
      } catch {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
          await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Fᴀɪʟᴇᴅ ≪━━━\n├ \n├ Enhancement failed. Try again.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }
  };
  