const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { session, botname } = require('./Env/settings');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');

const usePostgresAuthState = require('./lib/postgresAuth');

// Setup logger
const logger = pino({ level: 'info' });

async function startBot() {
    console.log('Starting FEE-XMD...');

    let authState;
    if (process.env.DATABASE_URL) {
        console.log('Using PostgreSQL (Supabase) for authentication');
        authState = await usePostgresAuthState(process.env.DATABASE_URL);
    } else {
        console.log('Using Local File System for authentication');
        authState = await useMultiFileAuthState('Session');
    }

    const { state, saveCreds } = authState;

    const usePairingCode = !!process.env.PAIRING_NUMBER;

    const sock = makeWASocket({
        printQRInTerminal: false,
        auth: state,
        logger: logger,
        browser: Browsers.ubuntu('Chrome'),
    });

    if (usePairingCode && !sock.authState.creds.registered) {
        console.log(`Using Pairing Code for number: ${process.env.PAIRING_NUMBER}`);
        setTimeout(async () => {
            try {
                const code = await sock.requestPairingCode(process.env.PAIRING_NUMBER);
                console.log('\n======================================================');
                console.log(`  PAIRING CODE: ${code}`);
                console.log('======================================================\n');
            } catch (err) {
                console.error('Failed to request pairing code:', err);
            }
        }, 3000);
    }

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        // Only print QR if we are NOT using pairing code
        if (qr && !usePairingCode) {
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
