"use client";

import Link from "next/link";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-start justify-center overflow-y-auto">
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 pt-8 md:pt-12 pb-8">
        <div className="w-full max-w-5xl text-center">
          <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-orange-500/10 text-orange-400 text-xs sm:text-sm font-medium border border-orange-500/20">
              Claude Code Year in Review
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
          Generate Your
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              {" "}2025{" "}
            </span>
            Wrapped
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto font-light px-4">
            Transform your Claude Code sessions into a stunning year-end report. See your growth, celebrate your wins, and share your journey.
          </p>

          <div className="flex justify-center">
            <Link
              href={`/${currentYear}/upload`}
              className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 transition-all font-semibold text-base sm:text-lg md:text-xl shadow-2xl shadow-orange-500/50 hover:scale-105 transform"
            >
              Generate Your Wrapped
            </Link>
          </div>

          {/* Privacy Badge */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>100% secure · Your data never leaves your browser</span>
          </div>
        </div>
      </main>
    </div>
  );
}
