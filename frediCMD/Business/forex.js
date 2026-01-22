const axios = require('axios');

module.exports = {
    name: 'forex',
    aliases: ['forexnews', 'fxnews'],
    description: 'Fetches the latest forex news',
    run: async (context) => {
        const { client, m } = context;

        try {
            const apiUrl = "https://api.polygon.io/v2/reference/news?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data.results || data.results.length === 0) {
                return await client.sendMessage(m.chat, {
                    text: "*No forex news available at the moment.*"
                }, { quoted: m });
            }

            const articles = data.results;
            let output = "";

            articles.forEach((article, index) => {
                output += `*Title:* ${article.title}\n`;
                output += `*Publisher:* ${article.publisher.name}\n`;
                output += `*Published UTC:* ${article.published_utc}\n`;
                output += `*Article URL:* ${article.article_url}\n\n`;

                if (index < articles.length - 1) {
                    output += "---\n\n";
                }
            });

            output += "\n> 𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅";

            await client.sendMessage(m.chat, {
                text: output
            }, { quoted: m });

        } catch (error) {
            console.error('Error fetching forex news:', error);
            await client.sendMessage(m.chat, {
                text: "*Failed to fetch forex news.*"
            }, { quoted: m });
        }
    }
};