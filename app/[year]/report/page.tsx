"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toPng } from "html-to-image";
import toast, { Toaster } from "react-hot-toast";
import { formatNumber, YearStats } from "@/lib/parser";

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
      .split("-")
      .map((part, index) => {
        // Capitalize first part (model name)
        if (index === 0) {
          return part.charAt(0).toUpperCase() + part.slice(1);
        }
        // Join version numbers with dots
        return part;
      })
      .join(" ")
      .replace(/(\d+)\s+(\d+)/g, "$1.$2"); // Convert "4 5" to "4.5"
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
    const maxTokens = Math.max(...stats.dailyData.map((d) => d.tokens));

    stats.dailyData.forEach((day) => {
      const level =
        day.tokens > 0 ? Math.ceil((day.tokens / maxTokens) * 4) : 0;
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
        const dateStr = date.toISOString().split("T")[0];
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
        backgroundColor: "#1f2937",
      });

      const link = document.createElement("a");
      link.download = `${stats?.year || "2025"}-cc-wrapped-preview-image.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Failed to download image. Please try again.", {
        style: {
          background: "#374151",
          color: "#fff",
          fontFamily: "var(--font-jetbrains-mono)",
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
        backgroundColor: "#1f2937",
      }).then((dataUrl) => {
        return fetch(dataUrl).then((res) => res.blob());
      });

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);

      toast.success("Image copied to clipboard!", {
        style: {
          background: "#374151",
          color: "#fff",
          fontFamily: "var(--font-jetbrains-mono)",
        },
        iconTheme: {
          primary: "#f97316",
          secondary: "#fff",
        },
      });
    } catch (error) {
      console.error("Error copying image:", error);
      toast.error("Failed to copy image. Please try again.", {
        style: {
          background: "#374151",
          color: "#fff",
          fontFamily: "var(--font-jetbrains-mono)",
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
        backgroundColor: "#1f2937",
      }).then((dataUrl) => {
        return fetch(dataUrl).then((res) => res.blob());
      });

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);

      // Step 2: Show toast with instructions
      toast.success("Image copied! Paste it in your tweet (Ctrl/Cmd+V)", {
        duration: 5000,
        style: {
          background: "#374151",
          color: "#fff",
          fontFamily: "var(--font-jetbrains-mono)",
          minWidth: "550px",
        },
        iconTheme: {
          primary: "#f97316",
          secondary: "#fff",
        },
      });

      // Step 3: Open Twitter in new tab after 2.5s delay (gives user time to read toast)
      setTimeout(() => {
        const text = encodeURIComponent(
          `Wrapped my ${stats?.year} with Claude Code 🚀\n\n💪 Crushed ${formatNumber(
            stats?.totalTokens || 0
          )} tokens\n🔥 Kept a ${
            stats?.longestStreak || 0
          } day streak going\n⚡ Top model: ${formatModelName(
            stats?.topModels[0]?.model || "N/A"
          )}\n\nGet your Claude Code wrapped at yearincode.xyz/${
            stats?.year
          }\n\n#YearInCode #ClaudeCode #AIcoding #DevTools #BuildInPublic`
        );

        const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;

        window.open(twitterUrl, "_blank");
      }, 2000);
    } catch (error) {
      console.error("Error preparing to share:", error);
      toast.error("Failed to copy image. Please try again.", {
        style: {
          background: "#374151",
          color: "#fff",
          fontFamily: "var(--font-jetbrains-mono)",
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
          top: "5.25rem",
        }}
      />
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-12 py-8 overflow-auto">
        <div className="w-full" style={{ maxWidth: "480px" }}>
          {/* Main Summary Card */}
          <div
            ref={cardRef}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl mb-6"
          >
            <div className="flex gap-6">
              {/* Left Column - Stats Content */}
              <div className="flex-1 flex flex-col justify-start">
                {/* Header */}
                <div className="flex items-center gap-2 text-white mb-3">
                  <Image
                    src="/claude-logo.svg"
                    alt="Claude Code Logo"
                    width={50}
                    height={50}
                    className="h-6 w-6"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 123 16"
                    className="h-3.5 flex-shrink-0 text-white"
                    fill="currentColor"
                    aria-label="Claude Code"
                  >
                    <path d="M19.121 1.67836V13.8338C19.121 14.6338 19.5307 14.8094 20.6038 14.946V15.8045H15.2968V14.946C16.3699 14.8094 16.7796 14.6338 16.7796 13.8338V2.0881L15.3944 1.44423V0.936935L18.5161 0.000396729H19.2185L19.121 1.67836Z"></path>
                    <path d="M8.42885 14.7119C9.34587 14.7119 10.1068 14.5753 10.7117 14.3021C11.9409 13.7558 12.6823 12.7217 13.3067 11.0047H14.3407L13.9115 14.7704C12.253 15.5508 10.38 15.9996 8.01911 15.9996C6.36066 15.9996 4.91683 15.6679 3.70713 14.985C1.28774 13.6387 0 11.2193 0 8.48778C0 6.86835 0.370713 5.44403 1.09263 4.21482C2.53646 1.75641 5.13145 0.390621 8.1752 0.390621C10.3409 0.390621 12.1165 0.85889 13.5408 1.77592L13.6774 5.19038H12.6628C11.8238 2.71246 10.3605 1.67836 7.98009 1.67836C4.44856 1.67836 2.84864 4.15629 2.84864 7.72684C2.84864 8.99507 3.04375 10.1462 3.45349 11.1998C4.25345 13.3266 5.95092 14.7119 8.42885 14.7119Z"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M31.1984 14.4582C30.6326 14.4582 30.3595 14.0095 30.3595 13.1314V9.0536C30.3595 6.2635 28.8766 5.19038 26.2036 5.19038C23.8427 5.19038 22.1257 6.16594 22.1257 7.78537C22.1257 8.27315 22.3013 8.64387 22.6525 8.89751L24.4476 8.66338C24.3695 8.11706 24.3305 7.78537 24.3305 7.64879C24.3305 6.73177 24.8183 6.2635 25.8133 6.2635C27.2767 6.2635 28.0181 7.29759 28.0181 8.95605V9.50236L24.311 10.6145C23.0818 10.9462 22.3794 11.2389 21.9111 11.9218C21.677 12.273 21.5599 12.7412 21.5599 13.307C21.5599 14.8875 22.6525 15.9996 24.5061 15.9996C25.8524 15.9996 27.0425 15.3947 28.0766 14.2436C28.4474 15.3947 29.0132 15.9996 30.0278 15.9996C30.8472 15.9996 31.5887 15.6679 32.252 15.024L32.0569 14.3411C31.7643 14.4192 31.4911 14.4582 31.1984 14.4582ZM28.0181 13.3851C27.0621 14.107 26.4962 14.4192 25.6182 14.4192C24.6036 14.4192 23.9793 13.8338 23.9793 12.7998C23.9793 12.0974 24.311 11.6876 25.0134 11.4535L28.0181 10.4974V13.3851Z"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M63.1383 13.9509C64.6407 13.9509 66.065 13.0924 66.7869 11.8047L67.4503 11.9803C67.1576 14.2826 65.0699 15.9996 62.5139 15.9996C59.5092 15.9996 57.441 13.7948 57.441 10.6145C57.441 7.43417 59.6848 5.19038 62.6895 5.19038C64.9333 5.19038 66.5137 6.53665 67.021 8.878L59.6559 11.1374C60.1063 12.8856 61.3558 13.9509 63.1383 13.9509ZM64.4651 8.58533C64.1919 7.27808 63.3919 6.53665 62.2798 6.53665C60.6214 6.53665 59.4702 7.78537 59.4702 9.5804C59.4702 9.76927 59.478 9.95268 59.492 10.1322L64.4651 8.58533Z"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M55.3143 13.4631V1.67836L55.4119 0.000396729H54.7095L51.5877 0.936935V1.44423L52.973 2.0881V5.95132C52.2901 5.44403 51.3925 5.19038 50.3194 5.19038C47.2171 5.19038 44.7978 7.55124 44.7978 11.0828C44.7978 13.9899 46.5343 15.9996 49.4024 15.9996C50.8853 15.9996 52.173 15.2777 52.973 14.1655L52.8754 15.9996H53.2851L56.8752 15.3167V14.4387L56.3679 14.3997C55.5289 14.3216 55.3143 14.146 55.3143 13.4631ZM52.973 13.2485C52.3486 13.8924 51.4316 14.2826 50.3975 14.2826C48.2708 14.2826 47.1976 12.6046 47.1976 10.3609C47.1976 7.84391 48.4268 6.36105 50.378 6.36105C51.8608 6.36105 52.973 7.21955 52.973 8.79996V13.2485Z"
                    ></path>
                    <path d="M42.671 7.20004V13.4631C42.671 14.146 42.8857 14.3216 43.7246 14.3997L44.2319 14.4387V15.3167L40.6419 15.9996H40.2321L40.3297 14.0875C39.4127 15.1996 38.1835 15.9996 36.6811 15.9996C34.7105 15.9996 33.4812 14.9655 33.4812 12.7802V7.62928C33.4812 6.98541 33.2081 6.73177 32.2911 6.59519L31.9399 6.53665V5.67816L35.3348 5.19038H35.9202L35.8226 7.20004V12.4486C35.8226 13.7558 36.5055 14.3216 37.6176 14.3216C38.6127 14.3216 39.4517 13.8924 40.3297 13.2095V7.62928C40.3297 6.98541 40.0565 6.73177 39.1395 6.59519L38.8078 6.53665V5.67816L42.2028 5.19038H42.7686L42.671 7.20004Z"></path>
                    <path d="M108.401 15.9006H107.983L108.083 14.0778C107.672 14.6337 107.149 15.0797 106.513 15.4158C105.89 15.739 105.201 15.9006 104.446 15.9006C103.465 15.9006 102.624 15.6937 101.922 15.28C101.219 14.8534 100.683 14.2717 100.312 13.5349C99.9409 12.7851 99.7554 11.9448 99.7554 11.014C99.7554 9.85059 100.007 8.82287 100.511 7.93088C101.014 7.0389 101.696 6.35376 102.558 5.87545C103.419 5.39714 104.36 5.15798 105.38 5.15798C106.48 5.15798 107.381 5.41007 108.083 5.91423V2.07483L106.672 1.43493V0.930765L109.852 0H110.567L110.468 1.66762V13.3797C110.468 13.7158 110.541 13.9485 110.686 14.0778C110.832 14.1942 111.117 14.2717 111.541 14.3105L112.058 14.3493V15.2219L108.401 15.9006ZM105.44 6.32144C104.446 6.32144 103.657 6.67048 103.074 7.36855C102.491 8.06662 102.2 9.04263 102.2 10.2966C102.2 11.4083 102.472 12.3391 103.015 13.0889C103.558 13.8257 104.373 14.1942 105.459 14.1942C105.989 14.1942 106.48 14.1037 106.93 13.9227C107.381 13.7417 107.765 13.4896 108.083 13.1664V8.7453C108.083 7.95674 107.831 7.35562 107.328 6.94195C106.824 6.52828 106.195 6.32144 105.44 6.32144Z"></path>
                    <path d="M92.893 15.9005C91.833 15.9005 90.8989 15.6807 90.0907 15.2412C89.2824 14.7887 88.6531 14.1747 88.2026 13.399C87.7521 12.6105 87.5269 11.7185 87.5269 10.7231C87.5269 9.61134 87.7852 8.63534 88.302 7.79506C88.8187 6.95479 89.5143 6.30843 90.3888 5.85597C91.2633 5.39059 92.2305 5.1579 93.2905 5.1579C94.3505 5.1579 95.2846 5.38413 96.0928 5.83658C96.9143 6.27611 97.5503 6.89015 98.0008 7.67872C98.4513 8.46728 98.6765 9.3528 98.6765 10.3353C98.6765 11.447 98.4181 12.423 97.9014 13.2633C97.3847 14.1036 96.6824 14.7564 95.7947 15.2218C94.9202 15.6742 93.953 15.9005 92.893 15.9005ZM93.4495 14.6594C94.3372 14.6594 95.0063 14.3298 95.4568 13.6705C95.9073 13.0112 96.1326 12.1257 96.1326 11.014C96.1326 9.66952 95.8278 8.56424 95.2183 7.69811C94.6221 6.83198 93.794 6.39892 92.734 6.39892C91.8463 6.39892 91.1772 6.72856 90.7267 7.38785C90.2762 8.04714 90.0509 8.93266 90.0509 10.0444C90.0509 11.3888 90.349 12.4941 90.9453 13.3603C91.5548 14.2264 92.3895 14.6594 93.4495 14.6594Z"></path>
                    <path d="M80.202 14.6207C81.1295 14.6207 81.9046 14.485 82.5274 14.2135C83.1501 13.9421 83.6668 13.5413 84.0776 13.0113C84.4883 12.4813 84.8527 11.7897 85.1707 10.9365H86.224L85.7868 14.6789C84.9388 15.0667 84.0246 15.3705 83.0441 15.5903C82.0769 15.7971 80.9904 15.9005 79.7847 15.9005C78.0887 15.9005 76.6246 15.5644 75.3924 14.8922C74.1602 14.22 73.2194 13.3151 72.5702 12.1775C71.9342 11.0399 71.6162 9.79241 71.6162 8.43505C71.6162 6.83206 71.9806 5.42299 72.7093 4.20783C73.4513 2.97974 74.4517 2.03605 75.7104 1.37675C76.9823 0.717463 78.3934 0.387817 79.9437 0.387817C82.1431 0.387817 83.965 0.846736 85.4092 1.76457L85.5284 5.09981H84.4949C84.071 3.88465 83.4747 3.01205 82.7062 2.48204C81.9377 1.93909 80.9506 1.66762 79.7449 1.66762C77.943 1.66762 76.618 2.22995 75.77 3.35463C74.9353 4.46637 74.5179 5.90776 74.5179 7.6788C74.5179 8.93275 74.7233 10.0897 75.134 11.1498C75.5448 12.1969 76.1741 13.0372 77.0221 13.6706C77.8833 14.304 78.9433 14.6207 80.202 14.6207Z"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M118.181 13.9639C119.674 13.9639 121.09 13.1107 121.807 11.8308L122.466 12.0053C122.175 14.2935 120.101 16 117.56 16C114.574 16 112.519 13.8087 112.519 10.6479C112.519 7.48715 114.749 5.25714 117.735 5.25714C119.965 5.25714 121.536 6.59515 122.04 8.92211L114.72 11.1676C115.167 12.9051 116.409 13.9639 118.181 13.9639ZM119.499 8.63124C119.228 7.33202 118.433 6.59515 117.328 6.59515C115.679 6.59515 114.535 7.8362 114.535 9.6202C114.535 9.80791 114.543 9.99019 114.557 10.1686L119.499 8.63124Z"
                    ></path>
                  </svg>
                </div>
                <div className="mb-8">
                  <p className="text-lg text-gray-400 mb-8">
                    Joined {joinedDaysAgo} Days Ago
                  </p>

                  {/* Models Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-400 mb-4">
                      Models
                    </h3>
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
                      <p className="text-3xl font-black text-orange-500">
                        {formatNumber(stats.totalTokens)}
                      </p>
                    </div>

                    <div>
                      <p className="text-base text-gray-400 mb-1">Streak</p>
                      <p className="text-3xl font-medium text-white">
                        {stats.longestStreak}
                        <span className="pl-0.5">🔥</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer - URL */}
                <div className="flex flex-col gap-0 text-gray-400 mt-auto">
                  <Image
                    src="/logo.png"
                    alt="Year in Code Logo"
                    width={100}
                    height={50}
                    className="h-12 max-w-max"
                  />
                  <Link
                    href={`/${stats.year}`}
                    className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                  >
                    <span className="text-base">
                      {currentDomain}/{stats.year}
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right Column - Vertical Heatmap (12 Months) */}
              <div className="flex gap-[5px]">
                {heatmapMonths.map((month, monthIndex) => (
                  <div key={monthIndex} className="flex flex-col gap-[5px]">
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
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex gap-5 items-center justify-between w-full">
              <Link
                href={`/${year}/upload`}
                className="px-5 py-2 rounded-xl text-base font-medium transition-all bg-gray-700/50 text-white hover:bg-gray-700 border border-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform"
              >
                Create New
              </Link>
              <div className="flex flex-wrap gap-2 items-center justify-center">
                <button
                  onClick={copyToClipboard}
                  disabled={isCopying}
                  className="px-5 py-2 rounded-xl text-base font-medium transition-all bg-white text-black hover:bg-gray-100 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform"
                  aria-label="Copy summary card as PNG"
                >
                  Copy
                </button>

                <button
                  onClick={downloadImage}
                  disabled={isDownloading}
                  className="px-5 py-2 rounded-xl text-base font-medium transition-all bg-gradient-to-r from-orange-500 to-pink-600 cursor-pointer text-white hover:from-orange-600 hover:to-pink-700 shadow-lg shadow-orange-500/30"
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
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </>
                </button>
              </div>
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
