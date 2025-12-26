import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold mb-3 sm:mb-4 leading-none">
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
                404
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Page not found
            </p>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto font-light px-4">
            Looks like this page took an unexpected detour. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 transition-all font-semibold text-base sm:text-lg md:text-xl shadow-2xl shadow-orange-500/50 hover:scale-105 transform"
            >
              Go Home
            </Link>
            <Link
              href={`/${new Date().getFullYear()}/upload`}
              className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-all font-semibold text-base sm:text-lg md:text-xl hover:scale-105 transform"
            >
              Generate Wrapped
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 sm:mt-14 md:mt-16 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error code: 404</span>
          </div>
        </div>
      </main>
    </div>
  );
}
