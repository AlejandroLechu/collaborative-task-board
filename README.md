# Collaborative Task Board

A real-time collaborative task board application built with Next.js, Express, and PostgreSQL. This project demonstrates full-stack development with modern technologies, featuring real-time updates and a drag-and-drop interface.

## 🚀 Quick Setup Guide for macOS using Cursor AI

### Prerequisites

First, ensure you have the following installed on your macOS:

```bash
# Install Homebrew if you haven't already
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install PostgreSQL
brew install postgresql@14

# Start PostgreSQL Service
brew services start postgresql
```

### Setting Up the Project

1. Clone the repository:
```bash
git clone https://github.com/AlejandroLechu/collaborative-task-board.git
cd collaborative-task-board
```

2. Set up the database:
```bash
# Create a new PostgreSQL database
createdb taskboard

# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment file and edit it
cp .env.example .env

# Initialize the database with Prisma
npx prisma generate
npx prisma migrate dev
```

3. Configure the server:
Open `.env` in the server directory and set these values:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/taskboard
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

4. Start the backend server:
```bash
# Make sure you're in the server directory
npm run dev
```

5. Set up the frontend:
```bash
# Open a new terminal window
cd collaborative-task-board/client

# Install dependencies
npm install

# Create and configure environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000\nNEXT_PUBLIC_WS_URL=ws://localhost:5000" > .env.local

# Start the development server
npm run dev
```

### Using Cursor AI for Development

1. Open Cursor AI
2. Click "Open Folder" and select the `collaborative-task-board` directory
3. Cursor AI will automatically index your project and provide intelligent suggestions

### 🎯 Features

- Real-time updates using Socket.IO
- Drag-and-drop task management
- User authentication
- Category-based task organization
- Responsive design
- PostgreSQL database with Prisma ORM

### 🛠 Tech Stack

#### Frontend
- Next.js 14
- TailwindCSS
- Socket.IO Client
- DND Kit (drag and drop)
- SWR for data fetching

#### Backend
- Express.js
- PostgreSQL
- Prisma ORM
- Socket.IO
- JSON Web Tokens

### 📱 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Register a new account or login
3. Create a new board
4. Add categories and tasks
5. Drag and drop tasks between categories
6. Changes will be reflected in real-time for all connected users

### 🔧 Common Issues & Solutions

1. PostgreSQL Connection Issues:
```bash
# Check if PostgreSQL is running
brew services list

# Restart PostgreSQL if needed
brew services restart postgresql
```

2. Port Already in Use:
```bash
# Find process using port 5000 (backend)
lsof -i :5000
# Kill the process
kill -9 <PID>

# For frontend port 3000
lsof -i :3000
kill -9 <PID>
```

3. Dependencies Issues:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

### 🔄 Development Workflow

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "description of changes"
```

3. Push your changes:
```bash
git push origin feature/your-feature-name
```

### 📝 Using Cursor AI for Development

Cursor AI provides several helpful features for this project:

1. Code Completion:
   - Type naturally and let Cursor AI suggest completions
   - Use `/` to trigger inline suggestions

2. Code Navigation:
   - Cmd/Ctrl + Click to jump to definitions
   - Cmd/Ctrl + Shift + F to search across files

3. AI Assistance:
   - Select code and right-click for AI suggestions
   - Use the chat panel for complex queries

4. Error Resolution:
   - Hover over errors for AI-powered fixes
   - Use the problems panel for detailed error information

## License

MIT License - feel free to use this project for learning and development.