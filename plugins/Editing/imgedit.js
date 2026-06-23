import { getSettings } from '../../database/config.js';
  import { uploadToUrl } from '../../lib/toUrl.js';
  import { makePhotoEdit } from '../../lib/frediApi.js';
  import { getFakeQuoted } from '../../lib/fakeQuoted.js';

  export default {
      name: 'imgedit',
      aliases: ['photoedit', 'aiedit'],
      description: 'AI photo editor',
      category: 'Editing',
      run: async (context) => {
          const { client, m } = context;
          const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
          const settings = await getSettings();
          const prefix = settings.prefix || '.';

          const quoted = m.quoted ? m.quoted : null;
          const mime = quoted?.mimetype || '';
          const prompt = (m.text || '').replace(/^\S+\s*/, '').trim();

          if (!quoted || !/image/.test(mime)) {
              await client.sendMessage(m.chat, { react: { text: '\u274c', key: m.reactKey } });
              await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
              return client.sendMessage(m.chat, {
                  text: `\u256d\u2500\u2500\u2500(    ᖴᗴᗴ-᙭ᗰᗪツ    )\u2500\u2500\u2500\n\u251c\u2500\u2500\u2500\u226b E\u0280\u0280o\u0280 \u226a\u2500\u2500\u2500\n\u251c \n\u251c Reply to an image with a prompt.\n\u251c Example: ${prefix}imgedit make it look like night\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2609\n> \u00a9\ud835\udcaf\ud835\udcce\ud835\udccc\ud835\udcc2\ud835\udcc3\ud835\udcc1 \ud835\udcb1\ud835\udcb5 \ud835\udcfd\ud835\udcf5_\ud835\udcec\ud835\udcf5\ud835\udcf2\ud835\udcf7\ud835\udcfc\ud835\udcf8\ud835\udcf7`
              }, { quoted: fq });
          }

          if (!prompt) {
              await client.sendMessage(m.chat, { react: { text: '\u274c', key: m.reactKey } });
              return client.sendMessage(m.chat, {
                  text: `\u256d\u2500\u2500\u2500(    ᖴᗴᗴ-᙭ᗰᗪツ    )\u2500\u2500\u2500\n\u251c\u2500\u2500\u2500\u226b E\u0280\u0280o\u0280 \u226a\u2500\u2500\u2500\n\u251c \n\u251c Add a prompt you idiot.\n\u251c Example: ${prefix}imgedit make it look like night\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2609\n> \u00a9\ud835\udcaf\ud835\udcce\ud835\udccc\ud835\udcc2\ud835\udcc3\ud835\udcc1 \ud835\udcb1\ud835\udcb5 \ud835\udcfd\ud835\udcf5_\ud835\udcec\ud835\udcf5\ud835\udcf2\ud835\udcf7\ud835\udcfc\ud835\udcf8\ud835\udcf7`
              }, { quoted: fq });
          }

          await client.sendMessage(m.chat, { react: { text: '\u231b', key: m.reactKey } });

          try {
              const media = await quoted.download();
              const imgUrl = await uploadToUrl(media);
              const resultUrl = await makePhotoEdit(imgUrl, prompt);

              await client.sendMessage(m.chat, { react: { text: '\u2705', key: m.reactKey } });
              await client.sendMessage(m.chat, {
                  image: { url: resultUrl },
                  caption: `\u256d\u2500\u2500\u2500(    ᖴᗴᗴ-᙭ᗰᗪツ    )\u2500\u2500\u2500\n\u251c\u2500\u2500\u2500\u226b AI E\u1d05ɪ\u1d1b \u226a\u2500\u2500\u2500\n\u251c \n\u251c Prompt: ${prompt}\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2609\n> \u00a9\ud835\udcaf\ud835\udcce\ud835\udccc\ud835\udcc2\ud835\udcc3\ud835\udcc1 \ud835\udcb1\ud835\udcb5 \ud835\udcfd\ud835\udcf5_\ud835\udcec\ud835\udcf5\ud835\udcf2\ud835\udcf7\ud835\udcfc\ud835\udcf8\ud835\udcf7`
              }, { quoted: fq });
          } catch {
              await client.sendMessage(m.chat, { react: { text: '\u274c', key: m.reactKey } });
              await client.sendMessage(m.chat, {
                  text: `\u256d\u2500\u2500\u2500(    ᖴᗴᗴ-᙭ᗰᗪツ    )\u2500\u2500\u2500\n\u251c\u2500\u2500\u2500\u226b F\u1d00ɪ\u029f\u1d07\u1d05 \u226a\u2500\u2500\u2500\n\u251c \n\u251c AI edit failed. Try again.\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2609\n> \u00a9\ud835\udcaf\ud835\udcce\ud835\udccc\ud835\udcc2\ud835\udcc3\ud835\udcc1 \ud835\udcb1\ud835\udcb5 \ud835\udcfd\ud835\udcf5_\ud835\udcec\ud835\udcf5\ud835\udcf2\ud835\udcf7\ud835\udcfc\ud835\udcf8\ud835\udcf7`
              }, { quoted: fq });
          }
      }
  };
  