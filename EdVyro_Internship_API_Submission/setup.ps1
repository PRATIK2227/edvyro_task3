$ErrorActionPreference = "Stop"
Write-Host "EdVyro Internship API setup" -ForegroundColor Cyan
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Node.js 20+ is required. Install it first." }
if (-not (Test-Path ".env")) { Copy-Item ".env.example" ".env"; Write-Host "Created .env. Edit DATABASE_URL before continuing." -ForegroundColor Yellow }
npm install
Write-Host "Dependencies installed. Next: configure .env, create PostgreSQL database, then run npm run db:migrate and npm run db:seed." -ForegroundColor Green
