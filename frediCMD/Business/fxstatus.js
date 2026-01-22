const axios = require('axios');

module.exports = {
    name: 'fxstatus',
    aliases: ['marketstatus', 'forexstatus'],
    description: 'Fetches the current status of the forex market',
    run: async (context) => {
        const { client, m } = context;

        try {
            const apiUrl = "https://api.polygon.io/v1/marketstatus/now?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data) {
                return await client.sendMessage(m.chat, {
                    text: "*Failed to fetch forex market status.*"
                }, { quoted: m });
            }

            let output = "*Forex Market Status:*\n";
            output += `After Hours: ${data.afterHours ? "Closed" : "Open"}\n`;
            output += `Market: ${data.market ? "Open" : "Closed"}\n`;

            const currencies = data.currencies;
            output += "\n*Currencies:*\n";
            output += `Crypto: ${currencies.crypto}\n`;
            output += `FX: ${currencies.fx}\n`;

            const exchanges = data.exchanges;
            output += "\n*Exchanges:*\n";
            output += `NASDAQ: ${exchanges.nasdaq}\n`;
            output += `NYSE: ${exchanges.nyse}\n`;
            output += `OTC: ${exchanges.otc}\n`;

            const indicesGroups = data.indicesGroups;
            output += "\n*Indices Groups:*\n";
            output += `S&P: ${indicesGroups.s_and_p}\n`;
            output += `Societe Generale: ${indicesGroups.societe_generale}\n`;
            output += `MSCI: ${indicesGroups.msci}\n`;
            output += `FTSE Russell: ${indicesGroups.ftse_russell}\n`;
            output += `MStar: ${indicesGroups.mstar}\n`;
            output += `MStarC: ${indicesGroups.mstarc}\n`;
            output += `CCCY: ${indicesGroups.cccy}\n`;
            output += `CGI: ${indicesGroups.cgi}\n`;
            output += `NASDAQ: ${indicesGroups.nasdaq}\n`;
            output += `Dow Jones: ${indicesGroups.dow_jones}\n`;

            output += `\n*Server Time:* ${data.serverTime}\n`;
            output += "\n> 𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅";

            await client.sendMessage(m.chat, {
                text: output
            }, { quoted: m });

        } catch (error) {
            console.error('Error fetching forex market status:', error);
            await client.sendMessage(m.chat, {
                text: "*Failed to fetch forex market status.*"
            }, { quoted: m });
        }
    }
};