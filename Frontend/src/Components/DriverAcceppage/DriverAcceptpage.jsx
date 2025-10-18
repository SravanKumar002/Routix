
import React, { useEffect, useState } from 'react';
import './index.css';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router';
import io from "socket.io-client";

// Connect to backend
const socket = io("https://drivio-1uea.onrender.com");

// Modern Icons
const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16,8 20,8 23,11 23,16 16,16" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const DollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

// Enhanced Components
const StatsCard = ({ icon, title, value, change, color }) => (
  <div className={`stats-card stats-card--${color}`}>
    <div className="stats-icon">{icon}</div>
    <div className="stats-content">
      <h3 className="stats-value">{value}</h3>
      <p className="stats-title">{title}</p>
      <span className="stats-change">{change}</span>
    </div>
  </div>
);

const ProgressBar = ({ progress, label }) => (
  <div className="progress-container">
    <div className="progress-header">
      <span className="progress-label">{label}</span>
      <span className="progress-percentage">{progress}%</span>
    </div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const NotificationCard = ({ type, message, time }) => (
  <div className={`notification-card notification--${type}`}>
    <div className="notification-icon">
      {type === 'success' ? '✓' : type === 'warning' ? '⚠' : 'ℹ'}
    </div>
    <div className="notification-content">
      <p className="notification-message">{message}</p>
      <span className="notification-time">{time}</span>
    </div>
  </div>
);

const DriverAcceptPage = () => {
  const deliveryId = Cookies.get("deliveryId") || "";
  const [delivery, setDelivery] = useState(null);
  const [driverStats, setDriverStats] = useState({
    totalDeliveries: 0,
    completedToday: 0,
    earnings: 0,
    rating: 4.8
  });
  const [notifications, setNotifications] = useState([
    { type: 'success', message: 'Delivery completed successfully!', time: '2 min ago' },
    { type: 'info', message: 'New delivery request available', time: '5 min ago' },
    { type: 'warning', message: 'Traffic alert: Route 101 is congested', time: '10 min ago' }
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!deliveryId) return;
    const cleanId = deliveryId.replace(/"/g, "");
    console.log("Fetching details for delivery ID:", cleanId);

    // Fetch initial delivery details
    const fetchDeliveryDetails = async () => {
      try {
        const response = await fetch(`https://drivio-1uea.onrender.com/api/deliveries/${cleanId}`, {
          method: 'GET',
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`
          }
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Delivery Details:", data.data);
          setDelivery(data.data);
          // Update stats based on delivery
          setDriverStats(prev => ({
            ...prev,
            totalDeliveries: prev.totalDeliveries + 1,
            completedToday: prev.completedToday + 1,
            earnings: prev.earnings + 25 // Example earnings per delivery
          }));
        }
      } catch (error) {
        console.error("Error fetching delivery details:", error);
      }
    };

    fetchDeliveryDetails();

    // Register driver with socket
    const driverId = Cookies.get("driverid");
    if (driverId) {
      socket.emit("registerDriver", driverId);
    }

    // Listen for delivery updates (status changes, cancellations)
    const handleDeliveryUpdate = (updatedDelivery) => {
      if (updatedDelivery._id === cleanId) {
        console.log("🔄 Delivery updated in real-time:", updatedDelivery);
        setDelivery(updatedDelivery);

        if (updatedDelivery.status === "canceled") {
          alert("This delivery has been canceled by the customer.");
          navigate('/driverrequest', { replace: true });
        }
      }
    };

    const handleDeliveryDeleted = ({ deliveryId: cancelledId }) => {
      if (cancelledId === cleanId) {
        console.log("🚫 Delivery canceled by customer:", cancelledId);
        alert("This delivery has been canceled by the customer.");
        navigate('/driverrequest', { replace: true });
      }
    };

    socket.on("deliveryUpdated", handleDeliveryUpdate);

    socket.on("delivery_deleted", handleDeliveryDeleted);

    // Cleanup
    return () => {
      socket.off("deliveryUpdated", handleDeliveryUpdate);
      socket.off("delivery_deleted", handleDeliveryDeleted);
    };
  }, [deliveryId, navigate]);

  if (!delivery) {
    return <div className="loading">Loading delivery details...</div>;
  }

  // Mark delivery as completed
  // backend server URL
  
  const handleComplete = async () => {
    try {
      const res = await fetch(`https://drivio-1uea.onrender.com/api/deliveries/${delivery._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get("token")}`
        },
        body: JSON.stringify({ status: 'delivered' })
      });
  
      if (!res.ok) throw new Error('Failed to update delivery status');
      const data = await res.json();
  
      console.log("Delivery status updated successfully:", data);
  
      // ❌ REMOVE THIS - Backend handles the emit
      // socket.emit("deliveryCompleted", { ... });
  
      navigate('/driverrequest', { replace: true });
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };
  // Cancel delivery
  const handleCancel = async () => {
    try {
      const res = await fetch(`https://drivio-1uea.onrender.com/api/deliveries/${delivery._id}/cancel`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get("token")}`
        }
      });

      if (!res.ok) throw new Error('Failed to cancel delivery');
      const data = await res.json();
      console.log("Delivery cancelled successfully:", data);

      // Emit cancel event for real-time update
      socket.emit("deliveryCanceled", { deliveryId: delivery._id });

      navigate('/driverrequest', { replace: true });
    } catch (error) {
      console.error("Error cancelling delivery:", error);
    }
  };

  return (
    <div className="professional-dashboard">
      {/* Top Navigation Bar */}
      <header className="top-navbar">
        <div className="navbar-left">
          <div className="brand-logo">
            <div className="logo-icon">
              <TruckIcon />
            </div>
            <span className="brand-name">Routix</span>
          </div>
          <div className="delivery-status">
            <div className="status-indicator active"></div>
            <span className="status-text">Active Delivery</span>
          </div>
        </div>
        
        <div className="navbar-center">
          <div className="order-info">
            <span className="order-label">Order ID:</span>
            <span className="order-number">#{delivery._id.slice(-8)}</span>
            <span className={`status-badge ${delivery.status}`}>{delivery.status.toUpperCase()}</span>
          </div>
        </div>

        <div className="navbar-right">
          <div className="current-time">
            <ClockIcon />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <button className="notification-btn">
            <BellIcon />
            <span className="notification-count">3</span>
          </button>
          <div className="driver-profile">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Driver" />
            <div className="profile-info">
              <span className="driver-name">{Cookies.get('drivername') || 'Driver'}</span>
              <span className="driver-role">Professional Driver</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-layout">
        {/* Left Sidebar - Stats & Navigation */}
        <aside className="left-sidebar">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <PackageIcon />
              </div>
              <div className="stat-content">
                <div className="stat-value">{driverStats.completedToday}</div>
                <div className="stat-label">Today's Deliveries</div>
                <div className="stat-change positive">+2 from yesterday</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon earnings">
                <DollarIcon />
              </div>
              <div className="stat-content">
                <div className="stat-value">${driverStats.earnings}</div>
                <div className="stat-label">Today's Earnings</div>
                <div className="stat-change positive">+15% from yesterday</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon rating">
                <ChartIcon />
              </div>
              <div className="stat-content">
                <div className="stat-value">{driverStats.rating}</div>
                <div className="stat-label">Customer Rating</div>
                <div className="stat-change positive">+0.2 this week</div>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-item active">
              <TruckIcon />
              <span>Active Delivery</span>
            </div>
            <div className="nav-item">
              <PackageIcon />
              <span>My Deliveries</span>
            </div>
            <div className="nav-item">
              <ChartIcon />
              <span>Earnings</span>
            </div>
            <div className="nav-item">
              <MapIcon />
              <span>Live Map</span>
            </div>
            <div className="nav-item">
              <UserIcon />
              <span>Profile</span>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="content-area">
          {/* Map Section */}
          <section className="map-section">
            <div className="map-header">
              <h2 className="section-title">Delivery Route</h2>
              <div className="map-controls">
                <button 
                  className="control-btn primary"
                  onClick={() => window.open(`https://www.google.com/maps/dir/${encodeURIComponent(delivery.pickup_location)}/${encodeURIComponent(delivery.dropoff_location)}`, '_blank')}
                >
                  <MapIcon />
                  <span>Open in Maps</span>
                </button>
                <button 
                  className="control-btn secondary"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude, longitude } = position.coords;
                        window.open(`https://www.google.com/maps/dir/${latitude},${longitude}/${encodeURIComponent(delivery.pickup_location)}`, '_blank');
                      });
                    }
                  }}
                >
                  <span>🧭</span>
                  <span>Navigate</span>
                </button>
              </div>
            </div>
            
            <div className="map-container">
              <div className="map-overlay">
                <div className="location-markers">
                  <div className="marker pickup">
                    <div className="marker-icon">📍</div>
                    <div className="marker-label">Pickup</div>
                  </div>
                  <div className="route-line"></div>
                  <div className="marker dropoff">
                    <div className="marker-icon">🏁</div>
                    <div className="marker-label">Drop-off</div>
                  </div>
                </div>
                <div className="location-info">
                  <div className="location-card pickup">
                    <h4>Pickup Location</h4>
                    <p>{delivery.pickup_location}</p>
                  </div>
                  <div className="location-card dropoff">
                    <h4>Drop-off Location</h4>
                    <p>{delivery.dropoff_location}</p>
                  </div>
                </div>
              </div>
              
              <div className="google-map">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWWgUjKq8n0&origin=${encodeURIComponent(delivery.pickup_location)}&destination=${encodeURIComponent(delivery.dropoff_location)}&mode=driving`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </section>

        </main>

        {/* Right Panel */}
        <aside className="right-panel">
          {/* Delivery Progress */}
          <div className="progress-card">
            <div className="card-header">
              <h3>Delivery Progress</h3>
              <div className="progress-badge">75% Complete</div>
            </div>
            
            <div className="progress-bars">
              <div className="progress-item">
                <div className="progress-label">
                  <span>Route Completion</span>
                  <span>75%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '75%'}}></div>
                </div>
              </div>
              
              <div className="progress-item">
                <div className="progress-label">
                  <span>Time Remaining</span>
                  <span>60%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="progress-stats">
              <div className="stat-item">
                <span className="stat-label">Distance</span>
                <span className="stat-value">12.5 km</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">ETA</span>
                <span className="stat-value">18 min</span>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="details-card">
            <div className="card-header">
              <h3>Delivery Details</h3>
              <div className="status-badge active">Active</div>
            </div>
            
            <div className="detail-items">
              <div className="detail-item">
                <div className="detail-icon pickup">📍</div>
                <div className="detail-content">
                  <div className="detail-label">Pickup Location</div>
                  <div className="detail-value">{delivery.pickup_location}</div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon dropoff">🏁</div>
                <div className="detail-content">
                  <div className="detail-label">Drop-off Location</div>
                  <div className="detail-value">{delivery.dropoff_location}</div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon vehicle">🚛</div>
                <div className="detail-content">
                  <div className="detail-label">Vehicle ID</div>
                  <div className="detail-value">{delivery.vehicle_id || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="customer-card">
            <div className="card-header">
              <h3>Customer Information</h3>
            </div>
            
            <div className="customer-info">
              <div className="customer-avatar">
                <div className="avatar-icon">👤</div>
              </div>
              <div className="customer-details">
                <div className="customer-name">{delivery.customer_id?.username || 'Customer'}</div>
                <div className="customer-email">{delivery.customer_id?.email || 'N/A'}</div>
                <div className="customer-rating">
                  <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-text">5.0 (24 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="actions-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            
            <div className="action-buttons">
              <button className="action-btn primary" onClick={handleComplete}>
                <span className="btn-icon">✓</span>
                <span className="btn-text">Mark as Delivered</span>
              </button>
              <button className="action-btn secondary" onClick={handleCancel}>
                <span className="btn-icon">✕</span>
                <span className="btn-text">Cancel Delivery</span>
              </button>
              <button className="action-btn tertiary">
                <span className="btn-icon">📞</span>
                <span className="btn-text">Call Customer</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DriverAcceptPage;
