# FEE XMD WhatsApp Bot 🤖

<div align="center">
  <img src="https://raw.githubusercontent.com/Fred1e/Fee-Xmd/main/fredi.jpg" alt="FEE XMD Logo" width="220">
  <br>
  <h1>Advanced WhatsApp Bot with 200+ Features • Free & Open Source</h1>

  <!-- Action buttons — unified colors and controlled size -->
  <a href="https://fee-xmd-pair-s5zb.onrender.com" target="_blank" style="margin:4px">
    <img src="https://img.shields.io/badge/Pair_Now-7C3AED?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Pair Now" width="160">
  </a>

  <a href="https://fezchat.github.io/deploy_fee_xmd" target="_blank" style="margin:4px">
    <img src="https://img.shields.io/badge/Deploy_Now-06B6D4?style=for-the-badge&logo=rocket&logoColor=white" alt="Deploy Now" width="160">
  </a>

  <a href="https://github.com/Fred1e/Fee-Xmd/archive/refs/heads/main.zip" target="_blank" style="margin:4px">
    <img src="https://img.shields.io/badge/Download_ZIP-10B981?style=for-the-badge&logo=github&logoColor=white" alt="Download ZIP" width="160">
  </a>

  <!-- Repo stats — cleaned up, no duplicates, consistent colors and sizes -->
  <div style="margin-top:8px;">
    <img src="https://img.shields.io/github/stars/Fred1e/Fee-Xmd?style=for-the-badge&label=Stars&logo=github&color=F59E0B&logoColor=white" alt="GitHub Stars" width="170" style="margin:3px">
    <img src="https://img.shields.io/github/forks/Fred1e/Fee-Xmd?style=for-the-badge&label=Forks&logo=github&color=3B82F6&logoColor=white" alt="GitHub Forks" width="170" style="margin:3px">
    <img src="https://img.shields.io/github/watchers/Fred1e/Fee-Xmd?style=for-the-badge&label=Watchers&logo=github&color=8B5CF6&logoColor=white" alt="GitHub Watchers" width="170" style="margin:3px">
  </div>
</div>

## ✨ Features Overview

### Category — Features Count & Key Features
- **Media Downloaders (50+)**  
  Platforms: YouTube, Instagram, TikTok, Facebook, Twitter, Pinterest, Reddit
- **AI & Chat (10+)**  
  Models & capabilities: GPT-4, Summarization, Code Writing
- **Games & Entertainment (30+)**  
  Examples: Trivia, Puzzles, Word Games, RPG, Multiplayer Games
- **Utility Tools (40+)**  
  File Conversion, QR Codes, Calculator, Currency, Weather, News
- **Educational (20+)**  
  Dictionary, Math Solver, Science Facts, Exam Prep
- **Group Management (15+)**  
  Auto-moderation, Welcome Messages, Anti-spam, Announcements


## 🚀 Quick Start

### Option 1: 📱 Pair with Existing Bot (Instant)

<a href="https://fee-xmd-pair-s5zb.onrender.com" target="_blank">
  <img src="https://img.shields.io/badge/Home_Page-7C3AED?style=for-the-badge&logo=blogger&logoColor=white" alt="Home Page" width="160">
</a>

<a href="https://fee-xmd-pair-s5zb.onrender.com/qr" target="_blank">
  <img src="https://img.shields.io/badge/Scan_QR-7C3AED?style=for-the-badge&logo=scanner&logoColor=white" alt="Scan QR Now" width="160">
</a>

<a href="https://fee-xmd-pair-s5zb.onrender.com/pair" target="_blank">
  <img src="https://img.shields.io/badge/Pair_Code-7C3AED?style=for-the-badge&logo=phone&logoColor=white" alt="Pair Code Now" width="160">
</a>

### Option 2: 🛠 Deploy Your Own Instance

<a href="https://fezchat.github.io/deploy_fee_xmd" target="_blank" style="margin:4px">
    <img src="https://img.shields.io/badge/Deploy_Now-06B6D4?style=for-the-badge&logo=rocket&logoColor=white" alt="Deploy Now" width="160">
  </a>

### Supported Platforms
- Heroku (Free tier available)
- Railway (Always-on free tier)
- Render (Free web services)
- Koyeb (2 always-free instances)
- Replit (Cloud IDE with hosting)
- Panels (all free panel and pro)


## 📥 Download & Installation

### Option A: 📦 Download ZIP for Control Panel
```bash
# Download the latest release
curl -L https://github.com/Fred1e/Fee-Xmd/archive/refs/heads/main.zip -o Fee-Xmd.zip

# Or use wget
wget https://github.com/Fred1e/Fee-Xmd/archive/refs/heads/main.zip -O Fee-Xmd.zip
```

Download ZIP:

<a href="https://github.com/Fred1e/Fee-Xmd/archive/refs/heads/main.zip" target="_blank">
  <img src="https://img.shields.io/badge/DOWNLOAD_ZIP-7C3AED?style=for-the-badge&logo=github&logoColor=white" alt="DOWNLOAD ZIP" width="160">
</a>

### Option B: 🐳 Run with Docker
```bash
# Pull Docker image
docker pull fred1e/fee-xmd:latest

# Run container
docker run -d \
  --name fee-xmd-bot \
  -p 3000:3000 \
  -e SESSION_ID="your_session" \
  -e PREFIX="!" \
  fred1e/fee-xmd:latest
```

### Option C: 💻 Run on Local

1. Clone the repository:
```bash
git clone https://github.com/Fred1e/Fee-Xmd.git
cd Fee-Xmd
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (create a `.env` file):
```env
PORT=3000
SESSION_ID=your_session_id
PREFIX=!
MODS=255752593977
MONGODB_URI=your_mongodb_uri
CRON=0 */2 * * *
WELCOME=true
```

4. Start the bot:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

5. Access the dashboard: Open http://localhost:3000 and scan the QR code with WhatsApp.


## 🎯 Bot Commands

### Basic Commands
- `!help` — Show all commands
- `!menu` — Show categorized menu
- `!ping` — Check bot response time
- `!owner` — Show bot owner info
- `!info` — Show bot information

### Media Download
- `!yt [url]` — Download YouTube video
- `!ig [url]` — Download Instagram video
- `!tt [url]` — Download TikTok video
- `!fb [url]` — Download Facebook video
- `!spotify [url]` — Download Spotify audio

### AI Features
- `!ai [question]` — Chat with AI
- `!gpt [prompt]` — Use GPT-4
- `!img [prompt]` — Generate image with AI
- `!translate [text] [lang]` — Translate text
- `!summarize [text]` — Summarize text

### Utilities
- `!sticker` — Convert image to sticker
- `!qr [text]` — Generate QR code
- `!weather [city]` — Get weather info
- `!calc [expression]` — Calculator
- `!currency [amount] [from] [to]` — Currency conversion



## 📊 GitHub Statistics

<!-- Clean, extended stats area with additional categories and consistent sizing -->
<div align="center">
  <img src="https://img.shields.io/github/stars/Fred1e/Fee-Xmd?style=for-the-badge&label=Stars&logo=github&color=F59E0B&logoColor=white" alt="Stars" width="160" style="margin:4px">
  <img src="https://img.shields.io/github/forks/Fred1e/Fee-Xmd?style=for-the-badge&label=Forks&logo=github&color=3B82F6&logoColor=white" alt="Forks" width="160" style="margin:4px">
  <img src="https://img.shields.io/github/watchers/Fred1e/Fee-Xmd?style=for-the-badge&label=Watchers&logo=github&color=8B5CF6&logoColor=white" alt="Watchers" width="160" style="margin:4px">
  <img src="https://img.shields.io/github/contributors/Fred1e/Fee-Xmd?style=for-the-badge&label=Contributors&logo=github&color=10B981&logoColor=white" alt="Contributors" width="160" style="margin:4px">
  <img src="https://img.shields.io/github/issues/Fred1e/Fee-Xmd?style=for-the-badge&label=Open%20Issues&logo=github&color=EF4444&logoColor=white" alt="Open Issues" width="160" style="margin:4px">
  <img src="https://img.shields.io/github/issues-closed/Fred1e/Fee-Xmd?style=for-the-badge&label=Closed%20Issues&logo=github&color=06B6D4&logoColor=white" alt="Closed Issues" width="160" style="margin:4px">
  <img src="https://img.shields.io/github/release/Fred1e/Fee-Xmd?style=for-the-badge&label=Releases&logo=github&color=8B5CF6&logoColor=white" alt="Releases" width="160" style="margin:4px">
  <img src="https://img.shields.io/github/license/Fred1e/Fee-Xmd?style=for-the-badge&label=License&logo=open-source&color=111827&logoColor=white" alt="License" width="160" style="margin:4px">
  <img src="https://img.shields.io/github/last-commit/Fred1e/Fee-Xmd?style=for-the-badge&label=Last%20Commit&logo=git&color=7C3AED&logoColor=white" alt="Last Commit" width="160" style="margin:4px">
  <img src="https://img.shields.io/github/languages/top/Fred1e/Fee-Xmd?style=for-the-badge&label=Top%20Language&logo=code&color=06B6D4&logoColor=white" alt="Top Language" width="160" style="margin:4px">
</div>

Notes:
- I adjusted badge colors to be consistent and readable, and set widths on badges so they visually align better across different viewers.
- Removed duplicated badges and added more categories (Contributors, Open/Closed issues, Releases, License, Last commit, Top language).

## 👨‍💻 Developer Information

- Fredi AI Tech — From Arusha, Tanzania 🇹🇿
- Contact & Profiles:
  - WhatsApp: https://wa.me/256752593977 (Direct support)
  - Email: frediezra360@gmail.com
  - GitHub: https://github.com/Fred1e (Main)
  - GitHub: https://github.com/mr-X-force (Secondary)
  - GitHub: https://github.com/FezChat (FezChat projects)

---

## 🤝 Support & Community

<div align="center">
  <a href="#"><img src="https://img.shields.io/badge/WhatsApp_Channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp Channel" width="140" style="margin:4px"></a>
  <a href="#"><img src="https://img.shields.io/badge/WhatsApp_Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp Group" width="140" style="margin:4px"></a>
  <a href="#"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook" width="140" style="margin:4px"></a>
  <a href="#"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" width="140" style="margin:4px"></a>
  <a href="#"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" width="140" style="margin:4px"></a>
</div>

## 📞 Contact Information

- Phone (TZ): +255 764 182 801
- Phone (INT): +256 752 593 977
- Email: frediezra360@gmail.com

Business Hours: 24/7  
Typical Response Time: Usually within 1–2 hours



## 🛠 Troubleshooting

Common Issues & Fixes:
1. QR Code Not Showing:
   - Ensure port 3000 is open
   - Verify dependencies are installed
   - Check console for errors
2. Bot Not Responding:
   - Verify WhatsApp connection
   - Check internet connection
   - Restart the bot process
3. Deployment Failed:
   - Verify environment variables
   - Check platform logs
   - Ensure GitHub fork exists


## 📜 License

This project is licensed under the MIT License — see the LICENSE file for details.


## 🙏 Acknowledgments

<img src="https://img.shields.io/github/watchers/Fred1e/Fee-Xmd?style=social" alt="GitHub Watchers">
</div>



## 🆘 Quick Support Links

<div align="center">
  <a href="#"><img src="https://img.shields.io/badge/Report_Bug-DD0031?style=for-the-badge&logo=github&logoColor=white" alt="Report Bug" width="140" style="margin:4px"></a>
  <a href="#"><img src="https://img.shields.io/badge/Request_Feature-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Request Feature" width="140" style="margin:4px"></a>
  <a href="#"><img src="https://img.shields.io/badge/Support_Development-FF6B6B?style=for-the-badge&logo=paypal&logoColor=white" alt="Support Development" width="140" style="margin:4px"></a>
</div>



Meta
- Last Updated: ACTIVE
- Bot Version: 6.0.0
- Status: ✅ Active & Maintained
