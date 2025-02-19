#!/bin/bash

# Set project root
PROJECT_ROOT="/home/project"

echo "Setting up Meta3Ventures project..."

# Create directory structure
echo "Creating directory structure..."
mkdir -p "$PROJECT_ROOT"/{src/{components,layouts,lib,pages},public,supabase/migrations,tests/{unit,e2e},.github/workflows}

# Copy source files
echo "Copying source files..."
cp -r src/components/* "$PROJECT_ROOT/src/components/"
cp -r src/layouts/* "$PROJECT_ROOT/src/layouts/"
cp -r src/lib/* "$PROJECT_ROOT/src/lib/"
cp -r src/pages/* "$PROJECT_ROOT/src/pages/"

# Copy Supabase migrations
echo "Copying Supabase migrations..."
cp -r supabase/migrations/* "$PROJECT_ROOT/supabase/migrations/"

# Copy test files
echo "Copying test files..."
cp -r tests/unit/* "$PROJECT_ROOT/tests/unit/"
cp -r tests/e2e/* "$PROJECT_ROOT/tests/e2e/"

# Copy configuration files
echo "Copying configuration files..."
cp package.json astro.config.mjs tsconfig.json netlify.toml README.md LICENSE CONTRIBUTING.md SECURITY.md "$PROJECT_ROOT/"

# Copy environment example
echo "Copying environment files..."
cp .env.example "$PROJECT_ROOT/"

# Initialize git if needed
cd "$PROJECT_ROOT"
if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "Initial commit: Meta3Ventures website setup"
else
  git add .
  git commit -m "Update: Meta3Ventures website files"
fi

echo "Project files have been set up successfully!"
echo "Next steps:"
echo "1. Create a .env file with your Supabase credentials"
echo "2. Run 'npm install' to install dependencies"
echo "3. Run 'npm run dev' to start the development server"