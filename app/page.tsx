"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center overflow-hidden">
      <main className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 flex flex-col items-center gap-4">
            <Image
              src="/logo.png"
              alt="Year in Code Logo"
              width={400}
              height={200}
              className="w-24 h-auto md:w-36 md:h-auto inline-block ml-4"
              priority
            />
            <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium border border-orange-500/20">
              Claude Code Year in Review
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Visualize your
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              {" "}year in code
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto font-light">
            Transform your Claude Code sessions into a stunning year-end report. See your growth, celebrate your wins, and share your journey.
          </p>

          <div className="flex justify-center">
            <Link
              href={`/${currentYear}/upload`}
              className="px-12 py-5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 transition-all font-semibold text-xl shadow-2xl shadow-orange-500/50 hover:scale-105 transform"
            >
              Generate Your Wrapped
            </Link>
          </div>

          {/* Privacy Badge */}
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>100% private · Your data never leaves your browser</span>
          </div>
        </div>
      </main>
    </div>
  );
}
