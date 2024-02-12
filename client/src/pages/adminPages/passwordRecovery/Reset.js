import React, { useState, useContext } from 'react';
import { RecoveryContext } from '../../../App.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

import AdminImage from "../AdminImage.js";

const Reset = () => {
  const { email } = useContext(RecoveryContext);
  const navigate = useNavigate(); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') { 
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { 
      setMessage('Passwords do not match');
      toast.error('Passwords do not match'); 
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/changeUserPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        toast.success('Password changed successfully!', { autoClose: 3000 }); 
        navigate('/adminlogin');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <div style={containerStyle}>
      <AdminImage />
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3 className="text-left my-5">Reset Password</h3>
        <input 
          type="password" 
          name="newPassword" 
          placeholder="New Password" 
          className="form-control my-3"
          value={newPassword} 
          onChange={handleChange}
          required 
          />
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          className="form-control my-3"
          value={confirmPassword} 
          onChange={handleChange}
          required 
        />
        <button type="submit" style={buttonStyle}>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
};

const formStyle = {
  marginLeft: '30px',
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

export default Reset;
