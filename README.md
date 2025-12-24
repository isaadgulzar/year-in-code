# VibeWrapped 🎉

Your AI Coding Year Wrapped - Generate beautiful year-in-review reports for ANY AI coding tool!

## Features

- **🔒 Privacy First**: All processing happens client-side in your browser
- **🎯 Multi-Tool Support**: Works with Cursor, Claude Code, GitHub Copilot, Windsurf
- **✨ Beautiful Reports**: Stunning visualizations and insights
- **📤 Easy Sharing**: Share on Twitter/X, download HTML reports
- **⚡ Fast & Free**: No backend processing, completely free

## 🆘 Can't Find Your Data?

We've got you covered with **automatic copy scripts**:

### macOS/Linux:
```bash
# Download and run the script
curl -o copy-data.sh https://raw.githubusercontent.com/isaadgulzar/vibe-wrapped/main/scripts/copy-claude-data.sh
chmod +x copy-data.sh
./copy-data.sh
```

### Windows PowerShell:
```powershell
# Download and run the script
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/isaadgulzar/vibe-wrapped/main/scripts/copy-claude-data.ps1" -OutFile copy-data.ps1
.\copy-data.ps1
```

**Or** check our detailed guide: [📁 FINDING_DATA.md](FINDING_DATA.md)

## Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB (optional, for auth features)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vibewrapped.git
cd vibewrapped

# Install dependencies
npm install

# Set up environment variables
cp .env.local .env
# Edit .env and add your MongoDB URI and Auth secrets

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## How to Use

### 1. Find Your Data

Locate your AI coding tool's usage logs:

- **Claude Code**: `~/.claude/projects/<project>/*.jsonl` or `~/.config/claude/projects/<project>/*.jsonl`
- **Cursor**: `~/.cursor/logs/*.jsonl`
- **GitHub Copilot**: Check GitHub Copilot settings for usage data export
- **Windsurf**: `~/.windsurf/logs/*.jsonl`

### 2. Upload Your Data

1. Visit the app at [http://localhost:3000](http://localhost:3000)
2. Click "Get Started"
3. Select your AI coding tool
4. Drag and drop your JSONL files

### 3. Get Your Wrapped!

View your beautiful wrapped report with:
- Total tokens used
- Total cost
- Active days and streaks
- Top models
- Activity insights

Share on Twitter/X or download as HTML!

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

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/vibewrapped)

1. Click the button above
2. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `AUTH_SECRET`: Random secret for Auth.js
   - `GITHUB_ID` & `GITHUB_SECRET`: For GitHub OAuth (optional)
   - `GOOGLE_ID` & `GOOGLE_SECRET`: For Google OAuth (optional)

### Manual Deployment

```bash
# Build the app
npm run build

# Deploy to your preferred platform
# Vercel, Netlify, Railway, etc.
```

## Environment Variables

Create a `.env.local` file:

```env
# Auth.js
AUTH_SECRET=your-secret-key-here
AUTH_URL=http://localhost:3000

# MongoDB (optional for auth)
MONGODB_URI=mongodb://localhost:27017/vibewrapped

# OAuth Providers (optional)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

## Roadmap

- [ ] Add more AI tool support (v0, Replit, etc.)
- [ ] Multi-year comparison
- [ ] Team analytics
- [ ] API endpoints for programmatic access
- [ ] Custom branding options
- [ ] Export to PDF

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

- Inspired by Spotify Wrapped and GitHub Wrapped
- Built with the amazing ccusage parser
- Thanks to the AI coding community!

## Support

- 🐛 [Report a bug](https://github.com/yourusername/vibewrapped/issues)
- 💡 [Request a feature](https://github.com/yourusername/vibewrapped/issues)
- 💬 [Join discussions](https://github.com/yourusername/vibewrapped/discussions)

---

Built with ❤️ for the AI coding community
