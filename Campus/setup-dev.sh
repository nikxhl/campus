#!/bin/bash

# Campus Event Management Platform - Development Setup Script

echo "🚀 Setting up Campus Event Management Platform for Development"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -c 2-)
REQUIRED_VERSION="16.0.0"
if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo -e "${RED}❌ Node.js version $NODE_VERSION is too old. Please install v16 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version $NODE_VERSION is compatible${NC}"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL is not installed or not in PATH.${NC}"
    echo "Please install PostgreSQL and ensure it's running."
fi

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
if npm install; then
    echo -e "${GREEN}✅ Backend dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
cd ../frontend
if npm install; then
    echo -e "${GREEN}✅ Frontend dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ..

# Check for environment files
echo -e "${YELLOW}🔧 Checking environment configuration...${NC}"

if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Backend .env file not found. Creating template...${NC}"
    cat > backend/.env << EOL
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=campus_event_db
DB_USER=postgres
DB_PASS=your_password_here
EOL
    echo -e "${GREEN}✅ Backend .env template created. Please update with your database credentials.${NC}"
else
    echo -e "${GREEN}✅ Backend .env file exists${NC}"
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  Frontend .env file not found. Creating template...${NC}"
    cat > frontend/.env << EOL
VITE_API_URL=http://localhost:5000/api
EOL
    echo -e "${GREEN}✅ Frontend .env file created${NC}"
else
    echo -e "${GREEN}✅ Frontend .env file exists${NC}"
fi

# Database setup instructions
echo -e "${YELLOW}📊 Database Setup Instructions:${NC}"
echo "1. Ensure PostgreSQL is running"
echo "2. Create database: createdb campus_event_db"
echo "3. Update backend/.env with your database credentials"
echo "4. Run: cd backend && npm run seed (if you have a seed script)"

# Final instructions
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "To start the development servers:"
echo -e "${YELLOW}Terminal 1 (Backend):${NC}"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo -e "${YELLOW}Terminal 2 (Frontend):${NC}"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "The application will be available at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
