const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { session, botname } = require('./Env/settings');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');

// Setup logger
const logger = pino({ level: 'info' });

async function startBot() {
    console.log('Starting FEE-XMD...');
    const { state, saveCreds } = await useMultiFileAuthState('Session');

    const sock = makeWASocket({
        printQRInTerminal: false,
        auth: state,
        logger: logger,

    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('QR Code received, scan it!');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('opened connection');
            console.log('Bot is ready!');
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async m => {
        // console.log(JSON.stringify(m, undefined, 2));
        if (m.type === 'notify') {
            for (const msg of m.messages) {
                if (!msg.key.fromMe) {
                    console.log('Received message from', msg.key.remoteJid);
                }
            }
        }
    });
}

startBot();
