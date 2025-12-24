"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { parseClaudeCodeData, formatNumber, formatCost, YearStats } from "@/lib/parser";

export default function WrappedPage() {
  const [stats, setStats] = useState<YearStats | null>(null);
  const [tool, setTool] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem("wrappedData");
    const selectedTool = sessionStorage.getItem("selectedTool");

    if (!data) {
      router.push("/upload");
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      const wrappedStats = parseClaudeCodeData(parsedData);
      setStats(wrappedStats);
      setTool(selectedTool || "AI Coding Tool");
    } catch (error) {
      console.error("Error parsing data:", error);
      router.push("/upload");
    }
  }, [router]);

  const shareToTwitter = () => {
    if (!stats) return;

    const text = `I used ${formatNumber(stats.totalTokens)} tokens with my AI coding assistant in ${stats.year}! 🚀\n\n📊 ${stats.activeDays} active days\n🔥 ${stats.longestStreak} day streak\n💰 ${formatCost(stats.totalCost)} invested in AI coding\n\nCreate your own at vibewrapped.com`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const downloadHTML = () => {
    if (!stats) return;

    const html = generateHTMLReport(stats, tool);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${stats.year}-wrapped.html`;
    a.click();
    URL.revokeObjectURL(url);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-600 text-transparent bg-clip-text cursor-pointer">
              VibeWrapped
            </h1>
          </Link>
          <div className="flex gap-4">
            <button
              onClick={shareToTwitter}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors font-medium"
            >
              Share on 𝕏
            </button>
            <button
              onClick={downloadHTML}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors font-medium"
            >
              Download HTML
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {stats.year} <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">Wrapped</span>
          </h1>
          <p className="text-2xl text-gray-400">Your year in AI-powered coding</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-colors">
            <div className="text-sm text-gray-400 uppercase mb-2">Total Tokens</div>
            <div className="text-4xl font-bold text-orange-400">{formatNumber(stats.totalTokens)}</div>
            <div className="text-sm text-gray-500 mt-1">tokens</div>
          </div>

          <div className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-colors">
            <div className="text-sm text-gray-400 uppercase mb-2">Total Cost</div>
            <div className="text-4xl font-bold text-pink-400">{formatCost(stats.totalCost)}</div>
            <div className="text-sm text-gray-500 mt-1">USD</div>
          </div>

          <div className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-colors">
            <div className="text-sm text-gray-400 uppercase mb-2">Active Days</div>
            <div className="text-4xl font-bold text-purple-400">{stats.activeDays}</div>
            <div className="text-sm text-gray-500 mt-1">days</div>
          </div>

          <div className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-colors">
            <div className="text-sm text-gray-400 uppercase mb-2">Longest Streak</div>
            <div className="text-4xl font-bold text-red-400">{stats.longestStreak} 🔥</div>
            <div className="text-sm text-gray-500 mt-1">days</div>
          </div>
        </div>

        {/* Top Models */}
        {stats.topModels.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">🤖 Your AI Assistants</h2>
            <div className="space-y-4">
              {stats.topModels.map((model, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-orange-400">#{index + 1}</div>
                      <div>
                        <div className="text-xl font-semibold">{model.model}</div>
                        <div className="text-gray-400">{formatNumber(model.tokens)} tokens</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-orange-400">
                      {model.percentage.toFixed(1)}%
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-900/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-pink-600 h-full"
                      style={{ width: `${model.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">✨ Insights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="text-lg font-semibold mb-2">Most Active Day</div>
              <div className="text-3xl font-bold text-orange-400">{stats.peakDay}</div>
            </div>

            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="text-lg font-semibold mb-2">Average Daily Cost</div>
              <div className="text-3xl font-bold text-pink-400">
                {formatCost(stats.totalCost / stats.activeDays)}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-12 rounded-2xl bg-gradient-to-r from-orange-500/10 to-pink-600/10 border border-orange-500/20">
          <h3 className="text-3xl font-bold mb-4">Want to create your own?</h3>
          <p className="text-xl text-gray-400 mb-6">
            Upload your AI coding data and get beautiful insights
          </p>
          <Link
            href="/upload"
            className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 transition-all font-semibold text-lg shadow-lg shadow-orange-500/50"
          >
            Create Your Wrapped
          </Link>
        </div>
      </main>
    </div>
  );
}

function generateHTMLReport(stats: YearStats, tool: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${stats.year} AI Coding Wrapped</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
            color: #e0e0e0;
            padding: 40px 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; background: #252525; border-radius: 16px; padding: 40px; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { font-size: 3em; margin-bottom: 10px; background: linear-gradient(135deg, #ff8c42, #ff6b35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
        .stat-card { background: #1e1e1e; padding: 25px; border-radius: 12px; border: 1px solid #3a3a3a; }
        .stat-label { font-size: 0.9em; color: #999; margin-bottom: 8px; text-transform: uppercase; }
        .stat-value { font-size: 2em; font-weight: 700; color: #ff8c42; }
        .stat-unit { font-size: 0.85em; color: #bbb; margin-top: 5px; }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 ${stats.year} Wrapped</h1>
            <p style="font-size: 1.5em; color: #999;">Your year in AI-powered coding</p>
        </div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Total Tokens</div>
                <div class="stat-value">${formatNumber(stats.totalTokens)}</div>
                <div class="stat-unit">tokens</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Cost</div>
                <div class="stat-value">${formatCost(stats.totalCost)}</div>
                <div class="stat-unit">USD</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Active Days</div>
                <div class="stat-value">${stats.activeDays}</div>
                <div class="stat-unit">days</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Longest Streak</div>
                <div class="stat-value">${stats.longestStreak} 🔥</div>
                <div class="stat-unit">days</div>
            </div>
        </div>
        <div style="text-align: center; padding: 40px; color: #666;">
            <p>Generated with <strong>VibeWrapped</strong> - vibewrapped.com</p>
        </div>
    </div>
</body>
</html>`;
}
