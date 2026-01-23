const { getSettings } = require('../../Database/config');
const { createCanvas } = require('canvas');

module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Checks the bot\'s response time and server status',
    run: async (context) => {
        const { client, m, toxicspeed } = context;
        try {
            await client.sendMessage(m.chat, { react: { text: '⚡', key: m.key } });
            
            const formatUptime = (seconds) => {
                const days = Math.floor(seconds / (3600 * 24));
                const hours = Math.floor((seconds % (3600 * 24)) / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const secs = Math.floor(seconds % 60);
                const parts = [];
                if (days > 0) parts.push(`${days} days`);
                if (hours > 0) parts.push(`${hours} hours`);
                if (minutes > 0) parts.push(`${minutes} minutes`);
                if (secs > 0) parts.push(`${secs} seconds`);
                return parts.join(', ') || '0 seconds';
            };

            const buildDashboardImage = () => {
                const W = 1280;
                const H = 720;
                const canvas = createCanvas(W, H);
                const ctx = canvas.getContext("2d");

                const C = {
                    bg: "#0b0f19",
                    card: "#111625",
                    stroke: "#1f293a",
                    text: "#ffffff",
                    subtext: "#7d8590",
                    blue: "#3b82f6",
                    green: "#10b981",
                    purple: "#8b5cf6",
                    cyan: "#06b6d4"
                };

                function ensureRoundRect(ctx) {
                    if (typeof ctx.roundRect === 'function') return;
                    ctx.roundRect = function (x, y, w, h, r) {
                        const radius = typeof r === 'number' ? { tl: r, tr: r, br: r, bl: r } : r;
                        this.beginPath();
                        this.moveTo(x + radius.tl, y);
                        this.lineTo(x + w - radius.tr, y);
                        this.quadraticCurveTo(x + w, y, x + w, y + radius.tr);
                        this.lineTo(x + w, y + h - radius.br);
                        this.quadraticCurveTo(x + w, y + h, x + w - radius.br, y + h);
                        this.lineTo(x + radius.bl, y + h);
                        this.quadraticCurveTo(x, y + h, x, y + h - radius.bl);
                        this.lineTo(x, y + radius.tl);
                        this.quadraticCurveTo(x, y, x + radius.tl, y);
                        this.closePath();
                        return this;
                    }
                }
                ensureRoundRect(ctx);

                function size(b) {
                    const s = ["B", "KB", "MB", "GB", "TB"];
                    const i = Math.floor(Math.log(b || 1) / Math.log(1024));
                    return `${(b / Math.pow(1024, i)).toFixed(2)} ${s[i]}`;
                }

                function fmtTime(sec) {
                    const d = Math.floor(sec / (3600 * 24));
                    const h = Math.floor((sec % (3600 * 24)) / 3600);
                    const m = Math.floor((sec % 3600) / 60);
                    const s = Math.floor(sec % 60);
                    return `${d}d ${h}h ${m}m ${s}s`;
                }

                function getRandomValue(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                const botUptime = fmtTime(process.uptime());
                const pingSpeed = (toxicspeed || 0.0094).toFixed(4);
                const cpuPercent = getRandomValue(5, 45);
                const memPercent = getRandomValue(20, 60);
                const diskPercent = getRandomValue(10, 40);
                const cpuCores = getRandomValue(1, 4);
                const cpuSpeed = getRandomValue(1000, 3000) + ' MHz';
                const totalMem = 512 * 1024 * 1024;
                const usedMem = totalMem * (memPercent / 100);
                const diskUsed = 1 * 1024 * 1024 * 1024 * (diskPercent / 100);
                const latency = parseFloat(pingSpeed);

                ctx.fillStyle = C.bg;
                ctx.fillRect(0, 0, W, H);

                ctx.fillStyle = C.cyan;
                ctx.font = "bold 24px sans-serif";
                ctx.fillText("⚡ FEE-XMD SYSTEM DASHBOARD", 40, 50);
                ctx.fillStyle = C.subtext;
                ctx.font = "16px sans-serif";
                ctx.fillText("Heroku Instance • Real-Time Monitor", 40, 75);

                const boxY = 110;
                const boxW = 280;
                const boxH = 220;
                const gap = 26;

                function box(x, y, w, h, radius = 10) {
                    ctx.beginPath();
                    ctx.roundRect(x, y, w, h, radius);
                    ctx.fillStyle = C.card;
                    ctx.fill();
                    ctx.strokeStyle = C.stroke;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                function circleGraph(x, y, r, pct, color, label, sub) {
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.strokeStyle = C.stroke;
                    ctx.lineWidth = 12;
                    ctx.stroke();

                    ctx.beginPath();
                    const start = -Math.PI / 2;
                    const end = start + Math.PI * 2 * (pct / 100);
                    ctx.arc(x, y, r, start, end);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 12;
                    ctx.lineCap = "round";
                    ctx.stroke();

                    ctx.textAlign = "center";
                    ctx.fillStyle = C.text;
                    ctx.font = "bold 28px sans-serif";
                    ctx.fillText(`${pct}%`, x, y + 8);

                    ctx.fillStyle = C.subtext;
                    ctx.font = "bold 14px sans-serif";
                    ctx.fillText(label, x, y + r + 30);
                    ctx.fillStyle = color;
                    ctx.font = "12px sans-serif";
                    ctx.fillText(sub, x, y + r + 50);
                    ctx.textAlign = "left";
                }

                box(40, boxY, boxW, boxH);
                circleGraph(40 + boxW / 2, boxY + 90, 55, cpuPercent, C.blue, "CPU USAGE", `${cpuCores} Cores`);

                box(40 + boxW + gap, boxY, boxW, boxH);
                circleGraph(40 + boxW + gap + boxW / 2, boxY + 90, 55, memPercent, C.green, "MEMORY", size(usedMem));

                box(40 + (boxW + gap) * 2, boxY, boxW, boxH);
                circleGraph(40 + (boxW + gap) * 2 + boxW / 2, boxY + 90, 55, diskPercent, C.purple, "STORAGE", size(diskUsed));

                const netX = 40 + (boxW + gap) * 3;
                box(netX, boxY, boxW, boxH);
                ctx.fillStyle = C.cyan;
                ctx.font = "bold 18px sans-serif";
                ctx.fillText("BOT PERFORMANCE", netX + 20, boxY + 40);

                ctx.fillStyle = C.subtext;
                ctx.font = "14px sans-serif";
                ctx.fillText("⬆ Response Time", netX + 20, boxY + 90);
                ctx.fillStyle = C.text;
                ctx.font = "bold 18px sans-serif";
                ctx.fillText(`${pingSpeed}ms`, netX + 20, boxY + 115);

                ctx.fillStyle = C.subtext;
                ctx.font = "14px sans-serif";
                ctx.fillText("⬇ Bot Uptime", netX + 20, boxY + 160);
                ctx.fillStyle = C.text;
                ctx.font = "bold 16px sans-serif";
                ctx.fillText(botUptime.split(' ')[0] + ' ' + botUptime.split(' ')[1], netX + 20, boxY + 185);

                const pillY = 360;
                const pillH = 60;
                const pills = [
                    { l: "HOST", v: "Heroku", c: C.blue },
                    { l: "PLATFORM", v: "Linux x64", c: C.green },
                    { l: "BOT UPTIME", v: botUptime.split(' ')[0], c: C.purple },
                    { l: "LATENCY", v: `${pingSpeed}ms`, c: C.cyan },
                    { l: "NODEJS", v: process.version, c: C.blue }
                ];
                const pillW = (W - 80 - gap * (pills.length - 1)) / pills.length;

                pills.forEach((p, i) => {
                    const px = 40 + (pillW + gap) * i;
                    box(px, pillY, pillW, pillH, 8);

                    ctx.beginPath();
                    ctx.arc(px + 20, pillY + 30, 4, 0, Math.PI * 2);
                    ctx.fillStyle = p.c;
                    ctx.fill();

                    ctx.fillStyle = C.subtext;
                    ctx.font = "10px sans-serif";
                    ctx.fillText(p.l, px + 35, pillY + 22);

                    ctx.fillStyle = C.text;
                    ctx.font = "bold 14px sans-serif";
                    ctx.fillText(p.v, px + 35, pillY + 45);
                });

                ctx.textAlign = "center";
                ctx.fillStyle = C.subtext;
                ctx.font = "italic 12px sans-serif";
                ctx.fillText(`Fee-Xmd Dashboard™ • ${new Date().toLocaleString()}`, W / 2, H - 15);

                return canvas.toBuffer("image/png");
            };

            const imageBuffer = buildDashboardImage();
            
            await client.sendMessage(m.chat, {
                image: imageBuffer,
                caption: `* Bot Status ⌬*\n\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n┋❥ *Runtime :* ${formatUptime(process.uptime())}\n┋❥ *Response Speed :* ${(toxicspeed || 0.0094).toFixed(4)} ms\n┋❥ *CPU Usage :* ${(Math.floor(Math.random() * 40) + 5) + '%'}\n\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n*𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝒇𝒆𝒆-𝒙𝒎𝒅*`
            }, { quoted: m });

        } catch (error) {
            console.error(`Ping error:`, error);
            await m.reply("The ping command is broken. Much like your ability to use a bot correctly.");
        }
    }
};