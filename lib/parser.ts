// Reused from ccusage with modifications for client-side use

export interface UsageEntry {
  timestamp: string;
  modelName?: string;
  inputTokens?: number;
  outputTokens?: number;
  cacheCreationTokens?: number;
  cacheReadTokens?: number;
  costUSD?: number;
}

export interface DailyStats {
  date: string;
  tokens: number;
  cost: number;
  models: Map<string, number>;
}

export interface YearStats {
  year: number;
  totalTokens: number;
  totalCost: number;
  activeDays: number;
  longestStreak: number;
  topModels: Array<{ model: string; tokens: number; percentage: number }>;
  dailyData: DailyStats[];
  peakDay: string;
}

export function parseClaudeCodeData(entries: any[]): YearStats {
  const dailyMap = new Map<string, DailyStats>();
  const modelMap = new Map<string, number>();
  let totalTokens = 0;
  let totalCost = 0;

  // Process each entry
  for (const entry of entries) {
    try {
      const timestamp = entry.timestamp || entry.createdAt || "";
      if (!timestamp) continue;

      const date = timestamp.split("T")[0]; // YYYY-MM-DD
      if (!date) continue;

      const inputTokens = entry.inputTokens || entry.input_tokens || 0;
      const outputTokens = entry.outputTokens || entry.output_tokens || 0;
      const cacheCreation = entry.cacheCreationTokens || entry.cache_creation_tokens || 0;
      const cacheRead = entry.cacheReadTokens || entry.cache_read_tokens || 0;
      const cost = entry.costUSD || entry.cost || 0;
      const model = entry.modelName || entry.model || "unknown";

      const tokens = inputTokens + outputTokens + cacheCreation + cacheRead;

      // Update daily stats
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date,
          tokens: 0,
          cost: 0,
          models: new Map(),
        });
      }

      const dayStats = dailyMap.get(date)!;
      dayStats.tokens += tokens;
      dayStats.cost += cost;
      dayStats.models.set(model, (dayStats.models.get(model) || 0) + tokens);

      // Update model stats
      modelMap.set(model, (modelMap.get(model) || 0) + tokens);

      // Update totals
      totalTokens += tokens;
      totalCost += cost;
    } catch (error) {
      console.warn("Failed to parse entry:", error);
    }
  }

  // Convert to arrays and sort
  const dailyData = Array.from(dailyMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  // Calculate streaks
  let longestStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < dailyData.length; i++) {
    if (i === 0) {
      currentStreak = 1;
    } else {
      const prev = new Date(dailyData[i - 1].date);
      const curr = new Date(dailyData[i].date);
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

  // Top models
  const topModels = Array.from(modelMap.entries())
    .map(([model, tokens]) => ({
      model: model.replace("claude-", "").replace(/-\d{8}/g, ""),
      tokens,
      percentage: (tokens / totalTokens) * 100,
    }))
    .sort((a, b) => b.tokens - a.tokens)
    .slice(0, 5);

  // Find peak day
  const peakDayData = dailyData.reduce((max, day) =>
    day.tokens > max.tokens ? day : max
  , dailyData[0] || { date: "", tokens: 0 });

  const peakDay = peakDayData.date
    ? new Date(peakDayData.date).toLocaleDateString("en-US", { weekday: "long" })
    : "Unknown";

  const year = dailyData[0]?.date ? new Date(dailyData[0].date).getFullYear() : new Date().getFullYear();

  return {
    year,
    totalTokens,
    totalCost,
    activeDays: dailyData.length,
    longestStreak,
    topModels,
    dailyData,
    peakDay,
  };
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatCost(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
