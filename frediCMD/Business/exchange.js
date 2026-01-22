const axios = require('axios');

module.exports = {
    name: 'exchange',
    aliases: ['exchangerate', 'converter', 'convert'],
    description: 'Get foreign exchange rates',
    run: async (context) => {
        const { client, m, text, prefix } = context;

        try {
            await client.sendMessage(m.chat, { 
                react: { text: '💱', key: m.key } 
            });

            // If user provides conversion request
            if (text) {
                const args = text.split(' ');
                if (args.length === 3) {
                    const [amount, fromCurrency, toCurrency] = args;
                    const amountNum = parseFloat(amount);

                    if (isNaN(amountNum)) {
                        return await client.sendMessage(m.chat, {
                            text: `❌ Invalid amount. Usage: ${prefix}convert 100 USD EUR`
                        }, { quoted: m });
                    }

                    // Get exchange rates
                    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency.toUpperCase()}`;
                    const response = await axios.get(apiUrl);
                    const data = response.data;

                    if (!data || !data.rates) {
                        return await client.sendMessage(m.chat, {
                            text: `❌ Invalid currency code: ${fromCurrency}`
                        }, { quoted: m });
                    }

                    const rate = data.rates[toCurrency.toUpperCase()];
                    if (!rate) {
                        return await client.sendMessage(m.chat, {
                            text: `❌ Invalid currency code: ${toCurrency}`
                        }, { quoted: m });
                    }

                    const converted = amountNum * rate;

                    await client.sendMessage(m.chat, {
                        text: `💱 *CURRENCY CONVERSION*\n\n` +
                              `💰 *${amount} ${fromCurrency.toUpperCase()}* = ` +
                              `*${converted.toFixed(2)} ${toCurrency.toUpperCase()}*\n\n` +
                              `📊 *Exchange Rate:* 1 ${fromCurrency.toUpperCase()} = ${rate.toFixed(4)} ${toCurrency.toUpperCase()}\n\n` +
                              `💡 *Last updated:* ${data.date}\n` +
                              `> 𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅`
                    }, { quoted: m });
                    return;
                }
            }

            // Show all exchange rates if no specific conversion
            const currencyCode = "USD";
            const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currencyCode}`;
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data || !data.rates) {
                return await client.sendMessage(m.chat, {
                    text: `❌ Failed to fetch exchange rates.`
                }, { quoted: m });
            }

            let output = `💱 *EXCHANGE RATES (${data.base})*\n\n`;
            output += `*Popular Currencies:*\n`;

            const popular = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'KES', 'TZS'];
            popular.forEach(currency => {
                if (data.rates[currency]) {
                    output += `• ${currency}: ${data.rates[currency].toFixed(4)}\n`;
                }
            });

            output += `\n📊 *Total Currencies:* ${Object.keys(data.rates).length}`;
            output += `\n📅 *Last updated:* ${data.date}`;
            output += `\n\n💡 *Convert:* ${prefix}convert <amount> <from> <to>`;
            output += `\nExample: ${prefix}convert 100 USD TZS`;
            output += `\n\n> 𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅`;

            await client.sendMessage(m.chat, {
                text: output
            }, { quoted: m });

        } catch (error) {
            console.error('Exchange error:', error);
            await client.sendMessage(m.chat, {
                text: `❌ Failed to fetch exchange rates.\n\n💡 Usage: ${prefix}convert 100 USD EUR`
            }, { quoted: m });
        }
    }
};