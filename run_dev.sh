#!/bin/bash

# 🧁 Blush & Buttercup: Quick Start Script (Bash)

# Color variables
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Check for pnpm (preferred) or npm
if command -v pnpm &> /dev/null
then
    PKG_MGR="pnpm"
else
    PKG_MGR="npm"
fi

echo -e "${CYAN}--- 🎂 Setting up Blush & Buttercup Bakery 🎂 ---${NC}"
echo -e "Using Package Manager: ${YELLOW}$PKG_MGR${NC}"

# 1. Install dependencies in root
echo -e "\nStep 1: Installing project-wide dependencies..."
$PKG_MGR install

# 2. Check for .env in frontend
ENV_PATH="scripts/src/frontend/.env"
if [ ! -f "$ENV_PATH" ]; then
    echo -e "\nStep 2: Creating .env file..."
    echo -e "VITE_USE_MOCK=true\nVITE_PORT=5001" > "$ENV_PATH"
fi

# 3. Start development server
echo -e "\nStep 3: Starting the Bakery on http://localhost:5001..."
echo -e "Wait a moment for the server to spin up...\n"

cd scripts/src/frontend
npx vite --port 5001 --host
