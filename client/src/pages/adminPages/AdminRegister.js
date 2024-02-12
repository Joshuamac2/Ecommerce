import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import AdminImage from "./AdminImage.js";

function AdminRegister() {
  const [inputs, setInputs] = useState({
    reg_username: "",
    reg_email: "",
    reg_password: "",
  });

  const { reg_username, reg_email, reg_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
  
    try {
      const body = { reg_username, reg_email, reg_password };
  
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        const parseRes = await response.json();
        toast.success("Admin approval pending", { style: { whiteSpace: 'nowrap' } });
        console.log(parseRes);
      } else {
        toast.error("Error", { style: { whiteSpace: 'nowrap' } });
        throw new Error(`Registration failed: ${response.statusText}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const navigate = useNavigate();

  const handleRedirect = async (e) => {
    e.preventDefault();
    if (reg_username && reg_email && reg_password) {
      await onSubmitForm(e); 
      navigate('/adminregistrationconfirmation');
    } else {
      toast.error("Please fill in all fields", { style: { whiteSpace: 'nowrap' } });
    }
  };

  return (
    <div style={containerStyle}>
      <AdminImage />
      <form onSubmit={onSubmitForm} style={formStyle}>
        <h3 className="text-left my-5">Register as an Admin user</h3>
        <input
          type="text"
          name="reg_username"
          placeholder="Username"
          className="form-control my-3"
          value={reg_username}
          onChange={(e) => onChange(e)}
        />
        <input
          type="email"
          name="reg_email"
          placeholder="Email"
          className="form-control my-3"
          value={reg_email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="reg_password"
          placeholder="Password"
          className="form-control my-3"
          value={reg_password}
          onChange={(e) => onChange(e)}
        />
        <button onClick={handleRedirect} style={buttonStyle}>Register</button>
        <div className="forgot-register-links">
          <Link to="/adminlogin">Login</Link>
        </div>
      </form>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
};

const formStyle = {
  marginLeft: '10px',
  marginRight: '200px',
  textAlign: 'center',
  minWidth: '300px', 
};

const buttonStyle = {
  backgroundColor: '#8B57F9',
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  padding: '5px 20px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default AdminRegister;
