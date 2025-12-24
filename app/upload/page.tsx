"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>("claude-code");
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const jsonlFiles = droppedFiles.filter(
      (file) => file.name.endsWith(".jsonl") || file.name.endsWith(".json")
    );

    if (jsonlFiles.length > 0) {
      setFiles(jsonlFiles);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  }, []);

  const handleProcess = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);

    try {
      // Read and parse files
      const allData: any[] = [];

      for (const file of files) {
        const text = await file.text();
        const lines = text.trim().split("\n");

        for (const line of lines) {
          try {
            const entry = JSON.parse(line);
            allData.push(entry);
          } catch (error) {
            console.warn("Failed to parse line:", error);
          }
        }
      }

      // Store data in sessionStorage for the results page
      sessionStorage.setItem("wrappedData", JSON.stringify(allData));
      sessionStorage.setItem("selectedTool", selectedTool);

      // Navigate to results page
      router.push("/wrapped");
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Error processing files. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

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
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create Your Wrapped
          </h1>
          <p className="text-xl text-gray-400">
            Upload your AI coding tool data and get beautiful insights
          </p>
        </div>

        {/* Tool Selection */}
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-4">
            Select Your AI Coding Tool
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: "claude-code", name: "Claude Code", icon: "🤖" },
              { id: "cursor", name: "Cursor", icon: "📝" },
              { id: "copilot", name: "Copilot", icon: "🚁" },
              { id: "windsurf", name: "Windsurf", icon: "🏄" },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTool === tool.id
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-gray-700 hover:border-orange-500/50"
                }`}
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <div className="font-semibold">{tool.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-4">
            Upload Your Data Files
          </label>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? "border-orange-500 bg-orange-500/10"
                : "border-gray-700 hover:border-orange-500/50"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              multiple
              accept=".jsonl,.json"
              onChange={handleFileInput}
              className="hidden"
            />

            <div className="text-6xl mb-4">📁</div>

            {files.length > 0 ? (
              <div>
                <p className="text-xl font-semibold text-orange-400 mb-2">
                  {files.length} file{files.length > 1 ? "s" : ""} selected
                </p>
                <ul className="text-gray-400 space-y-1">
                  {files.map((file, i) => (
                    <li key={i} className="truncate">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <p className="text-xl font-semibold mb-2">
                  Drag & drop your JSONL files here
                </p>
                <p className="text-gray-400">or click to browse</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 p-6 rounded-lg bg-gray-800/50 border border-gray-700">
            <h3 className="font-semibold mb-3 text-orange-400">
              Where to find your data:
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              {selectedTool === "claude-code" && (
                <div className="font-mono bg-gray-900/50 p-3 rounded">
                  ~/.claude/projects/&lt;project&gt;/*.jsonl<br/>
                  or ~/.config/claude/projects/&lt;project&gt;/*.jsonl
                </div>
              )}
              {selectedTool === "cursor" && (
                <div className="font-mono bg-gray-900/50 p-3 rounded">
                  ~/.cursor/logs/*.jsonl
                </div>
              )}
              {selectedTool === "copilot" && (
                <div className="font-mono bg-gray-900/50 p-3 rounded">
                  Check GitHub Copilot settings for usage data export
                </div>
              )}
              {selectedTool === "windsurf" && (
                <div className="font-mono bg-gray-900/50 p-3 rounded">
                  ~/.windsurf/logs/*.jsonl
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Process Button */}
        <div className="text-center">
          <button
            onClick={handleProcess}
            disabled={files.length === 0 || isProcessing}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
              files.length === 0 || isProcessing
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg shadow-orange-500/50"
            }`}
          >
            {isProcessing ? "Processing..." : "Generate My Wrapped 🎉"}
          </button>
        </div>
      </main>
    </div>
  );
}
