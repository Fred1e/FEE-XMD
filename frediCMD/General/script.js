module.exports = async (context) => {
    const { client, m, text, botname, prefix = '' } = context;

    if (text) {
        return client.sendMessage(
            m.chat,
            { text: `Hello ${m.pushName}, just use the command ${prefix}repo to get the repository source code.` },
            { quoted: m }
        );
    }

    try {
        const repoUrl = 'https://api.github.com/repos/Fred1e/FEE-XMD';
        const response = await fetch(repoUrl);
        const repoData = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch repository data');
        }

        const createdDate = new Date(repoData.created_at).toLocaleDateString('en-GB');
        const lastUpdateDate = new Date(repoData.updated_at).toLocaleDateString('en-GB');

        const replyText =
            `*${botname} Repository Information*\n\n` +
            `? Stars: ${repoData.stargazers_count}\n` +
            `? Forks: ${repoData.forks_count}\n` +
            `? Created: ${createdDate}\n` +
            `? Last Updated: ${lastUpdateDate}\n` +
            `? Owner: ${repoData.owner.login}\n\n` +
            `Select an option below ?`;

        await client.sendMessage(
            m.chat,
            {
                interactiveMessage: {
                    header: `? ${botname} Info`,
                    title: replyText,
                    footer: `𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅`,
                    buttons: [
                        // Row 1
                        {
                            name: 'cta_url',
                            buttonParamsJson: JSON.stringify({
                                display_text: '? Get Pair',
                                url: 'https://fee-xmd-pair.onrender.com/'
                            })
                        },
                        {
                            name: 'cta_url',
                            buttonParamsJson: JSON.stringify({
                                display_text: '? Source Repo',
                                url: 'https://github.com/Fred1e/Fee-Xmd'
                            })
                        },
                        {
                            name: 'cta_url',
                            buttonParamsJson: JSON.stringify({
                                display_text: '? Visit Site Stream',
                                url: 'https://fee-xmd.online'
                            })
                        },
                        {
                            name: 'cta_url',
                            buttonParamsJson: JSON.stringify({
                                display_text: '? Download Apk',
                                url: 'https://files.catbox.moe/9r77s0.apk '
                            })
                        },
                        // Row 2
                        {
                            name: 'cta_url',
                            buttonParamsJson: JSON.stringify({
                                display_text: '? Github Profile',
                                url: 'https://github.com/Fred1e'
                            })
                        },
                        {
                            name: 'cta_url',
                            buttonParamsJson: JSON.stringify({
                                display_text: '? View Channel',
                                url: 'https://whatsapp.com/channel/0029Vb6mzVF7tkj42VNPrZ3V '
                            })
                        },
                        {
                            name: 'cta_url',
                            buttonParamsJson: JSON.stringify({
                                display_text: '? Join Group',
                                url: 'https://chat.whatsapp.com/FA1GPSjfUQLCyFbquWnRIS'
                            })
                        }
                    ]
                }
            },
            { quoted: m }
        );

    } catch (error) {
        console.error('Error in repo command:', error);
        await client.sendMessage(
            m.chat,
            {
                text: `Couldn't fetch repository info.\nVisit directly:\nhttps://github.com/Fred1e/Fee-xmd`
            },
            { quoted: m }
        );
    }
};