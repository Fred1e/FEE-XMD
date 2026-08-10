import { getDeviceMode } from './deviceMode.js';

export async function sendInteractive(client, m, text) {
    const device = await getDeviceMode();
    if (device === 'ios') {
        return client.sendMessage(m.chat, { text });
    }
    return client.sendMessage(m.chat, {
        text,
        title: "FEE-XMD",
        subtitle: "Q",
        footer: "In-app signup",
        interactiveButtons: [
            {
                name: "inapp_signup",
                buttonParamsJson: JSON.stringify({}),
            },
        ],
    });
}