# 🚀 Routix Setup Guide

This guide will help you set up the Routix delivery management platform on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

## 🔧 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/routix-delivery-platform.git
cd routix-delivery-platform
```

### 2. Install Dependencies

Install all dependencies for both frontend and backend:

```bash
npm run install:all
```

Or install them separately:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd Frontend
npm install

# Install backend dependencies
cd ../Backend
npm install
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Start MongoDB service on your machine
2. MongoDB will run on `mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string

### 4. Environment Configuration

#### Backend Environment (.env)
Create a `.env` file in the `Backend` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/routix
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/routix

# JWT Secret (generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Server Port
PORT=5000

# Environment
NODE_ENV=development

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### Frontend Environment (.env)
Create a `.env` file in the `Frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000

# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# App Configuration
VITE_APP_NAME=Routix
VITE_APP_VERSION=1.0.0
```

### 5. Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Directions API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the API key to your domains
6. Add the API key to your frontend `.env` file

### 6. Start the Application

#### Development Mode (Recommended)
Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:5173`

#### Individual Services
Or start them separately:

```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

## 🧪 Testing the Setup

### 1. Backend Health Check
Visit `http://localhost:5000` in your browser. You should see:
```
Hello, welcome to Routix 🚗📍!
```

### 2. Frontend Application
Visit `http://localhost:5173` in your browser. You should see the Routix application.

### 3. Database Connection
Check the backend console for:
```
✅ Database connected successfully
🚀 Server running on port 5000
```

## 👥 Creating Test Users

### 1. Customer Account
1. Go to `http://localhost:5173`
2. Click "Sign Up"
3. Select "Customer" role
4. Fill in the registration form
5. Login with your credentials

### 2. Driver Account
1. Go to `http://localhost:5173`
2. Click "Sign Up"
3. Select "Driver" role
4. Fill in the registration form with vehicle details
5. Wait for admin verification

### 3. Admin Account
Use these default admin credentials:
- **Email**: admin@gmail.com
- **Password**: admin123

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 5173
npx kill-port 5173
```

#### 2. MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database permissions

#### 3. Google Maps Not Loading
- Verify API key is correct
- Check if APIs are enabled
- Ensure API key restrictions allow your domain

#### 4. Socket.io Connection Issues
- Check CORS configuration
- Verify Socket.io server is running
- Check browser console for errors

### Debug Mode

#### Backend Debug
```bash
cd Backend
DEBUG=* npm run dev
```

#### Frontend Debug
```bash
cd Frontend
npm run dev -- --debug
```

## 📁 Project Structure

```
routix-delivery-platform/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── Components/       # React components
│   │   │   ├── Loginpage/    # Authentication pages
│   │   │   ├── UserDashbooard/ # Customer dashboard
│   │   │   ├── Driverrequestboard/ # Driver request board
│   │   │   ├── DriverAcceppage/ # Driver delivery page
│   │   │   ├── Admindashboard/ # Admin panel
│   │   │   └── customerDelivery/ # Customer tracking
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
├── Backend/                  # Node.js backend application
│   ├── Controllers/          # Route controllers
│   ├── Models/              # Database models
│   ├── routes/              # API routes
│   ├── config/              # Configuration files
│   ├── finalapi.js          # Main server file
│   └── package.json
├── README.md                # Project documentation
├── SETUP.md                 # This setup guide
└── package.json             # Root package.json
```

## 🚀 Production Deployment

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend Deployment (Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting service
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create production cluster
2. Set up security rules
3. Update connection string

## 📞 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/routix-delivery-platform/issues) page
2. Create a new issue with detailed description
3. Join our [Discord](https://discord.gg/routix) community
4. Email support: support@routix.com

## 🎉 You're All Set!

Your Routix delivery platform is now running locally. Start exploring the features:

- **Customers**: Create delivery requests and track them
- **Drivers**: Accept requests and manage deliveries
- **Admins**: Oversee the entire platform

Happy coding! 🚀
