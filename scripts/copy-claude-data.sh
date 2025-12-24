#!/bin/bash

# VibeWrapped - Easy Data Copy Script
# This script copies your Claude Code data to your Desktop for easy upload

echo "🎉 VibeWrapped - Data Copy Helper"
echo "=================================="
echo ""

# Create destination folder
DEST="$HOME/Desktop/my-ai-wrapped-data"
mkdir -p "$DEST"

# Check for Claude Code data in both possible locations
FOUND=0

if [ -d "$HOME/.claude/projects" ]; then
    echo "✅ Found Claude Code data at ~/.claude/projects"
    cp -r "$HOME/.claude/projects" "$DEST/claude"
    FOUND=1
elif [ -d "$HOME/.config/claude/projects" ]; then
    echo "✅ Found Claude Code data at ~/.config/claude/projects"
    cp -r "$HOME/.config/claude/projects" "$DEST/claude"
    FOUND=1
else
    echo "❌ No Claude Code data found"
    echo "   Tried: ~/.claude/projects"
    echo "   Tried: ~/.config/claude/projects"
fi

# Check for Cursor data
if [ -d "$HOME/.cursor/logs" ]; then
    echo "✅ Found Cursor data at ~/.cursor/logs"
    cp -r "$HOME/.cursor/logs" "$DEST/cursor"
    FOUND=1
fi

# Check for Windsurf data
if [ -d "$HOME/.windsurf/logs" ]; then
    echo "✅ Found Windsurf data at ~/.windsurf/logs"
    cp -r "$HOME/.windsurf/logs" "$DEST/windsurf"
    FOUND=1
fi

echo ""
if [ $FOUND -eq 1 ]; then
    echo "✅ Success! Your data has been copied to:"
    echo "   📁 $DEST"
    echo ""
    echo "Next steps:"
    echo "1. Open Finder and navigate to Desktop/my-ai-wrapped-data"
    echo "2. Go to vibewrapped.com"
    echo "3. Upload the .jsonl files"
    echo "4. Get your awesome wrapped! 🎉"
else
    echo ""
    echo "⚠️  No AI coding data found on your system"
    echo ""
    echo "Possible reasons:"
    echo "- You haven't used Claude Code/Cursor yet"
    echo "- Data is in a different location"
    echo "- You need to run Claude Code at least once first"
    echo ""
    echo "For help, visit: https://github.com/isaadgulzar/vibe-wrapped/blob/main/FINDING_DATA.md"
fi
