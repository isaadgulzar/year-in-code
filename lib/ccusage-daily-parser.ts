// Parser for ccusage daily JSON output format (works with published version)
import { YearStats } from "./parser";

export interface CcusageDailyJsonOutput {
  daily: Array<{
    date: string;
    inputTokens: number;
    outputTokens: number;
    cacheCreationTokens: number;
    cacheReadTokens: number;
    totalTokens: number;
    totalCost: number;
    modelsUsed: string[];
    modelBreakdowns?: Array<{
      modelName: string;
      inputTokens: number;
      outputTokens: number;
      cacheCreationTokens: number;
      cacheReadTokens: number;
      cost: number;
    }>;
    project?: string;
  }>;
  totals: {
    inputTokens: number;
    outputTokens: number;
    cacheCreationTokens: number;
    cacheReadTokens: number;
    totalTokens: number;
    totalCost: number;
  };
}

export function parseCcusageDailyJson(json: CcusageDailyJsonOutput): YearStats {
  console.log("[Ccusage Daily Parser] Parsing ccusage daily JSON output");

  if (!json.daily || json.daily.length === 0) {
    throw new Error("No daily data found in ccusage output");
  }

  // Convert daily data
  const dailyData = json.daily.map(day => ({
    date: day.date,
    tokens: day.totalTokens,
    cost: day.totalCost,
    models: new Map<string, number>(),
  }));

  // Calculate year from first date
  const year = new Date(json.daily[0].date).getFullYear();

  // Calculate streaks
  const sortedDates = json.daily.map(d => d.date).sort();
  let longestStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      currentStreak = 1;
    } else {
      const prev = new Date(sortedDates[i - 1]);
      const curr = new Date(sortedDates[i]);
      const diffDays = Math.floor(
        (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  // Check if current streak extends to today
  const lastDate = new Date(sortedDates[sortedDates.length - 1]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  lastDate.setHours(0, 0, 0, 0);
  const daysSinceLastUse = Math.floor(
    (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // If last use was today or yesterday, keep current streak, otherwise reset to 0
  const activeCurrentStreak = daysSinceLastUse <= 1 ? currentStreak : 0;

  // Aggregate model usage from all days
  const modelMap = new Map<string, number>();
  for (const day of json.daily) {
    if (day.modelBreakdowns && day.modelBreakdowns.length > 0) {
      for (const breakdown of day.modelBreakdowns) {
        // Skip if modelName is undefined or null
        if (!breakdown.modelName) continue;

        const currentTokens = modelMap.get(breakdown.modelName) || 0;
        modelMap.set(breakdown.modelName, currentTokens + breakdown.inputTokens + breakdown.outputTokens + breakdown.cacheCreationTokens + breakdown.cacheReadTokens);
      }
    } else if (day.modelsUsed && day.modelsUsed.length > 0) {
      // Fallback to modelsUsed if no breakdowns
      for (const model of day.modelsUsed) {
        // Skip if model is undefined or null
        if (!model) continue;

        const currentTokens = modelMap.get(model) || 0;
        modelMap.set(model, currentTokens + day.totalTokens / day.modelsUsed.length);
      }
    }
  }

  // Top models
  const topModels = Array.from(modelMap.entries())
    .filter(([model]) => model != null && model !== '') // Filter out null/undefined/empty models
    .map(([model, tokens]) => ({
      model: model.replace("claude-", "").replace(/-\d{8}/g, ""),
      tokens,
      percentage: json.totals.totalTokens > 0 ? (tokens / json.totals.totalTokens) * 100 : 0,
    }))
    .sort((a, b) => b.tokens - a.tokens)
    .slice(0, 5);

  // Find peak day
  const peakDayData = json.daily.reduce(
    (max, day) => (day.totalTokens > max.totalTokens ? day : max),
    json.daily[0]
  );

  const peakDay = new Date(peakDayData.date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Peak hour - not available in daily data
  const peakHour = undefined;

  console.log("[Ccusage Daily Parser] Parsed stats:", {
    totalTokens: json.totals.totalTokens,
    totalCost: json.totals.totalCost,
    activeDays: json.daily.length,
    longestStreak,
    currentStreak: activeCurrentStreak,
    topModels: topModels.map(m => m.model),
  });

  return {
    year,
    totalTokens: json.totals.totalTokens,
    totalCost: json.totals.totalCost,
    activeDays: json.daily.length,
    currentStreak: activeCurrentStreak,
    longestStreak,
    totalSessions: json.daily.length, // Approximate: one session per day
    topModels,
    dailyData,
    peakDay,
    peakHour,
  };
}
