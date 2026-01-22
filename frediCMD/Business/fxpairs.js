const axios = require('axios');

module.exports = {
    name: 'fxpairs',
    aliases: ['forexpairs', 'pairforex'],
    description: 'Fetches a list of active forex currency pairs',
    run: async (context) => {
        const { client, m } = context;

        try {
            const apiUrl = "https://api.polygon.io/v3/reference/tickers?market=fx&active=true&apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data || !data.results || data.results.length === 0) {
                return await client.sendMessage(m.chat, {
                    text: "*Failed to fetch forex currency pairs.*"
                }, { quoted: m });
            }

            let output = "*Active Forex Currency Pairs:*\n\n";
            data.results.forEach((pair) => {
                output += `${pair.ticker}: ${pair.name}\n`;
            });

            output += "\n> 𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅";

            await client.sendMessage(m.chat, {
                text: output
            }, { quoted: m });

        } catch (error) {
            console.error('Error fetching forex currency pairs:', error);
            await client.sendMessage(m.chat, {
                text: "*Failed to fetch forex currency pairs.*"
            }, { quoted: m });
        }
    }
};