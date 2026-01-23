const fetch = require('node-fetch');
const axios = require('axios');

module.exports = {
  name: 'fetch',
  aliases: ['get', 'url', 'web'],
  description: 'Fetches and displays information from a URL',
  run: async (context) => {
    const { client, m, prefix, botname } = context;

    /**
     * Extract URL from message
     */
    const url = m.body.replace(new RegExp(`^${prefix}(fetch|get|url|web)\\s*`, 'i'), '').trim();

    if (!url) {
      return client.sendMessage(m.chat, {
        text: `🛜 *GET Request*\n\n📃 *Response JSON:*\n${JSON.stringify({
          success: false,
          message: "Missing required URL parameter",
          required: ["url"],
          missing: ["url"],
          usage: `${prefix}fetch https://example.com`,
          timestamp: new Date().toISOString()
        }, null, 2)}`
      }, { quoted: m });
    }

    // Basic URL validation
    let targetUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      targetUrl = 'https://' + url;
    }

    try {
      /**
       * Fetch data from URL
       */
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 30000
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || '';

      /**
       * Handle different content types
       */
      if (contentType.includes('application/json')) {
        // JSON response
        const data = await response.json();

        const responseData = {
          success: true,
          message: "JSON data fetched successfully",
          url: targetUrl,
          status: response.status,
          contentType: contentType,
          data: data,
          timestamp: new Date().toISOString()
        };

        // If JSON is too long, send as file
        if (JSON.stringify(responseData).length > 1500) {
          responseData.data = "[Data too large - sent as file]";
          
          await client.sendMessage(m.chat, {
            text: `🛜 *GET Request*\n\n📃 *Response JSON:*\n${JSON.stringify(responseData, null, 2)}`
          }, { quoted: m });

          // Send full data as file
          await client.sendMessage(m.chat, {
            document: Buffer.from(JSON.stringify({
              success: true,
              message: "JSON data fetched successfully",
              url: targetUrl,
              status: response.status,
              contentType: contentType,
              data: data,
              timestamp: new Date().toISOString()
            }, null, 2)),
            mimetype: 'application/json',
            fileName: `fetch_result_${Date.now()}.json`
          }, { quoted: m });
        } else {
          // Send as message
          await client.sendMessage(m.chat, {
            text: `🛜 *GET Request*\n\n📃 *Response JSON:*\n${JSON.stringify(responseData, null, 2)}`
          }, { quoted: m });
        }

      } else if (contentType.includes('text/html')) {
        // HTML response
        const html = await response.text();

        // Extract title from HTML
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'No title found';

        const responseData = {
          success: true,
          message: "HTML content fetched successfully",
          url: targetUrl,
          status: response.status,
          contentType: contentType,
          title: title,
          contentLength: html.length,
          preview: html.replace(/<[^>]*>/g, '').substring(0, 200).trim(),
          timestamp: new Date().toISOString()
        };

        await client.sendMessage(m.chat, {
          text: `🛜 *GET Request*\n\n📃 *Response JSON:*\n${JSON.stringify(responseData, null, 2)}`
        }, { quoted: m });

      } else if (contentType.includes('text/plain')) {
        // Plain text response
        const text = await response.text();

        const responseData = {
          success: true,
          message: "Text content fetched successfully",
          url: targetUrl,
          status: response.status,
          contentType: contentType,
          contentLength: text.length,
          content: text.length > 500 ? text.substring(0, 500) + "..." : text,
          timestamp: new Date().toISOString()
        };

        if (text.length > 1500) {
          responseData.content = "[Content too large - sent as file]";
          
          await client.sendMessage(m.chat, {
            text: `🛜 *GET Request*\n\n📃 *Response JSON:*\n${JSON.stringify(responseData, null, 2)}`
          }, { quoted: m });

          await client.sendMessage(m.chat, {
            document: Buffer.from(text),
            mimetype: 'text/plain',
            fileName: `fetch_result_${Date.now()}.txt`
          }, { quoted: m });
        } else {
          await client.sendMessage(m.chat, {
            text: `🛜 *GET Request*\n\n📃 *Response JSON:*\n${JSON.stringify(responseData, null, 2)}`
          }, { quoted: m });
        }

      } else if (contentType.includes('image/')) {
        // Image response
        const imageBuffer = await response.buffer();

        const responseData = {
          success: true,
          message: "Image fetched successfully",
          url: targetUrl,
          status: response.status,
          contentType: contentType,
          size: `${(imageBuffer.length / 1024).toFixed(2)} KB`,
          timestamp: new Date().toISOString()
        };

        await client.sendMessage(m.chat, {
          image: imageBuffer,
          caption: `🛜 *GET Request*\n\n📃 *Response JSON:*\n${JSON.stringify(responseData, null, 2)}`
        }, { quoted: m });

      } else {
        // Other content types
        const data = await response.text();

        const responseData = {
          success: true,
          message: "Content fetched successfully",
          url: targetUrl,
          status: response.status,
          contentType: contentType,
          contentLength: data.length,
          preview: data.length > 500 ? data.substring(0, 500) + "..." : data,
          timestamp: new Date().toISOString()
        };

        await client.sendMessage(m.chat, {
          text: `🛜 *GET Request*\n\n📃 *Response JSON:*\n${JSON.stringify(responseData, null, 2)}`
        }, { quoted: m });
      }

    } catch (error) {
      console.error('Fetch command error:', error);

      let errorMessage = error.message;
      if (error.name === 'TimeoutError') {
        errorMessage = 'Request timed out after 30 seconds';
      } else if (error.code === 'ENOTFOUND') {
        errorMessage = 'Could not resolve the URL. Check if the domain exists.';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Connection refused. The server may be down.';
      }

      await client.sendMessage(m.chat, {
        text: `🛜 *GET Request*\n\n📃 *Response JSON:*\n${JSON.stringify({
          success: false,
          message: "Fetch request failed",
          url: targetUrl,
          error: errorMessage,
          timestamp: new Date().toISOString()
        }, null, 2)}`
      }, { quoted: m });
    }
  }
};