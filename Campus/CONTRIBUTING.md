## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/CampusEventManagement.git
   cd CampusEventManagement
   ```
3. **Set up the development environment** using our setup script:
   ```bash
   # On Windows
   setup-dev.bat
   
   # On macOS/Linux
   chmod +x setup-dev.sh
   ./setup-dev.sh
   ```

## 🛠️ Development Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Git
- A code editor (VS Code recommended)

### Environment Setup

1. **Backend Configuration**:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=campus_event_db
   DB_USER=your_username
   DB_PASS=your_password
   ```

2. **Frontend Configuration**:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Development Servers

**Backend**:
```bash
cd backend
npm run dev
```

**Frontend**:
```bash
cd frontend
npm run dev
```
