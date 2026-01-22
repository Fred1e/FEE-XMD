const axios = require('axios');

module.exports = {
    name: 'currencylist',
    aliases: ['currencies', 'conversionrates'],
    description: 'Get all currency conversion rates',
    run: async (context) => {
        const { client, m } = context;

        try {
            const response = await axios.get('https://v6.exchangerate-api.com/v6/0d36793326ec3af0c240a8d4/latest/USD');
            const data = response.data;

            if (!data || data.result !== "success") {
                return await client.sendMessage(m.chat, {
                    text: 'Failed to retrieve currency rates. Please try again later.'
                }, { quoted: m });
            }

            let message = '*Currency Conversion Rates*\n\n';
            for (const [currency, rate] of Object.entries(data.conversion_rates)) {
                message += `*${currency}*: ${rate}\n`;
            }

            await client.sendMessage(m.chat, { text: message });

        } catch (error) {
            console.error('Error sending currency list:', error);
            await client.sendMessage(m.chat, {
                text: 'Something went wrong while sending the currency list. Please try again later.'
            }, { quoted: m });
        }
    }
};