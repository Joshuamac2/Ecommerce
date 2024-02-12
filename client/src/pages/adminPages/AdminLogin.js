import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import AdminImage from "./AdminImage.js";

function AdminLogin({ setAuth }) {
    const [inputs, setInputs] = useState({ admin_email: "", admin_password: "" });
    const { admin_email, admin_password } = inputs;

    const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { admin_email, admin_password };
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const parseRes = await response.json();
            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                setAuth(true);
                toast.success("Login successful!", { style: { whiteSpace: 'nowrap' } });
            } else {
                setAuth(false);
                toast.error(parseRes, { style: { whiteSpace: 'nowrap' } });
            }           
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div style={containerStyle}>
            <AdminImage />
            <form onSubmit={onSubmitForm} style={formStyle}>
                <h3 className="text-left my-5">Login as an Admin user</h3>
                <input type="email" name="admin_email" placeholder="Email" className="form-control my-3"
                    value={admin_email} onChange={onChange} />
                <input type="password" name="admin_password" placeholder="Password" className="form-control my-3"
                    value={admin_password} onChange={onChange} />
                <button type="submit" style={buttonStyle}>Login</button>
                <div className="forgot-register-links" style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Link to="/forgottenpassword">Forgot your password?</Link>
                    <br />
                    <Link to="/adminregister">Register</Link>
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
    marginLeft: '30px',
    marginRight: '200px',
    textAlign: 'center',
    minWidth: '300px', // Example minWidth

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

export default AdminLogin;
