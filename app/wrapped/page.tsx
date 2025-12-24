"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatNumber, formatCost, YearStats } from "@/lib/parser";

export default function WrappedPage() {
  const [stats, setStats] = useState<YearStats | null>(null);
  const [tool, setTool] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const statsData = sessionStorage.getItem("wrappedStats");
    const selectedTool = sessionStorage.getItem("selectedTool");

    if (!statsData) {
      router.push("/upload");
      return;
    }

    try {
      const wrappedStats = JSON.parse(statsData);
      setStats(wrappedStats);
      setTool(selectedTool || "AI Coding Tool");
    } catch (error) {
      console.error("Error parsing stats:", error);
      router.push("/upload");
    }
  }, [router]);

  const calculateJoinedDaysAgo = () => {
    if (!stats || !stats.dailyData || stats.dailyData.length === 0) return 0;
    const firstDate = new Date(stats.dailyData[0].date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - firstDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const generateHeatmap = () => {
    if (!stats || !stats.dailyData) return [];

    // Create a map of dates to activity levels
    const activityMap = new Map<string, number>();
    const maxTokens = Math.max(...stats.dailyData.map(d => d.tokens));

    stats.dailyData.forEach(day => {
      const level = day.tokens > 0 ? Math.ceil((day.tokens / maxTokens) * 4) : 0;
      activityMap.set(day.date, level);
    });

    // Generate FULL YEAR - January 1 to December 31
    const year = stats.year;
    const firstDate = new Date(year, 0, 1); // January 1
    const lastDate = new Date(year, 11, 31); // December 31

    // Generate all dates in the full year
    const weeks: Array<Array<{ date: string; level: number }>> = [];
    let currentWeek: Array<{ date: string; level: number }> = [];

    const currentDate = new Date(firstDate);

    // Pad to start of week (Sunday)
    const startDay = currentDate.getDay();
    for (let i = 0; i < startDay; i++) {
      currentWeek.push({ date: "", level: 0 });
    }

    while (currentDate <= lastDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const level = activityMap.get(dateStr) || 0;

      currentWeek.push({ date: dateStr, level });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Add remaining days
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", level: 0 });
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const downloadImage = async () => {
    // TODO: Implement image download
    alert("Download feature coming soon!");
  };

  const copyToClipboard = async () => {
    if (!stats) return;
    const text = `🎉 My ${stats.year} AI Coding Wrapped!\n\n📊 ${formatNumber(stats.totalTokens)} tokens\n💰 ${formatCost(stats.totalCost)}\n📅 ${stats.activeDays} active days\n🔥 ${stats.longestStreak} day streak\n\nCreate yours at vibewrapped.com`;
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading your wrapped...</p>
        </div>
      </div>
    );
  }

  const heatmapWeeks = generateHeatmap();
  const joinedDaysAgo = calculateJoinedDaysAgo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 shadow-2xl">
          {/* Vertical Layout */}
          <div className="flex flex-col">
            {/* Row 1: Stats Content */}
            <div className="mb-8">
              {/* Header */}
              <div className="text-gray-400 text-lg font-light mb-12">
                Joined {joinedDaysAgo} Days Ago
              </div>

              {/* Models Section */}
              <div className="mb-12">
                <h2 className="text-gray-400 text-base font-light mb-4">Models</h2>
                <div className="space-y-2">
                  {stats.topModels.slice(0, 3).map((model, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="text-3xl font-light text-gray-500 w-8">
                        {index + 1}
                      </span>
                      <span className="text-2xl font-normal text-white">
                        {model.model}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-x-16 gap-y-8 mb-12">
                <div>
                  <div className="text-gray-400 text-base font-light mb-2">Agents</div>
                  <div className="text-5xl font-light">{formatNumber(stats.totalSessions)}</div>
                </div>

                <div>
                  <div className="text-gray-400 text-base font-light mb-2">Tabs</div>
                  <div className="text-5xl font-light">{stats.activeDays}</div>
                </div>

                <div>
                  <div className="text-gray-400 text-base font-light mb-2">Tokens</div>
                  <div className="text-5xl font-light">{formatNumber(stats.totalTokens)}</div>
                </div>

                <div>
                  <div className="text-gray-400 text-base font-light mb-2">Streak</div>
                  <div className="text-5xl font-light">{stats.longestStreak}d</div>
                </div>
              </div>

              {/* Branding */}
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.66 4.46L17.5 1.29c-.39-.39-1.02-.39-1.41 0L14.68 2.7l4.24 4.24 1.41-1.41c.39-.39.39-1.02 0-1.41l-1.67-1.67zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                </svg>
                <span className="text-base font-light">vibewrapped.com/{stats.year}</span>
              </div>
            </div>

            {/* Row 2: Horizontal Heatmap */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-[3px] flex-shrink-0">
                {heatmapWeeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px] flex-shrink-0">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`w-[11px] h-[11px] rounded-[2px] flex-shrink-0 ${
                          day.level === 0
                            ? "bg-gray-700/30"
                            : day.level === 1
                            ? "bg-orange-400/40"
                            : day.level === 2
                            ? "bg-orange-400/60"
                            : day.level === 3
                            ? "bg-orange-500/80"
                            : "bg-orange-500"
                        }`}
                        title={day.date}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={downloadImage}
              className="px-8 py-3 rounded-full bg-white text-black font-medium text-base hover:bg-gray-100 transition-colors shadow-lg"
            >
              Download
            </button>
            <button
              onClick={copyToClipboard}
              className="px-8 py-3 rounded-full bg-gray-700/50 text-white font-medium text-base hover:bg-gray-700 transition-colors"
            >
              Copy
            </button>
            <Link
              href="/upload"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-medium text-base hover:from-orange-600 hover:to-pink-700 transition-colors shadow-lg shadow-orange-500/30"
            >
              Create New
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
