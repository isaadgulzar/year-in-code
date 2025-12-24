import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-600 text-transparent bg-clip-text">
            VibeWrapped
          </h1>
          <div className="flex gap-4">
            <Link
              href="/upload"
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6">
        <div className="py-20 text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium border border-orange-500/20">
              🎉 Year-End Special
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your AI Coding
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              {" "}Year Wrapped
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Generate beautiful year-in-review reports for <strong className="text-white">any AI coding tool</strong>.
            Cursor, Claude Code, Copilot, Windsurf - we support them all!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 transition-all font-semibold text-lg shadow-lg shadow-orange-500/50"
            >
              Create Your Wrapped
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-lg border-2 border-gray-700 hover:border-orange-500 transition-colors font-semibold text-lg"
            >
              How It Works
            </a>
          </div>

          {/* Privacy Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>100% client-side processing - your data never leaves your browser</span>
          </div>
        </div>

        {/* Features */}
        <div className="py-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-colors">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
            <p className="text-gray-400">
              All processing happens in your browser. We never store or see your data.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-colors">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Multi-Tool Support</h3>
            <p className="text-gray-400">
              Works with Cursor, Claude Code, GitHub Copilot, Windsurf, and more.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-colors">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">Beautiful Reports</h3>
            <p className="text-gray-400">
              Get stunning visualizations and insights about your AI coding journey.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="py-20 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Find Your Data</h3>
                <p className="text-gray-400 text-lg">
                  Locate your AI coding tool's usage logs. We'll show you exactly where to find them.
                </p>
                <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <p className="font-mono text-sm text-gray-300">
                    Claude Code: <span className="text-orange-400">~/.claude/projects/</span><br/>
                    Cursor: <span className="text-orange-400">~/.cursor/logs/</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Upload Your Data</h3>
                <p className="text-gray-400 text-lg">
                  Drag and drop your JSONL files. Everything is processed locally in your browser.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Get Your Wrapped</h3>
                <p className="text-gray-400 text-lg">
                  View beautiful insights, download HTML reports, and share on social media!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/upload"
              className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 transition-all font-semibold text-lg shadow-lg shadow-orange-500/50"
            >
              Create Your Wrapped Now
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="container mx-auto px-6 py-8 text-center text-gray-500">
          <p>
            Built with ❤️ for the AI coding community · Open Source on{" "}
            <a href="#" className="text-orange-400 hover:text-orange-300">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
