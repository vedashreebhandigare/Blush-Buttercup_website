# 🧁 Blush & Buttercup: Quick Start Script

# Check for pnpm (preferred) or npm
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    $PkgMgr = "pnpm"
} else {
    $PkgMgr = "npm"
}

Write-Host "--- 🎂 Setting up Blush & Buttercup Bakery 🎂 ---" -ForegroundColor Cyan
Write-Host "Using Package Manager: $PkgMgr" -ForegroundColor Yellow

# 1. Install dependencies in root
Write-Host "`nStep 1: Installing project-wide dependencies..." -ForegroundColor Green
& $PkgMgr install

# 2. Check for .env in frontend
$EnvPath = "scripts/src/frontend/.env"
if (-not (Test-Path $EnvPath)) {
    Write-Host "`nStep 2: Creating .env file..." -ForegroundColor Green
    "VITE_USE_MOCK=true`nVITE_PORT=5001" | Out-File -FilePath $EnvPath -Encoding UTF8
}

# 3. Start development server
Write-Host "`nStep 3: Starting the Bakery on http://localhost:5001..." -ForegroundColor Yellow
Write-Host "Wait a moment for the server to spin up...`n" -ForegroundColor Green

cd scripts/src/frontend
& npx vite --port 5001 --host
