import { YearStats, DailyStats } from './parser'
import { GitHubUserStats } from './github-service'

/**
 * Converts GitHub user stats to YearStats format for consistent display
 */
export function parseGitHubStats(
  githubStats: GitHubUserStats,
  requestedYear?: number
): YearStats {
  // Convert contribution days to daily stats
  const dailyData: DailyStats[] = githubStats.contributionDays.map(day => ({
    date: day.date,
    tokens: day.count, // Using contributions as "tokens"
    cost: 0, // GitHub doesn't have cost
    models: new Map(), // Will use languages instead
  }))

  // Sort by date
  dailyData.sort((a, b) => a.date.localeCompare(b.date))

  // Use the requested year if provided, otherwise get from data
  const year =
    requestedYear ||
    (dailyData[0]?.date
      ? new Date(dailyData[0].date).getFullYear()
      : new Date().getFullYear())

  // Convert top languages to top models format
  const topModels = githubStats.topLanguages.map(lang => ({
    model: lang.name,
    tokens: Math.round(
      (lang.percentage / 100) * githubStats.totalContributions
    ),
    percentage: lang.percentage,
  }))

  // If no languages, add a placeholder
  if (topModels.length === 0) {
    topModels.push({
      model: 'N/A',
      tokens: 0,
      percentage: 0,
    })
  }

  // Count active days (days with contributions > 0)
  const activeDays = dailyData.filter(day => day.tokens > 0).length

  return {
    year,
    totalTokens: githubStats.totalContributions,
    totalCost: 0, // GitHub doesn't have cost
    activeDays,
    currentStreak: githubStats.currentStreak,
    longestStreak: githubStats.longestStreak,
    totalSessions: activeDays, // Using active days as sessions
    topModels,
    dailyData,
    peakDay: githubStats.mostActiveDay,
    peakHour: undefined, // GitHub doesn't provide hourly data
    mostActiveMonth: githubStats.mostActiveMonth,
    mostActiveDay: githubStats.mostActiveDay,
    totalStars: githubStats.totalStars,
    yearsOfCoding: githubStats.yearsOfCoding,
  }
}
