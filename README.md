# VibeWrapped 🎉

Your AI Coding Year Wrapped - Generate beautiful year-in-review reports for ANY AI coding tool!

## Features

- **🔒 Privacy First**: All processing happens client-side in your browser
- **🎯 Multi-Tool Support**: Works with Cursor, Claude Code, GitHub Copilot, Windsurf
- **✨ Beautiful Reports**: Stunning visualizations and insights
- **📤 Easy Sharing**: Share on Twitter/X, download HTML reports
- **⚡ Fast & Free**: No backend processing, completely free

## 🚀 Quick Start (2 Steps!)

### For Claude Code Users:

**Step 1:** Generate your wrapped data JSON:
```bash
# macOS/Linux - saves to Desktop
npx ccusage daily --since 20240101 --until 20241231 --json > ~/Desktop/my-wrapped.json

# Windows - saves to Desktop
npx ccusage daily --since 20240101 --until 20241231 --json > %USERPROFILE%\Desktop\my-wrapped.json
```

**Step 2:** Upload `my-wrapped.json` from your Desktop to [vibewrapped.com](https://vibewrapped.com) and get your beautiful wrapped report! 🎉

---

### For Cursor/Copilot/Windsurf Users:

Support coming soon! For now, check our detailed guide: [📁 FINDING_DATA.md](FINDING_DATA.md)

---

## Development Setup

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

## How It Works

### For End Users:

1. **Run the command** (works with published ccusage version):
   ```bash
   # macOS/Linux - saves to Desktop
   npx ccusage daily --since 20240101 --until 20241231 --json > ~/Desktop/my-wrapped.json

   # Windows - saves to Desktop
   npx ccusage daily --since 20240101 --until 20241231 --json > %USERPROFILE%\Desktop\my-wrapped.json
   ```

2. **Upload to VibeWrapped**: Visit [vibewrapped.com](https://vibewrapped.com) and upload `my-wrapped.json` from your Desktop

3. **Get Your Wrapped!** View your beautiful report with:
   - Total tokens used
   - Total cost
   - Active days and streaks
   - Top models
   - Activity insights
   - Share on Twitter/X or download as HTML!

### Privacy First 🔒

All data processing happens **100% in your browser**. Your usage data never leaves your computer - we just help you visualize it beautifully!

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
