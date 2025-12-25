"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toPng } from "html-to-image";
import toast, { Toaster } from "react-hot-toast";
import { formatNumber, formatCost, YearStats } from "@/lib/parser";

export default function ReportPage() {
  const [stats, setStats] = useState<YearStats | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [currentDomain, setCurrentDomain] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const year = params.year as string;

  useEffect(() => {
    const statsData = sessionStorage.getItem("wrappedStats");

    if (!statsData) {
      router.push(`/${year}/upload`);
      return;
    }

    try {
      const wrappedStats = JSON.parse(statsData);
      setStats(wrappedStats);
    } catch (error) {
      console.error("Error parsing stats:", error);
      router.push(`/${year}/upload`);
    }

    // Get current domain
    setCurrentDomain(window.location.host);
  }, [router, year]);

  const formatModelName = (model: string) => {
    // Handle common model name patterns
    // Examples: "sonnet-4-5" -> "Sonnet 4.5", "haiku-4-5" -> "Haiku 4.5"
    return model
      .split('-')
      .map((part, index) => {
        // Capitalize first part (model name)
        if (index === 0) {
          return part.charAt(0).toUpperCase() + part.slice(1);
        }
        // Join version numbers with dots
        return part;
      })
      .join(' ')
      .replace(/(\d+)\s+(\d+)/g, '$1.$2'); // Convert "4 5" to "4.5"
  };

  const getTokenQuote = (tokens: number) => {
    if (tokens >= 1000000) {
      return "Agents run on tokens. Millions of them were yours.";
    } else if (tokens >= 1000) {
      return "Agents run on tokens. Thousands of them were yours.";
    } else {
      return "Agents run on tokens. Hundreds of them were yours.";
    }
  };

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

    // Generate heatmap organized by MONTHS (12 columns)
    const year = stats.year;
    const months: Array<Array<{ date: string; level: number }>> = [];

    // For each month (0-11)
    for (let month = 0; month < 12; month++) {
      const monthData: Array<{ date: string; level: number }> = [];
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // For each day in the month (1-31)
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        const level = activityMap.get(dateStr) || 0;

        monthData.push({ date: dateStr, level });
      }

      months.push(monthData);
    }

    return months;
  };

  const downloadImage = async () => {
    if (!cardRef.current || isDownloading) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#1f2937',
      });

      const link = document.createElement('a');
      link.download = `${stats?.year || '2025'}-cc-wrapped-preview-image.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Failed to download image. Please try again.', {
        style: {
          background: '#374151',
          color: '#fff',
          fontFamily: 'var(--font-jetbrains-mono)',
        },
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!cardRef.current || isCopying) return;

    setIsCopying(true);
    try {
      const blob = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#1f2937',
      }).then(dataUrl => {
        return fetch(dataUrl).then(res => res.blob());
      });

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);

      toast.success('Image copied to clipboard!', {
        style: {
          background: '#374151',
          color: '#fff',
          fontFamily: 'var(--font-jetbrains-mono)',
        },
        iconTheme: {
          primary: '#f97316',
          secondary: '#fff',
        },
      });
    } catch (error) {
      console.error('Error copying image:', error);
      toast.error('Failed to copy image. Please try again.', {
        style: {
          background: '#374151',
          color: '#fff',
          fontFamily: 'var(--font-jetbrains-mono)',
        },
      });
    } finally {
      setIsCopying(false);
    }
  };

  const shareOnX = async () => {
    if (!cardRef.current || isSharing) return;

    setIsSharing(true);
    try {
      // Step 1: Copy the image to clipboard
      const blob = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#1f2937',
      }).then(dataUrl => {
        return fetch(dataUrl).then(res => res.blob());
      });

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);

      // Step 2: Show toast with instructions
      toast.success('Image copied! Paste it in your tweet (Ctrl/Cmd+V)', {
        duration: 5000,
        style: {
          background: '#374151',
          color: '#fff',
          fontFamily: 'var(--font-jetbrains-mono)',
          minWidth: '550px',
        },
        iconTheme: {
          primary: '#f97316',
          secondary: '#fff',
        },
      });

      // Step 3: Open Twitter in new tab after 2.5s delay (gives user time to read toast)
      setTimeout(() => {
        const text = encodeURIComponent(
          `Just checked my ${stats?.year} AI coding year!\n\n🔥 ${formatNumber(stats?.totalTokens || 0)} tokens used\n🎯 ${stats?.longestStreak || 0} day streak\n⚡ Top model: ${formatModelName(stats?.topModels[0]?.model || 'N/A')}\n\nCheck yours at yearincode.xyz/${stats?.year}\n\n#YearInCode #ClaudeCode #BuildInPublic`
        );

        const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;

        window.open(twitterUrl, '_blank');
      }, 2000);

    } catch (error) {
      console.error('Error preparing to share:', error);
      toast.error('Failed to copy image. Please try again.', {
        style: {
          background: '#374151',
          color: '#fff',
          fontFamily: 'var(--font-jetbrains-mono)',
        },
      });
    } finally {
      setIsSharing(false);
    }
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-white">Loading your report...</p>
        </div>
      </div>
    );
  }

  const heatmapMonths = generateHeatmap();
  const joinedDaysAgo = calculateJoinedDaysAgo();

  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{
          top: '5.8rem',
        }}
      />
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-8 overflow-auto">
        <div className="w-full" style={{ maxWidth: "540px" }}>
        {/* Main Summary Card */}
        <div
          ref={cardRef}
          className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl mb-6"
        >
          <div className="flex gap-8">
            {/* Left Column - Stats Content */}
            <div className="flex-1 flex flex-col justify-between">
              {/* Header */}
              <div className="mb-6">
                <p className="text-lg text-gray-400 mb-8">
                  Joined {joinedDaysAgo} Days Ago
                </p>

                {/* Models Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-400 mb-4">Models</h3>
                  <div className="space-y-3">
                    {stats.topModels.slice(0, 3).map((model, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-2xl font-normal text-gray-500 min-w-8">
                          {index + 1}
                        </span>
                        <span className="text-2xl font-normal text-white">
                          {formatModelName(model.model)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="flex justify-between mb-6">
                  <div>
                    <p className="text-base text-gray-400 mb-1">Tokens</p>
                    <p className="text-3xl font-black text-orange-500">{formatNumber(stats.totalTokens)}</p>
                  </div>

                  <div>
                    <p className="text-base text-gray-400 mb-1">Streak</p>
                    <p className="text-3xl font-medium text-white">{stats.longestStreak}<span className="pl-0.5">🔥</span></p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-gray-300 pt-10 mb-6 leading-relaxed font-light italic">
                  {getTokenQuote(stats.totalTokens)}
                </p>
              </div>

              {/* Footer - URL */}
              <div className="flex flex-col gap-0 text-gray-400">
                <Image
                  src="/logo.png"
                  alt="Year in Code Logo"
                  width={100}
                  height={50}
                  className="h-12 max-w-max"
                />
                <Link href={`/${stats.year}`} className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                  
                  <span className="text-base">{currentDomain}/{stats.year}</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Vertical Heatmap (12 Months) */}
            <div className="flex gap-[3px]">
              {heatmapMonths.map((month, monthIndex) => (
                <div key={monthIndex} className="flex flex-col gap-[3px]">
                  {month.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-3.5 h-3.5 rounded-full ${
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

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap gap-2 items-center justify-center">

            <button
              onClick={copyToClipboard}
              disabled={isCopying}
              className="px-5 py-2 rounded-xl text-base font-medium transition-all bg-gray-700/50 text-white hover:bg-gray-700 border border-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform"
              aria-label="Copy summary card as PNG"
            >
              Copy
            </button>
            

            <button
              onClick={downloadImage}
              disabled={isDownloading}
              className="px-5 py-2 rounded-xl text-base font-medium transition-all bg-white text-black hover:bg-gray-100 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform"
              aria-label="Download summary card as PNG"
            >
              Download
            </button>

            {/* Share on X - PRIMARY CTA for viral growth */}
            <button
              onClick={shareOnX}
              disabled={isSharing}
              className="px-5 py-2 rounded-xl text-base font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white hover:scale-105 transform"
              aria-label="Share on X/Twitter"
            >
              <>
                  Share on
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </>
            </button>
          </div>

          {/* Generate new wrapped - Small link underneath */}
          {/* <Link
            href={`/${year}/upload`}
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-2"
          >
            Generate new wrapped
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link> */}
        </div>
        </div>
      </div>
    </>
  );
}
