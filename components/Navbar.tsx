'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 h-16 md:h-20 flex items-center border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="Year in Code Logo"
              width={96}
              height={48}
              className="h-8 sm:h-12 w-auto"
              priority
            />
          </Link>

          {/* Right side - Twitter, GitHub & Product Hunt */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Twitter Card */}
            <a
              href="https://x.com/isaadgulzar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 py-1.5 md:px-4 md:py-2.5 rounded-xl bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 transition-all hover:scale-105"
            >
              <Image
                src="/avatar.jpg"
                alt="Saad Gulzar"
                width={20}
                height={20}
                className="w-5 h-5 md:w-6 md:h-6 rounded-full border-[1.5] border-[#34d399]"
              />
              <span className="text-sm font-medium text-gray-300 hover:text-white hidden sm:inline">
                Built by @isaadgulzar
              </span>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/isaadgulzar/year-in-code"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 py-1.5 md:px-4 md:py-2.5 rounded-xl bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 transition-all hover:scale-105 group"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white hidden md:inline">
                View on GitHub
              </span>
            </a>

            {/* Product Hunt Badge */}
            <a
              href="https://www.producthunt.com/products/year-in-code?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-year-in-code"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-105"
            >
              <Image
                alt="Year in Code - Spotify Wrapped for your claude coding year! | Product Hunt"
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1054833&theme=light&t=1766825284609"
                width={250}
                height={54}
                className="h-8 md:h-11 w-auto"
                unoptimized
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
