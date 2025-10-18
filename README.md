# 🚀 Routix - Complete Delivery Management Platform

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)](https://mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-orange.svg)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive, full-stack delivery management platform that connects customers, drivers, and administrators in a seamless delivery ecosystem. Built with modern web technologies and real-time communication capabilities.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [User Roles](#-user-roles)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🛒 Customer Features
- **User Authentication**: Secure registration and login system
- **Delivery Creation**: Create delivery requests with pickup/dropoff locations
- **Real-time Tracking**: Live delivery status updates with timeline
- **Delivery History**: View past deliveries and status
- **Interactive Maps**: Google Maps integration for route visualization
- **Profile Management**: Update personal information and preferences

### 🚛 Driver Features
- **Driver Registration**: Complete profile setup with vehicle details
- **Request Management**: View and accept available delivery requests
- **Real-time Navigation**: Google Maps integration with turn-by-turn directions
- **Delivery Tracking**: Live status updates and progress monitoring
- **Earnings Dashboard**: Track daily/weekly earnings and performance
- **Professional Interface**: Enterprise-grade delivery management UI

### 👨‍💼 Admin Features
- **Dashboard Overview**: Complete platform analytics and metrics
- **Driver Management**: Verify and manage driver accounts
- **Customer Management**: Monitor customer accounts and activity
- **Delivery Oversight**: Track all deliveries across the platform
- **Request Management**: Handle customer service requests
- **Analytics**: Platform performance metrics and insights

### 🔄 Real-time Features
- **Live Notifications**: Instant updates across all user types
- **Socket.io Integration**: Real-time communication
- **Status Updates**: Live delivery progress tracking
- **Connection Management**: Automatic reconnection handling

## 🔌 Socket.io Real-time Communication

### **How Socket.io Works in Routix**

Socket.io enables **real-time, bidirectional communication** between the frontend (React) and backend (Node.js) in the Routix delivery platform.

#### **🏗️ Architecture Overview**
```
┌─────────────────┐    Socket.io     ┌─────────────────┐
│   Frontend      │◄────────────────►│   Backend       │
│   (React)       │   Real-time      │   (Node.js)     │
│                 │   Events         │                 │
│ • Customer UI   │                  │ • Socket Server │
│ • Driver UI     │                  │ • Event Emitter │
│ • Admin UI      │                  │ • User Tracking │
└─────────────────┘                  └─────────────────┘
```

#### **📡 Key Socket.io Events**

**Events Emitted by Backend:**
- `new_delivery_request` - New delivery created
- `deliveryAssigned` - Driver assigned to delivery
- `deliveryUpdated` - Delivery status changed
- `delivery_deleted` - Delivery cancelled
- `deliveryCompleted` - Delivery finished

**Events Emitted by Frontend:**
- `registerUser` - Customer registers with socket
- `registerDriver` - Driver registers with socket

#### **🔄 Real-time Event Flow**

**1. New Delivery Request Flow:**
```
Customer Creates Request → API Call → Backend Creates Delivery → 
Backend Emits "new_delivery_request" → ALL Connected Clients Receive → 
Driver Request Board Updates → Driver Sees New Request
```

**2. Driver Accepts Delivery Flow:**
```
Driver Clicks Accept → API Call → Backend Updates Status → 
Backend Emits "deliveryAssigned" → Customer Receives Update → 
Customer Sees Driver Assignment
```

**3. Delivery Status Updates Flow:**
```
Driver Updates Status → API Call → Backend Updates Database → 
Backend Emits "deliveryUpdated" → Customer Receives Update → 
UI Updates with New Status
```

#### **🎯 Real-time Features Enabled**

- **Live Delivery Notifications**: Instant updates when drivers are assigned
- **Status Changes**: Real-time delivery progress updates
- **Driver Request Management**: New requests appear instantly
- **Cancellation Alerts**: Immediate notification if delivery is cancelled
- **Admin Monitoring**: Real-time platform activity tracking

#### **🔧 Technical Benefits**

- **No Polling**: No need to constantly check for updates
- **Efficient**: Only sends data when changes occur
- **Scalable**: Handles multiple concurrent connections
- **Instant Feedback**: Users see changes immediately
- **Seamless Updates**: No page refreshes needed

## 🛠 Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Socket.io-client** - Real-time communication
- **Google Maps API** - Map integration
- **Heroicons & Lucide React** - Icon libraries
- **CSS3** - Modern styling with glassmorphism effects

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time communication
- **JWT** - Authentication tokens
- **CORS** - Cross-origin resource sharing

### Database Models
- **Users** - Customer accounts and profiles
- **Drivers** - Driver profiles with vehicle information
- **Deliveries** - Complete delivery lifecycle tracking
- **User Requests** - Customer service requests

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • User Dashboard│    │ • REST API      │    │ • Users         │
│ • Driver Panel  │    │ • Socket.io     │    │ • Drivers       │
│ • Admin Panel   │    │ • JWT Auth      │    │ • Deliveries    │
│ • Real-time UI  │    │ • Controllers   │    │ • Requests      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Clone the Repository
```bash
git clone https://github.com/yourusername/routix-delivery-platform.git
cd routix-delivery-platform
```

### Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/routix
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:
```bash
npm start
# or for development
npm run dev
```

### Frontend Setup
```bash
cd Frontend
npm install
```

Create a `.env` file in the Frontend directory:
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 Usage

### Getting Started

1. **Register as Customer**: Create an account to start placing delivery requests
2. **Register as Driver**: Sign up as a driver to accept delivery requests
3. **Admin Access**: Use admin credentials to manage the platform

### Customer Workflow
1. Sign up/Login to the platform
2. Navigate to User Dashboard
3. Create a new delivery request with pickup and dropoff locations
4. Track your delivery in real-time
5. View delivery history and status updates

### Driver Workflow
1. Register as a driver with vehicle information
2. Wait for admin verification
3. View available delivery requests
4. Accept suitable deliveries
5. Navigate to pickup location using integrated maps
6. Complete delivery and mark as delivered

### Admin Workflow
1. Login with admin credentials
2. Access admin dashboard
3. Verify new driver registrations
4. Monitor platform activity
5. Manage customer requests and support

## 🔌 API Documentation

### Authentication Endpoints
```
POST /api/users/register - Register new customer
POST /api/users/login - Customer login
POST /api/drivers/register - Register new driver
POST /api/drivers/login - Driver login
```

### Delivery Endpoints
```
GET /api/deliveries/pending - Get pending deliveries
POST /api/deliveries/create - Create new delivery
PUT /api/deliveries/:id/assign - Assign delivery to driver
PUT /api/deliveries/:id/status - Update delivery status
GET /api/deliveries/all - Get all deliveries (admin)
```

### User Management
```
GET /api/users/profile - Get user profile
PUT /api/users/profile - Update user profile
GET /api/drivers/all - Get all drivers (admin)
PUT /api/drivers/:id/verify - Verify driver (admin)
```

## 👥 User Roles

### 🛒 Customer
- Create delivery requests
- Track deliveries in real-time
- View delivery history
- Manage profile information

### 🚛 Driver
- View available delivery requests
- Accept and manage deliveries
- Navigate using integrated maps
- Track earnings and performance

### 👨‍💼 Admin
- Manage all users and drivers
- Oversee platform operations
- Verify driver registrations
- Monitor system analytics

## 📱 Screenshots

### Customer Dashboard
![Customer Dashboard](screenshots/customer-dashboard.png)
*Modern customer interface with delivery creation and tracking*

### Driver Interface
![Driver Interface](screenshots/driver-interface.png)
*Professional driver dashboard with real-time delivery management*

### Admin Panel
![Admin Panel](screenshots/admin-panel.png)
*Comprehensive admin dashboard for platform management*

### Real-time Tracking
![Real-time Tracking](screenshots/real-time-tracking.png)
*Live delivery tracking with Google Maps integration*

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/routix
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_SOCKET_URL=http://localhost:5000
```

### Google Maps Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Maps JavaScript API
3. Create API key
4. Add to frontend environment variables

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd Frontend
npm run build
# Deploy the dist folder to your hosting service
```

### Backend Deployment (Railway/Heroku)
```bash
cd Backend
# Add production environment variables
# Deploy to your hosting service
```

### Database Setup
- Use MongoDB Atlas for cloud database
- Configure connection string in environment variables
- Set up proper security rules

## 🧪 Testing

### Run Frontend Tests
```bash
cd Frontend
npm run test
```

### Run Backend Tests
```bash
cd Backend
npm test
```

## 📊 Performance

### Frontend Optimizations
- Code splitting with React.lazy()
- Image optimization
- Bundle size optimization
- Lazy loading components

### Backend Optimizations
- Database indexing
- Query optimization
- Caching strategies
- Connection pooling

## 🔒 Security

### Implemented Security Features
- JWT token authentication
- Password hashing
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection

### Security Best Practices
- Regular dependency updates
- Environment variable protection
- Secure API endpoints
- User input sanitization

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 Changelog

### Version 1.0.0
- Initial release
- Customer delivery management
- Driver request system
- Admin dashboard
- Real-time tracking
- Google Maps integration

## 🐛 Known Issues

- [ ] Mobile responsiveness needs improvement
- [ ] Payment integration pending
- [ ] Advanced analytics dashboard
- [ ] Push notifications

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Basic delivery management
- ✅ Real-time tracking
- ✅ User authentication
- ✅ Admin panel

### Phase 2 (Upcoming)
- [ ] Payment integration
- [ ] Mobile applications
- [ ] Advanced analytics
- [ ] AI route optimization

### Phase 3 (Future)
- [ ] Multi-language support
- [ ] Advanced notifications
- [ ] Machine learning features
- [ ] API for third-party integrations

## 📞 Support

For support, email support@routix.com or join our Slack channel.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database solution
- Socket.io for real-time communication
- Google Maps for mapping services
- All contributors and testers

## 📈 Statistics

![GitHub stars](https://img.shields.io/github/stars/yourusername/routix-delivery-platform)
![GitHub forks](https://img.shields.io/github/forks/yourusername/routix-delivery-platform)
![GitHub issues](https://img.shields.io/github/issues/yourusername/routix-delivery-platform)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/routix-delivery-platform)

---

**Made with ❤️ by the Routix Team**

*Building the future of delivery management, one delivery at a time.*
# Routix
