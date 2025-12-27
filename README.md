<div align="center">
    <img src="/public/logo.png" alt="Year in Code" width="120" height="120">
    <h1>Year in Code</h1>
    <p><strong>Discover your coding journey — from your very first commit to today</strong></p>

[![GitHub](https://img.shields.io/github/stars/isaadgulzar/year-in-code?style=social)](https://github.com/isaadgulzar/year-in-code)
[![Website](https://img.shields.io/badge/website-yearincode.xyz-orange)](https://yearincode.xyz)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

<div align="center">
    <img src="/public/year-in-code-og-image.png" alt="Year in Code Screenshot" width="600">
</div>

---

> Transform your coding activity into beautiful year-in-review reports. Track your GitHub contributions or Claude Code usage — all processed client-side in your browser.

## ✨ Features

- **🎯 GitHub Wrapped**: Discover how many years you've been coding, from your first commit to now
- **📊 Beautiful Visualizations**: Year-long activity heatmaps, contribution streaks, top languages
- **⚡ Simple & Fast**: Just enter your GitHub username or upload Claude Code data
- **📸 Share Ready**: Download or copy your wrapped summary as a shareable image
- **🔒 100% Private**: All processing happens in your browser, nothing uploaded to servers
- **💯 Free & Open Source**: No costs, no tracking, no limits
- **🎨 Responsive Design**: Works beautifully on desktop and mobile

## 🚀 Quick Start

### Option 1: GitHub Wrapped (Recommended)

The easiest way to get your Year in Code report:

1. 🌐 Visit **[yearincode.xyz](https://yearincode.xyz)**
2. 📝 Enter your GitHub username
3. 🎉 Get your wrapped report instantly!

**What you'll discover:**

- **Years in Code**: See which year of coding you're in (calculated from your very first commit!)
- **Total Contributions**: All your commits, PRs, and issues for the year
- **Longest Streak**: Your best consecutive contribution days
- **Top Languages**: Your most-used programming languages
- **Peak Activity**: Your most productive month and day of the week
- **Total Stars**: Stars earned across all your repositories

### Option 2: Claude Code Wrapped

For Claude Code users who want to visualize their AI-assisted coding activity:

#### Prerequisites

You need [ccusage](https://github.com/ryoppippi/ccusage) to generate your usage data. No installation needed:

```bash
# Check if you have Claude Code usage data
npx -y ccusage@latest daily
```

#### Step 1: Generate Your Data

Export your Claude Code usage as JSON:

```bash
# For 2025 data (macOS/Linux)
npx -y ccusage@latest daily --since 20250101 --until 20251231 --json > ~/Desktop/my-wrapped-2025.json

# For 2025 data (Windows PowerShell)
npx -y ccusage@latest daily --since 20250101 --until 20251231 --json > $HOME\Desktop\my-wrapped-2025.json

# For 2024 data
npx -y ccusage@latest daily --since 20240101 --until 20241231 --json > ~/Desktop/my-wrapped-2024.json
```

> 💡 **Tip**: Always include `@latest` to ensure you're using the newest version of ccusage

#### Step 2: Get Your Wrapped Report

1. 🌐 Visit **[yearincode.xyz](https://yearincode.xyz)**
2. 🔄 Switch to "Claude Code" tab
3. 📤 Upload your JSON file (drag & drop supported)
4. 🎉 View your beautiful wrapped report!

**What you'll get:**

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

Year in Code transforms your coding data into an engaging year-in-review experience:

- 🎁 **Wrapped Experience**: Inspired by Spotify Wrapped and GitHub Wrapped
- 🎯 **Unique Insight**: Discover which year of coding you're in — from your very first commit!
- 🚀 **Multi-Tool Support**: Works with GitHub and Claude Code
- 🔧 **Simple to Use**: No complex setup, just a username or a file upload
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

### Privacy First 🔒

- **GitHub Mode**: Fetches public data from GitHub's API using the public [GitHub Contributions API](https://github-contributions-api.jogruber.de/)
- **Claude Code Mode**: Processes your JSON file **100% client-side in your browser** — your data never leaves your computer!

All processing happens in your browser. We don't store or collect any of your data.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel
- **APIs**: GitHub Contributions API (public data only)

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

### How does "Xth Year In Code" work?

When you use GitHub mode, we find your very first commit date across all your public repositories and calculate how many years have passed since then. This gives you a unique perspective on your coding journey!

### Is my data private?

**Yes!**

- **GitHub mode**: Only fetches public contribution data that's already visible on your GitHub profile
- **Claude Code mode**: Processes files entirely in your browser — nothing is uploaded to our servers

### How do I get my Claude Code usage data?

You need the [ccusage](https://github.com/ryoppippi/ccusage) CLI. No installation required:

```bash
# Check your usage first
npx -y ccusage@latest daily

# Then export as JSON for Year in Code
npx -y ccusage@latest daily --since 20250101 --until 20251231 --json > ~/Desktop/my-wrapped.json
```

### Can I use data from multiple years?

Currently, each upload processes one year at a time. Multi-year comparison is on the roadmap!

### How do I share my wrapped report?

Click the "Download" button to save your summary card as PNG, or use "Copy" to copy it to your clipboard for easy sharing on social media. You can also use "Share on X" for direct Twitter sharing!

### Can I share my GitHub wrapped with a direct link?

Yes! Use this format: `yearincode.xyz/2025/github/your-username`

Example: `yearincode.xyz/2025/github/isaadgulzar`

## Roadmap

- [x] GitHub integration with "Years in Code" feature
- [x] Direct link sharing for GitHub wrapped
- [ ] Support for more ccusage output formats
- [ ] Multi-year comparison view
- [ ] More detailed analytics (hourly breakdown, commit patterns)
- [ ] Custom color themes
- [ ] PDF export option
- [ ] More AI coding tools (Cursor, Copilot)

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
- 🌐 **[GitHub Contributions API](https://github-contributions-api.jogruber.de/)**: Powers our GitHub integration
- 🔧 **[ccusage](https://github.com/ryoppippi/ccusage)** by [@ryoppippi](https://github.com/ryoppippi): The amazing CLI that powers Claude Code data generation
- 💜 **Claude Code Community**: For making AI-assisted coding amazing
- 🙏 **Open Source**: Built on the shoulders of giants (Next.js, Tailwind, html-to-image)

Special thanks to **[@winXzorin](https://github.com/winXzorin)** (Eren) for requesting the GitHub wrapped feature!

## Support & Community

- 🐛 [Report a bug](https://github.com/isaadgulzar/year-in-code/issues)
- 💡 [Request a feature](https://github.com/isaadgulzar/year-in-code/issues)
- 💬 [Join discussions](https://github.com/isaadgulzar/year-in-code/discussions)
- ⭐ [Star on GitHub](https://github.com/isaadgulzar/year-in-code) - Show your support!

## Related Projects

- 📊 [ccusage](https://github.com/ryoppippi/ccusage) - The official Claude Code usage analyzer CLI
- 🌐 [GitHub Contributions API](https://github-contributions-api.jogruber.de/) - Public GitHub contribution data
- 🌐 [yearincode.xyz](https://yearincode.xyz) - Live demo and usage

---

<div align="center">
    <p><strong>Built with ❤️ for developers worldwide</strong></p>
    <p>
        <a href="https://github.com/isaadgulzar/year-in-code">GitHub</a> •
        <a href="https://yearincode.xyz">Website</a> •
        <a href="https://x.com/isaadgulzar">Twitter</a>
    </p>
</div>
