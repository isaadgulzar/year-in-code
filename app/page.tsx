'use client'

import Link from 'next/link'

export default function Home() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
      <main className="flex-1 flex items-center justify-center px-2 sm:px-6 py-4">
        <div className="w-full max-w-5xl text-center">
          <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-xs sm:text-sm font-medium border border-green-500/30 animate-pulse">
              ✨ NEW: GitHub Integration
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
            Generate Your
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              {' '}
              {currentYear}{' '}
            </span>
            Wrapped
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-3 sm:mb-4 md:mb-6 max-w-3xl mx-auto font-light px-4">
            See how many years you&apos;ve been coding since your first commit
          </p>

          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            Works with <span className="text-white font-medium">GitHub</span>{' '}
            (username) or{' '}
            <span className="text-white font-medium">Claude Code</span> (upload
            JSON)
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-6 sm:px-0">
            <Link
              href={`/${currentYear}/github`}
              className="relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition-all font-semibold text-base sm:text-lg md:text-xl shadow-2xl shadow-orange-500/50 hover:scale-105 transform animate-gradient bg-[length:200%_200%] hover:shadow-pink-500/50"
            >
              Try with GitHub
            </Link>
            <Link
              href={`/${currentYear}/upload?tab=claude-code`}
              className="relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 transition-all font-semibold text-base sm:text-lg md:text-xl hover:scale-105 transform"
            >
              Use Claude Code
            </Link>
          </div>

          {/* Privacy Badge */}
          <div className="mt-6 sm:mt-10 md:mt-12 flex items-center justify-center gap-2 text-[10px] sm:text-xs text-gray-400">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>100% secure · Your data never leaves your browser</span>
          </div>
        </div>
      </main>
    </div>
  )
}
