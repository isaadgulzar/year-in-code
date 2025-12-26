# 📁 Finding Your AI Coding Data

A step-by-step guide to locate your usage data for different AI coding tools.

---

## 🤖 Claude Code

### macOS - Method 1: Finder (GUI)

1. **Open Finder**
2. Press `Cmd + Shift + G` (Go to Folder)
3. Paste one of these paths:
   ```
   ~/.claude/projects
   ```
   OR
   ```
   ~/.config/claude/projects
   ```
4. Press Enter
5. You'll see folders for each project you've worked on
6. Inside each project folder, you'll find `.jsonl` files

**Show Hidden Files Permanently:**

- Press `Cmd + Shift + .` (dot) in Finder to toggle hidden files

### macOS - Method 2: Terminal

```bash
# Navigate to Claude directory
cd ~/.claude/projects

# OR try the new location
cd ~/.config/claude/projects

# List all projects
ls -la

# See all JSONL files
find . -name "*.jsonl"

# Copy all JSONL files to Desktop
cp -r ~/.claude/projects ~/Desktop/claude-data
```

### Windows - Method 1: File Explorer (GUI)

1. **Open File Explorer**
2. Click on the address bar
3. Paste this path:
   ```
   %USERPROFILE%\.claude\projects
   ```
   OR
   ```
   %USERPROFILE%\.config\claude\projects
   ```
4. Press Enter
5. You'll see folders for each project
6. Inside each project folder, you'll find `.jsonl` files

**Show Hidden Files Permanently:**

1. Open File Explorer
2. Click `View` tab
3. Check `Hidden items`

### Windows - Method 2: Command Prompt

```cmd
:: Navigate to Claude directory
cd %USERPROFILE%\.claude\projects

:: OR try the new location
cd %USERPROFILE%\.config\claude\projects

:: List all projects
dir

:: Copy all data to Desktop
xcopy %USERPROFILE%\.claude\projects %USERPROFILE%\Desktop\claude-data /E /I
```

### Windows - Method 3: PowerShell

```powershell
# Navigate to Claude directory
cd ~/.claude/projects

# OR
cd ~/.config/claude/projects

# List all JSONL files
Get-ChildItem -Recurse -Filter *.jsonl

# Copy all JSONL files to Desktop
Copy-Item -Path ~/.claude/projects -Destination ~/Desktop/claude-data -Recurse
```

---

## 📝 Cursor

### macOS

**Finder (Cmd + Shift + G):**

```
~/.cursor/logs
```

**Terminal:**

```bash
cd ~/.cursor/logs
ls -la
```

### Windows

**File Explorer:**

```
%USERPROFILE%\.cursor\logs
```

**PowerShell:**

```powershell
cd ~/.cursor/logs
Get-ChildItem
```

---

## 🚁 GitHub Copilot

GitHub Copilot doesn't store local usage logs. You need to:

1. Visit [GitHub Settings](https://github.com/settings/copilot)
2. Look for usage statistics or export options
3. Or check VSCode extension data:
   - macOS: `~/Library/Application Support/Code/User/globalStorage/github.copilot`
   - Windows: `%APPDATA%\Code\User\globalStorage\github.copilot`

---

## 🏄 Windsurf

### macOS

**Finder (Cmd + Shift + G):**

```
~/.windsurf/logs
```

**Terminal:**

```bash
cd ~/.windsurf/logs
ls -la
```

### Windows

**File Explorer:**

```
%USERPROFILE%\.windsurf\logs
```

---

## 🎯 Quick Copy Commands

### macOS - Copy ALL your Claude data to Desktop

```bash
# Create a folder on Desktop
mkdir ~/Desktop/my-ai-data

# Copy Claude Code data
cp -r ~/.claude/projects ~/Desktop/my-ai-data/claude 2>/dev/null || \
cp -r ~/.config/claude/projects ~/Desktop/my-ai-data/claude

# Copy Cursor data (if you use it)
cp -r ~/.cursor/logs ~/Desktop/my-ai-data/cursor 2>/dev/null

echo "✅ Data copied to Desktop/my-ai-data"
```

### Windows PowerShell - Copy ALL your AI data to Desktop

```powershell
# Create a folder on Desktop
New-Item -ItemType Directory -Path "$env:USERPROFILE\Desktop\my-ai-data" -Force

# Copy Claude Code data
Copy-Item -Path "$env:USERPROFILE\.claude\projects" `
          -Destination "$env:USERPROFILE\Desktop\my-ai-data\claude" `
          -Recurse -ErrorAction SilentlyContinue

# Try alternate location
Copy-Item -Path "$env:USERPROFILE\.config\claude\projects" `
          -Destination "$env:USERPROFILE\Desktop\my-ai-data\claude" `
          -Recurse -ErrorAction SilentlyContinue

# Copy Cursor data (if you use it)
Copy-Item -Path "$env:USERPROFILE\.cursor\logs" `
          -Destination "$env:USERPROFILE\Desktop\my-ai-data\cursor" `
          -Recurse -ErrorAction SilentlyContinue

Write-Host "✅ Data copied to Desktop\my-ai-data"
```

---

## 🔍 What You're Looking For

Your data files will look like this:

```
📁 projects/
  📁 my-awesome-project/
    📄 abc123-def456.jsonl  ← Upload this
    📄 ghi789-jkl012.jsonl  ← Upload this
    📄 mno345-pqr678.jsonl  ← Upload this
  📁 another-project/
    📄 stu901-vwx234.jsonl  ← Upload this
```

**Each `.jsonl` file** contains your usage data for a coding session!

---

## ⚠️ Troubleshooting

### "Folder doesn't exist"

- Try both paths (`~/.claude` and `~/.config/claude`)
- Make sure you have Claude Code installed
- Make sure you've actually used Claude Code (files are created after first use)

### "Permission denied"

**macOS:**

```bash
sudo ls ~/.claude/projects
```

**Windows:**

- Run Command Prompt/PowerShell as Administrator

### "No files found"

- Check if you've used Claude Code recently (files are created after usage)
- Try the alternate path
- Contact Claude support if you're sure you've used it

---

## 💡 Pro Tips

1. **Select Multiple Files:** You can upload ALL `.jsonl` files from all projects at once!
2. **Year Filter:** Files from 2024 will give you your 2024 wrapped
3. **Privacy:** Remember, these files stay local - VibeWrapped processes everything in your browser
4. **Backup:** Consider backing up these files - they're your usage history!

---

## 🆘 Still Can't Find Them?

Run this diagnostic command:

**macOS/Linux:**

```bash
echo "Checking for Claude Code data..."
[ -d ~/.claude/projects ] && echo "✅ Found at ~/.claude/projects" || echo "❌ Not found"
[ -d ~/.config/claude/projects ] && echo "✅ Found at ~/.config/claude/projects" || echo "❌ Not found"
```

**Windows PowerShell:**

```powershell
Write-Host "Checking for Claude Code data..."
Test-Path "$env:USERPROFILE\.claude\projects" | ForEach-Object {
    if ($_) { Write-Host "✅ Found at .claude\projects" }
    else { Write-Host "❌ Not found at .claude\projects" }
}
Test-Path "$env:USERPROFILE\.config\claude\projects" | ForEach-Object {
    if ($_) { Write-Host "✅ Found at .config\claude\projects" }
    else { Write-Host "❌ Not found at .config\claude\projects" }
}
```

Share the output with us for help!
