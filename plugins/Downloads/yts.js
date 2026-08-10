import yts from 'yt-search';

export default async (context) => {
  const { client, m, text } = context;
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

  const formatStylishReply = (message) => {
    return `╭━ᕙ 「 YTS 」
│ ${message}\n╰━━━━━━━━━━━━━━ᕗ
> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆\nPσɯҽɾԃ Ⴆყ Tσxιƈ-ɱԃȥ`;
  };

  if (!text) {
    return client.sendMessage(
      m.chat,
      { text: formatStylishReply("Yo, drop a search term, fam! 🔍 Ex: .yts Alan Walker Alone") },
      { ad: true }
    );
  }

  await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
  try {
    const searchResult = await yts(text);

    if (!searchResult || !searchResult.videos || searchResult.videos.length === 0) {
      return client.sendMessage(
        m.chat,
        { text: formatStylishReply("Bruh, no YouTube results found! 😕 Try another search.") },
        { ad: true }
      );
    }

    const videos = searchResult.videos.slice(0, 5);

    let replyText = `🔎 *YouTube Search Results for:* ${text}\n\n`;

    for (let i = 0; i < videos.length; i++) {
      const v = videos[i];
      replyText += ``;
      replyText += `🎬 *Title:* ${v.title}\n`;
      replyText += `📎 *Link:* ${v.url}\n`;
      replyText += `👤 *Author:* ${v.author.name} (${v.author.url})\n`;
      replyText += `👁 *Views:* ${v.views.toLocaleString()}\n`;
      replyText += `⏳ *Duration:* ${v.timestamp}\n`;
      replyText += `📅 *Uploaded:* ${v.ago}\n`;
      replyText += `\n`;
    }

    replyText += `╭━ᕙ 「 YTS 」
╰━━━━━━━━━━━━━━ᕗ
> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖗𝖊𝖉𝖎_𝖊𝖟𝖗𝖆\nPσɯҽɾԃ Ⴆყ Tσxιƈ-ɱԃȥ`;

    await client.sendMessage(
      m.chat,
      { text: replyText },
      { ad: true }
    );

    await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
    await client.sendMessage(
      m.chat,
      {
        image: { url: videos[0].thumbnail },
        caption: formatStylishReply(`🎬 First result: *${videos[0].title}*\n📎 ${videos[0].url}`) }
    );

  } catch (error) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
    await client.sendMessage(
      m.chat,
      { text: formatStylishReply(`Error: ${error.message}`) },
      { ad: true }
    );
  }
};