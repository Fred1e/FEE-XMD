const axios = require('axios');

module.exports = {
    name: 'stocktickers',
    aliases: ['stockticks', 'tickets'],
    description: 'Fetches a list of active stock tickers',
    run: async (context) => {
        const { client, m } = context;

        try {
            const limit = 100;
            const apiUrl = `https://api.polygon.io/v3/reference/tickers?active=true&limit=${limit}&apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45`;
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data || !data.results || data.results.length === 0) {
                return await client.sendMessage(m.chat, {
                    text: "*No active stock tickers found.*"
                }, { quoted: m });
            }

            let output = `*Active Stock Tickers (Limit: ${limit}):*\n\n`;
            data.results.forEach((ticker) => {
                output += `${ticker.ticker}: ${ticker.name}\n`;
            });

            output += "\n> 𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅";

            await client.sendMessage(m.chat, {
                text: output
            }, { quoted: m });

        } catch (error) {
            console.error('Error fetching stock tickers:', error);
            await client.sendMessage(m.chat, {
                text: "*Failed to fetch stock tickers.*"
            }, { quoted: m });
        }
    }
};