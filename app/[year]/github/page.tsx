'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { fetchGitHubUserStats } from '@/lib/github-service'
import { parseGitHubStats } from '@/lib/github-parser'
import GitHubForm from '@/components/GitHubForm'

export default function GitHubPage() {
  const [githubUsername, setGithubUsername] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const params = useParams()
  const year = params.year as string

  const handleProcess = async () => {
    if (githubUsername.trim() === '') return

    setIsProcessing(true)

    try {
      console.log(`Fetching GitHub stats for: ${githubUsername}`)

      const githubStats = await fetchGitHubUserStats(
        githubUsername.trim(),
        parseInt(year)
      )
      const stats = parseGitHubStats(githubStats, parseInt(year))

      // Store the stats
      sessionStorage.setItem('wrappedStats', JSON.stringify(stats))
      sessionStorage.setItem('selectedTool', 'github')
      sessionStorage.setItem('githubUsername', githubUsername.trim())
      sessionStorage.setItem('wrappedYear', year)

      console.log('Navigating to report page with GitHub stats:', stats)
      router.push(
        `/${year}/report?tab=github&username=${encodeURIComponent(githubUsername.trim())}`
      )
    } catch (error) {
      console.error('Error processing:', error)
      toast.error(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check the username and try again.`,
        {
          style: {
            background: '#374151',
            color: '#fff',
            fontFamily: 'var(--font-jetbrains-mono)',
          },
          duration: 6000,
        }
      )
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{
          top: '4.8rem',
        }}
        toastOptions={{
          style: {
            minWidth: '390px',
            maxWidth: '650px',
          },
          error: {
            iconTheme: {
              primary: '#f97316',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] bg-linear-to-br from-gray-900 via-gray-800 to-black text-white flex items-start justify-center">
        <main className="flex-1 flex items-start justify-center px-2 sm:px-6 py-4">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Your wrapped report is{' '}
                <span className="bg-linear-to-br from-orange-400 to-pink-600 text-transparent bg-clip-text">
                  one click
                </span>{' '}
                away
              </h1>
              <p className="text-sm sm:text-base text-gray-400 mt-3">
                Find out how many years you&apos;ve been coding, your
                contributions, top languages, and more
              </p>
            </div>

            {/* GitHub Form */}
            <div className="mb-4">
              <GitHubForm
                githubUsername={githubUsername}
                setGithubUsername={setGithubUsername}
                onSubmit={handleProcess}
              />
            </div>

            {/* Process Button */}
            <div className="text-center">
              <button
                onClick={handleProcess}
                disabled={githubUsername.trim() === '' || isProcessing}
                className={`px-10 py-4 rounded-xl font-semibold text-lg transition-all inline-flex items-center justify-center gap-2 ${
                  githubUsername.trim() === '' || isProcessing
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg shadow-orange-500/50 hover:scale-105 transform'
                }`}
              >
                {isProcessing && (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isProcessing ? 'Processing...' : 'Generate My Wrapped'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
