<div align="center">
    <img src="/public/logo.png" alt="Year in Code" width="120" height="120">
    <h1>Year in Code</h1>
    <p><strong>Transform your Claude Code usage into beautiful year-in-review reports</strong></p>

[![GitHub](https://img.shields.io/github/stars/isaadgulzar/year-in-code?style=social)](https://github.com/isaadgulzar/year-in-code)
[![Website](https://img.shields.io/badge/website-yearincode.xyz-orange)](https://yearincode.xyz)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

---

> Year-in-review reports for Claude Code users. All processing happens client-side in your browser.

## ✨ Features

- **📊 Beautiful Visualizations**: Year-long activity heatmaps, top model usage, streak tracking
- **⚡ Simple & Fast**: Just 2 steps — generate JSON with ccusage, upload, done
- **📸 Share Ready**: Download or copy your wrapped summary as a shareable image
- **🔒 Client-Side Processing**: Your data stays in your browser, nothing uploaded to servers
- **💯 Free & Open Source**: No costs, no tracking, no limits
- **🎨 Responsive Design**: Works beautifully on desktop and mobile

## 🚀 Quick Start

### Prerequisites

You need [ccusage](https://github.com/ryoppippi/ccusage) to generate your usage data. No installation needed:

```bash
# Check if you have Claude Code usage data
npx -y ccusage@latest daily
```

### Step 1: Generate Your Data

Export your Claude Code usage as JSON:

```bash
# For 2025 data (macOS/Linux)
npx -y ccusage@latest daily --since 20250101 --until 20251231 --json > ~/Desktop/my-wrapped-2025.json

# For 2025 data (Windows)
npx -y ccusage@latest daily --since 20250101 --until 20251231 --json > %USERPROFILE%\Desktop\my-wrapped-2025.json

# For 2024 data
npx -y ccusage@latest daily --since 20240101 --until 20241231 --json > ~/Desktop/my-wrapped-2024.json
```

> 💡 **Tip**: Always include `@latest` to ensure you're using the newest version of ccusage

### Step 2: Get Your Wrapped Report

1. 🌐 Visit **[yearincode.xyz](https://yearincode.xyz)**
2. 📤 Upload your JSON file (drag & drop supported)
3. 🎉 View your beautiful wrapped report!

### What You'll Get

- 📊 **Total Tokens**: See your complete token usage for the year
- 🔥 **Longest Streak**: Your best coding consistency streak
- 🤖 **Top 3 Models**: Most-used Claude models (Sonnet, Opus, Haiku)
- 📅 **Activity Heatmap**: 365-day visualization of your coding activity
- 📸 **Shareable Card**: Beautiful summary card to download or share

<div align="center">
    <img src="/public/2025-cc-wrapped-preview-image.png" alt="Year in Code Screenshot" width="600">
</div>

---

## Why Year in Code?

Year in Code transforms raw Claude Code usage data into an engaging year-in-review experience:

- 🎁 **Wrapped Experience**: Inspired by Spotify Wrapped and GitHub Wrapped
- 🔧 **Simple to Use**: No complex setup, just export from ccusage and visualize
- 🚀 **Built for ccusage**: Designed to work seamlessly with the amazing [ccusage](https://github.com/ryoppippi/ccusage) CLI
- 💝 **Open Source**: Free for everyone to use and contribute

---

## Development Setup

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
# Clone the repository
git clone https://github.com/isaadgulzar/year-in-code.git
cd year-in-code

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## How It Works

### For Users:

1. **Generate your data** using the official ccusage CLI:

   ```bash
   # For 2025 data
   npx -y ccusage@latest daily --since 20250101 --until 20251231 --json > ~/Desktop/my-wrapped.json

   # For 2024 data
   npx -y ccusage@latest daily --since 20240101 --until 20241231 --json > ~/Desktop/my-wrapped.json
   ```

2. **Upload to Year in Code**: Visit [yearincode.xyz](https://yearincode.xyz) and upload your JSON file

3. **Get Your Report**: View your beautiful wrapped report with detailed insights and share it!

### Privacy First 🔒

All data processing happens **100% client-side in your browser**. Your usage data never leaves your computer - we just help you visualize it beautifully!

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: Auth.js (NextAuth v5)
- **Database**: MongoDB (optional)
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/isaadgulzar/year-in-code)

1. Click the button above
2. Deploy - no environment variables needed!

### Other Platforms

```bash
# Build the app
npm run build

# Deploy to Netlify, Railway, Cloudflare Pages, etc.
```

## Environment Variables

No environment variables required! The app works completely standalone with no backend dependencies.

## FAQ & Tips

### How do I get my usage data?

You need the [ccusage](https://github.com/ryoppippi/ccusage) CLI. No installation required:

```bash
# Check your usage first
npx -y ccusage@latest daily

# Then export as JSON for Year in Code
npx -y ccusage@latest daily --since 20250101 --until 20251231 --json > ~/Desktop/my-wrapped.json
```

### Can I use data from multiple years?

Currently, each upload processes one year at a time. Multi-year comparison is on the roadmap!

### What data format does it accept?

Year in Code accepts JSON output from `ccusage daily --json`. The app automatically detects the ccusage format and parses it accordingly.

### Can I use this with other AI coding tools?

Currently, Year in Code is optimized for Claude Code data via ccusage. Support for other tools (Cursor, Copilot, etc.) may come in the future!

### How do I share my wrapped report?

Click the "Download" button to save your summary card as PNG, or use "Copy" to copy it to your clipboard for easy sharing on social media.

## Roadmap

- [ ] Support for more ccusage output formats
- [ ] Multi-year comparison view
- [ ] More detailed model usage analytics
- [ ] Custom color themes
- [ ] PDF export option
- [ ] Social media optimization (OG images)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

This project wouldn't exist without:

- 🎵 **Spotify Wrapped & GitHub Wrapped**: Inspiration for the wrapped experience
- 🔧 **[ccusage](https://github.com/ryoppippi/ccusage)** by [@ryoppippi](https://github.com/ryoppippi): The amazing CLI that powers our data generation
- 💜 **Claude Code Community**: For making AI-assisted coding amazing
- 🙏 **Open Source**: Built on the shoulders of giants (Next.js, Tailwind, Chart.js)

## Support & Community

- 🐛 [Report a bug](https://github.com/isaadgulzar/year-in-code/issues)
- 💡 [Request a feature](https://github.com/isaadgulzar/year-in-code/issues)
- 💬 [Join discussions](https://github.com/isaadgulzar/year-in-code/discussions)
- ⭐ [Star on GitHub](https://github.com/isaadgulzar/year-in-code) - Show your support!

## Related Projects

- 📊 [ccusage](https://github.com/ryoppippi/ccusage) - The official Claude Code usage analyzer CLI
- 🌐 [yearincode.xyz](https://yearincode.xyz) - Live demo and usage
- 📚 [ccusage documentation](https://ccusage.com/) - Full ccusage docs

---

<div align="center">
    <p><strong>Built with ❤️ for the Claude Code community</strong></p>
    <p>
        <a href="https://github.com/isaadgulzar/year-in-code">GitHub</a> •
        <a href="https://yearincode.xyz">Website</a> •
        <a href="https://github.com/ryoppippi/ccusage">ccusage CLI</a>
    </p>
</div>
