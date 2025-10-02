# Employee Management System - Setup Guide

This guide will help you set up and run the Employee Management System on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/)
- **Git** - [Download here](https://git-scm.com/)

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd employee-management-system
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Database Setup

1. **Start MySQL service** on your machine
2. **Create the database** by running the setup script:

```bash
# Option 1: Using MySQL command line
mysql -u root -p < database/setup.sql

# Option 2: Using MySQL Workbench or phpMyAdmin
# Open database/setup.sql and execute it
```

3. **Update database credentials** in `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=employee_management
PORT=5000
NODE_ENV=development
```

### 4. Run the Application

```bash
# From the root directory
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## Manual Setup (Alternative)

If you prefer to run the backend and frontend separately:

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## Default Sample Data

The database setup script includes 10 sample employees across different departments:

- Engineering (3 employees)
- Product (1 employee)
- Design (1 employee)
- Marketing (1 employee)
- Sales (1 employee)
- Human Resources (1 employee)
- Finance (1 employee)
- Customer Support (1 employee)
- Operations (1 employee)

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check database credentials in `backend/.env`
   - Verify database exists: `employee_management`

2. **Port Already in Use**
   - Backend (5000): Change `PORT` in `backend/.env`
   - Frontend (3000): React will prompt to use a different port

3. **Module Not Found Errors**
   - Run `npm install` in both `backend/` and `frontend/` directories
   - Clear node_modules and reinstall if needed

4. **CORS Issues**
   - Ensure backend is running on port 5000
   - Check CORS configuration in `backend/server.js`

### Database Issues

```bash
# Check if MySQL is running
mysql -u root -p -e "SELECT 1"

# Create database manually if needed
mysql -u root -p -e "CREATE DATABASE employee_management;"

# Check if tables exist
mysql -u root -p -e "USE employee_management; SHOW TABLES;"
```

### Reset Database

```bash
# Drop and recreate database
mysql -u root -p -e "DROP DATABASE IF EXISTS employee_management;"
mysql -u root -p < database/setup.sql
```

## Development

### Project Structure

```
employee-management-system/
├── backend/                 # Node.js/Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── frontend/              # React application
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── database/              # Database scripts
├── package.json           # Root package.json
└── README.md
```

### API Endpoints

- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/stats` - Get statistics
- `POST /api/employees/search` - Search employees

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_management
PORT=5000
NODE_ENV=development
```

## Production Deployment

### Backend Deployment

1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment

1. Build the React app: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages

### Database Deployment

- Use managed MySQL services like AWS RDS, PlanetScale, or DigitalOcean Managed Databases
- Update connection strings in production environment

## Support

If you encounter any issues:

1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MySQL is running and accessible
4. Check the troubleshooting section above

## License

This project is licensed under the MIT License.


