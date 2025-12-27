export interface GitHubContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubUserStats {
  username: string
  totalContributions: number
  longestStreak: number
  currentStreak: number
  contributionDays: GitHubContributionDay[]
  topLanguages: Array<{ name: string; percentage: number }>
  totalStars: number
  totalCommits: number
  mostActiveDay: string
  mostActiveMonth: string
  firstCommitDate?: string
  yearsOfCoding?: number
}

export async function fetchGitHubUserStats(
  username: string,
  year: number
): Promise<GitHubUserStats> {
  try {
    // Fetch ALL years of contribution data to find first commit date
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub data: ${response.statusText}`)
    }

    const data = await response.json()

    // Parse ALL contribution data (all years)
    const allContributionDays: GitHubContributionDay[] = []
    const yearContributionDays: GitHubContributionDay[] = []
    let totalContributions = 0

    // Process contributions
    if (data.contributions) {
      data.contributions.forEach((contribution: any) => {
        const contributionDate = new Date(contribution.date)
        const contributionYear = contributionDate.getFullYear()

        // Add to all contributions for first commit calculation
        allContributionDays.push({
          date: contribution.date,
          count: contribution.count,
          level: contribution.level || 0,
        })

        // Filter for specific year for stats display
        if (contributionYear === year) {
          yearContributionDays.push({
            date: contribution.date,
            count: contribution.count,
            level: contribution.level || 0,
          })
          totalContributions += contribution.count
        }
      })
    }

    // Calculate streaks for the specific year
    const { longestStreak, currentStreak } =
      calculateStreaks(yearContributionDays)

    // Find most active day and month for the specific year
    const mostActiveDay = findMostActiveDay(yearContributionDays)
    const mostActiveMonth = findMostActiveMonth(yearContributionDays)

    // Find first commit date from ALL years (earliest date with contributions > 0)
    const firstCommitDay = allContributionDays
      .filter(day => day.count > 0)
      .sort((a, b) => a.date.localeCompare(b.date))[0]

    const firstCommitDate = firstCommitDay?.date

    // Calculate years of coding from first commit to now
    // This shows "Xth Year In Code" on the report
    // Count actual full years that have passed
    let yearsOfCoding = 0
    if (firstCommitDate) {
      const firstDate = new Date(firstCommitDate)
      const now = new Date()

      // Calculate the difference in milliseconds
      const diffMs = now.getTime() - firstDate.getTime()
      // Convert to years (accounting for leap years approximately)
      const years = diffMs / (1000 * 60 * 60 * 24 * 365.25)

      // Round up to get "Xth year" (someone in their 5th year has completed 4+ years)
      yearsOfCoding = Math.ceil(years)
    }

    // For now, we'll fetch languages separately if needed
    // This is a placeholder - you might want to implement this using GitHub's API
    const topLanguages = await fetchTopLanguages(username)

    // Fetch total stars
    const totalStars = await fetchTotalStars(username)

    return {
      username,
      totalContributions,
      longestStreak,
      currentStreak,
      contributionDays: yearContributionDays, // Show specific year's data
      topLanguages,
      totalStars,
      totalCommits: totalContributions, // Simplified
      mostActiveDay,
      mostActiveMonth,
      firstCommitDate,
      yearsOfCoding,
    }
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    throw error
  }
}

function calculateStreaks(days: GitHubContributionDay[]): {
  longestStreak: number
  currentStreak: number
} {
  let longestStreak = 0
  let currentStreak = 0
  let tempStreak = 0

  const sortedDays = [...days].sort((a, b) => a.date.localeCompare(b.date))

  for (let i = 0; i < sortedDays.length; i++) {
    if (sortedDays[i].count > 0) {
      if (i === 0) {
        tempStreak = 1
      } else {
        const prevDate = new Date(sortedDays[i - 1].date)
        const currDate = new Date(sortedDays[i].date)
        const diffDays = Math.floor(
          (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        )

        if (diffDays === 1 && sortedDays[i - 1].count > 0) {
          tempStreak++
        } else {
          longestStreak = Math.max(longestStreak, tempStreak)
          tempStreak = 1
        }
      }
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 0
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak)

  // Calculate current streak (from today backwards)
  const today = new Date()
  for (let i = sortedDays.length - 1; i >= 0; i--) {
    const dayDate = new Date(sortedDays[i].date)
    if (sortedDays[i].count > 0 && dayDate <= today) {
      currentStreak++
      today.setDate(today.getDate() - 1)
    } else if (sortedDays[i].count === 0) {
      break
    }
  }

  return { longestStreak, currentStreak }
}

function findMostActiveDay(days: GitHubContributionDay[]): string {
  const dayOfWeekCounts = new Map<string, number>()
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  days.forEach(day => {
    const date = new Date(day.date)
    const dayName = daysOfWeek[date.getDay()]
    dayOfWeekCounts.set(
      dayName,
      (dayOfWeekCounts.get(dayName) || 0) + day.count
    )
  })

  let maxDay = 'Monday'
  let maxCount = 0

  dayOfWeekCounts.forEach((count, day) => {
    if (count > maxCount) {
      maxCount = count
      maxDay = day
    }
  })

  return maxDay
}

function findMostActiveMonth(days: GitHubContributionDay[]): string {
  const monthCounts = new Map<string, number>()
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  days.forEach(day => {
    const date = new Date(day.date)
    const monthName = months[date.getMonth()]
    monthCounts.set(monthName, (monthCounts.get(monthName) || 0) + day.count)
  })

  let maxMonth = 'January'
  let maxCount = 0

  monthCounts.forEach((count, month) => {
    if (count > maxCount) {
      maxCount = count
      maxMonth = month
    }
  })

  return maxMonth
}

async function fetchTopLanguages(
  username: string
): Promise<Array<{ name: string; percentage: number }>> {
  try {
    // Fetch user's repositories
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    )

    if (!response.ok) {
      return []
    }

    const repos = await response.json()

    // Count languages
    const languageCounts = new Map<string, number>()

    for (const repo of repos) {
      if (repo.language) {
        languageCounts.set(
          repo.language,
          (languageCounts.get(repo.language) || 0) + 1
        )
      }
    }

    // Convert to array and calculate percentages
    const total = Array.from(languageCounts.values()).reduce(
      (sum, count) => sum + count,
      0
    )

    const topLanguages = Array.from(languageCounts.entries())
      .map(([name, count]) => ({
        name,
        percentage: (count / total) * 100,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5)

    return topLanguages
  } catch (error) {
    console.error('Error fetching languages:', error)
    return []
  }
}

async function fetchTotalStars(username: string): Promise<number> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`
    )

    if (!response.ok) {
      return 0
    }

    const repos = await response.json()

    return repos.reduce(
      (total: number, repo: any) => total + (repo.stargazers_count || 0),
      0
    )
  } catch (error) {
    console.error('Error fetching stars:', error)
    return 0
  }
}
