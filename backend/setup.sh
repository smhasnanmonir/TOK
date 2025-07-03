#!/bin/bash

echo "🚀 Setting up TOK Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
fi

echo "📦 Installing dependencies..."
npm install

echo "🔐 Please login to Cloudflare (if not already logged in):"
echo "   wrangler login"

echo ""
echo "🗄️  Create D1 databases:"
echo "   wrangler d1 create tok-db"
echo "   wrangler d1 create tok-db-prod"

echo ""
echo "⚙️  Update wrangler.toml with your database IDs"

echo ""
echo "🔑 Set JWT secret:"
echo "   wrangler secret put JWT_SECRET"

echo ""
echo "📊 Run database migrations:"
echo "   npm run db:generate"
echo "   npm run db:migrate"

echo ""
echo "🚀 Start development server:"
echo "   npm run dev"

echo ""
echo "✅ Setup complete! Check README.md for detailed instructions." 