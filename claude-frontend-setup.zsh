#!/bin/zsh

# Create AI Aggregator Folder Structure Script
echo "Creating folder structure for AI Aggregator inside frontend directory..."

# Create frontend directory
# mkdir -p frontend
cd frontend

# Create root project directory
# mkdir -p ai-aggregator
# cd ai-aggregator

# Create app directory and its subdirectories
mkdir -p app/api/auth/\[\...nextauth\]
mkdir -p app/chat
mkdir -p app/login
mkdir -p app/signup

# Create components directory and its subdirectories
mkdir -p components/auth
mkdir -p components/chat
mkdir -p components/layout
mkdir -p components/ui

# Create lib directory
mkdir -p lib

# Create public directory and its subdirectories
mkdir -p public/images

# Create styles directory
mkdir -p styles

# Create prisma directory
mkdir -p prisma

# Create empty files to represent the structure
# App files
touch app/layout.tsx
touch app/page.tsx
touch app/api/auth/\[\...nextauth\]/route.ts
touch app/chat/page.tsx
touch app/login/page.tsx
touch app/signup/page.tsx

# Component files
touch components/auth/LoginForm.tsx
touch components/auth/SignUpForm.tsx
touch components/chat/ChatBubble.tsx
touch components/chat/ChatContainer.tsx
touch components/chat/ChatInput.tsx
touch components/chat/ConversationHistory.tsx
touch components/chat/SettingsPanel.tsx
touch components/layout/Footer.tsx
touch components/layout/Header.tsx
touch components/layout/Navbar.tsx
touch components/ui/Button.tsx
touch components/ui/Dropdown.tsx
touch components/ui/Input.tsx
touch components/ui/Slider.tsx
touch components/Providers.tsx

# Lib files
touch lib/auth.ts
touch lib/types.ts
touch lib/utils.ts

# Create style files
touch styles/globals.css

# Create config files
touch prisma/schema.prisma
touch .env
touch .env.local
touch .gitignore
touch next.config.js
touch package.json
touch README.md
touch tailwind.config.js
touch postcss.config.js

# API files
mkdir -p app/api/chat
mkdir -p app/api/settings
mkdir -p app/api/auth/register
touch app/api/chat/route.ts
touch app/api/settings/route.ts
touch app/api/auth/register/route.ts

# Return to original directory
cd ../..

echo "Folder structure created successfully!"
echo "Directory structure:"
find frontend -type d | sort

echo "\nFile structure:"
find frontend -type f | sort