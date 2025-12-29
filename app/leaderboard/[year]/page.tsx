'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface LeaderboardEntry {
  _id: string
  username: string
  avatarUrl?: string
  year: number
  yearsInCode: number
  totalContributions: number
  longestStreak: number
  totalStars: number
  topLanguages: string[]
  hasVerifiedBadge: boolean
  submittedAt: string
}

export default function LeaderboardPage() {
  const params = useParams()
  const router = useRouter()
  const year = params.year as string

  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('contributions')
  const [search, setSearch] = useState('')
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    fetchLeaderboard()
  }, [year, category, search])

  const fetchLeaderboard = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        year,
        category,
        ...(search && { search }),
      })

      const response = await fetch(`/api/leaderboard?${params}`)
      const data = await response.json()

      if (data.success) {
        setEntries(data.entries)
        setTotalCount(data.totalCount)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'contributions':
        return 'Total Contributions'
      case 'streak':
        return 'Longest Streak'
      case 'years':
        return 'Years in Code'
      case 'stars':
        return 'Total Stars'
      default:
        return 'Total Contributions'
    }
  }

  const getCategoryValue = (entry: LeaderboardEntry) => {
    switch (category) {
      case 'contributions':
        return entry.totalContributions.toLocaleString()
      case 'streak':
        return `${entry.longestStreak} days`
      case 'years':
        return `${entry.yearsInCode}${getOrdinalSuffix(entry.yearsInCode)} year`
      case 'stars':
        return entry.totalStars.toLocaleString()
      default:
        return entry.totalContributions.toLocaleString()
    }
  }

  const getOrdinalSuffix = (num: number) => {
    const j = num % 10
    const k = num % 100
    if (j === 1 && k !== 11) return 'st'
    if (j === 2 && k !== 12) return 'nd'
    if (j === 3 && k !== 13) return 'rd'
    return 'th'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block mb-4 text-purple-600 hover:text-purple-700"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Leaderboard {year}
          </h1>
          <p className="text-gray-600">
            {totalCount.toLocaleString()} developers competing
          </p>
        </div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {['contributions', 'streak', 'years', 'stars'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    category === cat
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search by username..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading leaderboard...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-xl text-gray-600 mb-4">
                {search
                  ? 'No users found'
                  : 'Be the first to join the leaderboard!'}
              </p>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Generate Your Wrap →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, index) => (
                <div
                  key={entry._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4"
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 text-center">
                      {index < 3 ? (
                        <span className="text-2xl">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </span>
                      ) : (
                        <span className="text-lg font-bold text-gray-400">
                          #{index + 1}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    {entry.avatarUrl && (
                      <img
                        src={entry.avatarUrl}
                        alt={entry.username}
                        className="w-12 h-12 rounded-full"
                      />
                    )}

                    {/* Info */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://github.com/${entry.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-900 hover:text-purple-600"
                        >
                          @{entry.username}
                        </a>
                        {entry.hasVerifiedBadge && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {entry.topLanguages.slice(0, 3).join(', ')}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        {getCategoryValue(entry)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {entry.yearsInCode}
                        {getOrdinalSuffix(entry.yearsInCode)} year developer
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Want a Verified Badge?</h2>
            <p className="text-gray-700 mb-4">
              Get a permanent verified badge for your portfolio or GitHub README
            </p>
            <a
              href="https://app.yearincode.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Get Verified Badge - $4.99 →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
