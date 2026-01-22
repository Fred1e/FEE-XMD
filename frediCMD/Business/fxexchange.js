const axios = require('axios');

module.exports = {
    name: 'fxexchange',
    aliases: ['forexexchange', 'exchangerate'],
    description: 'Fetches the latest foreign exchange rates against the US Dollar',
    run: async (context) => {
        const { client, m } = context;

        try {
            const currencyCode = "USD";
            const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currencyCode}`;
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data || !data.rates) {
                return await client.sendMessage(m.chat, {
                    text: `*Failed to fetch exchange rates for ${currencyCode}.*`
                }, { quoted: m });
            }

            let output = `*Foreign Exchange Rates (${data.base})*\n\n`;
            for (const [currency, rate] of Object.entries(data.rates)) {
                output += `${currency}: ${rate.toFixed(4)}\n`;
            }

            output += "\n> 𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅";

            await client.sendMessage(m.chat, {
                text: output
            }, { quoted: m });

        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            await client.sendMessage(m.chat, {
                text: "*Failed to fetch exchange rates.*"
            }, { quoted: m });
        }
    }
};