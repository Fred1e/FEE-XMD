//technews.js

module.exports = async (context) => {
    const { client, m, text } = context;



    const response = await fetch('https://fantox001-scrappy-api.vercel.app/technews/random');
    const data = await response.json();

    const { thumbnail, news } = data;

        await client.sendMessage(m.chat, { image: { url: thumbnail }, caption: news }, { quoted: m });


}

