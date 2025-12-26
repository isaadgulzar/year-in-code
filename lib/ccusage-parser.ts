// Parser for ccusage JSON output format
import { YearStats } from './parser'

export interface CcusageJsonOutput {
  year: number
  stats: {
    year: number
    totalTokens: {
      input: number
      output: number
      cache_creation: number
      cache_read: number
      total: number
    }
    totalCost: number
    activeDays: number
    currentStreak: number
    longestStreak: number
    totalSessions: number
    modelBreakdown: Array<{
      model: string
      tokens: number
      percentage: number
      cost: number
    }>
    monthlyTrend: Array<{
      month: string
      tokens: number
      cost: number
    }>
    dailyActivity: Record<
      string,
      {
        date: string
        tokens: number
        level: number
      }
    >
    topProjects: Array<{
      project: string
      tokens: number
    }>
    peakHour: number
    peakDayOfWeek: string
  }
}

export function parseCcusageJson(json: CcusageJsonOutput): YearStats {
  console.log('[Ccusage Parser] Parsing ccusage JSON output')

  const stats = json.stats

  // Convert dailyActivity object to array
  const dailyData = Object.values(stats.dailyActivity).map(day => ({
    date: day.date,
    tokens: day.tokens,
    cost: 0, // Not in ccusage output
    models: new Map<string, number>(),
  }))

  // Top models from modelBreakdown
  const topModels = stats.modelBreakdown.slice(0, 5).map(model => ({
    model: model.model.replace('claude-', '').replace(/-\d{8}/g, ''),
    tokens: model.tokens,
    percentage: model.percentage || 0,
  }))

  console.log('[Ccusage Parser] Parsed stats:', {
    totalTokens: stats.totalTokens.total,
    totalCost: stats.totalCost,
    activeDays: stats.activeDays,
    topModels: topModels.map(m => m.model),
  })

  return {
    year: stats.year,
    totalTokens: stats.totalTokens.total,
    totalCost: stats.totalCost,
    activeDays: stats.activeDays,
    currentStreak: stats.currentStreak,
    longestStreak: stats.longestStreak,
    totalSessions: stats.totalSessions,
    topModels,
    dailyData,
    peakDay: stats.peakDayOfWeek,
    peakHour: stats.peakHour,
  }
}
