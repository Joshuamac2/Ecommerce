import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './adminStyles/AdminDashboard.css';
import { toast } from "react-toastify";

function AdminDashboard({ setAuth }) {
  const [email, setEmail] = useState("");

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out successfully!", { style: { whiteSpace: 'nowrap' } });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getEmail = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token is missing");
          setAuth(false); 
          return;
        }

        const response = await fetch("http://localhost:4000/api/admindashboard", {
          method: "GET",
          headers: {
            jwt_token: localStorage.token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to authenticate with the server");
          setAuth(false); 
          return;
        }

        const parseRes = await response.json();
        setEmail(parseRes.admin_email);
      } catch (err) {
        console.error("Error in getEmail:", err.message);
        setAuth(false); 
      }
    };

    const fetchData = async () => {
      await getEmail();
    };

    fetchData();
  }, [setAuth]);

  return (
  <div>
    <h1>AdminDashboard</h1>
    <h2>Signed in as: {email.split('@')[0]}</h2>
    <button onClick={(e) => logout(e)} className="btn btn-primary">
      Logout
    </button>
    <div className="image-container">
      <Link to="/productmanager" style={{ textDecoration: 'none' }}>
        <div className="image-wrapper">
          <img
            src="/images/productManagement.jpeg" 
            alt="Product Manager"
            style={{ width: '300px', height: '300px', borderRadius: '50px' }}
          />
          <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Product Management</p>
        </div>
      </Link>
      <Link to="/usermanager" style={{ textDecoration: 'none' }}>
        <div className="image-wrapper">
          <img
            src="/images/userManagement.jpg" 
            alt="User Manager"
            style={{ width: '300px', height: '300px', borderRadius: '50px' }}
          />
          <p style={{ fontWeight: 'bold', marginTop: '10px' }}>User Management</p>
        </div>
      </Link>
    </div>
  </div>
  );
}

export default AdminDashboard;
