const axios = require("axios");

module.exports = {
  name: 'splay',
  aliases: ['sply', 'splayy', 'spl', 'ssong', 'smusic', 'spotify'],
  description: 'Download songs from Spotify',
  run: async (context) => {
    const { client, m, text, prefix } = context;

    try {
      const query = m.text.trim();
      if (!query) return m.reply("Give me a song name, you tone-deaf cretin.");

      if (query.length > 100) return m.reply("Your 'song title' is longer than my patience. 100 characters MAX.");

      await client.sendMessage(m.chat, { react: { text: '⌛', key: m.key } });

      let spotifyUrl = '';
      let searchQuery = '';

      // Check if it's a Spotify link
      const isSpotifyLink = (url) => {
        return url.includes('spotify.com') || url.includes('spotify.link') || url.includes('spoti.fi');
      };

      if (isSpotifyLink(query)) {
        spotifyUrl = query;
        searchQuery = query;
      } else {
        // If it's a search term, we'll search first
        searchQuery = query;
      }

      // Use the Spotify API endpoint
      const response = await axios.get(`https://api.ootaizumi.web.id/downloader/spotifyplay?query=${encodeURIComponent(searchQuery)}`);
      const data = response.data;

      if (!data.status || !data.result) {
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        return m.reply(`No song found for "${query}". Your music taste is as bad as your search skills.`);
      }

      const song = data.result;
      const audioUrl = song.download;
      const filename = song.title || "Unknown Song";
      const artist = song.artists || "Unknown Artist";
      const duration = song.duration || "00:00";
      const thumbnail = song.image || "";
      const externalUrl = song.external_url || spotifyUrl || "";

      if (!audioUrl) {
        throw new Error("No download URL found in API response");
      }

      await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

      // Create buttons for download options
      const buttons = [
        {
          buttonId: `${prefix}audio audio_mp3 ${externalUrl || searchQuery}`,
          buttonText: { displayText: '🎵 MP3 Audio' },
          type: 1
        },
        {
          buttonId: `${prefix}audio audio_doc ${externalUrl || searchQuery}`,
          buttonText: { displayText: '📄 Audio Document' },
          type: 1
        }
      ];

      const message = `🎵 *${filename}*\n👤 *Artist:* ${artist}\n⏱️ *Duration:* ${duration}\n🔗 *Source:* Spotify\n\n*Select download type:*`;

      await client.sendMessage(
        m.chat,
        {
          text: message,
          footer: '𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅',
          buttons: buttons,
          headerType: 4,
          image: { url: thumbnail },
        },
        { quoted: m, ad: true }
      );

    } catch (error) {
      console.error('Play command error:', error);
      await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
      await m.reply(`Spotify download failed. The universe rejects your music taste.\nError: ${error.message}`);
    }
  }
};