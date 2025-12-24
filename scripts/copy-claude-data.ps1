# VibeWrapped - Easy Data Copy Script (Windows)
# This script copies your Claude Code data to your Desktop for easy upload

Write-Host "🎉 VibeWrapped - Data Copy Helper" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Create destination folder
$Dest = "$env:USERPROFILE\Desktop\my-ai-wrapped-data"
New-Item -ItemType Directory -Path $Dest -Force | Out-Null

$Found = $false

# Check for Claude Code data in both possible locations
if (Test-Path "$env:USERPROFILE\.claude\projects") {
    Write-Host "✅ Found Claude Code data at .claude\projects" -ForegroundColor Green
    Copy-Item -Path "$env:USERPROFILE\.claude\projects" -Destination "$Dest\claude" -Recurse -Force
    $Found = $true
}
elseif (Test-Path "$env:USERPROFILE\.config\claude\projects") {
    Write-Host "✅ Found Claude Code data at .config\claude\projects" -ForegroundColor Green
    Copy-Item -Path "$env:USERPROFILE\.config\claude\projects" -Destination "$Dest\claude" -Recurse -Force
    $Found = $true
}
else {
    Write-Host "❌ No Claude Code data found" -ForegroundColor Red
    Write-Host "   Tried: .claude\projects"
    Write-Host "   Tried: .config\claude\projects"
}

# Check for Cursor data
if (Test-Path "$env:USERPROFILE\.cursor\logs") {
    Write-Host "✅ Found Cursor data at .cursor\logs" -ForegroundColor Green
    Copy-Item -Path "$env:USERPROFILE\.cursor\logs" -Destination "$Dest\cursor" -Recurse -Force
    $Found = $true
}

# Check for Windsurf data
if (Test-Path "$env:USERPROFILE\.windsurf\logs") {
    Write-Host "✅ Found Windsurf data at .windsurf\logs" -ForegroundColor Green
    Copy-Item -Path "$env:USERPROFILE\.windsurf\logs" -Destination "$Dest\windsurf" -Recurse -Force
    $Found = $true
}

Write-Host ""
if ($Found) {
    Write-Host "✅ Success! Your data has been copied to:" -ForegroundColor Green
    Write-Host "   📁 $Dest" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:"
    Write-Host "1. Open File Explorer and navigate to Desktop\my-ai-wrapped-data"
    Write-Host "2. Go to vibewrapped.com"
    Write-Host "3. Upload the .jsonl files"
    Write-Host "4. Get your awesome wrapped! 🎉"
}
else {
    Write-Host ""
    Write-Host "⚠️  No AI coding data found on your system" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Possible reasons:"
    Write-Host "- You haven't used Claude Code/Cursor yet"
    Write-Host "- Data is in a different location"
    Write-Host "- You need to run Claude Code at least once first"
    Write-Host ""
    Write-Host "For help, visit: https://github.com/isaadgulzar/vibe-wrapped/blob/main/FINDING_DATA.md"
}
