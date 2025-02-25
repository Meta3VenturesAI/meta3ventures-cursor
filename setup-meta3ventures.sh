#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Set project root, default to /home/project if not provided
PROJECT_ROOT="${1:-/home/project}"

echo -e "${BLUE}Setting up Meta3Ventures project at $PROJECT_ROOT...${NC}"

# Check for necessary tools
command -v cp >/dev/null 2>&1 || { echo -e "${RED}cp command not found. Please install coreutils.${NC}"; exit 1; }
command -v mkdir >/dev/null 2>&1 || { echo -e "${RED}mkdir command not found. Please install coreutils.${NC}"; exit 1; }
command -v git >/dev/null 2>&1 || { echo -e "${RED}git command not found. Please install git.${NC}"; exit 1; }

# Create directory structure
echo -e "${GREEN}Creating directory structure...${NC}"
mkdir -p "$PROJECT_ROOT"/{src/{components,layouts,lib,pages},public,supabase/migrations,tests/{unit,e2e},.github/workflows} || { echo -e "${RED}Failed to create directories.${NC}"; exit 1; }

# Function to copy files if source and destination are different
copy_files() {
  local src=$1
  local dest=$2
  if [ -d "$src" ] && [ "$src" != "$dest" ]; then
    cp -r "$src"/* "$dest/" || { echo -e "${RED}Failed to copy from $src to $dest.${NC}"; exit 1; }
  fi
}

# Copy source files
echo -e "${GREEN}Copying source files...${NC}"
copy_files "src/components" "$PROJECT_ROOT/src/components"
copy_files "src/layouts" "$PROJECT_ROOT/src/layouts"
copy_files "src/lib" "$PROJECT_ROOT/src/lib"
copy_files "src/pages" "$PROJECT_ROOT/src/pages"

# Copy Supabase migrations
echo -e "${GREEN}Copying Supabase migrations...${NC}"
copy_files "supabase/migrations" "$PROJECT_ROOT/supabase/migrations"

# Copy configuration files
echo -e "${GREEN}Copying configuration files...${NC}"
cp package.json astro.config.mjs tsconfig.json netlify.toml README.md LICENSE CONTRIBUTING.md SECURITY.md "$PROJECT_ROOT/" || { echo -e "${RED}Failed to copy configuration files.${NC}"; exit 1; }

# Copy environment example
echo -e "${GREEN}Copying environment files...${NC}"
cp .env.example "$PROJECT_ROOT/" || { echo -e "${RED}Failed to copy environment files.${NC}"; exit 1; }

# Initialize git if needed
cd "$PROJECT_ROOT" || { echo -e "${RED}Failed to change directory to project root.${NC}"; exit 1; }
if [ ! -d .git ]; then
  git init || { echo -e "${RED}Failed to initialize git repository.${NC}"; exit 1; }
  git add . || { echo -e "${RED}Failed to add files to git.${NC}"; exit 1; }
  git commit -m "Initial commit: Meta3Ventures website setup" || { echo -e "${RED}Failed to commit files.${NC}"; exit 1; }
else
  git add . || { echo -e "${RED}Failed to add files to git.${NC}"; exit 1; }
  git commit -m "Update: Meta3Ventures website files" || { echo -e "${RED}Failed to commit files.${NC}"; exit 1; }
fi

echo -e "${BLUE}Project files have been set up successfully!${NC}"
echo "Next steps:"
echo "1. Create a .env file with your Supabase credentials"
echo "2. Run 'npm install' to install dependencies"
echo "3. Run 'npm run dev' to start the development server"