const fetch = require('node-fetch');

module.exports = {
    name: 'npmdl',
    aliases: ['npmdownload', 'npminstall'],
    description: 'Download NPM package as .tgz file',
    run: async (context) => {
        const { client, m } = context;

        try {
            let query = m.text.trim();
            if (!query) return m.reply("Provide a package name, you incompetent fool.");

            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.key } });

            if (query.startsWith('@') && !query.includes('/')) {
                const searchRes = await fetch(`https://yaemiko-narukami.vercel.app/search/npm?text=${encodeURIComponent(query)}`);
                const searchData = await searchRes.json();
                
                const list = searchData?.result || searchData?.results || searchData?.data || [];
                if (!Array.isArray(list) || list.length === 0) {
                    await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
                    return m.reply(`No packages found in scope *${query}*`);
                }
                
                query = list[0]?.name || list[0]?.package?.name || query;
            }

            const npmRes = await fetch(`https://registry.npmjs.org/${encodeURIComponent(query)}`);
            const data = await npmRes.json();
            
            const latest = data["dist-tags"]?.latest;
            if (!latest) throw new Error('No latest version found');
            
            const tarball = data.versions?.[latest]?.dist?.tarball;
            if (!tarball) throw new Error('No download link found');

            const fileRes = await fetch(tarball);
            const fileBuffer = await fileRes.arrayBuffer();
            
            const fileName = `${query.replace(/\//g, '-')}-${latest}.tgz`;

            await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            
            await client.sendMessage(m.chat, {
                document: Buffer.from(fileBuffer),
                fileName: fileName,
                mimetype: 'application/gzip',
                caption: `📦 ${query} v${latest}\n—\nTσxιƈ-ɱԃȥ`
            }, { quoted: m });

        } catch (error) {
            console.error('NPM download error:', error);
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            await m.reply(`Download failed. Error: ${error.message}`);
        }
    }
};