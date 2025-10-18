import React, { useState, useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

// --- Modern SVG Icons ---
const DeliveriesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 18H3c-1.1 0-2-.9-2 2V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v1" />
    <path d="M14 17c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" />
    <path d="M21 17c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" />
    <path d="M11 12H3C1.9 12 1 11.1 1 10V8" />
    <path d="m17 12 1.3-1.3c.4-.4.4-1 0-1.4l-2.6-2.6c-.4-.4-1-.4-1.4 0L13 8" />
    <path d="m15 10-2.3-2.3" />
    <path d="M21 8h-3" />
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16,8 20,8 23,11 23,16 16,16" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);



// --- Modern Sidebar Component ---
const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DeliveriesIcon /> },
    { id: 'create', label: 'Create Delivery', icon: <PlusIcon /> },
    { id: 'map', label: 'Live Map', icon: <MapIcon /> },
    { id: 'history', label: 'History', icon: <HistoryIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-section">
          <div className="logo-icon">
            <TruckIcon />
          </div>
          <div className="logo-text">
            <h2 className="logo-title">Routix</h2>
            <p className="logo-subtitle">Delivery Platform</p>
          </div>
        </div>
        
        <div className="user-profile">
          <div className="profile-avatar">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
              className="avatar-img"
            />
            <div className="status-indicator online"></div>
          </div>
          <div className="profile-info">
            <h3 className="profile-name">{Cookies.get('username') || 'User'}</h3>
            <p className="profile-role">Customer</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button 
          className="logout-btn"
          onClick={() => {
            Cookies.remove('token');
            Cookies.remove('userid');
            Cookies.remove('username');
            navigate('/');
          }}
        >
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const DeliveryLoader = ({ onBack }) => (
  <div className="card delivery-planner">
    <div className="delivery-loader">
      <div className="loader-animation">
        <div className="truck-container">
          <svg className="truck-icon" viewBox="0 0 100 60" fill="none">
            <rect x="10" y="20" width="50" height="25" rx="3" fill="#3b82f6" />
            <rect x="60" y="25" width="25" height="20" rx="2" fill="#3b82f6" />
            <circle cx="25" cy="50" r="8" fill="#1f2937" />
            <circle cx="75" cy="50" r="8" fill="#1f2937" />
            <circle cx="25" cy="50" r="4" fill="#6b7280" />
            <circle cx="75" cy="50" r="4" fill="#6b7280" />
            <rect x="15" y="25" width="8" height="6" fill="white" opacity="0.9" />
            <rect x="25" y="25" width="8" height="6" fill="white" opacity="0.9" />
            <rect x="35" y="25" width="8" height="6" fill="white" opacity="0.9" />
          </svg>
          <div className="road-lines">
            <div className="road-line"></div>
            <div className="road-line"></div>
            <div className="road-line"></div>
          </div>
        </div>
        
        <div className="spinner-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      
      <div className="loader-content">
        <h3 className="loader-title">Finding Your Perfect Match!</h3>
        <p className="loader-message">
          🔍 Searching for the best delivery partner near you...
        </p>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <button 
        onClick={onBack} 
        className="btn btn-secondary loader-back-btn"
      >
        Cancel & Go Back
      </button>
    </div>
  </div>
);

const DeliveryPlanner = ({ pickup, setPickup, drop, setDrop, vehicle, setVehicle, onCreate, isLoading, onBack }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pickup && drop && vehicle) {
      const newDelivery = {
        customer_id: Cookies.get("userid") || "",
        driver_id: "",
        vehicle_id: vehicle,
        pickup_location: pickup,
        dropoff_location: drop,
        status: "pending",
      };
      const result = onCreate(newDelivery);
      if (result) {
        navigate("/customerdelivery", { state: { deliveryCreated: true } });
      } else {
        alert("Please fill all fields before creating a delivery.");
      }
    }
  };

  // Show loader instead of form when loading
  if (isLoading) {
    return <DeliveryLoader onBack={onBack} />;
  }

  return (
    <div className="card delivery-planner">
      <h3 className="card-title">Delivery Planner</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Pickup Location"
            className="form-input"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Drop Location"
            className="form-input"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Vehicle Type"
            className="form-input"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Delivery
        </button>
      </form>
    </div>
  );
};

const DriverStatus = ({ status }) => {
  let statusClass = "";
  if (status === "available") statusClass = "status-available";
  else if (status === "on-route") statusClass = "status-on-route";
  else statusClass = "status-unavailable";

  return <span className={`status-pill ${statusClass}`}>{status}</span>;
};

const AvailableDrivers = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("https://drivio-1uea.onrender.com/api/drivers/available", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDrivers(Array.isArray(data.drivers) ? data.drivers : []);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="drivers-container">
      <h2 className="drivers-title">🚚 Available Drivers</h2>
      <div className="table-wrapper">
        <table className="drivers-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Driver Name</th>
              <th>License Plate</th>
              <th>Model</th>
              <th>Capacity (kg)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.length > 0 ? (
              drivers.map((driver, index) => (
                <tr key={index}>
                  <td>{driver.vehicle_id}</td>
                  <td>{driver.username}</td>
                  <td>{driver.license_plate}</td>
                  <td>{driver.model}</td>
                  <td>{driver.capacity}</td>
                  <td>
                    <DriverStatus status={driver.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No drivers available 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ConflictDetection = () => (
  <div className="card conflict-detection">
    <h3 className="card-title warning-title">Conflict Detection Warning</h3>
    <p className="warning-text">
      Warning: Driver Alex and Vehicle Truck 1 are double-booked for the selected time.
      Please resolve the conflict before proceeding.
    </p>
  </div>
);

// --- Dashboard Stats Component ---
const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    activeDeliveries: 0,
    completedDeliveries: 0,
    availableDrivers: 0
  });

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const response = await fetch("https://drivio-1uea.onrender.com/api/drivers/available", {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(prev => ({ ...prev, availableDrivers: data.drivers?.length || 0 }));
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Deliveries", value: stats.totalDeliveries, icon: <TruckIcon />, color: "blue" },
    { title: "Active Deliveries", value: stats.activeDeliveries, icon: <DeliveriesIcon />, color: "green" },
    { title: "Completed", value: stats.completedDeliveries, icon: <HistoryIcon />, color: "purple" },
    { title: "Available Drivers", value: stats.availableDrivers, icon: <MapIcon />, color: "orange" }
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => (
        <div key={index} className={`stat-card stat-card--${stat.color}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-title">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Quick Actions Component ---
const QuickActions = ({ onCreateDelivery }) => (
  <div className="quick-actions">
    <h3 className="section-title">Quick Actions</h3>
    <div className="actions-grid">
      <button className="action-btn action-btn--primary" onClick={onCreateDelivery}>
        <PlusIcon />
        <span>New Delivery</span>
      </button>
      <button className="action-btn action-btn--secondary">
        <MapIcon />
        <span>Track Delivery</span>
      </button>
      <button className="action-btn action-btn--tertiary">
        <HistoryIcon />
        <span>View History</span>
      </button>
    </div>
  </div>
);

// --- Recent Deliveries Component ---
const RecentDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    // Fetch recent deliveries
    const fetchDeliveries = async () => {
      try {
        const response = await fetch("https://drivio-1uea.onrender.com/api/deliveries/all", {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        });
        if (response.ok) {
          const data = await response.json();
          setDeliveries(data.data?.slice(0, 5) || []);
        }
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    };
    fetchDeliveries();
  }, []);

  return (
    <div className="recent-deliveries">
      <h3 className="section-title">Recent Deliveries</h3>
      <div className="deliveries-list">
        {deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <div key={delivery._id} className="delivery-item">
              <div className="delivery-info">
                <h4 className="delivery-route">
                  {delivery.pickup_location} → {delivery.dropoff_location}
                </h4>
                <p className="delivery-status">{delivery.status}</p>
              </div>
              <div className="delivery-actions">
                <button className="btn-small btn-outline">Track</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <TruckIcon />
            <p>No deliveries yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main UserDashboard Component ---
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deliveries, setDeliveries] = useState([]);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateDelivery = async () => {
    setIsLoading(true);

    try {
      const requestData = {
        customer_id: Cookies.get("userid") || "",
        pickup_location: pickup,
        dropoff_location: drop,
        vehicle_type: vehicle,
      };

      const response = await fetch(
        "https://drivio-1uea.onrender.com/api/requests/addrequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Failed to create delivery request. Please try again.");
        setIsLoading(false);
        return false;
      }

      const data = await response.json();
      setDeliveries((prev) => [...prev, data.request]);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error creating delivery request:", error);
      alert("Server error while creating delivery request. Try again later.");
      setIsLoading(false);
      return false;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <DashboardStats />
            <div className="dashboard-grid">
              <QuickActions onCreateDelivery={() => setActiveTab('create')} />
              <RecentDeliveries />
            </div>
          </div>
        );
      case 'create':
        return (
          <DeliveryPlanner
            pickup={pickup}
            setPickup={setPickup}
            drop={drop}
            setDrop={setDrop}
            vehicle={vehicle}
            setVehicle={setVehicle}
            onCreate={handleCreateDelivery}
            isLoading={isLoading}
            onBack={() => setActiveTab('dashboard')}
          />
        );
      case 'map':
        return (
          <div className="map-container">
            <h2>Live Map View</h2>
            <p>Map integration coming soon...</p>
          </div>
        );
      case 'history':
        return (
          <div className="history-container">
            <h2>Delivery History</h2>
            <RecentDeliveries />
          </div>
        );
      case 'settings':
        return (
          <div className="settings-container">
            <h2>Settings</h2>
            <p>Settings panel coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <header className="main-header">
          <div className="header-content">
            <h1 className="page-title">
              {activeTab === 'dashboard' ? 'Dashboard' : 
               activeTab === 'create' ? 'Create Delivery' :
               activeTab === 'map' ? 'Live Map' :
               activeTab === 'history' ? 'History' : 'Settings'}
            </h1>
            <div className="header-actions">
              <button className="btn btn-outline">
                <SettingsIcon />
                Settings
              </button>
            </div>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default UserDashboard;