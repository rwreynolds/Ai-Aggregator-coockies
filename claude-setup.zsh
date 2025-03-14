#!/bin/bash

# Script to create the AI Services Aggregator project structure
# Usage: bash setup_project.sh

# Create the root directory
# mkdir -p ai-services-aggregator
# cd ai-services-aggregator

echo "Creating project directory structure..."

# Create frontend directories
mkdir -p frontend/components/{auth,chat,layout,settings}
mkdir -p frontend/lib
mkdir -p frontend/pages/api/auth
mkdir -p frontend/public
mkdir -p frontend/styles
mkdir -p frontend/types

# Create backend directories
mkdir -p backend/app/{auth,chat,models,services,utils}
mkdir -p backend/migrations
mkdir -p backend/tests

# Create Docker directories
mkdir -p docker/{frontend,backend,nginx,postgres,mongodb}

# Create frontend files
echo "Creating frontend files..."

# Package.json
cat > frontend/package.json << EOF
{
  "name": "ai-services-aggregator-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "axios": "^1.6.2",
    "classnames": "^2.3.2",
    "next": "^14.0.3",
    "next-auth": "^4.24.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-markdown": "^9.0.1",
    "react-syntax-highlighter": "^15.5.0",
    "tailwindcss": "^3.3.5"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.38",
    "@types/react-dom": "^18.2.17",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.54.0",
    "eslint-config-next": "^14.0.3",
    "postcss": "^8.4.31",
    "typescript": "^5.3.2"
  }
}
EOF

# Next.js config
cat > frontend/next.config.js << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placeholder.com'], // Add any image domains needed
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*', // Proxy API requests to backend in development
      },
    ];
  },
};

module.exports = nextConfig;
EOF

# Tailwind config
cat > frontend/tailwind.config.js << EOF
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#d9e2fd',
          300: '#b8c9fc',
          400: '#8ea6f9',
          500: '#6481f5',
          600: '#4d66eb',
          700: '#3a4dd6',
          800: '#3041ae',
          900: '#2d3c8a',
        },
        secondary: {
          50: '#f6f9f9',
          100: '#edf4f3',
          200: '#d5e6e5',
          300: '#b0d1cf',
          400: '#84b7b3',
          500: '#619d99',
          600: '#4d807c',
          700: '#416a67',
          800: '#395756',
          900: '#314a49',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
EOF

# TypeScript config
cat > frontend/tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF

# Global CSS
cat > frontend/styles/globals.css << EOF
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add custom base styles */
@layer base {
  body {
    @apply bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-bold;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    @apply w-2;
  }

  ::-webkit-scrollbar-track {
    @apply bg-transparent;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gray-300 dark:bg-gray-700 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-400 dark:bg-gray-600;
  }
}

/* Add custom component styles */
@layer components {
  /* Prose styling for markdown content */
  .prose {
    @apply text-gray-800 dark:text-gray-200 max-w-none;
  }

  .prose p {
    @apply my-2;
  }

  .prose h1 {
    @apply text-2xl font-bold my-4;
  }

  .prose h2 {
    @apply text-xl font-bold my-3;
  }

  .prose h3 {
    @apply text-lg font-bold my-2;
  }

  .prose ul {
    @apply list-disc pl-5 my-3;
  }

  .prose ol {
    @apply list-decimal pl-5 my-3;
  }

  .prose li {
    @apply my-1;
  }

  .prose code {
    @apply px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm;
  }

  .prose pre {
    @apply p-3 bg-gray-100 dark:bg-gray-800 rounded-md my-3 overflow-x-auto;
  }

  .prose a {
    @apply text-primary-600 dark:text-primary-400 hover:underline;
  }

  .prose blockquote {
    @apply pl-4 border-l-4 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 my-3;
  }

  .prose table {
    @apply w-full border-collapse my-3;
  }

  .prose th {
    @apply px-3 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left;
  }

  .prose td {
    @apply px-3 py-2 border border-gray-300 dark:border-gray-700;
  }
}

/* Add custom utility styles */
@layer utilities {
  .text-shadow {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .text-shadow-md {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .text-shadow-lg {
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}
EOF

# Environment file
cat > frontend/.env.local << EOF
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-at-least-32-chars-long
NEXT_PUBLIC_API_URL=http://localhost:5000
EOF

# Create basic Next.js pages
touch frontend/pages/_app.tsx
touch frontend/pages/index.tsx
touch frontend/pages/signin.tsx
touch frontend/pages/signup.tsx
touch frontend/pages/chat.tsx
touch frontend/pages/profile.tsx
touch frontend/pages/api/auth/[...nextauth].ts

# Create frontend components
touch frontend/components/auth/SignInForm.tsx
touch frontend/components/auth/SignUpForm.tsx
touch frontend/components/chat/ChatInterface.tsx
touch frontend/components/chat/ChatMessage.tsx
touch frontend/components/chat/ChatInput.tsx
touch frontend/components/chat/ChatSettings.tsx
touch frontend/components/layout/MainLayout.tsx
touch frontend/components/layout/Header.tsx
touch frontend/components/layout/Sidebar.tsx

# Create utilities and types
touch frontend/lib/api-client.ts
touch frontend/types/index.ts

# Create placeholder files for public assets
touch frontend/public/favicon.ico

# Create backend files
echo "Creating backend files..."

# Requirements file
cat > backend/requirements.txt << EOF
flask==2.3.3
flask-cors==4.0.0
flask-sqlalchemy==3.1.1
flask-migrate==4.0.5
pyjwt==2.8.0
werkzeug==2.3.7
psycopg2-binary==2.9.9
pymongo==4.6.0
python-dotenv==1.0.0
gunicorn==21.2.0
openai==1.3.7
anthropic==0.7.7
cohere-api==4.32.0
pytest==7.4.3
EOF

# Flask app initialization
touch backend/app/__init__.py
touch backend/app/config.py
touch backend/main.py
touch backend/wsgi.py

# Auth and chat modules
touch backend/app/auth/__init__.py
touch backend/app/auth/routes.py
touch backend/app/chat/__init__.py
touch backend/app/chat/routes.py

# Models
touch backend/app/models/user.py
touch backend/app/models/settings.py
touch backend/app/models/service.py
touch backend/app/models/mongodb_schemas.py

# Services
touch backend/app/services/__init__.py
touch backend/app/services/base_service.py
touch backend/app/services/openai_service.py
touch backend/app/services/anthropic_service.py
touch backend/app/services/cohere_service.py

# Utils
touch backend/app/utils/__init__.py
touch backend/app/utils/helpers.py

# Tests
touch backend/tests/__init__.py
touch backend/tests/test_auth.py
touch backend/tests/test_chat.py

# Environment file
cat > backend/.env << EOF
FLASK_APP=main.py
FLASK_ENV=development
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ai_services
MONGODB_URI=mongodb://mongo:27017/ai_services
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
COHERE_API_KEY=your-cohere-api-key
EOF

# Docker files
echo "Creating Docker files..."

# Docker Compose
cat > docker-compose.yml << EOF
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: ../docker/frontend/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://backend:5000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: ../docker/backend/Dockerfile
    ports:
      - "5000:5000"
    environment:
      - FLASK_APP=main.py
      - FLASK_ENV=production
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ai_services
      - MONGODB_URI=mongodb://mongo:27017/ai_services
      - SECRET_KEY=\${SECRET_KEY}
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
    volumes:
      - ./backend:/app
    depends_on:
      - postgres
      - mongo
    restart: unless-stopped

  postgres:
    image: postgres:14-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=ai_services
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_DATABASE=ai_services
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

  nginx:
    build:
      context: ./docker/nginx
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

volumes:
  postgres_data:
  mongo_data:
EOF

# Dockerfiles
cat > docker/frontend/Dockerfile << EOF
FROM node:18-alpine AS deps

# Install dependencies only when needed
WORKDIR /app

# Copy package files
COPY frontend/package.json frontend/package-lock.json* ./

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user to run the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the build output to the working directory
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user to the non-root user
USER nextjs

# Expose the port
EXPOSE 3000

# Set the environment variable for the port
ENV PORT 3000

# Start the server
CMD ["node", "server.js"]
EOF

cat > docker/backend/Dockerfile << EOF
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1 \\
    FLASK_APP=main.py

# Install system dependencies
RUN apt-get update \\
    && apt-get install -y --no-install-recommends gcc libpq-dev \\
    && apt-get clean \\
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY backend .

# Create a non-root user to run the app
RUN adduser --disabled-password --gecos '' appuser
RUN chown -R appuser:appuser /app
USER appuser

# Expose the port
EXPOSE 5000

# Start gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "wsgi:app"]
EOF

cat > docker/nginx/Dockerfile << EOF
FROM nginx:1.25-alpine

# Copy configuration files
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
EOF

# Nginx config
cat > docker/nginx/nginx.conf << EOF
server {
    listen 80;
    server_name localhost;
    client_max_body_size 100M;

    # API endpoints
    location /api/ {
        proxy_pass http://backend:5000/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # WebSocket support
    location /api/ws {
        proxy_pass http://backend:5000/ws;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Frontend
    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Serving Next.js static files
    location /_next/static {
        proxy_pass http://frontend:3000/_next/static;
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        add_header Cache-Control "public, max-age=3600, immutable";
    }

    # Handle existing app
    location /var/www/app-name {
        alias /var/www/app-name;
        try_files \$uri \$uri/ /index.html;
    }

    # For certbot challenges
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
}
EOF

# Postgres init SQL
cat > docker/postgres/init.sql << EOF
-- Create database if it doesn't exist
CREATE DATABASE ai_services;

-- Connect to the database
\\c ai_services;

-- Create AI services table
CREATE TABLE IF NOT EXISTS ai_services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

-- Create AI models table
CREATE TABLE IF NOT EXISTS ai_models (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES ai_services(id) NOT NULL,
    name VARCHAR(50) NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    supports_temperature BOOLEAN DEFAULT TRUE NOT NULL,
    supports_max_tokens BOOLEAN DEFAULT TRUE NOT NULL,
    default_temperature FLOAT DEFAULT 0.7 NOT NULL,
    default_max_tokens INTEGER DEFAULT 1000 NOT NULL,
    min_temperature FLOAT DEFAULT 0.0 NOT NULL,
    max_temperature FLOAT DEFAULT 1.0 NOT NULL
);

-- Insert default AI services
INSERT INTO ai_services (name, display_name) VALUES
    ('openai', 'OpenAI'),
    ('anthropic', 'Anthropic'),
    ('cohere', 'Cohere');

-- Insert default models for OpenAI
INSERT INTO ai_models (service_id, name, display_name, supports_temperature, supports_max_tokens, default_temperature, default_max_tokens, min_temperature, max_temperature) VALUES
    (1, 'gpt-3.5-turbo', 'GPT-3.5 Turbo', true, true, 0.7, 1000, 0.0, 2.0),
    (1, 'gpt-4', 'GPT-4', true, true, 0.7, 1000, 0.0, 2.0),
    (1, 'gpt-4-turbo', 'GPT-4 Turbo', true, true, 0.7, 2000, 0.0, 2.0);

-- Insert default models for Anthropic
INSERT INTO ai_models (service_id, name, display_name, supports_temperature, supports_max_tokens, default_temperature, default_max_tokens, min_temperature, max_temperature) VALUES
    (2, 'claude-instant-1', 'Claude Instant', true, true, 0.7, 1000, 0.0, 1.0),
    (2, 'claude-2', 'Claude 2', true, true, 0.7, 1000, 0.0, 1.0),
    (2, 'claude-3-opus', 'Claude 3 Opus', true, true, 0.7, 2000, 0.0, 1.0),
    (2, 'claude-3-sonnet', 'Claude 3 Sonnet', true, true, 0.7, 2000, 0.0, 1.0);

-- Insert default models for Cohere
INSERT INTO ai_models (service_id, name, display_name, supports_temperature, supports_max_tokens, default_temperature, default_max_tokens, min_temperature, max_temperature) VALUES
    (3, 'command', 'Command', true, true, 0.7, 1000, 0.0, 1.0),
    (3, 'command-light', 'Command Light', true, true, 0.7, 1000, 0.0, 1.0);
EOF

# Create README
cat > README.md << EOF
# AI Services Aggregator

A full-stack application that allows users to access multiple AI services and models within a single conversation thread. Built with Next.js and Flask.

## Features

- **Multiple AI Services**: Connect to OpenAI, Anthropic, Cohere, and other AI services from a single interface
- **Unified Conversations**: Keep your entire conversation history in one place, even when switching between different models and services
- **Custom Settings**: Adjust temperature, max tokens, and other parameters per message
- **User Accounts**: Secure authentication with JWT and NextAuth
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Support for light and dark themes

## Getting Started

See the documentation for setup and running instructions.
EOF

# Create .gitignore
cat > .gitignore << EOF
# Dependencies
node_modules/
venv/
__pycache__/
.pytest_cache/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
.next/
build/
dist/
out/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea/
.vscode/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Temporary files
.tmp/
.temp/
EOF

echo "Project structure created successfully!"
echo "Navigate to the ai-services-aggregator directory to start development."
echo "Remember to add your actual code to the generated files."
echo "Run 'npm install' in the frontend directory and 'pip install -r requirements.txt' in the backend directory to install dependencies."