#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting up Meta3Ventures project...${NC}"

# Create necessary directories
echo -e "${GREEN}Creating directory structure...${NC}"
mkdir -p src/{components,layouts,lib,pages} \
        public \
        supabase/migrations \
        tests/{unit,e2e} \
        .github/workflows

# Copy configuration files
echo -e "${GREEN}Copying configuration files...${NC}"
cat > package.json << 'EOL'
{
  "name": "meta3ventures-website",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext .js,.ts,.astro",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@astrojs/netlify": "^4.0.1",
    "@elastic/apm-rum": "^5.15.0",
    "@supabase/supabase-js": "^2.39.3",
    "astro": "^4.3.2",
    "dompurify": "^3.0.8",
    "isomorphic-dompurify": "^1.9.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.41.1",
    "@types/dompurify": "^3.0.5",
    "@types/node": "^20.11.16",
    "@typescript-eslint/parser": "^6.19.1",
    "@typescript-eslint/eslint-plugin": "^6.19.1",
    "eslint": "^8.56.0",
    "eslint-plugin-astro": "^0.31.3",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "prettier": "^3.2.4",
    "prettier-plugin-astro": "^0.13.0",
    "typescript": "^5.3.3",
    "vitest": "^1.2.2"
  }
}
EOL

cat > astro.config.mjs << 'EOL'
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'static',
  adapter: netlify(),
  site: 'https://meta3ventures.netlify.app',
  build: {
    format: 'directory'
  }
});
EOL

cat > .env.example << 'EOL'
# Supabase Configuration
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Environment
NODE_ENV=development
EOL

cat > netlify.toml << 'EOL'
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co wss://*.supabase.co;"
EOL

# Copy Supabase migrations
echo -e "${GREEN}Copying Supabase migrations...${NC}"
for file in supabase/migrations/*.sql; do
  if [ -f "$file" ]; then
    cp "$file" "supabase/migrations/"
  fi
done

# Copy source files
echo -e "${GREEN}Copying source files...${NC}"
for dir in components layouts lib pages; do
  if [ -d "src/$dir" ]; then
    cp -r "src/$dir"/* "src/$dir/"
  fi
done

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm install

echo -e "${BLUE}Setup complete! Next steps:${NC}"
echo "1. Create a .env file with your Supabase credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:4321 to see your site"