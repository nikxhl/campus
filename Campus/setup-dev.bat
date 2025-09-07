@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Setting up Campus Event Management Platform for Development
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js is installed

REM Check if npm is available
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not available. Please ensure npm is installed with Node.js.
    pause
    exit /b 1
)

echo ✅ npm is available

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully

cd ..

REM Check for environment files
echo.
echo 🔧 Checking environment configuration...

if not exist "backend\.env" (
    echo ⚠️  Backend .env file not found. Creating template...
    (
        echo PORT=5000
        echo DB_HOST=localhost
        echo DB_PORT=5432
        echo DB_NAME=campus_event_db
        echo DB_USER=postgres
        echo DB_PASS=your_password_here
    ) > backend\.env
    echo ✅ Backend .env template created. Please update with your database credentials.
) else (
    echo ✅ Backend .env file exists
)

if not exist "frontend\.env" (
    echo ⚠️  Frontend .env file not found. Creating template...
    echo VITE_API_URL=http://localhost:5000/api > frontend\.env
    echo ✅ Frontend .env file created
) else (
    echo ✅ Frontend .env file exists
)

REM Database setup instructions
echo.
echo 📊 Database Setup Instructions:
echo 1. Ensure PostgreSQL is running
echo 2. Create database: createdb campus_event_db
echo 3. Update backend\.env with your database credentials
echo 4. Run: cd backend ^&^& npm run seed (if you have a seed script)

REM Final instructions
echo.
echo 🎉 Setup complete!
echo.
echo To start the development servers:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm run dev
echo.
echo The application will be available at:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo.
echo Happy coding! 🚀
echo.
pause
