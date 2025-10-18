import React, { useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

// Modern Icons
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const LoginPanel = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "", 
    vehicle_id: "",
    license_plate: "",
    model: "",
    capacity: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (isLogin) {
      // Login logic
      let url = "";
      if (role === "customer") {
        url = "https://drivio-1uea.onrender.com/api/users/login";
      } else if (role === "driver") {
        url = "https://drivio-1uea.onrender.com/api/drivers/login";
      } else if (role === "admin") {
        if (formData.email === "admin@gmail.com" && formData.password === "admin123") {
          navigate("/admindashboard");
          setIsLoading(false);
          return;
        } else {
          setErrorMessage("Invalid Admin Credentials");
          setIsLoading(false);
          return;
        }
      }

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        const data = await res.json();
        
        if (res.ok) {
          if (data.token) {
            Cookies.set("token", data.token, { expires: 50 });
          }
          if (role === "customer") {
            Cookies.set("userid", data.userId, { expires: 50 });
            Cookies.set("username", data.username, { expires: 50 });
            navigate("/userdashboard");
          } else if (role === "driver") {
            Cookies.set("driverid", data.driverId, { expires: 50 });
            Cookies.set("vehicleid", data.vehicle_id, { expires: 50 });
            Cookies.set("drivername", data.username, { expires: 50 });
            navigate("/driverrequest");
          }
        } else {
          setErrorMessage(data.message || "Login failed");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Network error");
      }
    } else {
      // Register logic
      let url = "";
      if (role === "customer") {
        url = "https://drivio-1uea.onrender.com/api/users/register";
      } else if (role === "driver") {
        url = "https://drivio-1uea.onrender.com/api/drivers/register";
      }

      const payload = role === "driver" 
        ? { ...formData, isVerified: false } 
        : formData;

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        
        if (res.ok) {
          alert("Account created successfully!");
          setFormData({
            username: "",
            email: "",
            password: "",
            vehicle_id: "",
            license_plate: "",
            model: "",
            capacity: "",
          });
          setIsLogin(true);
        } else {
          setErrorMessage(data.message || "Registration failed");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Network error");
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="logo-section">
            <div className="logo-icon">
              <TruckIcon />
            </div>
            <div className="logo-text">
              <h1 className="logo-title">Routix</h1>
              <p className="logo-subtitle">Delivery Platform</p>
            </div>
          </div>
          
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Role Selector */}
        <div className="role-selector">
          <button
            className={`role-tab ${role === "customer" ? "active" : ""}`}
            onClick={() => setRole("customer")}
          >
            <UserIcon />
            <span>Customer</span>
          </button>
          <button
            className={`role-tab ${role === "driver" ? "active" : ""}`}
            onClick={() => setRole("driver")}
          >
            <TruckIcon />
            <span>Driver</span>
          </button>
          <button
            className={`role-tab ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
          >
            <ShieldIcon />
            <span>Admin</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {!isLogin && role === "driver" && (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label>Vehicle ID</label>
                  <input
                    type="text"
                    name="vehicle_id"
                    value={formData.vehicle_id}
                    onChange={handleChange}
                    placeholder="e.g., VH001"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>License Plate</label>
                  <input
                    type="text"
                    name="license_plate"
                    value={formData.license_plate}
                    onChange={handleChange}
                    placeholder="e.g., ABC-123"
                    required
                  />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Vehicle Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g., Ford Transit"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Capacity (kg)</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="e.g., 1000"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              isLogin ? "" : "Create Account"
            )}
            {!isLoading && (isLogin ? "Sign In" : "Create Account")}
          </button>

          {errorMessage && (
            <div className="error-message">
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              className="toggle-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
