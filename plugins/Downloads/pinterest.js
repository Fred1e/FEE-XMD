import fetch from 'node-fetch';
import { sendInteractive } from '../../lib/sendInteractive.js';

export default {
  name: 'pinterest',
  aliases: ['pin', 'pinterestimg'],
  description: 'Fetches Pinterest images for your basic needs',
  run: async (context) => {
    const { client, m, text } = context;
    await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

    try {
      const query = (text || '').trim();
      if (!query) {
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
        return sendInteractive(client, m, "╭━ᕙ 「 PINTEREST」\n│ Give me a search term, you visually impaired fool.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆");
      }

      const apiUrl = `https://api.theresav.biz.id/search/pinterest?query=${encodeURIComponent(query)}&type=image&apikey=tIdZJ`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!data.status || !data.result || data.result.length === 0) {
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
        return sendInteractive(client, m, `╭━ᕙ 「 PINTEREST」\n│ No Pinterest images for "${query}".\n│ Your search is as pointless as you are.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }

      const images = data.result
        .filter(img => img && img.directLink)
        .slice(0, 10);

      if (images.length === 0) {
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
        return sendInteractive(client, m, `╭━ᕙ 「 PINTEREST」\n│ No valid images found.\n│ Even Pinterest rejected your taste.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
      }

      await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });

      const imageUrls = images.map(img => ({
        imagePreviewUrl: img.directLink,
        sourceUrl: img.link || 'https://pinterest.com'
      }));

      const captionLines = images.map((img, i) => `${i + 1}. ${img.link || img.directLink}`).join('\n');
      const captionText = `📌 *Pinterest Search*\n\n🔍 Query: ${query}\n📊 Found: ${images.length}/${data.totalResult || data.result.length} images\n\n${captionLines}`;

      const sections = images.map(img => ({
        view_model: {
          primitive: {
            media: {
              url: img.directLink,
              mime_type: 'image/jpeg'
            },
            imagine_type: 3,
            status: { status: 'READY' },
            __typename: 'GenAIImaginePrimitive'
          },
          __typename: 'GenAISingleLayoutViewModel'
        }
      }));

      sections.push({
        view_model: {
          primitive: {
            text: captionText,
            __typename: 'GenAIMarkdownTextUXPrimitive'
          },
          __typename: 'GenAISingleLayoutViewModel'
        }
      });

      await client.relayMessage(
        m.chat,
        {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
            botMetadata: {
              pluginMetadata: {},
              richResponseSourcesMetadata: {}
            }
          },
          botForwardedMessage: {
            message: {
              richResponseMessage: {
                messageType: 1,
                submessages: [
                  {
                    messageType: 1,
                    gridImageMetadata: {
                      gridImageUrl: {
                        imagePreviewUrl: images[0].directLink
                      },
                      imageUrls: imageUrls
                    }
                  },
                  {
                    messageType: 2,
                    messageText: captionText
                  }
                ],
                unifiedResponse: {
                  data: Buffer.from(JSON.stringify({
                    response_id: `pinterest-${Date.now()}`,
                    sections
                  })).toString('base64')
                },
                contextInfo: {
                  forwardingScore: 1,
                  isForwarded: true,
                  forwardedAiBotMessageInfo: {
                    botJid: '0@bot'
                  },
                  forwardOrigin: 4
                }
              }
            }
          }
        },
        {}
      );

    } catch (error) {
      console.error('Pinterest error:', error);
      await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
      await sendInteractive(client, m, `╭━ᕙ 「 PINTEREST ERROR」\n│ Search failed. Your taste is probably trash anyway.\n╰━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆`);
    }
  }
};
