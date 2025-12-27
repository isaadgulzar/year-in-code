'use client'

import { useEffect, useRef } from 'react'

interface GitHubFormProps {
  githubUsername: string
  setGithubUsername: (username: string) => void
  onSubmit?: () => void
}

export default function GitHubForm({
  githubUsername,
  setGithubUsername,
  onSubmit,
}: GitHubFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus input after mount to avoid hydration mismatch
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && githubUsername.trim() !== '' && onSubmit) {
      onSubmit()
    }
  }

  return (
    <div className="mt-2 sm:mt-4 p-3 sm:p-4 rounded-lg bg-gray-800/50 border border-gray-700">
      <h3 className="font-semibold mb-4 text-orange-400 text-sm sm:text-base">
        🐙 Enter Your GitHub Username:
      </h3>

      <div className="space-y-3">
        <div className="bg-linear-to-r from-orange-500/10 to-pink-600/10 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <div className="shrink-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white text-xs">
              1
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white mb-3 text-sm">
                Enter your GitHub username:
              </p>
              <input
                ref={inputRef}
                type="text"
                value={githubUsername}
                onChange={e => setGithubUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., isaadgulzar"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors text-sm"
              />
              <p className="text-gray-400 text-xs mt-2">
                💡 Make sure your GitHub profile is public to generate your
                wrapped
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
